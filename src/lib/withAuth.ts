import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {JSX} from "react";

export function withAuth<P>(
    PageComponent: (props: P, user: { id: string; email?: string }) => JSX.Element | Promise<JSX.Element>
) {
    return async function ProtectedPage(props: P) {
        const supabase = createServerComponentClient({ cookies });
        const { data: { session } } = await supabase.auth.getSession();

        console.log("withAuth - session:", session);

        if (!session?.user) {
            redirect("/auth/login"); // redirect if not logged in
        }

        return PageComponent(props, session.user);
    };
}
