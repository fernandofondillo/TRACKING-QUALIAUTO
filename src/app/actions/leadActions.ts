"use server";

import { createClient } from '@supabase/supabase-js';
import { Lead, Profile } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // In production use Service Role for sensitive assignments

export async function assignLeadToVendor(leadId: string, vendorId: string) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
        .from('leads')
        .update({ assigned_to: vendorId })
        .eq('id_lead', leadId);

    return { data, error };
}

export async function createNewLead(leadData: Partial<Lead>) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
        .from('leads')
        .insert([leadData]);

    return { data, error };
}

export async function updateLeadStatus(leadId: string, statusData: Partial<Lead>) {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
        .from('leads')
        .update(statusData)
        .eq('id_lead', leadId);

    return { data, error };
}
