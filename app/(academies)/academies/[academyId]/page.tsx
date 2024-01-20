"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import { Button } from "@/components/ui/button"
import CoursesMosaic from "@/components/academies/CoursesMosaic"
import { MotionDiv } from "@/components/animations/MotionDiv"

export default function academyPage() {
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
          className="h-[450px] w-auto bg-gray-100 shadow-lg shadow-slate-400 rounded-xl my-6 mx-5 relative
          dark:shadow-slate-800 overflow-hidden"
        >
          <img
            src="/images/academy_banner.webp"
            alt="academies"
            className="object-cover opacity-80 rounded-xl"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-xl text-white flex flex-col items-start justify-start px-5 dark:bg-black/40">
            <div className="flex flex-1 flex-col justify-center items-start">
              <div className="rounded-xl dark:bg-slate-200 dark:text-blue-dark bg-blue-dark text-white p-2">
                <span className="font-extrabold px-5 text-5xl text-slate-300 dark:text-blue-dark">
                  {academy?.name}
                </span>
              </div>
              <div className="font-semibold rounded-xl dark:text-slate-200 dark:bg-blue-dark p-3 max-w-[50%] mt-4 bg-slate-200 text-blue-dark">
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
