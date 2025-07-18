import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets are not defined");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateTokens(userId: string, role: string) {
  const accessToken = jwt.sign(
    { userId, role, type: "access" },
    JWT_SECRET as string,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId, type: "refresh" },
    JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}

export function verifyToken(token: string, type: "access" | "refresh") {
  const secret = type === "access" ? JWT_SECRET : JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  const payload = jwt.verify(token, secret as string);
  return payload as unknown as {
    userId: string;
    role?: string;
    type: string;
  };
}
