// This file should be deleted when the test version is over

'use server'
import { createClient } from '@supabase/supabase-js'
import { createClient as failsafe } from "@/utils/supabase/server";
export async function sendAiMessage(message) {
    const supabaseUser = failsafe();

    const {
        data: { user },
    } = await supabaseUser.auth.getUser();
    const trueEmail = user.email
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)


    const { data, error } = await supabase
        .from('ai-chat')
        .insert([
            { email: trueEmail, message: message },
        ])
        .select()
}
