import Image from "next/image"
import { IswoIconLarge } from "@/icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MotionButton } from "@/components/animations/MotionButton"
import { MotionDiv } from "@/components/animations/MotionDiv"
import { useSearchParams } from "next/navigation"
import ConfirmEmailButton from "@/components/auth/ConfirmEmailButton"

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
              initial={{ x: 0, scale: 1.7 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              drag
              dragConstraints={{
                top: -100,
                left: -100,
                right: 100,
                bottom: 100,
              }}
            >
              <IswoIconLarge className="size-24 dark:invert lg:size-32" />
            </MotionDiv>
          </div>
          <div
            className={cn(
              "flex min-h-[400px] w-full flex-col items-center justify-center rounded-b-md bg-slate-950 px-4 text-white",
              "shadow-md lg:min-h-[550px] lg:w-1/2 lg:rounded-tr 2xl:min-h-[700px]",
              "dark:bg-slate-200 dark:text-black"
            )}
          >
            <Image
              src={"/email_sent.webp"}
              width={500}
              height={400}
              alt="email_confirmation"
            />
            <h2 className="text-center text-4xl font-extrabold">
              ¡Bienvenido a ISWO academy!
            </h2>
            <p className="mt-8 text-center text-xl font-semibold text-muted-foreground dark:text-muted ">
              Dando click en el siguiente boton confirmaras tu email para poder
              usar nuestra plataforma
            </p>
            <ConfirmEmailButton />
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
