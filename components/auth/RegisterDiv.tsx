"use client"

import React, { FormEvent, useState } from "react"
import {
  IconLockOpen,
  IconMail,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react"
import { Toaster, toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MotionDiv } from "../animations/MotionDiv"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { IconPencilPlus } from "@tabler/icons-react"
import { useUIStore } from "@/store/ui/ui-store"
import { useRouter } from "next/navigation"

export type RegisterParams = {
  name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
  username: string
  role: number | null
}

export default function RegisterDiv() {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const router = useRouter()
  const [userData, setUserData] = useState<RegisterParams>({
    name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
    role: null,
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  const handleSelect = (e: string) => {
    let value = null
    switch (e) {
      case "student":
        value = 0
        break
      case "teacher":
        value = 1
        break
      case "admin":
        value = 2
        break
    }
    setUserData({ ...userData, role: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    let data = { user: { ...userData } }
    try {
      const request = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const response = await request.json()
      if (request.status === 200) {
        toast.success("Registro exitoso")
        console.log(response)
        router.push(`/${response.user.id}/email-step`)
      } else {
        toast.error(response.errors)
      }
    } catch (e) {}
  }
  return (
    <div
      className="
          w-full  min-h-[420px] rounded-t-md flex flex-col justify-center items-center px-6 bg-slate-200 shadow-md
          lg:w-1/2 lg:min-h-[550px] 2xl:min-h-[800px]
          dark:bg-slate-950
        "
    >
      <MotionDiv
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.4,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <h2 className="text-xl text-center font-bold">
          Vamos a crear tu cuenta
        </h2>
        <div className="border-t-[1px] mt-2 border-slate-300 bg-slate-200" />
      </MotionDiv>
      <form
        className="flex flex-col p-0 w-full"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconPencilPlus className="size-5 mr-2" />
          <label htmlFor="name">Nombre(s)</label>
        </div>
        <Input
          type="text"
          placeholder="Pon tu nombre aqui"
          name="name"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconPencilPlus className="size-5 mr-2" />
          <label htmlFor="last_name">Apellidos</label>
        </div>
        <Input
          type="text"
          name="last_name"
          onChange={(e) => handleChange(e)}
          placeholder="Pon aqui tun apellido"
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconMail className="size-5 mr-2" />
          <label htmlFor="password">Email</label>
        </div>
        <Input
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="ejemplo@iswoacademy.com"
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconUser className="size-5 mr-2" />
          <label htmlFor="username">Usuario</label>
        </div>
        <Input
          type="text"
          name="username"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconLockOpen className="size-5 mr-2" />
          <label htmlFor="password">Contraseña</label>
        </div>
        <Input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-3">
          <IconLockOpen className="size-5 mr-2" />
          <label htmlFor="password_confirmation">Confirmar Contraseña</label>
        </div>
        <Input
          type="password"
          name="password_confirmation"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <div className="rounded-full flex items-center justify-start w-full mt-2">
          <IconUserCircle className="size-5 mr-2" />
          <label htmlFor="password_confirmation">Rol</label>
        </div>
        <Select onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Escoge tu rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Estudiante</SelectItem>
            <SelectItem value="teacher">Profesor</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>

        <Button className="mt-3 mb-4">Registrarse</Button>
      </form>
      <Toaster theme="system" position="top-right" richColors />
    </div>
  )
}
