"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { IconMoon, IconSunHigh } from "@tabler/icons-react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="ml-3 border-[1px]"
    >
      <IconSunHigh className="dark:hidden size-6 " />
      <IconMoon className="hidden size-6 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
