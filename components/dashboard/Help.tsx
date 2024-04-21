"use client"

import data from "@/animations/PhoneAnimation.json"
import { IconMail, IconPhone } from "@tabler/icons-react"
import Lottier from "lottie-react"

export const Help = () => {
  return (
    <>
      <div className="mt-5 flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0 ">
        <h1 className="ml-3 whitespace-nowrap text-4xl font-semibold ">
          Nuestros canales de contacto son:
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Lottier
          animationData={data}
          className="
        size-96 "
        />
        <div className="ml-5 flex items-center justify-start gap-x-3">
          <IconMail className="size-8" />
          <h2 className="text-3xl">cso@iswo.com.co</h2>
        </div>
        <div className="m-5 flex items-center justify-start gap-x-3 ">
          <IconPhone className="size-8" />
          <h2 className="text-3xl">+57 312-888-28-28</h2>
        </div>
      </div>
    </>
  )
}
export default Help
