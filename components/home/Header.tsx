import Image from "next/image"
import Link from "next/link"
import { NAV_LINKS } from "@/constants"
import { IswoIconLarge } from "@/icons"
import { IconMenuDeep } from "@tabler/icons-react"

import { siteConfig } from "@/config/site"

import { cn } from "../../lib/utils"
import { MotionButton } from "../animations/MotionButton"
import { ThemeToggle } from "../theme-toggle"
import { Button, buttonVariants } from "../ui/button"

export const Header = () => {
  return (
    <section className="flex items-center justify-center mb-24 fixed z-30 w-full">
      <nav className="sm:py-2 md:py-3 flex items-center max-w-[1440px] justify-between w-full px-5 md:px-24 3xl:px-28 backdrop-blur-md">
        <Link href="/">
          <IswoIconLarge className="w-20 h-20 dark:invert" />
        </Link>

        <ul className="hidden h-full gap-12 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="flex items-center">
          <IconMenuDeep className="inline-block cursor-pointer md:hidden size-8" />
          <div className="flex gap-4">
            <MotionButton
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.15 }}
            >
              <Link
                href={siteConfig.buttons.login}
                rel="noreferrer"
                className={cn(buttonVariants(), "hidden md:flex font-semibold")}
              >
                Ingresar
              </Link>
            </MotionButton>
            <MotionButton
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.15 }}
            >
              <Link
                rel="noreferrer"
                href={siteConfig.buttons.register}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hidden md:flex font-semibold"
                )}
              >
                Registrarse
              </Link>
            </MotionButton>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </section>
  )
}

export default Header
