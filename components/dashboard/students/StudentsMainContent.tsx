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
      <div className="mb-12 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 px-4 mt-10">
        <Link href={`/student/${params.userId}/dashboard/in_progress`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            id="lessons"
            className="cursor-pointer"
          >
            <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md border-2">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconProgressBolt />
              </div>
              <div className="p-4 ">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Cursos en progreso: {courseStatus?.in_progress}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
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
            <div className="relative flex flex-col bg-clip-border rounded-xl border-2 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconProgressCheck />
              </div>
              <div className="p-4">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Cursos Finalizados: {courseStatus?.ended}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
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
            <div className="relative flex flex-col bg-clip-border rounded-xl border-2 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconProgressHelp />
              </div>
              <div className="p-4">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Cursos de interes: {courseStatus?.acquired}
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
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
