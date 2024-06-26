'use client'

import { useState } from "react";
import { signUp } from "./signUpAction";

export default function Signup({ searchParams }: { searchParams: { message: string } }) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    if (passwordMatch) {
                        await signUp(formData);
                    }
                }}
            >
                <label className="text-md text-white" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6 text-white"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md text-white" htmlFor="password">
                    Password
                </label>
                <div className="relative mb-6">
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border w-full text-white"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-4 py-2 bg-white"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <label className="text-md text-white" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <div className="relative mb-6">
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border w-full text-white"
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-4 py-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {!passwordMatch && (
                    <p className="text-red-500">Passwords do not match</p>
                )}
                <button
                    type="submit"
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
