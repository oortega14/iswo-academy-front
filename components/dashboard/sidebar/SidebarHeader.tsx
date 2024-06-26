import { useEffect, useState } from "react"
import { Span } from "next/dist/trace"
import Link from "next/link"
import { useParams } from "next/navigation"
import { IswoIconLarge, IswoIconSmall } from "@/icons"
import { useUIStore } from "@/store/ui/ui-store"
import { IconTruckLoading, IconX } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { useGetAcademy } from "@/hooks/useGetAcademy"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { LoaderShimmer } from "@/components/ui/LoaderShimmer"
import { MotionDiv } from "@/components/animations/MotionDiv"

export function buildName(user: any) {
  switch (user.role) {
    case 'Súper Administrador': 
      return 'superadmin'
    case 'Administrador': 
      return 'admin'
    case 'Estudiante': 
      return 'student'
    case 'Profesor': 
      return 'teacher'
  }
}

export const SidebarHeader = () => {
  const [loading, setLoading] = useState(true)
  const [loadingAcademy, setLoadingAcademy] = useState(true)
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)
  const baseUrl = useUIStore((state) => state.baseUrl)
  const user = useGetCurrentUser({
    setLoadingCallback: setLoading,
    baseUrl: baseUrl,
  })
  const { academyId } = useParams<{ academyId: string }>()
  const academy = useGetAcademy({
    academyId: academyId,
    setLoadingCallback: setLoadingAcademy,
  })

  if (loading ) {
    return <div></div>
  } else {
    return (
      <>
        <div
          className={cn("flex shrink-0 items-center justify-between px-2", {
            "lg:justify-center": !isSidebarOpen,
          })}
        >
          {isSidebarOpen ? (
            <>
              {user?.academy?.id === null ? (
                <MotionDiv
                  className="flex w-full justify-center py-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.3 }}
                  transition={{
                    duration: 1.4,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Link
                    href={`/${buildName(user)}/${user?.id}/dashboard/main`}
                    className="max-h-fit overflow-hidden rounded-xl"
                  >
                    <IswoIconLarge className="size-28 dark:invert" />
                  </Link>
                </MotionDiv>
              ) : (
                <MotionDiv
                  className="flex w-full justify-center py-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 0.9 }}
                  transition={{
                    duration: 1.4,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Link
                    href={`/admin/${user?.id}/academies/${user?.academy?.id}/dashboard/main`}
                    className="max-h-fit overflow-hidden rounded-xl"
                  >
                    {loading ? (
                      <LoaderShimmer width="15rem" height="8rem" />
                    ) : (
                      <div className="flex min-h-32 items-center justify-center">
                        <img src={academy?.logo} className="max-h-32 " />
                      </div>
                    )}
                  </Link>
                </MotionDiv>
              )}
            </>
          ) : (
            <div className="flex w-full justify-center py-3">
              <MotionDiv
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 1.4,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Link
                  href={`/admin/${user?.id}/academies/${user?.academy?.id}/dashboard/main`}
                >
                  <IswoIconSmall className="mb-4 size-12 dark:invert" />
                </Link>
              </MotionDiv>
            </div>
          )}
          <button className="rounded-md px-2 lg:hidden" onClick={changeSidebar}>
            <IconX />
          </button>
        </div>
      </>
    )
  }
}
export default SidebarHeader
