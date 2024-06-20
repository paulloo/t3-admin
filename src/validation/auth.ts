import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(4),
});

export const registerSchema = loginSchema.extend({
  username: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;