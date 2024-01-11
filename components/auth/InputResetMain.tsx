"use client"

import { FormEvent, useState } from "react"
import { IconLock, IconLockSquareRounded, IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"
import { MotionDiv } from "../animations/MotionDiv"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { SendTokenResetEmail } from "@/lib/requests"

export const InputResetMain = () => {
  const [userData, setUserData] = useState({
    password: "",
    password_confirmation: "",
  })

  const queryParams = useSearchParams()
  const token = queryParams.get('reset_password_token')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    let data = { user: { ...userData } }
    const [request, response]: any = await SendTokenResetEmail({
      token: token,
      password: userData.password,
      data: data
    })
    if (request.status === 200) {
      toast.success("Has cambiado tu contraseña satisfactoriamente")
      router.push("/login")
    } else {
      toast.error(response.errors)
    }
  }

  return (
    <>
      <form
        className="flex flex-col p-0 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconLock className="size-5 mr-2" />
          <label htmlFor="password">Nueva Contraseña</label>
        </div>
        <Input
          type="password"
          placeholder="******"
          name="password"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconLockSquareRounded className="size-5 mr-2" />
          <label htmlFor="password">Confirmar Contraseña</label>
        </div>
        <Input
          type="password"
          name="password_confirmation"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <MotionDiv
          whileHover={{ scale: 0.98}}
          whileTap={{ scale: 1.08}}
        >
          <Button className="mt-3 w-full">Actualizar mi contraseña</Button>
        </MotionDiv>
      </form>
      <Toaster theme="system" position="top-right" richColors />
    </>
  )
}

export default InputResetMain
