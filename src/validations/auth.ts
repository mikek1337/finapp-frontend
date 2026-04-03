import { error } from "better-auth/api";
import { z } from "zod";

export const AuthSchema = z.object({
  name:z.string().min(1,{error: 'name required'}),
  email: z.email().min(1,{error: 'email required'}),
  password: z.string().min(8,{error: 'Password requires 8 characters'})
                      .regex(new RegExp('[A-Z]'),{error:'password requires at least 1 uppercase character'})
                      .regex(new RegExp('[a-z]'), {error: 'password requires at least 1 lowercase character'})
                      .regex(new RegExp('[0-9]'), {error: 'password requires at least 1 digit'})
                      .regex(new RegExp('(?=.*[!@#$%^&*])'), {error: 'password requires a special characters'}),
});

export const LoginSchema = AuthSchema.omit({
  name: true,
});

export type LoginType = z.infer<typeof LoginSchema>
