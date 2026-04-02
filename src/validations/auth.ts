import { z } from "zod";

export const AuthSchema = z.object({
  name:z.string(),
  email: z.string(),
  password: z.string(),
});

export const LoginSchema = AuthSchema.omit({
  name: true,
});

export type LoginType = z.infer<typeof LoginSchema>
