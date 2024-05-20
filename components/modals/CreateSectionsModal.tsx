import {
  IconAlertCircle,
  IconCirclePlus,
  IconListTree,
  IconTrash,
} from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import { CreateSectionsModalProps } from "@/types/modals"
import { CreateCourseSectionRequest, DeleteCourseRequest } from "@/lib/requests"
import { cn } from "@/lib/utils"

import MotionButton from "../animations/MotionButton"
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
import { useState } from "react"
import { useParams } from "next/navigation"

const CreateSectionsModal = ({
  modalOpen,
  close,
  flag,
  setFlag,
}: CreateSectionsModalProps) => {
  const [section, setSection] = useState({
    name: '',
    position: null,
  })
  const {courseId} = useParams()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { name, value } = e.target
    setSection({...section, [name]: value})
  }
  const handleCreate = async () => {
    const [request, response] = await CreateCourseSectionRequest({
      courseId: courseId,
      name: section?.name,
      position: section?.position,
    })

    if (request.status === 200 ) {
      close()
      setFlag(!flag)
    }
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconCirclePlus className="size-8" />
                <CardTitle>Crear Sección</CardTitle>
              </div>
              <CardDescription>
                A continuación puedes crear una sección
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Escribe aqui el nombre de la sección"
                onChange={(e)=>handleChange(e)}
                name='name'
              />
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
                onClick={handleCreate}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "border-[1px] bg-green-700 px-2"
                )}
              >
                Crear
              </MotionButton>
            </CardFooter>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default CreateSectionsModal
