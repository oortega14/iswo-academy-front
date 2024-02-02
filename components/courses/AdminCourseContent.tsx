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
      <div className="flex flex-col items-start justify-between space-y-4 border-b px-3 pb-6 pt-5 lg:flex-row lg:items-center lg:space-y-0">
        <h1 className="ml-3 text-2xl font-semibold">
          Vamos a configurar tu curso, a continuación crea las secciones y evaluación de tu curso.
        </h1>
      </div>
      <div className="mt-12">
        <div className="mb-12 grid grid-cols-1 gap-x-6 gap-y-10 px-4 md:grid-cols-2">
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            onClick={(e) => handleNavigate('sections')}
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
                <IconTextRecognition />
              </div>
              <div className="p-4 ">
                <h4 className="text-blue-gray-900 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Secciones (lecciones)
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block font-sans text-base font-normal leading-relaxed text-muted-foreground antialiased">
                  Aqui podras crear o modificar las secciones de tu curso
                </p>
              </div>
            </div>
          </MotionDiv>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            onClick={(e) => handleNavigate('evaluation')}
          >
            <div className="relative flex flex-col rounded-xl border-2 bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-4 grid h-16 w-16 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40">
                <IconSchool />
              </div>
              <div className="p-4">
                <h4 className="text-blue-gray-900 block font-sans text-2xl font-semibold leading-snug tracking-normal antialiased">
                  Evaluación
                </h4>
              </div>
              <div className="border-blue-gray-50 border-t p-4">
                <p className="text-blue-gray-600 block font-sans text-base font-normal leading-relaxed text-muted-foreground antialiased">
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
