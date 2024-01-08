import { MotionDiv } from "@/components/animations/MotionDiv";
import InputReset from "@/components/auth/InputReset";
import InputResetMain from "@/components/auth/InputResetMain";
import { IswoIconLarge } from "@/icons";
import { cn } from "@/lib/utils";
import { IconLockSquareRounded } from "@tabler/icons-react";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export default function ResetPasswordMainPage() {
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
        <div className={cn(
          'w-full min-h-[400px] rounded-b-md flex flex-col justify-center items-center px-4 bg-slate-950 text-white',
          'lg:w-1/2 lg:rounded-tr lg:min-h-[550px] shadow-md 2xl:min-h-[700px]',
          'dark:bg-slate-200 dark:text-black')
        }>
          <MotionDiv
            initial='hidden'
            animate={{ scale: 0.8 }}
            transition={{
              delay: 1,
              duration: 0.5
            }}
          >
            <IconLockSquareRounded className="size-60" stroke={''}/>
          </MotionDiv>
          <h2 className="text-4xl font-extrabold text-center">Reasigna tu contraseña</h2>
          <p className="mt-8 text-xl text-center text-muted-foreground font-semibold dark:text-muted ">Para poder reasignar tu contraseña porfavor escribela y confirmala a continuación</p>
        </div>
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
          <InputResetMain />
        </div>
      </MotionDiv>
    </section>
  )
}
