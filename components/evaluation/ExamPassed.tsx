import React from "react"
import Link from "next/link"
import data from "@/animations/CongratulationsAnimation.json"
import { IconMoodHappy } from "@tabler/icons-react"
import Lottier from "lottie-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { useParams } from "next/navigation"

const ExamPassed = () => {
  const { userId } = useParams<{ userId: string}>()
  return (
    <div className="min-h-screen w-full dark-mode">
      <div className="block">
        <div className="w-full flex justify-center rounded-lg bg-cover">
          <div className="w-1/3">
            <Lottier animationData={data} className="relative -top-40" />
          </div>
        </div>
        <div className="relative -top-40 w-screen flex justify-center text-xl items-center font-semibold my-10">
          <div className="w-full flex justify-center items-center">
            <h1 className=" text-center text-4xl mr-3">
              Tu ya has aprobado este curso{" "}
            </h1>
            <IconMoodHappy className="size-8" />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Link href={`/student/${userId}/dashboard/main`} className={cn(
            "relative -top-40",
            buttonVariants({ variant: "default" })
          )}>
            Ir a cursos para empezar una nueva aventura
          </Link>
        </div>
      </div>
    </div>
  )
}

export { ExamPassed }
