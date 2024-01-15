import { useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import { EditCourseModalProps } from "@/types/modals"
import { cn } from "@/lib/utils"
import useGetCourse from "@/hooks/useGetCourse"

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
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

const EditCourseModal = ({
  modalOpen,
  close,
  courseId,
}: EditCourseModalProps) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    title: "",
    description: "",
    visible: "f",
    video: "",
  })
  const course = useGetCourse({
    courseId: courseId.toString(),
    setLoadingCallback: setLoading,
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
                  <CardTitle>Edita el curso</CardTitle>
                </div>
                <CardDescription>
                  A continuación edita los campos del curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Titulo</Label>
                      <Input
                        defaultValue={course?.title}
                        className="border-2"
                        id="title"
                        name="title"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Precio del curso</Label>
                      <Input
                        defaultValue={course?.price}
                        className="border-2"
                        id="title"
                        name="title"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Descripción del curso</Label>
                      <Textarea
                        defaultValue={course?.description}
                        className="border-2"
                        id="title"
                        name="title"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Cambiar Instructor</Label>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="title">Cambiar Banner del curso</Label>
                      <Input className="border-2" type="file" />
                    </div>
                  </div>
                </form>
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
                    buttonVariants({ variant: "default" }),
                    "border-[1px] px-2"
                  )}
                >
                  Editar
                </MotionButton>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    )
  }
}

export default EditCourseModal
