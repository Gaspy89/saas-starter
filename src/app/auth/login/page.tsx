"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const supabase = createClientComponentClient();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Email/Password login
    const loginWithEmail = async () => {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        if (data?.user) {
            router.push("/dashboard");
        }
    };

    // Google login
    const loginWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <h1 className="text-2xl font-semibold">Login</h1>

            <div className="flex flex-col gap-2 w-80">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    onClick={loginWithEmail}
                    className="p-2 rounded bg-green-600 text-white hover:bg-green-700"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="text-red-600">{error}</p>}
            </div>

            <div className="flex items-center gap-2">
                <hr className="w-24 border-gray-300" />
                <span>or</span>
                <hr className="w-24 border-gray-300" />
            </div>

            <button
                onClick={loginWithGoogle}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Continue with Google
            </button>
        </div>
    );
}
