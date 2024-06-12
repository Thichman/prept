"use server"
import { createClient } from "@/utils/supabase/server";
import { createClient as createService } from "@supabase/supabase-js";

export async function sendToDatabase(formData) {

    const supabase = createClient()
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const supabaseUtil = createService(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    const { data, error } = await supabaseUtil
        .from('feedback')
        .insert([
            { Role: formData.companyRole, likelyhoodToUSe: formData.likelihoodToUse, Experience: formData.experience, HelpsJob: formData.helpsJob, PhoneNumber: formData.phoneNumber, Dislikes: formData.dislikes, Likes: formData.likes, MissingFeatures: formData.missingFeatures, Email: user.email, OpenFeedback: formData.openFeedback },
        ])
        .select()

    if (!error) {
        return true
    }
}