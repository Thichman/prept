// app/signup/signUpAction.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createTestUser } from "../dashboard/test-functions/createTestUser";

export const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'https://preptai.arctechautomations.com/login',
        },
    });

    if (error) {
        console.log(error);
        return redirect("/signup?message=Could not authenticate user");
    }

    createTestUser(email);

    return redirect("/signup?message=Success, Check email to finish signing up!");
};
