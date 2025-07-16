import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Retrieve a user using an email
  const userRes = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  const user = userRes.rows[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // create a token
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
