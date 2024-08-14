'use server'
import { createClient } from "@/utils/supabase/server";

export async function getSupabaseResetPasswordClient() {
    const supabase = createClient();
    return supabase;
}