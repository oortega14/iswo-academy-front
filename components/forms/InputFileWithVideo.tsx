import React from "react"

import { InputFileWithVideoProps } from "@/types/forms"
import { cn } from "@/lib/utils"

import { Input } from "../ui/input"

const InputFileWithVideo = ({
  Icon,
  label,
  name,
  defaultVideo,
  video,
  setVideo,
  description,
}: InputFileWithVideoProps) => {
  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!!file) {
      setVideo(file)
    }
  }

  return (
    <div className="mb-2">
      {!!defaultVideo && !video?.name ? (
        <div>
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <Icon className="mr-2 size-5" />
            <label htmlFor={name}>{label}</label>
          </div>
          {!!description && (
            <div
              className={cn("w-full", {
                "flex justify-center": !!video?.name,
              })}
            >
              <span className="text-sm text-muted-foreground ">
                {description}
              </span>
            </div>
          )}
          <div className="flex-col items-center space-x-5">
            <Input
              type="file"
              id={name}
              onChange={(e) => handleVideo(e)}
              className="mt-2 cursor-pointer"
            />
            <div className="my-4 flex max-w-[250px] items-center justify-start overflow-hidden rounded-xl ">
              <video controls>
                <source src={defaultVideo} />
              </video>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <Icon className="mr-2 size-5" />
            <label htmlFor={name}>{label}</label>
          </div>
          {!!description && (
            <div
              className={cn("w-full", {
                "flex justify-center": !!video?.name,
              })}
            >
              <span className="text-sm text-muted-foreground ">
                {description}
              </span>
            </div>
          )}
          <div
            className={cn({
              "flex-col space-x-5 items-center": !!video?.name,
            })}
          >
            <div className="w-full">
              <Input
                type="file"
                id={name}
                onChange={(e) => handleVideo(e)}
                className="mt-2 cursor-pointer"
              />
            </div>
            {!!video?.name && (
              <div className="my-4 flex max-w-[250px] items-center justify-start overflow-hidden rounded-xl ">
                <video controls>
                  <source src={URL.createObjectURL(video as any)} />
                </video>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default InputFileWithVideo
