import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { DeleteLessonsModalProps } from "@/types/modals"
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

const DeleteStudentModal = ({
  modalOpen,
  close,
  lessonId,
  flag,
  setFlag,
}: DeleteLessonsModalProps) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconTrash className="size-8" />
                <CardTitle>Eliminar Estudiante</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar al estudiante
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
              <MotionButton variant={"destructive"}>Eliminar</MotionButton>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default DeleteStudentModal
