import React, { useState } from "react"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconBell,
  IconBrandGitlab,
  IconBrandTabler,
  IconNotification,
  IconNotificationOff,
  IconSearch,
  IconServer,
  IconX,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { MotionDiv } from "@/components/animations/MotionDiv"
import styles from "@/styles/dashboard.module.css"

import HideSidebarButton from "./HideSidebarButton"
import { ThemeToggle } from "@/components/theme-toggle"

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

  const toggleButton = (flag:string) => {
    console.log(flag)
    if (flag === 'notifications') {
      changeNotifications();
      isSettingsBarOpen && changeSettingsBar()
      isServicesOpen && changeServices()
      isUsersSettingsOpen && changeUserSettings()
    } else if ( flag === 'services') {
      changeServices();
      isSettingsBarOpen && changeSettingsBar()
      isUsersSettingsOpen && changeUserSettings()
      isNotificationsOpen && changeNotifications()
    } else if (flag === 'userSettings') {
      changeUserSettings();
      isSettingsBarOpen && changeSettingsBar()
      isNotificationsOpen && changeNotifications()
      isServicesOpen && changeServices()
    } else if (flag === 'search') {
      changeSearchBar();
      isSettingsBarOpen && changeSettingsBar()
      isNotificationsOpen && changeNotifications()
      isServicesOpen && changeServices()
      isUsersSettingsOpen && changeUserSettings()
    }
  }

  return (
    <div className="w-full">
      <header className="flex-shrink-0 border-b bg-white dark:bg-blue-dark z-20 w-full">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            {/* TODO: poner el icono */}
            <span className="p-2 text-xl font-semibold tracking-wider uppercase lg:hidden">
              K-WD
            </span>
            <HideSidebarButton />
          </div>
          {isSearchBoxOpen && (
            <div
              className={cn("fixed inset-0 z-10 bg-opacity-20", styles.blur)}
            >
              <div className="absolute inset-x-0 flex items-center justify-between p-2 shadow-md">
                <div className="flex items-center flex-1 px-2 space-x-2">
                  <IconSearch />
                  <Input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-3 text-gray-600 rounded-md focus:outline-none"
                  />
                </div>
                {/* close button */}
                <button
                  onClick={()=>toggleButton('search')}
                  className="p-2 dark:bg-blue-dark border-slate-200 border-[1px] rounded-full md:hidden focus:outline-none focus:ring dark:hover:bg-slate-200 hover:text-blue-dark"
                >
                  <IconX />
                </button>
              </div>
            </div>
          )}
          <div className="items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5">
            <IconSearch />
            <Input
              type="text"
              placeholder="Search"
              className="px-4 py-3 rounded-md lg:w-full md:py-2 md:flex-1 focus:outline-none md:focus:shadow md:focus:border-2 border-[1px]"
            />
          </div>
          <div className="relative flex items-center space-x-3">
            <button
              onClick={()=>toggleButton('search')}
              className="p-2 dark:bg-blue-dark border-slate-200 border-[1px] rounded-full md:hidden focus:outline-none focus:ring dark:hover:bg-slate-200 hover:text-blue-dark"
            >
              <IconSearch />
            </button>
            <ThemeToggle />
            <div className="items-center hidden space-x-3 md:flex">
              <div className="relative">
                {/* red dot */}
                <div className="absolute right-0 p-1 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute right-0 p-1 bg-red-400 border rounded-full"></div>
                <button
                  onClick={()=>toggleButton('notifications')}
                  className="p-2 rounded-full focus:outline-none focus:ring border-[1px] hover:bg-slate-200 dark:hover:bg-slate-800"
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
                    <div className="absolute bg-white w-48 max-w-md mt-3 transform rounded-lg shadow-lg -translate-x-3/4 min-w-max dark:bg-slate-800">
                      <div className="p-4 font-medium border-b dark:border-slate-200">
                        <span className="">Notificaciones</span>
                      </div>
                      <ul className="flex flex-col p-2 my-2 space-y-1">
                        <li>
                          <a
                            href="#"
                            className="block px-2 py-1 transition rounded-md dark:hover:bg-blue-dark hover:bg-slate-200 "
                          >
                            Link
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-2 py-1 transition rounded-md dark:hover:bg-blue-dark hover:bg-slate-200 "
                          >
                            Another Link
                          </a>
                        </li>
                      </ul>
                      <div className="flex items-center justify-center p-4 border-t dark:border-slate-200">
                        <a href="#">See All</a>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </div>
              <div>
                <button
                  onClick={()=>toggleButton('services')}
                  className="p-2 rounded-full focus:outline-none focus:ring border-[1px] hover:bg-slate-200 dark:hover:bg-slate-800"
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
                    <div className="absolute bg-white w-48 max-w-md mt-3 transform rounded-lg shadow-lg -translate-x-3/4 min-w-max dark:bg-slate-800">
                      <div className="p-4 text-lg font-medium border-b dark:border-slate-200">
                        Web apps & services
                      </div>
                      <ul className="flex flex-col p-2 my-3 space-y-3">
                        <li>
                          <a
                            href="#"
                            className="flex items-start px-2 py-1 space-x-2 rounded-md dark:hover:bg-blue-dark hover:bg-slate-200"
                          >
                            <span className="block mt-1">
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
                            className="flex items-start px-2 py-1 space-x-2 rounded-md dark:hover:bg-blue-dark hover:bg-slate-200"
                          >
                            <span className="block mt-1">
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
                      <div className="flex items-center justify-center p-4 border-t dark:border-slate-200">
                        <a href="#">Show all apps</a>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={()=>toggleButton('userSettings')}
                  className="p-2 rounded-full focus:outline-none focus:ring border-[1px] hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <img
                    className="object-cover w-8 h-8 rounded-full"
                    src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                    alt="Ahmed Kamel"
                  />
                </button>
                <div className="absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping"></div>
                <div className="absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3"></div>

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
                    <div className="absolute bg-white w-48 max-w-md mt-3 transform rounded-lg shadow-lg -translate-x-3/4 min-w-max dark:bg-slate-800">
                      <div className="flex flex-col p-4 space-y-1 font-medium border-b dark:border-slate-200">
                        <span className="">Ahmed Kamel</span>
                        <span className="text-sm ">
                          ahmed.kamel@example.com
                        </span>
                      </div>
                      <ul className="flex flex-col p-2 my-2 space-y-1">
                        <li>
                          <a
                            href="#"
                            className="block px-2 py-1 transition rounded-md dark:hover:bg-blue-dark hover:bg-slate-200"
                          >
                            Link
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-2 py-1 transition rounded-md dark:hover:bg-blue-dark hover:bg-slate-200"
                          >
                            Another Link
                          </a>
                        </li>
                      </ul>
                      <div className="flex items-center justify-center p-4 border-t dark:border-slate-200">
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
