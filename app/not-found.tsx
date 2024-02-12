"use client"

import data from "@/animations/404Animation.json"
import Lottier from "lottie-react"

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Lottier animationData={data} className="absolute dark:invert
        top-36
        sm:-top-2
        lg:-top-20
        xl:-top-48

      "/>
      <span className="absolute
        text-lg px-10 text-center top-40
        sm:text-xl
        lg:text-3xl lg:top-52
        xl:top-32 xl:text-4xl
      ">
        Lo sentimos mucho no encontramos la pagina que estabas buscando
      </span>
    </div>
  )
}

export default NotFound
