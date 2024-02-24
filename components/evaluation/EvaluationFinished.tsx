import Link from "next/link"
import { useParams } from "next/navigation"
import data from "@/animations/CongratulationsAnimation.json"
import dataSad from "@/animations/sadAnimation.json"
import { IconMoodHappyFilled } from "@tabler/icons-react"
import Lottier from "lottie-react"
import { cn } from "@/lib/utils"
import { MotionDiv } from "../animations/MotionDiv"
import { buttonVariants } from "../ui/button"

const EvaluationFinished = ({ approved }: any) => {
  const { userId} = useParams<{ userId: string }>()
  return (
    <div className="dark-mode min-h-screen w-full">
      <div className="flex">
        <div className="flex w-screen justify-center text-xl font-semibold">
          <span className="text-2xl">
            {approved ? (
              <>
                <div className="relative -top-14 flex w-full justify-center ">
                  <div className="flex w-1/2 justify-center">
                    <Lottier animationData={data} />
                  </div>
                </div>
                <div className="relative -top-14 w-full">
                  <h1 className="mb-6 w-full text-center text-4xl">
                    ¡Felicitaciones Aprobaste!
                  </h1>
                  <Link
                    href={`/student/${userId}/dashboard/main`}
                    className="flex w-full justify-center"
                  >
                    Ir a cursos para empezar una nueva aventura
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="relative -top-10 flex w-full justify-center ">
                  <div className="flex w-1/2 justify-center">
                    <Lottier animationData={dataSad} />
                  </div>
                </div>
                <div className="relative -top-14 flex w-full items-center justify-center">
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className="font-bold">
                      Sentimos mucho decirte esto pero no aprobaste
                    </h2>
                    <div className='flex items-center justify-center'>
                      <h3 className="font-bold">
                        Pero recuerda que tienes muchas oportunidades más
                      </h3>
                      <IconMoodHappyFilled className="ml-4 size-8" />
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-center">
                  <MotionDiv
                    whileTap={{ scale: 1.02 }}
                    whileHover={{ scale: 0.98 }}
                  >
                    <Link
                      href={`/student/${userId}/dashboard/main`}
                      className={cn(buttonVariants({ variant: "default" }))}
                    >
                      Regresar a clases para reforzar
                    </Link>
                  </MotionDiv>
                </div>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

export { EvaluationFinished }
