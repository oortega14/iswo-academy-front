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
    <section className="fixed z-30 mb-24 flex w-full items-center justify-center">
      <nav className="3xl:px-28 flex w-full max-w-[1440px] items-center justify-between px-5 backdrop-blur-md sm:py-2 md:px-24 md:py-3">
        <Link href="/">
          <IswoIconLarge className="h-20 w-20 dark:invert" />
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
          <IconMenuDeep className="inline-block size-8 cursor-pointer md:hidden" />
          <div className="flex gap-4">
            <MotionButton
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.15 }}
            >
              <Link
                href={siteConfig.buttons.login}
                rel="noreferrer"
                className={cn(buttonVariants(), "hidden font-semibold md:flex")}
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
                  "hidden font-semibold md:flex"
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
