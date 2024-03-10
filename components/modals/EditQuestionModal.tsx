import React, { ChangeEventHandler, useEffect, useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import { EditQuestionModalProps } from "@/types/modals"
import useGetQuestion from "@/hooks/useGetQuestion"

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
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { EditQuestionRequest } from "@/lib/requests"
import { toast } from "sonner"

const EditQuestionModal = ({
  modalOpen,
  close,
  questionId,
  flag,
  setFlag
}: EditQuestionModalProps) => {
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState()
  const [data, setData] = useState({
    question: "",
  })
  const question = useGetQuestion({
    questionId: questionId,
    setLoadingCallback: setLoading,
    flag: flag
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const [request, response] = await EditQuestionRequest(data, questionId)
    if (request.status === 200) {
      toast.success('Pregunta actualizada correctamente')
      setFlag(!flag)
      close()
    }
  }

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
                        onChange={(e)=>handleChange(e)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <MotionButton onClick={close} variant="outline">
                  Cancelar
                </MotionButton>
                <MotionButton onClick={handleSubmit}>Editar</MotionButton>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    )
  }
}

export default EditQuestionModal
