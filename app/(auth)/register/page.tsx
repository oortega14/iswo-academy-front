import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/animations/MotionDiv"
import { IconFilePencil } from "@tabler/icons-react"
import RegisterDiv from "@/components/auth/RegisterDiv"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function RegisterPage() {
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

        <RegisterDiv />
        <div
          className={cn(
            "flex min-h-[400px] w-full flex-col items-center justify-center rounded-b-md bg-slate-950 px-4 text-white",
            "shadow-md lg:min-h-[550px] lg:w-1/2 lg:rounded-tr 2xl:min-h-[700px]",
            "dark:bg-slate-200 dark:text-black"
          )}
        >
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <IconFilePencil className="size-24 lg:size-32 " stroke={''} />
          </MotionDiv>
          <h2 className="text-center text-4xl font-extrabold">
            ¡Bienvenido a ISWO academy!
          </h2>
          <p className="mt-8 text-center text-xl font-semibold text-muted-foreground dark:text-muted ">
            Te brindaremos la mejor experiencia para que aprendas y enseñes en
            internet
          </p>
        </div>
      </MotionDiv>
    </section>
  )
}
