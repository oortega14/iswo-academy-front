"use client"

import { useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { CreateLearningRoute, UpdateLearningRoute } from "@/lib/requests"
import { cn } from "@/lib/utils"
import useGetLearningRoute from "@/hooks/useGetLearningRoute"
import Modal from "@/components/ui/Modal"
import MotionButton from "@/components/animations/MotionButton"

import { buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const CreateLearningRouteModal = ({
  modalOpen,
  close,
  academyId,
  changeFlag,
  setChangeFlag,
}: any) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    learning_route: {
      name: "",
      academy_id: academyId,
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const learningRouteData = data
    const [request, response] = await CreateLearningRoute({
      learningRouteData,
    })
    if (request.status == 200) {
      toast.success("Ruta de aprendizaje creada satisfactoriamente")
      setChangeFlag(!changeFlag)
      close()
    }
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <form className="w-full" onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-x-3">
                  <IconEdit className="size-8" />
                  <CardTitle>Nueva Ruta de Aprendizaje</CardTitle>
                </div>
                <CardDescription>
                  A continuación ingresa los campos de la ruta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      className="border-2"
                      onChange={(e) =>
                        setData({
                          learning_route: {
                            ...data.learning_route,
                            name: e.target.value,
                          },
                        })
                      }
                      name="name"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <MotionButton
                  onClick={close}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "border-[1px] px-2"
                  )}
                >
                  Cancelar
                </MotionButton>
                <MotionButton
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "border-[1px] px-2"
                  )}
                >
                  Guardar
                </MotionButton>
              </CardFooter>
            </Card>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default CreateLearningRouteModal
