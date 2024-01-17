import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import { DeleteCourseModalProps } from "@/types/modals"
import { cn } from "@/lib/utils"

import { MotionButton } from "../animations/MotionButton"
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

const DeleteAccountModal = ({
  modalOpen,
  close,
  courseId,
}: DeleteCourseModalProps) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="lg:h-2/3 lg:w-2/3">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconTrash className="size-8" />
                <CardTitle>Eliminar Cuenta</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes eliminar tu cuenta
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
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 1.15 }}
                onClick={close}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-[1px] px-2"
                )}
              >
                Cancelar
              </MotionButton>
              <MotionButton
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 1.15 }}
                onClick={close}
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

export default DeleteAccountModal
