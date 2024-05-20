"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconCertificate,
  IconDeviceTv,
  IconHeart,
  IconHeartBolt,
  IconHeartbeat,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { Course } from "@/types/sidebar"
import { CreateInterestStudentRequest } from "@/lib/requests"
import { cn, formatCurrency } from "@/lib/utils"
import useGetStudent from "@/hooks/useGetStudent"

import { MotionDiv } from "../animations/MotionDiv"
import { Button, buttonVariants } from "../ui/button"

const AcademyCourseSidebar = ({ course }: { course: Course }) => {

  const baseUrl = useUIStore((state) => state.baseUrl);
  const router = useRouter()
  const { academyId, courseId } = useParams<{
    academyId: string
    courseId: string
  }>()
  const [loading, setLoading] = useState(true)
  const [changeFlag, setChangeFlag] = useState(false)
  const [courseState, setCourseState] = useState({
    in_progress: false,
    of_interest: false,
  })

  const checkSections = async () => {
    const request = await fetch(`${baseUrl}/course_sections?course_id=${courseId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const response = await request.json()
    router.push(`/academies/${academyId}/courses/${courseId}/video-player/sections/${response[0].id}/lessons/${response[0].lessons[0].id}`)
  }

  const handleCreateInterestStudent = async () => {
    const [request, response] = await CreateInterestStudentRequest(courseId)
    if (request.status === 200) {
      toast.success("Se ha agregado a tus cursos de interes")
      setChangeFlag(true)
    } else {
      toast.error("No se pudo agregar a favoritos")
    }
  }

  const student = useGetStudent({
    setLoadingCallback: setLoading,
    flag: changeFlag,
    courseId: courseId,
  })

  useEffect(() => {
    if (!!student?.length && student?.length > 0) {
      const isInProgress = student.some(
        (item) => item.course_status === "in_progress"
      )
      const isOfInterest = student.some(
        (item) => item.course_status === "of_interest"
      )
      setCourseState({
        in_progress: isInProgress,
        of_interest: isOfInterest,
      })
    }
  }, [student])

  return (
    <aside
      className={cn(
        "dark:bg-blue-dark z-10 flex max-h-screen min-h-screen shrink-0 flex-col overflow-hidden border-l bg-white  shadow-lg transition-all lg:static lg:z-auto lg:shadow-none"
      )}
    >
      <div className="flex w-full flex-col items-center justify-center pl-4 ">
        <video
          className="overflow-hidden rounded-xl"
          controls
          poster={course.promotional_image}
        >
          <source src={course.promotional_video} type="video/mp4" />
        </video>
        <span className="mt-3 text-4xl font-bold">
          {formatCurrency(JSON.parse(course.price))} COP
        </span>
        {courseState.in_progress === true ? (
          <div className="mt-3 flex w-full items-center gap-x-3">
            <MotionDiv
              className=" w-4/5"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.05 }}
            >
              <Button
                onClick={()=>checkSections()}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full border-[1px] px-2"
                )}
              >
                Ir al curso
              </Button>
            </MotionDiv>
            <MotionDiv
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.05 }}
              className=" w-1/5"
            >
              <Button
                onClick={() => handleCreateInterestStudent()}
                className=" w-full"
              >
                <IconHeartBolt />
              </Button>
            </MotionDiv>
          </div>
        ) : (
          <div className="mt-3 flex w-full items-center gap-x-3">
            <MotionDiv
              className=" w-4/5"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.05 }}
            >
              <Link
                href={`/order?academyId=${academyId}&courseId=${courseId}`}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "w-full border-[1px] px-2"
                )}
              >
                Comprar ahora
              </Link>
            </MotionDiv>
            <MotionDiv
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 1.05 }}
              className=" w-1/5"
            >
              <Button
                onClick={() => handleCreateInterestStudent()}
                className=" w-full"
              >
                <IconHeartBolt />
              </Button>
            </MotionDiv>
          </div>
        )}

        <span className="my-3 w-full text-left text-2xl font-bold">
          Este curso incluye:
        </span>
        <div className="flex w-full flex-col items-start justify-center gap-3 text-xl">
          <div className="flex w-full justify-start gap-x-3">
            <IconDeviceTv />
            <span> Clases exclusivas grabadas</span>
          </div>
          <div className="flex w-full justify-start gap-x-3">
            <IconHeartBolt />
            <span> Acceso de por vida</span>
          </div>
          <div className="flex w-full justify-start gap-x-3">
            <IconCertificate />
            <span> Certificado de finalización</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AcademyCourseSidebar
