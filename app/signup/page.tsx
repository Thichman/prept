import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createTestUser } from "../dashboard/test-functions/createTestUser"

export default async function signup({
    searchParams,
}: {
    searchParams: { message: string };
}) {

    const signUp = async (formData: FormData) => {
        "use server";

        // need to check how the origin is used in the supabase auth
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        // check if user already exists
        // const userList = supabase.auth.admin.listUsers()
        // if (userLi) {

        // }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://preptai.arctechautomations.com/login',
            },
        });

        if (error) {
            console.log(error)
            return redirect("/signup?message=Could not authenticate user");
        }
        //delete this function after the test phase
        createTestUser(email);

        return redirect("/signup?message=Success, Check email to finish signing up!");
    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            {/* <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link> */}

            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
            >
                <label className="text-md text-white" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md text-white" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button
                    formAction={signUp}
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
                >
                    Sign Up
                </button>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    );


}