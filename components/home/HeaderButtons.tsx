"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useUIStore } from "@/store/ui/ui-store"
import { IconMenuDeep } from "@tabler/icons-react"
import { USER_TYPES } from "@/types/users"
import { siteConfig } from "@/config/site"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import MotionButton from "../animations/MotionButton"
import { ThemeToggle } from "../theme-toggle"

const HeaderButtons = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })

  if (loading) {
    return <div></div>
  } else if (!!currentUser) {
    if (currentUser.role === USER_TYPES.SUPER_ADMIN) {
      return (
        <div className="flex items-center">
          <Link
            rel="noreferrer"
            href={`/super-admin/${currentUser.id}/dashboard/main`}
          >
            <MotionButton>Ir a Dashboard</MotionButton>
          </Link>
          <ThemeToggle />
        </div>
      )
    } else if (currentUser.role === USER_TYPES.ADMIN) {
      return (
        <div className="flex items-center">
          <Link
            rel="noreferrer"
            href={`/admin/${currentUser.id}/academies/${currentUser?.academy?.id}/dashboard/main`}
          >
            <MotionButton>Ir a Dashboard</MotionButton>
          </Link>
          <ThemeToggle />
        </div>
      )
    } else if (currentUser.role === USER_TYPES.TEACHER) {
      return (
        <div className="flex items-center">
          <Link
            rel="noreferrer"
            href={`/teacher/${currentUser.id}/dashboard/main`}
          >
            <MotionButton>Ir a Dashboard</MotionButton>
          </Link>
          <ThemeToggle />
        </div>
      )
    } else if (currentUser.role === USER_TYPES.STUDENT) {
      return (
        <div className="flex items-center">
          <Link
            rel="noreferrer"
            href={`/student/${currentUser.id}/dashboard/main`}
          >
            <MotionButton>Ir a Dashboard</MotionButton>
          </Link>
          <ThemeToggle />
        </div>
      )
    } else {
      return <div></div>
    }
  } else {
    return (
      <div className="flex items-center">
        <IconMenuDeep className="inline-block size-8 cursor-pointer md:hidden" />
        <div className="flex gap-4">
          <Link href={siteConfig.buttons.login} rel="noreferrer">
            <MotionButton>Ingresar</MotionButton>
          </Link>
          <Link rel="noreferrer" href={siteConfig.buttons.register}>
            <MotionButton>Registrarse</MotionButton>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    )
  }
}

export default HeaderButtons
