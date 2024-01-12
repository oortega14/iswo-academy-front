import { MotionDiv } from "@/components/animations/MotionDiv";
import InputLogin from "@/components/auth/InputLogin";
import { IswoIconLarge } from "@/icons";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export default function LoginPage() {
  return (
    <section className="min-h-screen w-full max-w-[1440px] p-10 lg:p-16">
      <MotionDiv
        className="flex flex-wrap lg:flex-nowrap"
        variants={variants}
        initial= 'hidden'
        animate='visible'
        transition={{
          delay: 0,
          ease: 'easeInOut',
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
      >
        <div className='
          flex  min-h-[420px] w-full flex-col items-center justify-center rounded-t-md bg-slate-200 px-4 shadow-md
          dark:bg-slate-950 lg:min-h-[550px] lg:w-1/2
          2xl:min-h-[700px]
        '>
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1.6 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <IswoIconLarge className="size-24 dark:invert lg:size-32"/>
          </MotionDiv>
          <InputLogin />
        </div>
        <div className={cn(
          'flex min-h-[400px] w-full flex-col items-center justify-center rounded-b-md bg-slate-950 px-4 text-white',
          'shadow-md lg:min-h-[550px] lg:w-1/2 lg:rounded-tr 2xl:min-h-[700px]',
          'dark:bg-slate-200 dark:text-black')
        }>
          <h2  className="text-center text-4xl font-extrabold">¡Bienvenido a ISWO academy!</h2>
          <p className="mt-8 text-center text-xl font-semibold text-muted-foreground dark:text-muted ">Continúa aprendiendo y compartiendo tus conocimientos con el mundo</p>
        </div>
      </MotionDiv>
    </section>
  )
}
