import { Separator } from "@radix-ui/react-select"
import { IconChevronUp } from "@tabler/icons-react"
import { Lesson, SidebarSectionProps } from "@/types/sidebar"
import { cn } from "@/lib/utils"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { CompleteLessonRequest, DescompleteLessonRequest } from "@/lib/requests"
import { toast } from "sonner"

interface CompletedStates {
  [key: number]: boolean;
}

export const SidebarSection = ({
  section,
  handleClick,
}: SidebarSectionProps) => {
  useEffect(() => {
    if (section?.lessons) {
      const initialCompletedStates = section.lessons.reduce((acc: any, lesson) => {
        acc[lesson.id] = lesson.completed || false;
        return acc;
      }, {});
      setCompletedStates(initialCompletedStates);
    }
  }, [section]);

  const [completedStates, setCompletedStates] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const handleAccordionToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleCheckboxClick = async  (e: any, lessonId: number) => {
    e.stopPropagation()
    const currentCompletedState: boolean = (completedStates as CompletedStates)[lessonId]
    setCompletedStates((prevStates: CompletedStates) => ({
      ...prevStates,
      [lessonId]: !prevStates[lessonId],
    }))
    if (!currentCompletedState) {
      const [request] = await CompleteLessonRequest(lessonId)
      if (request.status === 200) {
        toast.success('Se actualizó el estado de la lección')
      } else {
        toast.error('No se pudo actualizar el estado de la lección')
      }
    } else {
      const [request] = await DescompleteLessonRequest(lessonId)
      if (request.status === 200) {
        toast.success('Se actualizó el estado de la lección')
      } else {
        toast.error('No se pudo actualizar el estado de la lección')
      }
    }
  }

  return (
    <AccordionItem value={section.name} key={section.name}>
      <div className="flex items-center">
        <AccordionTrigger
          className={`${isOpen ? "open" : ""}`}
          onClick={handleAccordionToggle}
        >
          <IconChevronUp className={cn("size-5", { "rotate-180": !isOpen })} />
          {section.name}
        </AccordionTrigger>
      </div>
      <Separator className="border " />
      <AccordionContent className="w-full p-0">
        <ul>
          {section?.lessons?.map((lesson: Lesson) => {
            return (
            <li
              className="dark:hover:bg-slate-800 py-3 pl-3 cursor-pointer"
              onClick={handleClick.bind(null, section.id, lesson.id)}
              key={lesson.id}
            >
              <div className="flex items-center p-0 space-x-3">
                <Checkbox
                  onClick={(e) => handleCheckboxClick(e, lesson.id)}
                  checked={(completedStates as CompletedStates)[lesson.id]}
                />
                <span>{lesson.title}</span>
              </div>
            </li>
          )})}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
