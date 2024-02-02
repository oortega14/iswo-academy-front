"use client"

import { FormEvent, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconProgressBolt,
  IconProgressCheck,
  IconProgressHelp,
} from "@tabler/icons-react"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Separator } from "@/components/ui/separator"
import { MotionDiv } from "@/components/animations/MotionDiv"
import useGetCoursesStatus from "@/hooks/useGetCoursesStatus"

export const StudentsMainContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ userId: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const courseStatus = useGetCoursesStatus({
    userId: params.userId,
    setLoadingCallback: setLoading,
  })

  return (
    <div className="mt-4">
      <div className="flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 whitespace-nowrap text-2xl font-semibold ">
          Hola {currentUser?.first_name}, A continuación un resumen de tus
          cursos:
        </h1>
      </div>
      <div className="mb-12 mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-4 md:grid-cols-2">
        <Link href={`/student/${params.userId}/dashboard/in_progress`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            id="lessons"
            className="cursor-pointer"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 bg-clip-border text-white shadow-lg shadow-orange-500/40">
                <IconProgressBolt />
              </div>
              <div className="p-4 ">
                <h4 className="text-blue-gray-900 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Cursos en progreso: {courseStatus?.in_progress}
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block font-sans text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aqui podras ver tus cursos en progreso
                </p>
              </div>
            </div>
          </MotionDiv>
        </Link>
        <Link href={`/student/${params.userId}/dashboard/ended`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id="evaluation"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-green-600 to-green-400 bg-clip-border text-white shadow-lg shadow-green-500/40">
                <IconProgressCheck />
              </div>
              <div className="p-4">
                <h4 className="text-blue-gray-900 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Cursos Finalizados: {courseStatus?.ended}
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block font-sans text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aqui podras ver tus cursos finalizados
                </p>
              </div>
            </div>
          </MotionDiv>
        </Link>
        <Link href={`/student/${params.userId}/dashboard/acquired`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id="evaluation"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
                <IconProgressHelp />
              </div>
              <div className="p-4">
                <h4 className="text-blue-gray-900 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Cursos de interes: {courseStatus?.acquired}
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block font-sans text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aqui podras ver los cursos en los que has estado interesado
                </p>
              </div>
            </div>
          </MotionDiv>
        </Link>
      </div>
      <Separator className="w-full" />
    </div>
  )
}

export default StudentsMainContent
