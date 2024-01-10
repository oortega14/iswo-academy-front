"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { IconLock, IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useUIStore } from "@/store/ui/ui-store"

export const InputLogin = () => {
  const router = useRouter()
  const baseUrl = useUIStore((state) => state.baseUrl)
  const updateCurrentUser = useUIStore((state) => state.updateCurrentUser)
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
    let data = { user: { ...userData } }
    try {
      const request = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success('Ingreso Exitoso')
        updateCurrentUser(response)
        if (response.role === 'Estudiante') {
          router.push(`/student/${response.id}/dashboard/main`)
        } else if (response.role === 'Profesor') {
          router.push(`/teacher/${response.id}/dashboard/main`)
        } else if (response.role === 'Administrador') {
          router.push(`/admin/${response.id}/academies/${response.academy.id}/dashboard/main`)
        } else if (response.role === 'Súper Administrador') {
          router.push(`/super-admin/${response.id}/dashboard/main`)
        }
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
        <Button className="mt-3">Iniciar Sesión</Button>
      </form>
      <Toaster theme="system" position="top-right" richColors  />
    </>
  )
}

export default InputLogin
