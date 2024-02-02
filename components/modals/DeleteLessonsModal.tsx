import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { DeleteLessonsModalProps } from "@/types/modals"
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
import { DeleteLessonRequest } from "@/lib/requests"
import { toast } from "sonner"

const DeleteLessonsModal = ({
  modalOpen,
  close,
  lessonId,
  flag,
  setFlag
}: DeleteLessonsModalProps) => {

  const handleDelete = async () => {
    const [request, response] = await DeleteLessonRequest(lessonId)
    if (request.status === 200) {
      setFlag(!flag)
      toast.success(`${response.message}`);
      close();
    }
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="lg:h-2/3 lg:w-2/3">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconTrash className="size-8" />
                <CardTitle>Eliminar lección</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar la lección
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
                onClick={(e)=>handleDelete()}
              >Eliminar</MotionButton>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default DeleteLessonsModal
