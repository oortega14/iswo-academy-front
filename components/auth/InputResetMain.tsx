"use client"

import { FormEvent, useState } from "react"
import { IconLock, IconLockSquareRounded, IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const InputResetMain = () => {
  const [userData, setUserData] = useState({
    password: '',
    password_confirmation: '',
  })

  let paramValue: string | null = ''
  if (typeof window !== 'undefined') {
    const queryParams = new URLSearchParams(window.location.search);
    paramValue = queryParams.get('reset_password_token');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in the environment");
    }
    let data = { user: { ...userData } }
    try {
      const request = await fetch(`${baseUrl}/users/${paramValue}/confirm_reset_password?password=${userData.password}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const response = await request.json()
      console.log(response)
      if (request.status === 200) {
        toast.success('exitoso')
        console.log(response)
      } else {
        toast.error(response.errors)
      }
    } catch (e) {
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
        <Button className="mt-3">Actualizar mi contraseña</Button>
      </form>
      <Toaster theme="system" position="top-right" richColors  />
    </>
  )
}

export default InputResetMain
