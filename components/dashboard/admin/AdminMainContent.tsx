"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconProgressBolt,
  IconProgressCheck,
  IconProgressHelp,
  IconSettings,
} from "@tabler/icons-react"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Separator } from "@/components/ui/separator"
import { MotionDiv } from "@/components/animations/MotionDiv"

export const AdminMainContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const {userId, academyId} = useParams<{ userId: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })

  return (
    <div className="mt-4">
      <div className="flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 whitespace-nowrap text-2xl font-semibold ">
          Hola {currentUser?.first_name} aquí tienes un resumen de tu academia
        </h1>
      </div>
      <div className="mb-12 mt-10 grid grid-cols-1 gap-x-6 gap-y-10 px-4 md:grid-cols-2">
        <Link href={`/admin/${userId}/academies/${academyId}/courses/content`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            id="lessons"
            className="cursor-pointer"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 bg-clip-border text-white shadow-lg shadow-teal-500/40">
                <IconProgressBolt />
              </div>
              <div className="p-4 ">
                <h4 className="text-blue-gray-900 block text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Cursos
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aquí podrás ver los cursos que has creado
                </p>
              </div>
            </div>
          </MotionDiv>
        </Link>
        <Link href={`/admin/${userId}/academies/${academyId}/dashboard/learning-routes`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id="evaluation"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 bg-clip-border text-white shadow-lg shadow-orange-500/40">
                <IconProgressCheck />
              </div>
              <div className="p-4">
                <h4 className="text-blue-gray-900 block text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Rutas de aprendizaje
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aquí podrás ver las rutas creadas
                </p>
              </div>
            </div>
          </MotionDiv>
        </Link>
        <Link href={`/admin/${userId}/academies/${academyId}/dashboard/messages`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id="evaluation"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-violet-600 to-violet-400 bg-clip-border text-white shadow-lg shadow-violet-500/40">
                <IconProgressHelp />
              </div>
              <div className="p-4">
                <h4 className="text-blue-gray-900 block text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Mensajes y comentarios
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aquí podrás ver los comentarios y mensajes
                </p>
              </div>
            </div>
          </MotionDiv>
        </Link>
        <Link href={`/admin/${userId}/academies/${academyId}/dashboard/configure`}>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id="evaluation"
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-slate-600 to-slate-400 bg-clip-border text-white shadow-lg shadow-slate-500/40">
                <IconSettings />
              </div>
              <div className="p-4">
                <h4 className="text-blue-gray-900 block text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Configurar tu academia
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aquí podrás configurar tu academia
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

export default AdminMainContent
