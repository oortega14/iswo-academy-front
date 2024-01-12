import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="3xl:px-0 flex flex-col items-center justify-center gap-6 px-5 pb-8 pt-6 md:flex-row md:px-24 md:py-10">
      <div className="flex flex-col items-center  gap-y-4">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Crea tu propia academia
            <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-[700px] text-pretty text-lg text-muted-foreground">
          <strong className="font-extrabold">Ahorra más del 50% en gastos de capacitación.</strong>
          Planea, ejecuta, controla, evalúa y mejora las capacitaciones específicas para tu organización, en una plataforma fácil de usar.
          <strong className="font-extrabold">Soporte Técnico en Tiempo Real.</strong>
          </p>
        </div>
        <div className="flex">
          <Link
            href={siteConfig.buttons.login}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants()}
          >
            Adquirir Demo
          </Link>
        </div>
      </div>
      <div className="overflow-auto rounded-md">
        <Image src={"/image_hero.webp"} width={500} height={500} alt="banner" className="h-auto w-auto"/>
      </div>
    </section>
  )
}
