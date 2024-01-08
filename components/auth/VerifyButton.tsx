"use client"

import { Button } from "../ui/button"
import { Toaster, toast } from "sonner"
import { useRouter } from 'next/navigation'
import { FetchEmailVerification } from "@/lib/requests"

export const VerifyButton = () => {
  const router = useRouter()
  const handleClick = async () => {
    const [request, response]: any = await FetchEmailVerification();

    if (request.status === 200) {
      toast.success('Has verificado satisfactoriamente tu correo')
      router.push('/login')
    } else {
      toast.error(response.errors)
    }
  }

  return (
    <>
      <Button variant={"outline"} onClick={handleClick}>
        Ya lo he verificado!
      </Button>
      <Toaster theme="system" position="top-right" richColors  />
    </>
  )
}

export default VerifyButton
