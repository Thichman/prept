'use server'
import { createClient } from '@supabase/supabase-js'

export async function createTestUser(email) {

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

    const { data, error } = await supabase
        .from('test-users')
        .insert([
            { email: email, calls: 0 },
        ])
        .select()



    return data;
}