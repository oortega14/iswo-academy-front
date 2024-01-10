import { ChangeEventHandler, useEffect, useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import {  EditQuestionModalProps } from "@/types/modals"
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
import useGetQuestion from "@/hooks/useGetQuestion"

const EditQuestionModal = ({
  modalOpen,
  close,
  questionId,
}: EditQuestionModalProps) => {
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState()
  const [data, setData] = useState({
    title: '',
    description: '',
    visible: 'f',
    video: '',
  })
  const question = useGetQuestion({
    questionId: questionId,
    setLoadingCallback: setLoading
  })

  if (loading) {
    return ''
  } else {
    return (
      <AnimatePresence>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <Card className="lg:w-3/4 lg:h-2/3">
              <CardHeader>
                <div className="flex gap-x-3 items-center">
                  <IconEdit className="size-8" />
                  <CardTitle>Edita la pregunta</CardTitle>
                </div>
                <CardDescription>
                  A continuación puedes editar la pregunta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="question">Contenido</Label>
                      <Input
                        defaultValue={question?.question}
                        className="border-2"
                        id="question"
                        name="question"
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

export default EditQuestionModal
