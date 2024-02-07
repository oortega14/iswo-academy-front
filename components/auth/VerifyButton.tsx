"use client"

import { Button } from "../ui/button"
import { Toaster, toast } from "sonner"
import { useParams, useRouter } from 'next/navigation'
import { FetchEmailVerification } from "@/lib/requests"
import { MotionDiv } from "../animations/MotionDiv"

export const VerifyButton = () => {
  const router = useRouter()
  const params = useParams()
  const handleClick = async () => {
    const [request, response]: any = await FetchEmailVerification(params.userId);

    if (request.status === 200) {
      toast.success('Has verificado satisfactoriamente tu correo')
      router.push('/login')
    } else {
      toast.error(response.errors)
    }
  }
  return (
    <>
      <MotionDiv
        whileHover={{ scale: 0.95}}
        whileTap={{ scale: 1.1}}
      >

        <Button variant={"outline"} onClick={handleClick}>
          Ya lo he verificado!
        </Button>
      </MotionDiv>
    </>
  )
}

export default VerifyButton
