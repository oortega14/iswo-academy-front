import React, { useState } from "react"
import { useUIStore } from "@/store/ui/ui-store"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { MotionDiv } from "@/components/animations/MotionDiv"
import { useRouter } from "next/navigation"

const HeaderProfileDropdown = ({ handleLogout }: any) => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const navigateProfile = () => {
    router.push(`/users/${currentUser?.id}/profile/info`)
    changeUserSettings()
  }
  const changeUserSettings = useUIStore((state) => state.changeUserSettings)

  return (
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
          <span className="">
            {currentUser?.first_name} {currentUser?.last_name}
          </span>
          <span className="text-sm ">{currentUser?.email}</span>
        </div>
        <ul className="my-2 flex flex-col space-y-1 p-2">
          <li>
            <button
              onClick={()=>navigateProfile()}
              className="dark:hover:bg-blue-dark block w-full rounded-md px-3 py-1 transition hover:bg-slate-200 "
            >
              Mi Perfil
            </button>
          </li>
        </ul>
        <div
          className="flex items-center justify-center border-t p-4 dark:border-slate-200"
          onClick={handleLogout}
        >
          <a href="#">Salir</a>
        </div>
      </div>
    </MotionDiv>
  )
}

export default HeaderProfileDropdown
