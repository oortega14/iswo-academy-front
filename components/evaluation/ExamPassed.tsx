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
    <div className="dark-mode min-h-screen w-full">
      <div className="block">
        <div className="flex w-full justify-center rounded-lg bg-cover">
          <div className="w-1/3">
            <Lottier animationData={data} className="relative -top-40" />
          </div>
        </div>
        <div className="relative -top-40 my-10 flex w-screen items-center justify-center text-xl font-semibold">
          <div className="flex w-full items-center justify-center">
            <h1 className=" mr-3 text-center text-4xl">
              Tu ya has aprobado este curso{" "}
            </h1>
            <IconMoodHappy className="size-8" />
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
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
