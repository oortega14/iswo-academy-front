import React from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { MotionButton } from "../animations/MotionButton"
import { Button } from "./button"
import { ButtonTooltipProps } from "@/types/courses"

const ButtonTooltip = ({tooltip, icon, onClick }: ButtonTooltipProps) => {
  const IconComponent = icon as React.ComponentType;
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <MotionButton whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            className=" border-[1px]"
            onClick={handleButtonClick}
          >
            <IconComponent/>
          </Button>
        </MotionButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default ButtonTooltip
