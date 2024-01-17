export interface TopLevel {
  user: User
}

export interface User {
  id?: number
  first_name: string
  email: string
  last_name: string
  dni: null
  role: string
  college_degree: null
  description: null
  profile_picture: null
  created_at: string
  user_configuration?: UserConfiguration
  social_network?: SocialNetwork
  academy?: Academy
}

export interface Academy {
  id: null
  name: null
  academy_configuration: AcademyConfiguration
}

export interface AcademyConfiguration {
  id: null
  colors: null
  domain: null
}

export interface SocialNetwork {
  id: number
  web_site: null
  facebook_profile_url: null
  instagram_profile_url: null
  linked_in_profile_url: null
  twitter_profile_url: null
  youtube_profile_url: null
  tiktok_profile_url: null
}

export interface UserConfiguration {
  id: number
  public_profile: boolean
  promotions_email: boolean
  instructors_emails: boolean
}
