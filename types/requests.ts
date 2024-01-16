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
  academy_category_id: string,
  name: string,
}
