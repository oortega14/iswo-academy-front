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
import { RegisterNewUser } from "@/lib/requests"
import { RegisterParams } from "@/types/requests"

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
    const [request, response] = await RegisterNewUser(data)
    if (request.status === 200) {
      toast.success("Registro exitoso")
      router.push(`/${response.user.id}/email-step`)
    } else {
      toast.error(response.errors)
    }
  }
  return (
    <div
      className="
          flex  min-h-[420px] w-full flex-col items-center justify-center rounded-t-md bg-slate-200 px-6 shadow-md
          dark:bg-slate-950 lg:min-h-[550px] lg:w-1/2
          2xl:min-h-[800px]
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
        <h2 className="mt-3 text-center text-xl font-bold">
          Vamos a crear tu cuenta
        </h2>
        <div className="mt-2 border-t-[1px] border-slate-300 bg-slate-200" />
      </MotionDiv>
      <form
        className="flex w-full flex-col p-0"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconPencilPlus className="mr-2 size-5" />
          <label htmlFor="name">Nombre(s)</label>
        </div>
        <Input
          type="text"
          placeholder="Pon tu nombre aqui"
          name="name"
          onChange={(e) => handleChange(e)}
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconPencilPlus className="mr-2 size-5" />
          <label htmlFor="last_name">Apellidos</label>
        </div>
        <Input
          type="text"
          name="last_name"
          onChange={(e) => handleChange(e)}
          placeholder="Pon aqui tun apellido"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconMail className="mr-2 size-5" />
          <label htmlFor="password">Email</label>
        </div>
        <Input
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="ejemplo@iswoacademy.com"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconLockOpen className="mr-2 size-5" />
          <label htmlFor="password">Contraseña</label>
        </div>
        <Input
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <div className="mt-3 flex w-full items-center justify-start rounded-full">
          <IconLockOpen className="mr-2 size-5" />
          <label htmlFor="password_confirmation">Confirmar Contraseña</label>
        </div>
        <Input
          type="password"
          name="password_confirmation"
          onChange={(e) => handleChange(e)}
          placeholder="*******"
          className="mt-2"
        />
        <div className="mt-2 flex w-full items-center justify-start rounded-full">
          <IconUserCircle className="mr-2 size-5" />
          <label htmlFor="password_confirmation">Registrarse como:</label>
        </div>
        <Select onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Escoge tu perfil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Estudiante</SelectItem>
            <SelectItem value="teacher">Profesor</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>

        <Button className="mb-4 mt-3">Registrarse</Button>
      </form>
    </div>
  )
}
