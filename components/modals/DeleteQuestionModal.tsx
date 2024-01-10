import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { DeleteQuestionModalProps } from "@/types/modals"
import { MotionButton } from "../animations/MotionButton"
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

const DeleteQuestionModal = ({
  modalOpen,
  close,
  questionId,
}: DeleteQuestionModalProps) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="lg:w-2/3 lg:h-2/3">
            <CardHeader>
              <div className="flex gap-x-3 items-center">
                <IconTrash className="size-8" />
                <CardTitle>Eliminar Estudiante</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar al estudiante
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-x-3 items-center">
                <IconAlertCircle className="text-red-500 size-8" />
                <span>Esta accion es irreversible! ¿estás seguro?</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <MotionButton
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 1.15 }}
              >
                <Button onClick={close} variant="outline">
                  Cancelar
                </Button>
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 1.15 }}
              >
                <Button variant={"destructive"}>Eliminar</Button>
              </MotionButton>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default DeleteQuestionModal
