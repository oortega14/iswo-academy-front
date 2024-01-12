import { useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { EditAnswerModalProps } from "@/types/modals"
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
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { MotionButton } from "../animations/MotionButton"
import useGetAnswer from "@/hooks/useGetAnswer"

const EditAnswerModal = ({
  modalOpen,
  close,
  answerId,
}: EditAnswerModalProps) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    title: '',
    description: '',
    visible: 'f',
    video: '',
  })
  const answer = useGetAnswer({
    answerId: answerId,
    setLoadingCallback: setLoading
  })

  if (loading) {
    return <span></span>
  } else {
    return (
      <AnimatePresence>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <Card className="lg:h-2/3 lg:w-3/4">
              <CardHeader>
                <div className="flex items-center gap-x-3">
                  <IconEdit className="size-8" />
                  <CardTitle>Edita la respuesta</CardTitle>
                </div>
                <CardDescription>
                  A continuación edita los campos la respuesta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Titulo</Label>
                      <Input
                        defaultValue={answer?.option_text}
                        className="border-2"
                        id="title"
                        name="title"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <MotionButton
                  whileHover={{ scale: 0.95}}
                  whileTap={{ scale: 1.15}}
                >
                  <Button onClick={close} variant="outline">
                    Cancelar
                  </Button>
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 0.95}}
                  whileTap={{ scale: 1.15}}
                >
                  <Button>Editar</Button>
                </MotionButton>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    )
  }
}

export default EditAnswerModal
