"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"
import {
  IconDialpad,
  IconList,
  IconListNumbers,
  IconMail,
  IconNumber,
  IconNumber0,
  IconNumber12Small,
  IconRecordMail,
  IconUser,
  IconUserCircle,
  IconWallet,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { Bank } from "@/types/sidebar"
import useGetBanks from "@/hooks/useGetBanks"
import useGetCourse from "@/hooks/useGetCourse"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InputNumberWithIcon from "@/components/forms/InputNumberWithIcon"
import InputTextWithIcon from "@/components/forms/InputTextWithIcon"
import LoadingModal from "@/components/modals/LoadingModal"

export default function orderPage() {
  function formatCurrency(value: number): string {
    const formattedValue = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)

    return formattedValue
  }
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId") || ""
  const academyId = searchParams.get("academyId")
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({})
  const [banksFiltered, setBanksFiltered] = useState<Bank[]>([])
  const baseUrl = useUIStore((state) => state.baseUrl)
  const course = useGetCourse({
    courseId: courseId,
    setLoadingCallback: setLoading,
  })
  const banks = useGetBanks({
    setLoadingCallback: setLoading,
  })

  useEffect(() => {
    const banksF: Bank[] = banks.filter((item) => item.bankCode !== "0")
    setBanksFiltered(banksF)
  }, [banks])

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSelectPerson = (e: string) => {
    setUserData({ ...userData, type_person: e })
  }

  const handleSelectDocument = (e: string) => {
    setUserData({ ...userData, doc_type: e })
  }

  const handleSelectBank = (e: string) => {
    setUserData({ ...userData, bank_code: e })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let payment_item_attributes = { course_id: courseId }
    let transaction_params = { ...userData }
    let body = {
      payment_item_attributes,
      transaction_params,
    }
    try {
      const request = await fetch(`${baseUrl}/payments`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        credentials: "include",
        body: JSON.stringify(body),
      })
      const response = await request.json()
      if (request.status == 200) {
        console.log(response)
        toast.success("se realizo el pago")
      } else {
      }
      return response
    } catch (e) {}
  }

  console.log(userData)

  if (loading) {
    return <LoadingModal />
  } else {
    return (
      <div className="flex">
        <div className="min-h-screen w-1/2 p-10">
          <h3 className="text-xl font-semibold">
            Complete su compra para comenzar a aprender
          </h3>
          <img src={course?.promotional_image} alt="promotional_image" />
          <h3 className="mb-2 mt-3 text-xl font-semibold">{course?.title}</h3>
          <span className="ml-20 w-full text-4xl font-bold">
            {formatCurrency(JSON.parse(course?.price || "0"))} COP
          </span>
        </div>
        <div className="min-h-screen w-1/2 rounded-lg border-2 p-10 shadow-xl">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-2 flex w-full items-center justify-start rounded-full">
              <IconUser className="mr-2 size-5" />
              <label htmlFor="password_confirmation">Tipo de Persona</label>
            </div>
            <Select
              name="type_person"
              onValueChange={(e) => handleSelectPerson(e)}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Escoge el tipo de persona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Persona Jurídica</SelectItem>
                <SelectItem value="1">Persona Natural</SelectItem>
              </SelectContent>
            </Select>
            <div className="mt-2 flex w-full items-center justify-start rounded-full">
              <IconUserCircle className="mr-2 size-5" />
              <label htmlFor="password_confirmation">Tipo de documento</label>
            </div>
            <Select onValueChange={(e) => handleSelectDocument(e)}>
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Escoge el tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CC">CC</SelectItem>
                <SelectItem value="NIT">NIT</SelectItem>
              </SelectContent>
            </Select>
            <InputNumberWithIcon
              Icon={IconNumber12Small}
              label={"Numero de documento"}
              name={"doc_number"}
              onChange={(e) => handleChange(e)}
            />
            <InputTextWithIcon
              Icon={IconList}
              label={"Nombres"}
              name={"first_name"}
              onChange={(e) => handleChange(e)}
            />
            <InputTextWithIcon
              Icon={IconList}
              label={"Apellidos"}
              name={"last_name"}
              onChange={(e) => handleChange(e)}
            />
            <InputTextWithIcon
              Icon={IconMail}
              label={"Correo electrónico"}
              name={"email"}
              onChange={(e) => handleChange(e)}
            />
            <InputNumberWithIcon
              Icon={IconDialpad}
              label={"Numero de celular"}
              name={"phone"}
              onChange={(e) => handleChange(e)}
            />
            <div className="mt-2 flex w-full items-center justify-start rounded-full">
              <IconWallet className="mr-2 size-5" />
              <label htmlFor="password_confirmation">Bancos</label>
            </div>
            <Select onValueChange={(e) => handleSelectBank(e)}>
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Escoge tu banco" />
              </SelectTrigger>
              <SelectContent>
                {banksFiltered.map((bank) => (
                  <SelectItem key={bank.bankCode} value={bank.bankCode}>
                    {bank.bankName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="mt-3 w-full">Pagar</Button>
          </form>
        </div>
      </div>
    )
  }
}
