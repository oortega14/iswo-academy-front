import { Suspense } from "react"
import { IswoIconLarge } from "@/icons"
import { IconLockSquareRounded } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/animations/MotionDiv"
import InputResetMain from "@/components/auth/InputResetMain"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function ResetPasswordMainPage() {
  return (
    <section className="min-h-screen w-full max-w-[1440px] p-10 lg:p-16">
      <MotionDiv
        className="flex flex-wrap lg:flex-nowrap"
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
          delay: 0,
          ease: "easeInOut",
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
      >
        <div
          className={cn(
            "flex min-h-[400px] w-full flex-col items-center justify-center rounded-b-md bg-slate-950 px-4 text-white",
            "shadow-md lg:min-h-[550px] lg:w-1/2 lg:rounded-tr 2xl:min-h-[700px]",
            "dark:bg-slate-200 dark:text-black"
          )}
        >
          <MotionDiv
            initial="hidden"
            animate={{ scale: 0.8 }}
            transition={{
              delay: 1,
              duration: 0.5,
            }}
          >
            <IconLockSquareRounded className="size-60" stroke={""} />
          </MotionDiv>
          <h2 className="text-center text-4xl font-extrabold">
            Reasigna tu contraseña
          </h2>
          <p className="mt-8 text-center text-xl font-semibold text-muted-foreground dark:text-muted ">
            Para poder reasignar tu contraseña porfavor escribela y confirmala a
            continuación
          </p>
        </div>
        <div
          className="
          flex  min-h-[420px] w-full flex-col items-center justify-center rounded-t-md bg-slate-200 px-4 shadow-md
          dark:bg-slate-950 lg:min-h-[550px] lg:w-1/2
          2xl:min-h-[700px]
        "
        >
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1.6 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <IswoIconLarge className="size-24 dark:invert lg:size-32" />
          </MotionDiv>
          <Suspense>
            <InputResetMain />
          </Suspense>
        </div>
      </MotionDiv>
    </section>
  )
}
