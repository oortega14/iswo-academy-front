import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { DeleteCourseModalProps } from "@/types/modals"
import { cn } from "@/lib/utils"
import  MotionButton  from "../animations/MotionButton"
import Modal from "../ui/Modal"
import { Button, buttonVariants } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { DeleteCourseRequest } from "@/lib/requests"
import { toast } from "sonner"

const DeleteCourseModal = ({
  modalOpen,
  close,
  courseId,
  deleteFlag,
  setDeleteFlag,
}: DeleteCourseModalProps) => {
  const handleDelete = async () => {
    const [request, response] = await DeleteCourseRequest(courseId)
    if (request.status === 200) {
      setDeleteFlag(!deleteFlag)
      toast.success(`${response.message}`);
      close();
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
                <CardTitle>Eliminar Curso</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar el curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-x-3">
                <IconAlertCircle className="size-8 text-red-500" />
                <span>Esta accion es irreversible! ¿estás seguro?</span>
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
                onClick={handleDelete}
                className={cn(
                  buttonVariants({ variant: "destructive" }),
                  "border-[1px] px-2"
                )}
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

export default DeleteCourseModal
