"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useUIStore } from "@/store/ui/ui-store"

import { useGetAcademy } from "@/hooks/useGetAcademy"
import useGetCurrentUser from "@/hooks/useGetCurrentUser"
import { Button } from "@/components/ui/button"

import DeleteAccountModal from "../modals/DeleteAccountModal"
import { Toaster } from "sonner"

export const DeleteAccountContent = () => {
  const baseUrl = useUIStore((state) => state.baseUrl)
  const params = useParams<{ userId: string; academyId: string }>()
  const [loading, setLoading] = useState(true)
  const currentUser = useGetCurrentUser({
    baseUrl: baseUrl,
    setLoadingCallback: setLoading,
  })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userSelectedId, setUserSelectedId] = useState(0)
  const close = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setModalOpenFunction(false)
  }
  const open = (
    setModalOpenFunction: React.Dispatch<React.SetStateAction<boolean>>,
    userId: number
  ) => {
    setModalOpenFunction(true)
    setUserSelectedId(userId)
  }

  return (
    <div>
      <main className="h-auto flex-1 overflow-hidden p-5 ">
        <div className="flex flex-col items-start justify-between space-y-4 border-b pb-6 lg:flex-row lg:items-center lg:space-y-0">
          <h1 className="text-2xl font-semibold">
            Ten cuidado, si eliminas tu cuenta perderás el acceso a todos los
            cursos y academias a los que te encuentras registrado de manera
            permanente.
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Button
            className="mt-3"
            variant={"destructive"}
            onClick={()=>{
              deleteModalOpen
                ? close(setDeleteModalOpen)
                : open(setDeleteModalOpen, JSON.parse(params.userId))
            }}
          >
            Eliminar Cuenta
          </Button>
        </div>
      </main>
      <DeleteAccountModal
        modalOpen={deleteModalOpen}
        close={() => close(setDeleteModalOpen)}
        userId={userSelectedId}
      />
      <Toaster theme="system" position="top-right" richColors/>
    </div>
  )
}

export default DeleteAccountContent
