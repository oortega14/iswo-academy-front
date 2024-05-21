import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import Header from "@/components/home/Header"
import LoadingModal from "@/components/modals/LoadingModal"

const OrderContent = () => {
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
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isFull, setIsFull] = useState(false)
  const [userData, setUserData] = useState({
    type_person: "",
    doc_type: "",
    doc_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    bank_code: "",
  })
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
    if (banks !== undefined) {
      const banksF: Bank[] = banks.filter((item) => item.bankCode !== "0")
      setBanksFiltered(banksF)
    }
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
    setLoading(true)
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
        const finalUrl =
          response.bank_url === null
            ? `/order?academyId=${academyId}&courseId=${courseId}`
            : `${response.bank_url}`
        router.push(`${finalUrl}`)
        if (response.bank_url === null) {
          toast.error("No se pudo procesar tu pago")
          setLoading(false)
        }
      } else {
      }
      return response
    } catch (e) {}
  }

  useEffect(() => {
    const areAllFieldsFilled = Object.values(userData).every(
      (value) => value !== ""
    )
    setIsFull(areAllFieldsFilled)
  }, [userData])

  if (loading) {
    return <LoadingModal />
  } else {
    return (
      <div className="flex w-full">
        <Header />
        <div className="mt-24 flex w-full">
          <div className="min-h-screen w-1/2 p-10">
            <h3 className="w-full text-center text-2xl font-extrabold">
              Complete su compra para comenzar a aprender
            </h3>
            <img
              src={course?.promotional_image}
              alt="promotional_image"
              className="mt-4 w-full overflow-hidden rounded-lg text-center"
            />
            <h3 className="mb-2 mt-3 w-full text-center text-xl font-semibold">
              {course?.title}
            </h3>
            <div className="flex w-full items-center justify-center">
              <span className="text-4xl font-bold">
                {formatCurrency(JSON.parse(course?.price || "0"))} COP
              </span>
            </div>
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
              <Button
                className="mt-3 w-full disabled:opacity-75"
                disabled={!isFull}
              >
                Pagar
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderContent
