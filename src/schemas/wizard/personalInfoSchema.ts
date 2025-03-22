import { z } from "zod"

const socialNetworkSchema = z.object({
  platform: z.string(),
  url: z.string().url("La URL no es válida"),
})

const addressSchema = z.object({
  user_detail_id: z.string().optional(),
  address: z.string().min(2, "La dirección es muy corta"),
  city: z.string().min(2, "La ciudad es muy corta"),
  province: z.string().min(2, "La provincia es muy corta"),
  country: z.string().min(2, "El país es muy corto"),
  postal_code: z.string().min(2, "El código postal es muy corto"),
})

const userDetailSchema = z.object({
  user_id: z.string().optional(),
  first_name: z.string().min(2, "El nombre es muy corto"),
  last_name: z.string().min(2, "El apellido es muy corto"),
  birth_date: z.string(),
  phone: z.string(),
  dni: z.string(),
  gender: z.string(),
  username: z.string(),
  address_attributes: addressSchema,
  social_networks_attributes: z.array(socialNetworkSchema),
})

export const personalInfoSchema = z.object({
  user: z
    .object({
      email: z.string().email("El email no es válido"),
      user_detail_attributes: userDetailSchema,
      wizard_step: z.string().optional(),
    })
})