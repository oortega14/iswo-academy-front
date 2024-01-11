import { ChangeEventHandler, useEffect, useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import { EditLessonsModalProps } from "@/types/modals"
import useGetLesson from "@/hooks/useGetLesson"
import { Checkbox } from "@/components/ui/checkbox"

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
import { Textarea } from "../ui/textarea"
import { MotionButton } from "../animations/MotionButton"

const EditLessonsModal = ({
  modalOpen,
  close,
  lessonId,
}: EditLessonsModalProps) => {
  const [loading, setLoading] = useState(true)
  const [file, setFile] = useState()
  const [data, setData] = useState({
    title: '',
    description: '',
    visible: 'f',
    video: '',
  })
  const lesson = useGetLesson({
    lessonId: lessonId,
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
                  <CardTitle>Edita la Lección</CardTitle>
                </div>
                <CardDescription>
                  A continuación edita los campos de tu lección
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Titulo</Label>
                      <Input
                        defaultValue={lesson?.title}
                        className="border-2"
                        id="title"
                        name="title"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        defaultValue={lesson?.description}
                        className="border-2"
                        id="description"
                        name="description"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="video">Video</Label>
                      {!!file ? (
                      <div className=" max-w-[220px] rounded-lg flex shadow-lg mx-auto overflow-hidden">
                        {
                          <video
                            id="video"
                            className="w-100 "
                            src={URL.createObjectURL(file)}
                            controls
                          />
                        }
                      </div>
                    ) : (
                      <div className=" max-w-[220px] rounded-lg flex shadow-lg mx-auto">
                        {
                          <video
                            id="video"
                            className="w-100"
                            src={lesson?.url_video}
                            controls
                          />
                        }
                      </div>
                    )}
                      <Input id="video" type="file" className="border-2"/>
                    </div>
                    <div className="flex gap-x-3 items-center">
                      <Label htmlFor="visible">Es visible</Label>
                      <Checkbox checked={lesson?.visible} id="visible" name="checkbox" />
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

export default EditLessonsModal
