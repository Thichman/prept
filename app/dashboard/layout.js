import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

//delete this function after test phase
import { checkCalls } from "./test-functions/checkCalls"

export const metadata = {
    title: "Prept AI",
    description: "The application that allows users to search research individuals and get data to prepare you for interaction.",
};

export default async function RootLayout({
    children,
}) {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    //delete this function after test phase
    const testvar = await checkCalls()
    if (testvar === true) {
        return redirect("/feedbackForm")
    }

    return (
        <section className="text-white w-screen">
            <div className="min-h-screen flex flex-col items-center">
                {children}
            </div>
        </section>
    );
}
