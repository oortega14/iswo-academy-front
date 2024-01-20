"use client"

import {
  IconCertificate,
  IconDeviceTv,
  IconHeart,
  IconHeartBolt,
} from "@tabler/icons-react"

import { Course } from "@/types/sidebar"
import { cn } from "@/lib/utils"

import { MotionDiv } from "../animations/MotionDiv"
import { Button } from "../ui/button"

const AcademyCourseSidebar = ({ course }: { course: Course }) => {
  function formatCurrency(value: number): string {
    const formattedValue = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)

    return formattedValue
  }

  return (
    <aside
      className={cn(
        "dark:bg-blue-dark z-10 flex min-h-screen max-h-screen shrink-0 flex-col overflow-hidden border-l bg-white  shadow-lg transition-all lg:static lg:z-auto lg:shadow-none overflow-y-hidden"
      )}
    >
      <div className="flex flex-col items-center w-full justify-center pl-4 ">
        <video
          className="rounded-xl overflow-hidden"
          controls
          poster={course.promotional_image}
        >
          <source src={course.promotional_video} type="video/mp4" />
        </video>
        <span className="text-4xl mt-3 font-bold">
          {formatCurrency(JSON.parse(course.price))} COP
        </span>
        <div className="w-full flex items-center gap-x-3 mt-3">
          <MotionDiv
            className=" w-4/5"
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1.05 }}
          >
            <Button className="w-full"> Comprar ahora</Button>
          </MotionDiv>
          <MotionDiv
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1.05 }}
            className=" w-1/5"
          >
            <Button className=" w-full">
              <IconHeart />
            </Button>
          </MotionDiv>
        </div>
        <span className="w-full text-left text-2xl font-bold my-3">
          Este curso incluye:
        </span>
        <div className="flex flex-col items-start justify-center w-full text-xl gap-3">
          <div className="flex gap-x-3 w-full justify-start">
            <IconDeviceTv />
            <span> Clases exclusivas grabadas</span>
          </div>
          <div className="flex gap-x-3 w-full justify-start">
            <IconHeartBolt />
            <span> Acceso de por vida</span>
          </div>
          <div className="flex gap-x-3 w-full justify-start">
            <IconCertificate />
            <span> Certificado de finalización</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AcademyCourseSidebar
