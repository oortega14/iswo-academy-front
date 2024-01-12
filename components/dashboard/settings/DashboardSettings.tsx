"use client"

import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import { useState } from "react"
import styles from '@/styles/dashboard.module.css';

export const DashboardSettings = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const isSettingsBarOpen = useUIStore((state) => state.isSettingsBarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)
  const changeSettingsBar = useUIStore((state) => state.changeSettingsBar)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false)
  const toggleSearchBox = () => {
    setIsSearchBoxOpen(!isSearchBoxOpen)
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const toggleSettingsBarOpen = () => {
    changeSettingsBar()
  }
  return (
    <>
    {/* Setting panel button */}
    <div>
          <button
            onClick={toggleSettingsBarOpen}
            className="fixed right-0 top-1/2 translate-x-8 rotate-90 rounded-b-md bg-gray-600 px-4 py-2 text-sm font-medium uppercase text-white"
          >
            Settings
          </button>
          {/* <!-- Settings panel --> */}
          {isSettingsBarOpen && (
            <div
              className={cn(
                "fixed inset-y-0 right-0 flex w-80 flex-col bg-white opacity-20 shadow-lg",
                styles.blur
              )}
            >
              <div className="flex shrink-0 items-center justify-between p-2">
                <h6 className="p-2 text-lg">Settings</h6>
                <button
                  onClick={toggleSettingsBarOpen}
                  className="rounded-md p-2 focus:outline-none focus:ring"
                >
                  <svg
                    className="h-6 w-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="max-h-full flex-1 overflow-hidden p-4 hover:overflow-y-scroll">
                <span>Settings Content</span>
                {/* <!-- Settings Panel Content ... --> */}
              </div>
            </div>
          )}
        </div>
    </>
  )
}

export default DashboardSettings
