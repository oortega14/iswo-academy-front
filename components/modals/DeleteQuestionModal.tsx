import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import { DeleteQuestionModalProps } from "@/types/modals"

import MotionButton from "../animations/MotionButton"
import Modal from "../ui/Modal"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { toast } from "sonner"
import { DeleteQuestionRequest } from "@/lib/requests"

const DeleteQuestionModal = ({
  modalOpen,
  close,
  questionId,
  flag,
  setFlag
}: DeleteQuestionModalProps) => {

  const handleDelete = async () => {
    const [request, response] = await DeleteQuestionRequest(questionId)
    if (request.status === 200) {
      setFlag(!flag)
      close()
      toast.success('Pregunta eliminada correctamente')
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
                <CardTitle>Eliminar Pregunta</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar la pregunta
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
              <MotionButton variant={"destructive"} onClick={handleDelete}>Eliminar</MotionButton>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default DeleteQuestionModal
