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
          w-full  min-h-[420px] rounded-t-md flex flex-col justify-center items-center px-4 bg-slate-200 shadow-md
          lg:w-1/2 lg:min-h-[550px] 2xl:min-h-[700px]
          dark:bg-slate-950
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
            <IswoIconLarge className="size-24 lg:size-32 dark:invert"/>
          </MotionDiv>
          <InputLogin />
        </div>
        <div className={cn(
          'w-full min-h-[400px] rounded-b-md flex flex-col justify-center items-center px-4 bg-slate-950 text-white',
          'lg:w-1/2 lg:rounded-tr lg:min-h-[550px] shadow-md 2xl:min-h-[700px]',
          'dark:bg-slate-200 dark:text-black')
        }>
          <h2  className="text-4xl font-extrabold text-center">¡Bienvenido a ISWO academy!</h2>
          <p className="mt-8 text-xl text-center text-muted-foreground font-semibold dark:text-muted ">Continúa aprendiendo y compartiendo tus conocimientos con el mundo</p>
        </div>
      </MotionDiv>
    </section>
  )
}