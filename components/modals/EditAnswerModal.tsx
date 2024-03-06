import React, { useEffect, useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { EditAnswerModalProps } from "@/types/modals"
import { EditAnswerRequest } from "@/lib/requests"
import useGetAnswer from "@/hooks/useGetAnswer"
import useGetComplexAnswer from "@/hooks/useGetComplexAnswer"

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
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const EditAnswerModal = ({
  modalOpen,
  close,
  answerId,
  flag,
  setFlag,
}: EditAnswerModalProps) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    option_text: "",
    right_answer: false,
  })

  const answer = useGetComplexAnswer({
    answerId: answerId,
    setLoadingCallback: setLoading,
    flag: flag,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (!!answer) {
      setData((prevConfig) => ({
        ...prevConfig,
        option_text: answer?.option_text,
        right_answer: answer?.right_answer
      }))
    }
  }, [answer])

  const handleSubmit = async () => {
    const [request, response] = await EditAnswerRequest(data, answerId)
    if (request.status === 200) {
      toast.success("Respuesta editada correctamente")
      close()
      setFlag(!flag)
    }
  }

  const handleCheck = (e: boolean) => {
    setData({ ...data, right_answer: e })
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
                      <Label htmlFor="option_text">Contenido</Label>
                      <Input
                        defaultValue={answer?.option_text}
                        className="border-2"
                        id="option_text"
                        name="option_text"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Checkbox
                        id="visible"
                        className="h-5 w-5"
                        onCheckedChange={(e) => handleCheck(e as boolean)}
                        checked={data.right_answer}
                      />
                      <Label htmlFor="right_answer">¿ Es correcta ?</Label>
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

export default EditAnswerModal
