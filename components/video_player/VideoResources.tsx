import React, { useState } from "react"
import { IconChevronUp } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { buttonVariants } from "../ui/button"

const VideoResources = ({ lesson }: any) => {
  const files: [{ id: string; file: string }] = lesson?.files
  const [isOpen, setIsOpen] = useState(false)
  const handleAccordionToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="p-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={`${isOpen ? "open" : ""}`}
            onClick={handleAccordionToggle}
          >
            <IconChevronUp
              className={cn("size-5", { "rotate-180": !isOpen })}
            />
            Los recursos de esta clase los puedes encontrar dando click aqui
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-full mt-2 flex bg-slate-200 dark:bg-slate-900 rounded-lg ">
              {files?.map((file, index) => (
                <div key={file.id} className="p-2">
                  <a
                    target="_blank"
                    href={file.file}
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Archivo #{index}
                  </a>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default VideoResources
