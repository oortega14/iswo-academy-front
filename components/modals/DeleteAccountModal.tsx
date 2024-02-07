import { IconAlertCircle, IconTrash } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { DeleteAccountModalProps } from "@/types/modals"
import { cn } from "@/lib/utils"
import Modal from "../ui/Modal"
import { buttonVariants } from "../ui/button"
import { Toaster, toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { DeleteAccountRequest } from "@/lib/requests"
import { useRouter } from "next/navigation"
import MotionButton from "../animations/MotionButton"

const DeleteAccountModal = ({
  modalOpen,
  close,
  userId,
}: DeleteAccountModalProps) => {
  const router = useRouter()
  const handleDelete = async () => {
    const [request, response] = await DeleteAccountRequest(userId)
    if (request.status == 200) {
      router.push('/')
      toast.success('Cuenta eliminada')
      close()
    }
  };

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

export default DeleteAccountModal
