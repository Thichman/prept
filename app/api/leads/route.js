'use server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req) {
    const data = await req.json()

    const supabaseUrl = 'https://xxuktcylullooihmqlqo.supabase.co'
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { returnData, error } = await supabase
        .from('leadfunnel')
        .insert([
            { first_name: data.firstName, last_name: data.lastName, email: data.email, question_answer: data.answer },
        ])
        .select()

    console.log(error)

    return new Response('Success')
}