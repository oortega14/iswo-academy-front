"use client"

import { useState } from "react"
import { useUIStore } from "@/store/ui/ui-store"

import { cn } from "@/lib/utils"
import styles from "@/styles/dashboard.module.css"
import FooterDashboard from "./FooterDashboard"
import MainContent from "./MainContent"
import { HeaderDashboard } from "./HeaderDashboard"

export const DashboardContent = () => {
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
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <HeaderDashboard/>
        <MainContent/>
      </div>
    </>
  )
}
export default DashboardContent
