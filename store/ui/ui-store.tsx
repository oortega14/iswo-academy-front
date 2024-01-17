import { User } from "@/types/store"
import { create } from "zustand"

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
    email: "",
    dni: null,
    role: "",
    college_degree: null,
    description: null,
    profile_picture: null,
    created_at: "",
  },
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
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
