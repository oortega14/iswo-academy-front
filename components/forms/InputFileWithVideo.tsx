import React from "react"

import { InputFileWithVideoProps } from "@/types/forms"
import { cn } from "@/lib/utils"

import { Input } from "../ui/input"

const InputFileWithVideo = ({
  Icon,
  label,
  name,
  video,
  onChange,
}: InputFileWithVideoProps) => {
  return (
    <div>
      <div className="mt-3 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor={name}>{label}</label>
      </div>
      <div
        className={cn({
          "flex space-x-3 items-center": !!video?.name,
        })}
      >
        {!!video?.name && (
          <div className="flex justify-start items-center rounded-xl overflow-hidden my-4 max-w-[220px]">
            <video controls>
              <source src={URL.createObjectURL(video as any)} />
            </video>
          </div>
        )}
        <Input type="file" id={name} onChange={onChange} className="mt-2" />
      </div>
    </div>
  )
}

export default InputFileWithVideo
