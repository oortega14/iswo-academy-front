import React, { useState } from "react"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBell,
  IconBrandGitlab,
  IconBrandTabler,
  IconSearch,
  IconServer,
  IconX,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MotionDiv } from "@/components/animations/MotionDiv"
import { ThemeToggle } from "@/components/theme-toggle"
import styles from "@/styles/dashboard.module.css"

import HideSidebarButton from "./HideSidebarButton"

export const HeaderDashboard = () => {
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

  const toggleButton = (flag: string) => {
    console.log(flag)
    if (flag === "notifications") {
      changeNotifications()
      isSettingsBarOpen && changeSettingsBar()
      isServicesOpen && changeServices()
      isUsersSettingsOpen && changeUserSettings()
    } else if (flag === "services") {
      changeServices()
      isSettingsBarOpen && changeSettingsBar()
      isUsersSettingsOpen && changeUserSettings()
      isNotificationsOpen && changeNotifications()
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

  return (
    <div className="w-full">
      <header className="dark:bg-blue-dark z-20 w-full shrink-0 border-b bg-white">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            {/* TODO: poner el icono */}
            <span className="p-2 text-xl font-semibold uppercase tracking-wider lg:hidden">
              K-WD
            </span>
            <HideSidebarButton />
          </div>
          {isSearchBoxOpen && (
            <div className={cn("fixed inset-0 z-10 opacity-20", styles.blur)}>
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
          <div className="hidden items-center space-x-2 px-2 md:ml-5 md:mr-auto md:flex md:flex-1">
            <IconSearch />
            <Input
              type="text"
              placeholder="Search"
              className="rounded-md border-[1px] px-4 py-3 focus:outline-none md:flex-1 md:py-2 md:focus:border-2 md:focus:shadow lg:w-full"
            />
          </div>
          <div className="relative flex items-center space-x-3">
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
              <div>
                <button
                  onClick={() => toggleButton("services")}
                  className="rounded-full border-[1px] p-2 hover:bg-slate-200 focus:outline-none focus:ring dark:hover:bg-slate-800"
                >
                  <IconServer />
                </button>
                {isServicesOpen && (
                  <MotionDiv
                    initial={{ x: 0, scale: 0 }}
                    animate={{ scale: 1, x: -80 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <div className="absolute mt-3 w-48 min-w-max max-w-md -translate-x-3/4 rounded-lg bg-white shadow-lg dark:bg-slate-800">
                      <div className="border-b p-4 text-lg font-medium dark:border-slate-200">
                        Web apps & services
                      </div>
                      <ul className="my-3 flex flex-col space-y-3 p-2">
                        <li>
                          <a
                            href="#"
                            className="dark:hover:bg-blue-dark flex items-start space-x-2 rounded-md px-2 py-1 hover:bg-slate-200"
                          >
                            <span className="mt-1 block">
                              <IconBrandTabler />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-lg">Atlassian</span>
                              <span className="text-sm text-gray-400">
                                Lorem ipsum dolor sit.
                              </span>
                            </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="dark:hover:bg-blue-dark flex items-start space-x-2 rounded-md px-2 py-1 hover:bg-slate-200"
                          >
                            <span className="mt-1 block">
                              <IconBrandGitlab />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-lg">Slack</span>
                              <span className="text-sm text-gray-400">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit.
                              </span>
                            </span>
                          </a>
                        </li>
                      </ul>
                      <div className="flex items-center justify-center border-t p-4 dark:border-slate-200">
                        <a href="#">Show all apps</a>
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
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </button>
                <div className="absolute bottom-3 right-0 animate-ping rounded-full bg-green-400 p-1"></div>
                <div className="absolute bottom-3 right-0 rounded-full border border-white bg-green-400 p-1"></div>

                {/* <!-- Dropdown card --> */}
                {isUsersSettingsOpen && (
                  <MotionDiv
                    initial={{ x: 0, scale: 0 }}
                    animate={{ scale: 1, x: -10 }}
                    transition={{
                      duration: 1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <div className="absolute mt-3 w-48 min-w-max max-w-md -translate-x-3/4 rounded-lg bg-white shadow-lg dark:bg-slate-800">
                      <div className="flex flex-col space-y-1 border-b p-4 font-medium dark:border-slate-200">
                        <span className="">Ahmed Kamel</span>
                        <span className="text-sm ">
                          ahmed.kamel@example.com
                        </span>
                      </div>
                      <ul className="my-2 flex flex-col space-y-1 p-2">
                        <li>
                          <a
                            href="#"
                            className="dark:hover:bg-blue-dark block rounded-md px-2 py-1 transition hover:bg-slate-200"
                          >
                            Link
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="dark:hover:bg-blue-dark block rounded-md px-2 py-1 transition hover:bg-slate-200"
                          >
                            Another Link
                          </a>
                        </li>
                      </ul>
                      <div className="flex items-center justify-center border-t p-4 dark:border-slate-200">
                        <a href="#">Logout</a>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
