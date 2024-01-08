import { IswoIconLarge } from "@/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MotionDiv } from "@/components/animations/MotionDiv"
import Image from "next/image"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function EmailConfirmationPage() {
  return (
    <section className="min-h-screen w-full max-w-[1440px] p-10 lg:p-16">
      <div className="bg-light-dotted dark:bg-dark-dotted"></div>
      <MotionDiv
        className="flex items-center justify-center w-full h-full"
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
          w-full  min-h-[420px] rounded-t-md flex flex-col justify-center items-center px-4 bg-slate-200 shadow-md
          lg:w-1/2 lg:min-h-[550px] 2xl:min-h-[700px]
          dark:bg-slate-950
        "
          >
            <MotionDiv
              initial={{ x: 0, scale: 1.7}}
              animate={{ rotate: 360}}
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
              <IswoIconLarge className="size-24 lg:size-32 dark:invert" />
            </MotionDiv>
          </div>
          <div
            className={cn(
              "w-full min-h-[400px] rounded-b-md flex flex-col justify-center items-center px-4 bg-slate-950 text-white",
              "lg:w-1/2 lg:rounded-tr lg:min-h-[550px] shadow-md 2xl:min-h-[700px]",
              "dark:bg-slate-200 dark:text-black"
            )}
          >
            <Image
              src={"/email_sent.webp"}
              width={500}
              height={400}
              alt="email_confirmation"
            />
            <h2 className="text-4xl font-extrabold text-center">
              ¡Bienvenido a ISWO academy!
            </h2>
            <p className="mt-8 text-xl text-center text-muted-foreground font-semibold dark:text-muted ">
              Dando click en el siguiente boton confirmaras tu email para poder
              usar nuestra plataforma
            </p>

            <Button variant={"secondary"} className="mt-5">
              Verificar Correo Electrónico
            </Button>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
