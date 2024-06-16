'use server'
import { createClient } from '@supabase/supabase-js'

export async function isTestUser(email) {

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    let { data: testusers, error } = await supabase
        .from('test-users')
        .select('email')

    if (testusers.find(user => user.email === email)) {
        return true;
    }
    return false;
}
