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
            className="fixed right-0 px-4 py-2 text-sm font-medium text-white uppercase transform rotate-90 translate-x-8 bg-gray-600 top-1/2 rounded-b-md"
          >
            Settings
          </button>
          {/* <!-- Settings panel --> */}
          {isSettingsBarOpen && (
            <div
              className={cn(
                "fixed inset-y-0 right-0 flex flex-col bg-white shadow-lg bg-opacity-20 w-80",
                styles.blur
              )}
            >
              <div className="flex items-center justify-between flex-shrink-0 p-2">
                <h6 className="p-2 text-lg">Settings</h6>
                <button
                  onClick={toggleSettingsBarOpen}
                  className="p-2 rounded-md focus:outline-none focus:ring"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
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
              <div className="flex-1 max-h-full p-4 overflow-hidden hover:overflow-y-scroll">
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
