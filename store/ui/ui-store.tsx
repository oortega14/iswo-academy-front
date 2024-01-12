import { create } from "zustand"

export interface TopLevel {
  user: User
}

export interface User {
  id?: number
  first_name: string
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

type State = {
  isSidebarOpen: boolean
  isSettingsBarOpen: boolean
  isSearchBoxOpen: boolean
  isNotificationsOpen: boolean
  isServicesOpen: boolean
  isUsersSettingsOpen: boolean
  currentUser: User
  baseUrl: string
}

type Action = {
  changeSidebar: () => void
  changeSettingsBar: () => void
  changeSearchBar: () => void
  changeNotifications: () => void
  changeServices: () => void
  changeUserSettings: () => void
  updateCurrentUser: (currentUser: State["currentUser"]) => void
}

export const useUIStore = create<State & Action>()((set) => ({
  isSidebarOpen: true,
  isSettingsBarOpen: false,
  isSearchBoxOpen: false,
  isNotificationsOpen: false,
  isServicesOpen: false,
  isUsersSettingsOpen: false,
  currentUser: {
    first_name: "",
    last_name: "",
    dni: null,
    role: "",
    college_degree: null,
    description: null,
    profile_picture: null,
    created_at: "",
  },
  baseUrl: `${process.env.API_BASE_URL}`,
  changeSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  changeSettingsBar: () =>
    set((state) => ({ isSettingsBarOpen: !state.isSettingsBarOpen })),
  changeSearchBar: () =>
    set((state) => ({ isSearchBoxOpen: !state.isSearchBoxOpen })),
  changeNotifications: () =>
    set((state) => ({ isNotificationsOpen: !state.isNotificationsOpen })),
  changeServices: () =>
    set((state) => ({ isServicesOpen: !state.isServicesOpen })),
  changeUserSettings: () =>
    set((state) => ({ isUsersSettingsOpen: !state.isUsersSettingsOpen })),
  updateCurrentUser: (currentUser) => set(() => ({ currentUser: currentUser })),
}))
