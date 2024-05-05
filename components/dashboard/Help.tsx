"use client"

import data from "@/animations/PhoneAnimation.json"
import { useGetAcademy } from "@/hooks/useGetAcademy"
import { IconWritingSign } from "@tabler/icons-react"
import { IconMail, IconPhone } from "@tabler/icons-react"
import Lottier from "lottie-react"
import { useParams } from "next/navigation"
import { useState } from "react"

export const Help = () => {
  const [loading, setLoading] = useState(true)
  const { userId, academyId } = useParams<{
    userId: string
    academyId: string
  }>()
  const academy = useGetAcademy({
    academyId: academyId,
    setLoadingCallback: setLoading,
  })

  return (
    <>
      <div className="mt-5 flex flex-col items-start justify-between border-b pb-6 lg:flex-row lg:items-center lg:space-y-0 ">
        <h1 className="ml-3 whitespace-nowrap text-2xl font-semibold ">
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
          <IconWritingSign className="size-8" />
          <h2 className="text-3xl">{academy?.academy_configuration?.contact_name}</h2>
        </div>
        <div className="m-5 flex items-center justify-start gap-x-3">
          <IconMail className="size-8" />
          <h2 className="text-3xl">{academy?.academy_configuration?.contact_email}</h2>
        </div>
        <div className="m-5 flex items-center justify-start gap-x-3 ">
          <IconPhone className="size-8" />
          <h2 className="text-3xl">{academy?.academy_configuration?.contact_phone}</h2>
        </div>
      </div>
    </>
  )
}
export default Help
