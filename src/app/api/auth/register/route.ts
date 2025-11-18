import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export const POST = async (req: NextRequest) => {
  console.log(req);
  try {
    // Parse body safely
    const body = await req
      .json()
      .catch((error) => console.log("Body parse error:", error));
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // 1️⃣ Create Supabase Auth user
    const { data, error: authError } =
      await supabaseServer.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // auto-confirm
      });

    if (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = data.user.id;

    // 2️⃣ Add user to custom User table
    const { error: dbError } = await supabaseServer
      .from("User")
      .insert([{ id: userId, email }]); // only insert available columns

    if (dbError) {
      console.error("DB error:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  } catch (err: any) {
    console.error("Catch error:", err);
    return NextResponse.json(
      { error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
};
