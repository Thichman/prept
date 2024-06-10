import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

    return (
        <section className="bg-prept-color-header-gray-black text-white w-screen">
            <div className="min-h-screen flex flex-col items-center">
                {children}
            </div>
        </section>
    );
}
