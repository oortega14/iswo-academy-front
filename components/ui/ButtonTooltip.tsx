import React from "react"
import { ButtonTooltipProps } from "@/types/courses"
import MotionButton from "../animations/MotionButton"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const ButtonTooltip = ({ tooltip, icon, onClick }: ButtonTooltipProps) => {
  const IconComponent = icon as React.ComponentType
  const handleButtonClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <MotionButton
          variant="ghost"
          className=" border-[1px]"
          onClick={handleButtonClick}
        >
          <IconComponent />
        </MotionButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default ButtonTooltip
