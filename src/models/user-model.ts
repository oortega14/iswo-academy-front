export type User = {
  id: number
  email: string
  is_super_admin: boolean
  is_active: boolean
  is_profile_completed: boolean
  active_academy_id: number | null
  wizard_step: string | number | null
  profile_picture: string | null
  user_detail: UserDetail
  user_academies: UserAcademy[]
}

export type UserDetail = {
  id: number
  first_name: string | null
  last_name: string | null
  birth_date: string | null
  phone: string | null
  dni: string | null
  gender: string | null
  username: string | null
  address: Address | null
  social_networks: SocialNetwork[]
}

export type UserAcademy = {
  id: number
  user_id: number
  academy_id: number
  role: string
}

export type SocialNetwork = {
  id: number
  platform: string
  url: string
  user_detail_id: number
}

export type Address = {
  id: number
  address: string | null
  city: string | null
  province: string | null
  country: string | null
  postal_code: string | null
}