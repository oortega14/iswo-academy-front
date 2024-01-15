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
  const handleNavigate = (e: any) => {
    const target = e.currentTarget.id
    router.push(`/admin/${params.id}/academies/${params.academyId}/courses/${params.courseId}/${target}`)
  }

  return (
    <>
      <div className="mt-12">
        <div className="mb-12 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 px-4">
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            id='lessons'
            className="cursor-pointer"
            onClick={(e)=>handleNavigate(e)}
          >
            <div className="relative flex flex-col bg-clip-border rounded-xl shadow-md border-2">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconTextRecognition />
              </div>
              <div className="p-4 ">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Lecciones
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
                  Aqui podras modificar las lecciones de tu curso
                </p>
              </div>
            </div>
          </MotionDiv>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id='evaluation'
            onClick={(e)=>handleNavigate(e)}
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
                  Aqui podras configurar la evaluación de tu curso
                </p>
              </div>
            </div>
          </MotionDiv>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.99 }}
            className="cursor-pointer"
            id='certificate'
            onClick={(e)=>handleNavigate(e)}
          >
            <div className="relative flex flex-col bg-clip-border rounded-xl border-2 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconCertificate />
              </div>
              <div className="p-4 ">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Certificado
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
                  Aqui podras configurar los certificados de tu curso
                </p>
              </div>
            </div>
          </MotionDiv>
          <MotionDiv
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 1 }}
            id='help'
            className="cursor-pointer"
            onClick={(e)=>handleNavigate(e)}
          >
            <div className="relative flex flex-col bg-clip-border rounded-xl border-2 shadow-md">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg relative -mt-4 grid h-16 w-16 place-items-center">
                <IconHelp />
              </div>
              <div className="p-4">
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  Ayuda
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600 text-muted-foreground">
                  Aqui encontraras toda la ayuda que necesites
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
