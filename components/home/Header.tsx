import Link from "next/link"
import { NAV_LINKS } from "@/constants"
import { IswoIconLarge } from "@/icons"
import { MotionDiv } from "../animations/MotionDiv"
import HeaderButtons from "./HeaderButtons"

export const Header = () => {

  return (
    <section className="fixed z-30 mb-24 flex w-full items-center justify-center backdrop-blur-md ">
      <nav className="3xl:px-28 flex w-full max-w-[1440px] items-center justify-between px-5 sm:py-2 md:px-24 md:py-3">
        <Link href="/">
          <MotionDiv whileHover={{ scale: 0.98 }} whileTap={{ scale: 1 }}>
            <IswoIconLarge className="h-20 w-20 dark:invert" />
          </MotionDiv>
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
      <HeaderButtons/>
      </nav>
    </section>
  )
}

export default Header
