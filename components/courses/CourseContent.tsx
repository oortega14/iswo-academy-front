"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Accordion } from "@radix-ui/react-accordion"
import {
  IconEdit,
  IconEyeCheck,
  IconEyeX,
  IconTrash,
} from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"

import useGetLessons from "@/hooks/useGetLessons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MotionButton } from "../animations/MotionButton"
import { MotionPresence } from "../animations/MotionPresence"
import Modal from "../modal/Modal"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const CourseContent = () => {
  const params = useParams()
  const [loading, setLoading] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const close = () => setModalOpen(false)
  const open = () => setModalOpen(true)
  const lessons = useGetLessons(params?.courseId, setLoading)

  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }
  console.log(lessons)
  return (
    <>
      <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
        <h1 className="text-2xl font-semibold whitespace-nowrap mt-4 ml-3">
          Tus lecciones:
        </h1>
      </div>
      <Table>
        <TableCaption>La lista de tus lecciones.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Acciones</TableHead>
            <TableHead className="w-1/5">Titulo de la clase</TableHead>
            <TableHead className="w-1/2">Descripción</TableHead>
            <TableHead className="w-1/5">Es visible</TableHead>
          </TableRow>
        </TableHeader>
        {lessons.map((lesson) => (
          <>
            <TableBody>
              <TableRow>
                <TableCell className="flex gap-x-2">
                  <MotionButton
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => (modalOpen ? close() : open())}
                      className=" border-[1px]"
                    >
                      <IconEdit className=" size-6 " />
                    </Button>
                  </MotionButton>
                  <MotionButton
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => (modalOpen ? close() : open())}
                      className="border-[1px]"
                    >
                      <IconTrash className=" size-6 " />
                    </Button>
                  </MotionButton>
                </TableCell>
                <TableCell className="font-medium">{lesson.title}</TableCell>
                <TableCell>{truncarTexto(lesson.description, 100)}</TableCell>
                <TableCell>
                  {lesson.visible === true ? (
                    <div className="flex gap-x-2 items-center">
                      <IconEyeCheck className="text-green-600" />
                      <span>Si</span>
                    </div>
                  ) : (
                    <div className="flex gap-x-2 items-center">
                      <IconEyeX className="text-red-600" />
                      <span>No</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </>
        ))}
      </Table>
      <AnimatePresence>
        {modalOpen && (
          <Modal modalOpen={modalOpen} handleClose={close}>
            <Card className="w-2/3 h-2/3">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Name of your project" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="framework">Framework</Label>
                      <Select>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="next">Next.js</SelectItem>
                          <SelectItem value="sveltekit">SvelteKit</SelectItem>
                          <SelectItem value="astro">Astro</SelectItem>
                          <SelectItem value="nuxt">Nuxt.js</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
              </CardFooter>
            </Card>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
export default CourseContent
