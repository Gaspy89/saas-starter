"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard", // change to your post-login route
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign In</button>
                <button
                    type="button"
                    onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                >
                    Sign in with Google
                </button>
            </form>
        </div>
    );
}
