"use client"

import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBell,
  IconSearch,
  IconServer,
  IconX,
} from "@tabler/icons-react"
import { Logout } from "@/lib/requests"
import { cn } from "@/lib/utils"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MotionDiv } from "@/components/animations/MotionDiv"
import SearchModal from "@/components/modals/SearchModal"
import { ThemeToggle } from "@/components/theme-toggle"
import styles from "@/styles/dashboard.module.css"
import HeaderProfileDropdown from "./HeaderProfileDropdown"
import HideSidebarButton from "./HideSidebarButton"

export const HeaderDashboard = () => {
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

  const {userId, academyId} = useParams<{userId: string, academyId: string}>();

  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(true)
  }

  const toggleButton = (flag: string) => {
    if (flag === "notifications") {
      changeNotifications()
      isSettingsBarOpen && changeSettingsBar()
      isServicesOpen && changeServices()
      isUsersSettingsOpen && changeUserSettings()
    } else if (flag === "userSettings") {
      changeUserSettings()
      isSettingsBarOpen && changeSettingsBar()
      isNotificationsOpen && changeNotifications()
      isServicesOpen && changeServices()
    } else if (flag === "search") {
      changeSearchBar()
      isSettingsBarOpen && changeSettingsBar()
      isNotificationsOpen && changeNotifications()
      isServicesOpen && changeServices()
      isUsersSettingsOpen && changeUserSettings()
    }
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
            {/* TODO: poner el icono */}
            <span className="p-2 text-xl font-semibold uppercase tracking-wider lg:hidden">
              K-WD
            </span>
            <HideSidebarButton />
          </div>
          {isSearchBoxOpen && (
            <div className={cn("fixed inset-0 z-40 opacity-20", styles.blur)}>
              <div className="absolute inset-x-0 flex items-center justify-between p-2 shadow-md">
                <div className="flex flex-1 items-center space-x-2 px-2">
                  <IconSearch />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-md px-4 py-3 text-gray-600 focus:outline-none"
                  />
                </div>
                {/* close button */}
                <button
                  onClick={() => toggleButton("search")}
                  className="dark:bg-blue-dark hover:text-blue-dark rounded-full border-[1px] border-slate-200 p-2 focus:outline-none focus:ring dark:hover:bg-slate-200 md:hidden"
                >
                  <IconX />
                </button>
              </div>
            </div>
          )}
          <MotionDiv
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            className="dark:text-blue-dark z-40 hidden cursor-pointer items-center space-x-2 rounded-xl bg-slate-200 p-3 px-2 md:ml-5 md:mr-auto md:flex md:flex-1"
            onClick={() => setSearchFlag(!searchFlag)}
          >
            <IconSearch className="mx-3" />
            <div>
              <span className="font-bold">Buscar cursos..</span>
            </div>
          </MotionDiv>
          <div className="relative z-40 flex items-center space-x-3">
            <button
              onClick={() => toggleButton("search")}
              className="dark:bg-blue-dark hover:text-blue-dark rounded-full border-[1px] border-slate-200 p-2 focus:outline-none focus:ring dark:hover:bg-slate-200 md:hidden"
            >
              <IconSearch />
            </button>
            <ThemeToggle />
            <div className="hidden items-center space-x-3 md:flex">
              <div className="relative">
                {/* red dot */}
                <div className="absolute right-0 animate-ping rounded-full bg-red-400 p-1"></div>
                <div className="absolute right-0 rounded-full border bg-red-400 p-1"></div>
                <button
                  onClick={() => toggleButton("notifications")}
                  className="rounded-full border-[1px] p-2 hover:bg-slate-200 focus:outline-none focus:ring dark:hover:bg-slate-800"
                >
                  <IconBell />
                </button>
                {isNotificationsOpen && (
                  <MotionDiv
                    initial={{ x: 0, scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <div className="absolute mt-3 w-48 min-w-max max-w-md -translate-x-3/4 rounded-lg bg-white shadow-lg dark:bg-slate-800">
                      <div className="border-b p-4 font-medium dark:border-slate-200">
                        <span className="">Notificaciones</span>
                      </div>
                      <ul className="my-2 flex flex-col space-y-1 p-2">
                        <li>
                          <a
                            href="#"
                            className="dark:hover:bg-blue-dark block rounded-md px-2 py-1 transition hover:bg-slate-200 "
                          >
                            Link
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="dark:hover:bg-blue-dark block rounded-md px-2 py-1 transition hover:bg-slate-200 "
                          >
                            Another Link
                          </a>
                        </li>
                      </ul>
                      <div className="flex items-center justify-center border-t p-4 dark:border-slate-200">
                        <a href="#">See All</a>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleButton("userSettings")}
                  className="rounded-full border-[1px] p-2 hover:bg-slate-200 focus:outline-none focus:ring dark:hover:bg-slate-800"
                >
                  <Avatar>
                    {!!currentUser?.profile_picture ? (
                      <AvatarImage
                        src={currentUser?.profile_picture}
                        alt="foto de perfil"
                      />
                    ) : (
                      <AvatarImage
                        src="/images/avatar_singenero.webp"
                        alt="foto de perfil"
                      />
                    )}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
                <div className="absolute bottom-3 right-0 animate-ping rounded-full bg-green-400 p-1"></div>
                <div className="absolute bottom-3 right-0 rounded-full border border-white bg-green-400 p-1"></div>

                {/* <!-- Dropdown card --> */}
                {isUsersSettingsOpen && (
                  <HeaderProfileDropdown handleLogout={handleLogout} />
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <SearchModal modalOpen={searchFlag} close={() => close(setSearchFlag)} />
    </div>
  )
}
