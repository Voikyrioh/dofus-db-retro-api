import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
})

export const registerSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
  confirm: z.string().min(8),
  email: z.email(),
})
