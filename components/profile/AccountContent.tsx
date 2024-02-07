"use client"

import { FormEvent, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import { IconLock, IconMail } from "@tabler/icons-react"
import { Toaster, toast } from "sonner"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UpdateAccountRequest } from "@/lib/requests"

export const AccountContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ userId: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [data, setData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const [request, response] = await UpdateAccountRequest({
      data: data,
      userId: params.userId,
    })
    if (request.status == 200) {
      toast.success(`Contraseña Actualizada`)
    }
  }

  useEffect(() => {
    if (!!currentUser) {
      setData((prevConfig) => ({
        ...prevConfig,
        email: currentUser?.email,
      }))
    }
  }, [currentUser])

  return (
    <div>
      <main className="h-auto flex-1 overflow-hidden p-5 ">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="whitespace-nowrap text-2xl font-semibold">
            Actualicemos las credenciales de tu cuenta
          </h1>
        </div>
        <form
          className="flex w-full flex-col p-0"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconMail className="mr-2 size-5" />
            <label htmlFor="email">Correo Electrónico</label>
          </div>
          <Input
            type="email"
            placeholder="Modifica aqui tu correo"
            name="email"
            onChange={(e) => handleChange(e)}
            className="mt-2"
            defaultValue={currentUser?.email}
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconLock className="mr-2 size-5" />
            <label htmlFor="password">Contraseña</label>
          </div>
          <Input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            placeholder="******"
            className="mt-2"
          />
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <IconLock className="mr-2 size-5" />
            <label htmlFor="password_confirmation">
              Confirmación Contraseña
            </label>
          </div>
          <Input
            type="password"
            name="password_confirmation"
            onChange={(e) => handleChange(e)}
            placeholder="******"
            className="mt-2"
          />
          <Button className="mt-3">Actualizar Academia</Button>
        </form>
      </main>
    </div>
  )
}

export default AccountContent
