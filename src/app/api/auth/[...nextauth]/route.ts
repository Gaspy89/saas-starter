import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { supabaseServer } from "@/lib/supabaseServer"; // we’ll reuse this to check password

export const authOptions: AuthOptions = {
    adapter: SupabaseAdapter({
        url: process.env.SUPABASE_URL!,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    }),

    providers: [
        // Google OAuth
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // Email/password login through Supabase
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // Sign-in with Supabase
                const { data, error } = await supabaseServer.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (error || !data?.user) return null;
                return { id: data.user.id, email: data.user.email };
            },
        }),
    ],

    pages: {
        signIn: "/auth/login",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async session({ session, token }) {
            if (token?.sub) session.user.id = token.sub;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
