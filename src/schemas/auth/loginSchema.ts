import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Debe ser el formato de e-mail valido' }),
  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});
