"use client"

import Modal from "@/components/ui/Modal"
import { AnimatePresence } from "framer-motion"
import { IconEdit } from "@tabler/icons-react"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import { Textarea } from "../../../ui/textarea"
import { MotionButton } from "../../../animations/MotionButton"
import { buttonVariants } from "../../../ui/button"
import { cn } from "@/lib/utils"
import useGetLearningRoute from "@/hooks/useGetLearningRoute"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../ui/card"
import { useState } from "react"
import { CreateLearningRoute, UpdateLearningRoute } from "@/lib/requests"

const LearningRouteModal = ({ modalOpen, close, learningRouteId, academyId }: any) => {
  const [loading, setLoading] = useState(true)
  const modalTitle = !!learningRouteId ? 'Editar Ruta de Aprendizaje' : 'Nueva Ruta de Aprendizaje'
  const [data, setData] = useState({ learning_route: {
      name: "",
      academy_id: academyId
    }
  })

  const learningRoute = useGetLearningRoute({
    learningRouteId: learningRouteId?.toString(),
    setLoadingCallback: setLoading,
  })

  const handleSubmit = async () => {
    const learningRouteData = data
    if (!!learningRouteId) {
      const [request, response] = await UpdateLearningRoute({ learningRouteData, learningRouteId })
      if (request.status == 200) {
        close()
      }
    } else {
      const [request, response] = await CreateLearningRoute(learningRouteData)
      if (request.status == 200) {
        close()
      }
    }
  }

  return (
    <AnimatePresence>
      { modalOpen && (<Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="lg:h-2/3 lg:w-3/4">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconEdit className="size-8" />
                <CardTitle>{modalTitle}</CardTitle>
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
                      onChange={(e)=> setData({ learning_route: { ...data.learning_route, name: e.target.value}})}
                      name="name"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }} onClick={close}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-[1px] px-2"
                )}
              >
                Cancelar
              </MotionButton>
              <MotionButton whileHover={{ scale: 0.95 }} whileTap={{ scale: 1.15 }} onClick={handleSubmit}
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

export default LearningRouteModal