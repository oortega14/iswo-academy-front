import { useState } from "react"
import { IconQuestionMark } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { UploadProgressModalProps } from "@/types/modals"

import MotionButton from "../animations/MotionButton"
import Modal from "../ui/Modal"
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

const UploadProgressModal = ({
  uploadProgress,
  modalOpen,
  close,
  handleSubmit,
  selectedSection,
}: UploadProgressModalProps) => {
  const [confirmationFlag, setConfirmationFlag] = useState(false)
  const handleSend = (e: any) => {
    if (!selectedSection) {
      toast.error("Debes escoger una sección")
      close()
    } else {
      setConfirmationFlag(true)
      handleSubmit(e)
    }
  }
  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          {!confirmationFlag ? (
            <>
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-x-3">
                    <CardTitle>¿Todos los datos son correctos?</CardTitle>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <MotionButton onClick={close} variant="outline">
                    Cancelar
                  </MotionButton>
                  <MotionButton onClick={(e) => handleSend(e)}>
                    Si, enviar
                  </MotionButton>
                </CardFooter>
              </Card>
            </>
          ) : (
            <>
              <Card className="w-full">
                <CardHeader>
                  <div className="flex items-center gap-x-3">
                    <CardTitle>El progreso de carga es:</CardTitle>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Progress className="mt-2" value={uploadProgress} />
                </CardFooter>
              </Card>
            </>
          )}
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default UploadProgressModal
