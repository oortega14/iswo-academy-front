"use client"

import { useParams, useRouter } from "next/navigation"
import {
  IconCertificate,
  IconHelp,
  IconSchool,
  IconTextRecognition,
} from "@tabler/icons-react"

import { MotionDiv } from "../animations/MotionDiv"

const CourseContent = () => {
  const params = useParams()
  const router = useRouter()
  const handleNavigate = (e: string) => {
    router.push(
      `/admin/${params.userId}/academies/${params.academyId}/courses/${params.courseId}/${e}`
    )
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 lg:flex-row lg:items-center lg:space-y-0 pt-5">
        <h1 className="ml-3 text-2xl font-semibold">
          Vamos a configurar tu curso, a continuación crea las secciones y evaluación de tu curso.
        </h1>
      </div>
      <div className="mt-12">
        <div className="mb-12 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 px-4">
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            onClick={(e) => handleNavigate('sections')}
          >
            <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md border-2">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconTextRecognition />
              </div>
              <div className="p-4 ">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Secciones (lecciones)
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
                  Aqui podras crear o modificar las secciones de tu curso
                </p>
              </div>
            </div>
          </MotionDiv>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            onClick={(e) => handleNavigate('evaluations')}
          >
            <div className="relative flex flex-col bg-clip-border rounded-xl border-2 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconSchool />
              </div>
              <div className="p-4">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Evaluación
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
                  Aqui podras crear o  modificar la evaluación de tu curso
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </>
  )
}
export default CourseContent
