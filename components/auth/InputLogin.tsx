"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { IconLock, IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

export const InputLogin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

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
      const request = await fetch(baseUrl, {
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
          <IconMail className="size-5 mr-2" />
          <label htmlFor="email">Email</label>
        </div>
        <Input
          type="email"
          placeholder="ejemplo@iswoacademy.com"
          name="email"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconLock className="size-5 mr-2" />
          <label htmlFor="password">Contraseña</label>
        </div>
        <Input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <Link
          href={"/reset-password"}
          className="mt-2 w-full items-start hover:underline"
        >
          Olvidé mi contraseña
        </Link>
        <Link
          href={"/register"}
          className="mt-2 w-full items-start hover:underline"
        >
          ¿Aún no tienes una cuenta? Registrate ahora!
        </Link>
        <Button className="mt-3">Recuperar mi contraseña</Button>
      </form>
      <Toaster theme="system" position="top-right" richColors  />
    </>
  )
}

export default InputLogin
