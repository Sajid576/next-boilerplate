import * as z from "zod";

export const roleFormSchema = z.object({
  name: z.string(),
  description: z
    .string().optional(),
});
