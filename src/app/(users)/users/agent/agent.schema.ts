import * as z from "zod";

export const agentUserFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  roleId: z.string(),
  warehouseId: z.string(),
  description: z
    .string().optional(),
});
export const assignWarehouseFormSchema = z.object({
  warehouseId: z.string()
});

export const passwordSchema = z
  .string({
    required_error: "Password can not be empty.",
  })
  .regex(/^.{8,20}$/, {
    message: "Minimum 8 and maximum 20 characters.",
  })
  .regex(/(?=.*[A-Z])/, {
    message: "At least one uppercase character.",
  })
  .regex(/(?=.*[a-z])/, {
    message: "At least one lowercase character.",
  })
  .regex(/(?=.*\d)/, {
    message: "At least one digit.",
  })
  .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
    message: "At least one special character.",
  });