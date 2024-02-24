'use client'

import Link from "next/link"
import { IswoIconLarge } from "@/icons"
import { MotionDiv } from "../animations/MotionDiv"
import useGetCourse from "@/hooks/useGetCourse"
import { useParams } from "next/navigation"
import { useState } from "react"
import { IconCertificate2, IconCertificate2Off, IconFileCertificate } from "@tabler/icons-react"

export const Header = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const [loading, setLoading] = useState(true)
  const course = useGetCourse({
    setLoadingCallback: setLoading,
    courseId: courseId
  })
  return (
    <section className="fixed z-30 mb-24 flex w-full items-center justify-center backdrop-blur-md ">
      <div className="3xl:px-28 flex w-full max-w-[1440px] items-center justify-between px-5 sm:py-2 md:px-24 md:py-3">
        <Link href="/">
          <MotionDiv whileHover={{ scale: 0.98 }} whileTap={{ scale: 1 }}>
            <IswoIconLarge className="h-24 w-24 dark:invert" />
          </MotionDiv>
        </Link>
        <div className="flex w-full justify-center">
          <div className="h-full items-center md:flex">
            <IconFileCertificate className="mr-5 size-8"/>
            <span className="text-2xl font-extrabold"> Evaluación Final - {course?.title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
