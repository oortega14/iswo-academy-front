"use client"

import data from "@/animations/404Animation.json"
import Lottier from "lottie-react"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottier animationData={data} className="absolute top-36
        dark:invert
        sm:-top-2
        lg:-top-20
        xl:-top-48

      "/>
      <span className="absolute
        top-40 px-10 text-center text-lg
        sm:text-xl
        lg:top-52 lg:text-3xl
        xl:top-32 xl:text-4xl
      ">
        Lo sentimos mucho no encontramos la pagina que estabas buscando
      </span>
    </div>
  )
}

export default NotFound
