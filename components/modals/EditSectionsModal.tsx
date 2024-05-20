import { ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import { IconEdit } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import { EditQuestionModalProps, EditSectionModalProps } from "@/types/modals"
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
import useGetCourseSection from "@/hooks/useGetCourseSection"
import { UpdateSectionRequest } from "@/lib/requests"
import { toast } from "sonner"

const EditSectionsModal = ({
  modalOpen,
  close,
  sectionId,
  flag,
  setFlag
}: EditSectionModalProps) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: ""
  })

  const courseSection = useGetCourseSection({
    sectionId: JSON.stringify(sectionId),
    setLoadingCallback: setLoading,
    flag: flag
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({...data, [name]: value})
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const [request, response] = await UpdateSectionRequest({
      sectionId: JSON.stringify(sectionId),
      sectionData: data,
    })
    if (request.status === 200) {
      toast.success("Sección actualizada")
      close()
      setFlag(!flag)
    } else {
      toast.error(response.errors)
    }
  }

  useEffect(() => {
    if (!!courseSection) {
      setData((prevConfig) => ({
        ...prevConfig,
        name: courseSection?.name
      }))
    }
  }, [courseSection])


  if (loading) {
    return <span></span>
  } else {
    return (
      <AnimatePresence>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-x-3">
                  <IconEdit className="size-8" />
                  <CardTitle>Edita la sección</CardTitle>
                </div>
                <CardDescription>
                  A continuación puedes editar la sección
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="section">Contenido</Label>
                      <Input
                        defaultValue={courseSection?.name}
                        className="border-2"
                        id="section"
                        name="name"
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
                <MotionButton
                  onClick={handleSubmit}
                >Editar</MotionButton>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    )
  }
}

export default EditSectionsModal
