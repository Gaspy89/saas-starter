import { NextResponse } from "next/server";

export const GET = async () => {
  // Redirect to dashboard after OAuth login
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return NextResponse.redirect(`${baseUrl}/dashboard`);
};
