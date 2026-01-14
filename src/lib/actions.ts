import { cache } from 'react';
import { createClient } from '@/utils/supabase/server';
import { LeadFase, Lead, Profile } from '@/types/database';

export const getUserProfile = cache(async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: 'No user' };

    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return { data: profile as Profile | null, error };
});

export const getLeads = async (filters?: { userId?: string; search?: string; status?: string }) => {
    const supabase = await createClient();
    let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters?.userId) {
        query = query.eq('vendedor_asignado', filters.userId);
    }

    if (filters?.status && filters.status !== 'Todos los estados') {
        query = query.eq('fase', filters.status);
    }

    if (filters?.search) {
        query = query.or(`nombre_cliente.ilike.%${filters.search}%,vehiculo_interes.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    return { data: data as Lead[], error };
};

export const updateLeadPhase = async (leadId: string, newPhase: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('leads')
        .update({ fase: newPhase, updated_at: new Date().toISOString() })
        .eq('id', leadId);

    // Normally we should also insert into lead_history here
    return { data, error };
};

export const getStats = async () => {
    const supabase = await createClient();
    const { data: leads, error } = await supabase.from('leads').select('fase') as { data: { fase: LeadFase }[] | null, error: Error | null };
    if (error || !leads) return { data: null, error: error || 'No leads' };

    const totalLeads = leads.length;
    const ventasMes = leads.filter((l: { fase: LeadFase }) => l.fase === 'Venta Cerrada').length;
    const activeLeads = leads.filter((l: { fase: LeadFase }) => !['Venta Cerrada', 'Venta Perdida'].includes(l.fase)).length;
    const conversion = totalLeads > 0 ? ((ventasMes / totalLeads) * 100).toFixed(1) + '%' : '0%';

    const stats = {
        totalLeads,
        ventasMes,
        conversion,
        activeLeads
    };

    return { data: stats, error: null };
};

export const getChartData = async () => {
    const supabase = await createClient();
    const { data: leads, error } = await supabase
        .from('leads')
        .select('canal, fase, vendedor_asignado, profiles(nombre)');

    if (error || !leads) return { data: null, error: error || 'No leads' };

    // Group by channel
    const channelMap: Record<string, number> = {};
    leads.forEach((l: { canal: string | null }) => {
        const canal = l.canal || 'Otros';
        channelMap[canal] = (channelMap[canal] || 0) + 1;
    });
    const channelData = Object.entries(channelMap).map(([name, value]) => ({ name, value }));

    // Group by vendor (Sales only)
    const vendorMap: Record<string, number> = {};
    leads.forEach((l: { fase: string | null, profiles?: unknown }) => {
        if (l.fase === 'Venta Cerrada') {
            const profiles = l.profiles;
            const vendorName = Array.isArray(profiles)
                ? profiles[0]?.nombre
                : (profiles as { nombre: string })?.nombre || 'Sin asignar';
            vendorMap[vendorName] = (vendorMap[vendorName] || 0) + 1;
        }
    });
    const vendorData = Object.entries(vendorMap).map(([name, sales]) => ({ name, sales }));

    return { data: { vendorData, channelData }, error: null };
};

export const getVendorStats = async () => {
    const supabase = await createClient();
    const [{ data: leads, error: leadsError }, { data: profiles, error: profilesError }] = await Promise.all([
        supabase.from('leads').select('fase, vendedor_asignado'),
        supabase.from('profiles').select('id, nombre, role').eq('role', 'vendedor')
    ]);

    if (leadsError || profilesError) return { data: null, error: leadsError || profilesError };

    const vendors = (profiles || []).map((profile: { id: string, nombre: string | null }) => {
        const vendorLeads = (leads || []).filter((l: { vendedor_asignado: string | null }) => l.vendedor_asignado === profile.id);
        const sales = vendorLeads.filter((l: { fase: string | null }) => l.fase === 'Venta Cerrada').length;
        const totalLeads = vendorLeads.length;
        const conversion = totalLeads > 0 ? ((sales / totalLeads) * 100).toFixed(1) + '%' : '0%';

        return {
            id: profile.id,
            name: profile.nombre,
            leads: totalLeads,
            sales: sales,
            conversion: conversion
        };
    });

    return { data: vendors, error: null };
};

export const createLead = async (leadData: Partial<Lead>) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

    return { data, error };
};
export const updateProfile = async (profileData: Partial<Profile>) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: 'No user' };

    const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

    return { data, error };
};
