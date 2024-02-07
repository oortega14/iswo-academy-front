import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react"
import { IconEdit, IconSearch } from "@tabler/icons-react"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

import {
  EditQuestionModalProps,
  EditSectionModalProps,
  SearchModalProps,
} from "@/types/modals"
import {
  FetchCoursesByKeywordRequest,
  UpdateSectionRequest,
} from "@/lib/requests"
import useGetCourseSection from "@/hooks/useGetCourseSection"
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
import { Course } from "@/types/sidebar"
import { useParams, useRouter } from "next/navigation"

const SearchModal = ({ modalOpen, close }: SearchModalProps) => {
  const router = useRouter()
  const { userId, courseId, academyId } = useParams<{
    userId: string
    courseId: string
    academyId: string
  }>()
  const [data, setData] = useState({
    keyword: "",
  })
  const [courses, setCourses] = useState<Course[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    if (data.keyword?.length >= 3) {
      handleSubmit()
    } else {
      cleanCourses()
    }
  }, [data])

  const cleanCourses = () => {
    setCourses([])
  }

  const handleSubmit = async () => {
    const [request, response] = await FetchCoursesByKeywordRequest(data)
    if (request.status === 200) {
      setCourses(response.results)
    }
  }

  const handleNavigate = (e: number) => {
    router.push(`/academies/${academyId}/courses/${e}`)
    setCourses([])
  }

  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={close}>
          <Card className="lg:h-2/3 lg:w-3/4">
            <CardHeader>
              <div className="flex items-center gap-x-3">
                <IconSearch className="size-8" />
                <CardTitle>Busquemos un curso apropiado para ti</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      placeholder="Escribe una palabra clave para buscar"
                      onChange={(e) => handleChange(e)}
                      name="keyword"
                    ></Input>
                  </div>
                </div>
              </form>
              {courses.length > 0 && (
                <div className="">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="my-2 cursor-pointer z-50"
                      onClick={() => handleNavigate(course.id)}
                    >
                      <div className="w-full bg-slate-300 dark:bg-slate-900 rounded-lg p-2 flex items-center">
                        <div className=" w-[50px] h-[50px] rounded-full overflow-hidden relative p-1 mr-2">
                          <img
                            className="w-full h-auto block absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2"
                            src={course.banner}
                            alt="preview"
                          />
                        </div>
                        <span>{course.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default SearchModal
