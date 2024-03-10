"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconBell, IconSearch, IconServer, IconX } from "@tabler/icons-react"

import { Logout } from "@/lib/requests"
import { cn } from "@/lib/utils"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MotionDiv } from "@/components/animations/MotionDiv"
import SearchModal from "@/components/modals/SearchModal"
import { ThemeToggle } from "@/components/theme-toggle"
import styles from "@/styles/dashboard.module.css"

import HeaderProfileDropdown from "../content/HeaderProfileDropdown"
import HideSidebarButton from "../content/HideSidebarButton"

export const DashboardHeader = () => {
  const router = useRouter()
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [loading, setLoading] = useState(true)
  const [searchFlag, setSearchFlag] = useState(false)
  const isSearchBoxOpen = useUIStore((state) => state.isSearchBoxOpen)
  const isNotificationsOpen = useUIStore((state) => state.isNotificationsOpen)
  const isServicesOpen = useUIStore((state) => state.isServicesOpen)
  const isUsersSettingsOpen = useUIStore((state) => state.isUsersSettingsOpen)
  const isSettingsBarOpen = useUIStore((state) => state.isSettingsBarOpen)
  const changeSettingsBar = useUIStore((state) => state.changeSettingsBar)
  const changeSearchBar = useUIStore((state) => state.changeSearchBar)
  const changeNotifications = useUIStore((state) => state.changeNotifications)
  const changeServices = useUIStore((state) => state.changeServices)
  const changeUserSettings = useUIStore((state) => state.changeUserSettings)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [data, setData] = useState({})
  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }

  const { userId, academyId } = useParams<{
    userId: string
    academyId: string
  }>()

  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(true)
  }

  const toggleButtonDashboard = () => {
    router.push(`/super-admin/${userId}/dashboard/main`)
  }


  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleLogout = async () => {
    const [request, response] = await Logout()
    if (response.logged_out) {
      changeUserSettings()
      router.push("/")
    }
  }

  return (
    <div className="w-full">
      <header className="dark:bg-blue-dark w-full shrink-0 border-b bg-white">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <HideSidebarButton />
          </div>
          <div className="relative z-40 flex w-full items-center justify-center space-x-3">
            <ThemeToggle />
            <div className="hidden items-center space-x-3 md:flex">
              <div>
                <button
                  onClick={() => toggleButtonDashboard()}
                  className="rounded-full border-[1px] p-2 hover:bg-slate-200 focus:outline-none focus:ring dark:hover:bg-slate-800"
                >
                  <IconServer />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SearchModal modalOpen={searchFlag} close={() => close(setSearchFlag)} />
    </div>
  )
}
