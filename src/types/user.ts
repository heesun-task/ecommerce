export type User = {
  id: number;
  email: string;
  name?: string;
  password: string; // hashed in db
  role: "user" | "admin";
  created_at?: Date;
  updated_at?: Date;
};
