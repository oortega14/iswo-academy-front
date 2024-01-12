import Image from "next/image"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { MotionDiv } from "@/components/animations/MotionDiv"
import VerifyButton from "@/components/auth/VerifyButton"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function EmailStepPage() {
  return (
    <section className="min-h-screen w-full max-w-[1440px] p-10 lg:p-16">
      <div className="bg-light-dotted dark:bg-dark-dotted"></div>
      <MotionDiv
        className="flex h-full w-full items-center justify-center "
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
        <div className="min-h-2/3 bg-blue-dark dark:text-blue-dark w-full max-w-[1000px] rounded-xl p-6 text-white dark:bg-slate-200">
          <MotionDiv
            className="flex w-full justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              ease: "easeIn",
              duration: 0.6,
            }}
          >
            <Image
              src={"/email_sent.webp"}
              width={500}
              height={400}
              alt="email_confirmation"
            />
          </MotionDiv>
          <h2 className="mb-3 w-full text-center text-4xl font-extrabold">
            Confirmación de Correo Electrónico
          </h2>
          <div className="mb-3 flex w-full items-center justify-center">
            <p className="max-w-[850px]">
              Te hemos enviado un correo a la dirección ingresada en el anterior
              paso, para confirmar la validez de tu correo electrónico. Despues
              de recibir el correo sigue el link que se te envió para
              completar el registro
            </p>
          </div>
          <div className="flex w-full justify-center">
            <hr />
          </div>
          <div className="mt-4 flex justify-center gap-x-4">
            <Button variant={"secondary"} className="font-semibold">
              <Link
                rel="noreferrer"
                href={"/"}
              >
                Confirmar más tarde
              </Link>
            </Button>
            <VerifyButton />
          </div>
        </div>
      </MotionDiv>
    </section>
  )
}
