import React from 'react'

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import data from "@/animations/PaymentSuccessAnimation.json"
import Lottier from "lottie-react"

import { ConfirmPayment } from "@/lib/requests"
import { toast } from "sonner"

const SuccessPageContent = () => {
  const searchParams = useSearchParams()
  const invoiceId = searchParams.get("invoice") || ""
  const router = useRouter();
  useEffect(() => {
    const handleConfirmate = async () => {
      const [request, response] = await ConfirmPayment(invoiceId)
      if (request.status === 200) {
        toast.success('Curso comprado con exito')
        router.push(`/student/${response.user_id}/dashboard/in_progress`)
      }
    }
    handleConfirmate();
  }, [])
  return (
    <div className="h-min-screen flex items-center justify-center">
      <span className="mr-20 text-4xl font-extrabold">Transacción exitosa</span>
      <Lottier animationData={data} className="relative top-10 size-96" />
    </div>
  )
}

export default SuccessPageContent
