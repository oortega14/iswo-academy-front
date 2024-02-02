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

// create-learning-route
export type CreateLearningRouteParams = {
  learningRouteData: LearningRoute
}

// update-learning-route
export type UpdateLearningRouteParams = {
  learningRouteId: string
  learningRouteData: LearningRoute
}

//user-requests
export type UserConfiguration = {
  first_name: string
  last_name: string
  college_degree: string
  description: string
}

export type LearningRoute = {
  learning_route: {
    name: string
    academy_id: number
  }
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

export type CreateCourseSectionRequestProps = {
  name: string
  courseId: string | string[]
  position: string | null
}

export type UpdateSectionRequestParams = {
  sectionId: string
  sectionData: {
    name: string
  }
}
