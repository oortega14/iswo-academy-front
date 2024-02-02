"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import { Button } from "@/components/ui/button"
import CoursesMosaic from "@/components/academies/CoursesMosaic"
import { MotionDiv } from "@/components/animations/MotionDiv"

export default function AcademyPage() {
  const params = useParams<{ academyId: string }>()
  const [loading, setLoading] = useState(true)
  const academy = useGetAcademy({
    academyId: params.academyId,
    setLoadingCallback: setLoading,
  })
  return (
    <section className="">
      <div className="flex items-center gap-x-10 pb-5">
        <MotionDiv
          initial="hidden"
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative mx-5 my-6 h-[450px] w-auto overflow-hidden rounded-xl bg-gray-100 shadow-lg
          shadow-slate-400 dark:shadow-slate-800"
        >
          <img
            src="/images/academy_banner.webp"
            alt="academies"
            className="rounded-xl object-cover opacity-80"
          />

          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-start justify-start rounded-xl bg-black/40 px-5 text-white dark:bg-black/40">
            <div className="flex flex-1 flex-col items-start justify-center">
              <div className="dark:text-blue-dark bg-blue-dark rounded-xl p-2 text-white dark:bg-slate-200">
                <span className="dark:text-blue-dark px-5 text-5xl font-extrabold text-slate-300">
                  {academy?.name}
                </span>
              </div>
              <div className="dark:bg-blue-dark text-blue-dark mt-4 max-w-[50%] rounded-xl bg-slate-200 p-3 font-semibold dark:text-slate-200">
                {academy?.description}
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
      <CoursesMosaic />
    </section>
  )
}
