"use server"

import { createClient } from "@/utils/supabase/server";

export async function updatePassword(password) {
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
        password: password
    });

    if (error) {
        throw error;
    }

    return "Password updated successfully";
}
