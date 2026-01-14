import { supabase } from "./supabase";
import { Profile, Lead, LeadHistory } from "@/types/database";

export const getLeads = async (userId?: string) => {
    const { data, error } = await supabase
        .from('leads')
        .select('*, profiles(nombre)')
        .order('created_at', { ascending: false });

    if (userId) {
        // Filter would normally happen at RLS level, but for extra safety in fetching:
        // query = query.eq('assigned_to', userId);
    }

    return { data, error };
};

export const updateLeadPhase = async (leadId: string, newPhase: string, userId: string) => {
    const { data, error } = await supabase
        .from('leads')
        .update({ fase_actual: newPhase })
        .eq('id_lead', leadId);

    return { data, error };
};
