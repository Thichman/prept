'use server'
import { createClient } from '@supabase/supabase-js'
import { createClient as failsafe } from "@/utils/supabase/server";
export async function increaseCallCount() {
    const supabaseUser = failsafe();

    const {
        data: { user },
    } = await supabaseUser.auth.getUser();
    const trueEmail = user.email
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

    let { data: data, error } = await supabase
        .from('test-users')
        .select('calls')
        .eq('email', trueEmail)

    const value = data[0].calls + 1
    let { data: increase, error2 } = await supabase
        .from('test-users')
        .update({ calls: value })
        .eq('email', trueEmail)
        .select()

}
