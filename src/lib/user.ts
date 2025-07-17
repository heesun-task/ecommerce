import { pool } from "@/lib/db";
import { User } from "@/types/user";

export async function getUserByEmail(email: string): Promise<string> {
  const res = await pool.query("SELECT id, email, name, role FROM users WHERE email=$1", [
    email
  ]);

  return res.rows[0];
}

export async function getUserWithPasswordByEmail(email: string): Promise<User> {
  const res = await pool.query(
    "SELECT id, email, name, password, role FROM users WHERE email=$1",
    [email]
  );
  return res.rows[0] || [];
}
