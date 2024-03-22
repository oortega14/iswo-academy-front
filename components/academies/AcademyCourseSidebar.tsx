"use client"

import Link from "next/link"
import {
  IconCertificate,
  IconDeviceTv,
  IconHeart,
  IconHeartBolt,
} from "@tabler/icons-react"

import { Course } from "@/types/sidebar"
import { cn } from "@/lib/utils"

import { MotionDiv } from "../animations/MotionDiv"
import { Button, buttonVariants } from "../ui/button"
import { useParams } from "next/navigation"

const AcademyCourseSidebar = ({ course }: { course: Course }) => {
  const {academyId, courseId} = useParams<{academyId: string, courseId: string}>()
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
        <div className="mt-3 flex w-full items-center gap-x-3">
          <MotionDiv
            className=" w-4/5"
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 1.05 }}
          >
            <Link href={`/order?academyId=${academyId}&courseId=${courseId}`} className={cn(
              buttonVariants({ variant: "default" }),
              "border-[1px] px-2 w-full"
            )}>
              Comprar ahora
            </Link>
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
