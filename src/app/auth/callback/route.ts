import { NextResponse } from "next/server";

export async function GET() {
    // Redirect to dashboard after OAuth login
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return NextResponse.redirect(`${baseUrl}/dashboard`);
}
