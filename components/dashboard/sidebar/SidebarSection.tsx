import { useState } from "react"
import { Separator } from "@radix-ui/react-select"
import {
  IconChevronUp,
} from "@tabler/icons-react"
import { Lesson, SidebarSectionProps } from "@/types/sidebar"
import { cn } from "@/lib/utils"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export const SidebarSection = ({
  section,
  handleClick,
}: SidebarSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAccordionToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AccordionItem value={section.name} key={section.name}>
      <div className="flex items-center">
        <AccordionTrigger
          className={`AccordionTrigger ${isOpen ? "open" : ""}`}
          onClick={handleAccordionToggle}
        >
          <IconChevronUp className={cn("size-5", { "rotate-180": !isOpen })} />
          {section.name}
        </AccordionTrigger>
      </div>
      <Separator className="border " />
      <AccordionContent className="w-full p-0">
        <ul>
          {section?.lessons.map((lesson: Lesson) => (
            <li  className="dark:hover:bg-slate-800 py-3 pl-3 cursor-pointer">
              <div className="flex items-center p-0 space-x-3">
                <Checkbox />
                <div
                  onClick={handleClick.bind(null, section.id, lesson.id)}
                >
                  {lesson.title}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
