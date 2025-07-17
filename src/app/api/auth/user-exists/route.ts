import { getUserByEmail } from "@/lib/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  const user = await getUserByEmail(email);
  return NextResponse.json({ exists: !!user });
}
