"use client"

import { FormEvent, useState } from "react"
import { IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"

import { MotionDiv } from "../animations/MotionDiv"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const InputReset = () => {
  const [emailRecovery, setEmailRecovery] = useState({
    email: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailRecovery({ ...emailRecovery, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in the environment")
    }
    e.preventDefault()
    try {
      const request = await fetch(`${baseUrl}/users/reset_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailRecovery),
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success("Revisa tu correo para recuperar tu contraseña")
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <form
        className="flex flex-col p-0 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconMail className="size-5 mr-2" />
          <span>Email</span>
        </div>
        <label htmlFor="email" className="text-muted-foreground mt-2 text-sm">
          Ingresa el correo electrónico que registraste en nuestra plataforma
        </label>
        <Input
          type="email"
          name="email"
          placeholder="ejemplo@iswoacademy.com"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <MotionDiv
          whileHover={{ scale: 0.95 }}
          whileTap={{ scale: 1.05}}
        >
          <Button className="mt-3 w-full">Recuperar mi contraseña</Button>
        </MotionDiv>
      </form>
      <Toaster theme="system" position="top-right" richColors duration={4000} />
    </>
  )
}

export default InputReset
