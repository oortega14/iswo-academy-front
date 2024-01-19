"use client"

import React, { useState } from "react"
import Link from "next/link"
import { NAV_LINKS } from "@/constants"
import { useUIStore } from "@/store/ui/ui-store"
import { IconMenuDeep } from "@tabler/icons-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"

import { MotionButton } from "../animations/MotionButton"
import { ThemeToggle } from "../theme-toggle"
import { buttonVariants } from "../ui/button"

const HeaderButtons = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })

  if (loading) {
    return <span></span>
  }

  if (!!currentUser) {
    if (currentUser.role === "Súper Administrador") {
      return (
        <div className="flex items-center">
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              rel="noreferrer"
              href={`/super-admin/${currentUser.id}/dashboard/main`}
              className={cn(buttonVariants(), "hidden font-semibold md:flex")}
            >
              Ir a Dashboard
            </Link>
          </MotionButton>
          <ThemeToggle />
        </div>
      )
    } else if (currentUser.role === "Administrador") {
      return (
        <div className="flex items-center">
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              rel="noreferrer"
              href={`/admin/${currentUser.id}/academies/${currentUser?.academy?.id}/dashboard/main`}
              className={cn(buttonVariants(), "hidden font-semibold md:flex")}
            >
              Ir a Dashboard
            </Link>
          </MotionButton>
          <ThemeToggle />
        </div>
      )
    } else if (currentUser.role === "Profesor") {
      return (
        <div className="flex items-center">
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              rel="noreferrer"
              href={`/teacher/${currentUser.id}/dashboard/main`}
              className={cn(buttonVariants(), "hidden font-semibold md:flex")}
            >
              Ir a Dashboard
            </Link>
          </MotionButton>
          <ThemeToggle />
        </div>
      )
    } else if (currentUser.role === "Estudiante") {
      return (
        <div className="flex items-center">
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              rel="noreferrer"
              href={`/student/${currentUser.id}/dashboard/main`}
              className={cn(buttonVariants(), "hidden font-semibold md:flex")}
            >
              Ir a Dashboard
            </Link>
          </MotionButton>
          <ThemeToggle />
        </div>
      )
    }
  } else {
    return (
      <div className="flex items-center">
        <IconMenuDeep className="inline-block size-8 cursor-pointer md:hidden" />
        <div className="flex gap-4">
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              href={siteConfig.buttons.login}
              rel="noreferrer"
              className={cn(buttonVariants(), "hidden font-semibold md:flex")}
            >
              Ingresar
            </Link>
          </MotionButton>
          <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }}>
            <Link
              rel="noreferrer"
              href={siteConfig.buttons.register}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "hidden font-semibold md:flex"
              )}
            >
              Registrarse
            </Link>
          </MotionButton>
          <ThemeToggle />
        </div>
      </div>
    )
  }
}

export default HeaderButtons
