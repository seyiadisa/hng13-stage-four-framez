import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email("Email is invalid").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
