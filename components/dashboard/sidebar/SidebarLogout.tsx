"use client"

import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import { IconLogout } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export const SidebarLogout = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const router = useRouter()
  const logout = async () => {
    try {
      const response = await fetch(`${baseUrl}/logout`,{
        method: 'POST',
        credentials: 'include'
      });
      router.push('/')
      return response;
    } catch (e) {
    }
  };

  return (
    <div>
      <button
        className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase border rounded-md focus:outline-none focus:ring"
        onClick={logout}
      >
        <IconLogout />
        <span className={cn({ "lg:hidden": !isSidebarOpen })}>Logout</span>
      </button>
    </div>
  )
}

export default SidebarLogout
