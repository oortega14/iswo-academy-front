import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { DeleteLearningRoutesModalProps } from "@/types/modals"
import { DeleteLearningRouteRequest } from "@/lib/requests"

import MotionButton from "../animations/MotionButton"
import Modal from "../ui/Modal"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

const DeleteLearningRouteModal = ({
  modalOpen,
  close,
  learningRouteId,
  flag,
  setFlag,
}: DeleteLearningRoutesModalProps) => {
  const handleDelete = async () => {
    const [request, response] = await DeleteLearningRouteRequest(learningRouteId)
    if (request.status === 200) {
      setFlag(!flag)
      toast.success(`${response.message}`)
      close()
    }
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconTrash className="size-8" />
                <CardTitle>Eliminar Ruta de aprendizaje</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar la ruta de aprendizaje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-3">
                <IconAlertCircle className="size-8 text-red-500" />
                <span>Esta accion es irreversible! ¿estás seguro?</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <MotionButton onClick={close} variant="outline">
                Cancelar
              </MotionButton>
              <MotionButton
                variant={"destructive"}
                onClick={() => handleDelete()}
              >
                Eliminar
              </MotionButton>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default DeleteLearningRouteModal
