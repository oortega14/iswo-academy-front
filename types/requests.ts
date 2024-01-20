//Register

export type FetchRegisterParams = {
  user: {
    name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
    username: string
    role: number | null
  }
}

export type RegisterParams = {
  name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  username: string
  role: number | null
}

export type TokenResetProps = {
  token: string | null
  password: string
  data: any
}

//create-academy
export type ConfigurateAcademyParams = {
  academy_category_id: string
  name: string
}

//create-academy
export type LearningRouteParams = {
  academy_id: string
  name: string
}

//user-requests
export type UserConfiguration = {
  first_name: string
  last_name: string
  college_degree: string
  description: string
}

export type UserSocialNetwork = {
  web_site: string
  facebook_profile_url: string
  instagram_profile_url: string
  linked_in_profile_url: string
  x_profile_url: string
  youtube_profile_url: string
  tiktok_profile_url: string
}

export type UpdateInfoUserParams = {
  userConfiguration: UserConfiguration
  userSocialNetwork: UserSocialNetwork
  userId: string
}

export type EmailRestore = {
  email: string
  password: string
  password_confirmation: string
}

export type UpdateAccountParams = {
  data: EmailRestore
  userId: string
}
