import z from 'zod';
export const UserSchema = z.object({
  name: z.string(),
  email: z.email(),
  image: z.string()
});

export type User = z.infer<typeof UserSchema>
