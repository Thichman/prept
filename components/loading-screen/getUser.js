'use server'
import { createClient } from "@/utils/supabase/server";

export default async function getUser() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return false;
    } else {
        return true;
    }
}