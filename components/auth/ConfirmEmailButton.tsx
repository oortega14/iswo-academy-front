"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Toaster, toast } from "sonner"

import { SendTokenEmailVerification } from "@/lib/requests"

import { MotionDiv } from "../animations/MotionDiv"
import { Button } from "../ui/button"

const ConfirmEmailButton = () => {
  const router = useRouter()
  const params = useSearchParams()
  const confirmToken = params.get("confirm_token")
  const handleClick = async () => {
    const [request, response]: any = await SendTokenEmailVerification(
      confirmToken
    )
    if (request.status === 200) {
      toast.success("Has verificado satisfactoriamente tu correo")
      router.push("/login")
    } else {
      toast.error(response.errors)
    }
  }
  return (
    <>
      <MotionDiv
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 1.15 }}
      >
        <Button variant={"outline"} onClick={handleClick} className="mt-3">
          Verificar mi e-mail
        </Button>
      </MotionDiv>
    </>
  )
}

export default ConfirmEmailButton
