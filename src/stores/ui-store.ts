import { create } from "zustand";
import { persist } from "zustand/middleware"

type State = {
  isSidebarOpen: boolean
  isSettingsBarOpen: boolean
  isSearchBoxOpen: boolean
  isNotificationsOpen: boolean
  isServicesOpen: boolean
  isUsersSettingsOpen: boolean
  ApiURL: string
  academyChanges: boolean
  selectedCategory: string | undefined
  selectedSubcategory: string | undefined
  accordionValue: string | null
}

type Action = {
  changeSidebar: () => void
  changeSettingsBar: () => void
  changeSearchBar: () => void
  changeNotifications: () => void
  changeServices: () => void
  changeUserSettings: () => void
  changeAcademy: () => void

  setSelectedCategory: (category: string | undefined) => void
  setSelectedSubcategory: (subcategory: string | undefined) => void
  setAccordionValue: (value: string | null) => void

}

const isClient = typeof window !== "undefined"
const isMobile = isClient ? window.innerWidth < 1024 : false

export const useUIStore = create<State & Action>()(
  persist(
    (set) => ({
      isSidebarOpen: !isMobile, // Por defecto cerrado en móvil, abierto en desktop
      isSettingsBarOpen: false,
      isSearchBoxOpen: false,
      isNotificationsOpen: false,
      isServicesOpen: false,
      isUsersSettingsOpen: false,
      academyChanges: false,
      user: null,
      ApiURL: `${import.meta.env.VITE_API_URL}`,
      selectedCategory: undefined,
      selectedSubcategory: undefined,
      accordionValue: null,
      lessonCompletionStates: {},
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
      changeAcademy: () =>
        set((state) => ({ academyChanges: !state.academyChanges })),
      changeUserSettings: () =>
        set((state) => ({ isUsersSettingsOpen: !state.isUsersSettingsOpen })),

      setSelectedCategory: (category) =>
        set(() => ({ selectedCategory: category })),
      setSelectedSubcategory: (subcategory) =>
        set(() => ({ selectedSubcategory: subcategory })),
      setAccordionValue: (value) => set({ accordionValue: value })
    }),
    {
      name: "ui-storage", // nombre para localStorage
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
      }), // solo persistir el estado del sidebar
    }
  )
)
