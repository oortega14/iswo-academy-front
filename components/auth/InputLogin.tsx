"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { IconLock, IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"
import { useRouter } from 'next/navigation'
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useUIStore } from "@/store/ui/ui-store"
import { USER_TYPES } from "@/types/users"

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
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success('Ingreso Exitoso')
        updateCurrentUser(response)
        if (response.role === USER_TYPES.STUDENT) {
          router.push(`/student/${response.id}/dashboard/main`)
        } else if (response.role === USER_TYPES.TEACHER) {
          router.push(`/teacher/${response.id}/dashboard/main`)
        } else if (response.role === USER_TYPES.ADMIN) {
          if (response.academy.id === null) {
            router.push(`/${response.id}/create-academy`)
          } else {
            router.push(`/admin/${response.id}/academies/${response.academy.id}/dashboard/main`)
          }
        } else if (response.role === USER_TYPES.SUPER_ADMIN) {
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
        className="flex w-full flex-col p-0"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconMail className="mr-2 size-5" />
          <label htmlFor="email">Email</label>
        </div>
        <Input
          type="email"
          placeholder="ejemplo@iswoacademy.com"
          name="email"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconLock className="mr-2 size-5" />
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
