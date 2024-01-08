import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="flex flex-col justify-center md:flex-row items-center gap-6 pb-8 pt-6 md:py-10 px-5 md:px-24 3xl:px-0">
      <div className="flex flex-col items-center  gap-y-4">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Crea tu propia academia
            <br className="hidden sm:inline" />
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground text-pretty">
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
      <div className="rounded-md overflow-auto">
        <Image src={"/image_hero.webp"} width={500} height={500} alt="banner" className="h-auto w-auto"/>
      </div>
    </section>
  )
}
