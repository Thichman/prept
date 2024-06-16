'use server'
import { createClient } from '@supabase/supabase-js'
import { createClient as failsafe } from "@/utils/supabase/server";

export async function checkCalls() {

    const supabaseUser = failsafe();

    const {
        data: { user },
    } = await supabaseUser.auth.getUser();
    const email = user.email

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    let { data: data, error } = await supabase
        .from('test-users')
        .select('calls')
        .eq('email', email)

    if (data[0].calls >= 5) {
        return true;
    }

    return false;
}
