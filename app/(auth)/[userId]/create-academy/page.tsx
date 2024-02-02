import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { IswoIconLarge } from "@/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MotionDiv } from "@/components/animations/MotionDiv"
import ConfirmEmailButton from "@/components/auth/ConfirmEmailButton"
import CreateAcademyForm from "@/components/auth/CreateAcademyForm"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function EmailConfirmationPage() {
  return (
    <section className="min-h-screen w-full max-w-[1440px] p-10 lg:p-16">
      <div className="bg-light-dotted dark:bg-dark-dotted"></div>
      <MotionDiv
        className="flex h-full w-full items-center justify-center"
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
            className="
          flex  min-h-[420px] w-full flex-col items-center justify-center rounded-t-md bg-slate-200 px-4 shadow-md
          dark:bg-slate-950 lg:min-h-[550px] lg:w-1/2
          2xl:min-h-[700px]
        "
          >
            <MotionDiv
              initial={{ x: 0, scale: 1.4 }}
              animate={{ rotate: 360, y: "-60px" }}
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <IswoIconLarge className="size-24 dark:invert lg:size-32" />
            </MotionDiv>
            <p className="mt-8 text-center text-lg font-semibold">
              Vamos a comenzar a crear tu academia para que compartas tus
              conocimientos con el mundo
            </p>
          </div>
          <div
            className={cn(
              "flex min-h-[400px] w-full flex-col items-center justify-center rounded-b-md bg-slate-950 px-4 text-white",
              "shadow-md lg:min-h-[550px] lg:w-1/2 lg:rounded-tr 2xl:min-h-[700px]",
              "dark:bg-slate-200 dark:text-black"
            )}
          >
            <h2 className="text-center text-4xl font-extrabold">
              ¡Felicitaciones!
            </h2>
            <p className="mt-8 text-center text-xl font-semibold text-muted-foreground dark:text-muted ">
              ahora puedes escoger una categoria para tu academia
            </p>
            <CreateAcademyForm />
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
