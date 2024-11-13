import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});
