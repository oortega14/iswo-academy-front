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
        <div className="w-full h-2/3 dark:bg-slate-200 bg-blue-dark text-white dark:text-blue-dark rounded-xl p-6 max-w-[1000px]">
          <MotionDiv
            className="w-full flex justify-center"
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
          <h2 className="w-full text-center text-4xl font-extrabold mb-3">
            Confirmación de Correo Electrónico
          </h2>
          <div className="w-full flex justify-center items-center mb-3">
            <p className="max-w-[850px]">
              Te hemos enviado un correo a la dirección ingresada en el anterior
              paso, para confirmar la validez de tu correo electrónico. Despues
              de recibir el correo sigue el link que se te proveyo para
              completar el registro
            </p>
          </div>
          <div className="w-full flex justify-center">
            <hr />
          </div>
          <div className="flex justify-center gap-x-4 mt-4">
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
