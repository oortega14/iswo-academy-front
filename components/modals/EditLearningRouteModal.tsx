"use client"

import { useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { UpdateLearningRoute } from "@/lib/requests"
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

const EditLearningRouteModal = ({
  modalOpen,
  close,
  learningRouteId,
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

  const learningRoute = useGetLearningRoute({
    learningRouteId: learningRouteId?.toString(),
    setLoadingCallback: setLoading,
    changeFlag: changeFlag,
  })
  console.log(learningRouteId)
  console.log(learningRoute)
  console.log(data)

  const handleSubmit = async () => {
    const learningRouteData = data
    const [request, response] = await UpdateLearningRoute({
      learningRouteData,
      learningRouteId,
    })
    if (request.status == 200) {
      toast.success("Ruta de aprendizaje actualizada correctamente")
      setChangeFlag(!changeFlag)
      close()
    }
  }

  if (loading) {
    return <span></span>
  } else {
    return (
      <AnimatePresence>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-x-3">
                  <IconEdit className="size-8" />
                  <CardTitle>Editar Ruta de Aprendizaje</CardTitle>
                </div>
                <CardDescription>
                  A continuación edita los campos de la ruta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        defaultValue={learningRoute?.name}
                        className="border-2"
                        name="name"
                        onChange={(e) =>
                          setData({
                            learning_route: {
                              ...data.learning_route,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
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
                  onClick={handleSubmit}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "border-[1px] px-2"
                  )}
                >
                  Guardar
                </MotionButton>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    )
  }
}

export default EditLearningRouteModal
