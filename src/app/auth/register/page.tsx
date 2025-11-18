"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const RegisterPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // STEP 1: Call your API to create user & custom DB entry
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // STEP 2: Log the user in immediately to establish the Session
      // This sets the cookies so the dashboard knows who they are
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      // STEP 3: Navigate to Dashboard
      router.refresh(); // Refresh to ensure server components see the new session
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-md mx-auto mt-12 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Create account</h2>

      {error && (
        <div className="p-2 text-red-500 bg-red-50 rounded">{error}</div>
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        className="border p-2 rounded"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterPage;
