import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    user_detail_attributes: z.object({
      first_name: z
      .string()
    .min(3, { message: "Nombre no puede estar vacío" })
    .max(50, { message: "Nombre debe tener como máximo 50 caracteres" }),
    last_name: z
    .string()
    .min(3, { message: "Tús apellidos no pueden estar vacíos" })
      .max(50, {
        message: "Tús apellidos debe tener como máximo 50 caracteres",
      }),
    }),
    email: z
      .string()
      .email({ message: "Debe ser el formato de e-mail valido" }),
  })