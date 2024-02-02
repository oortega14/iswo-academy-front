import { useState } from "react"

import { InputFileWithListProps } from "@/types/forms"
import { cn } from "@/lib/utils"

import Figure from "../dashboard/content/Figure"
import { Input } from "../ui/input"

const InputFileWithList = ({
  Icon,
  label,
  name,
  defaultFiles,
  files,
  setFiles,
}: InputFileWithListProps) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFiles([...files, selectedFile])
    }
  }

  return (
    <div>
      {!!defaultFiles && defaultFiles.length > 0 && files.length === 0 ? (
        <>
          <div className={cn("flex items-center space-x-5")}>
            <ul>
              {defaultFiles.map((file: File, index: number) => (
                <li key={index} className="my-4">
                  {index + 1}. {file.name}
                </li>
              ))}
            </ul>

            <Input
              type="file"
              id={name}
              onChange={(e) => handleFile(e)}
              className={cn("mt-2", {
                "flex space-x-5 items-center ml-3": files.length > 0,
              })}
            />
          </div>
        </>
      ) : (
        <>
          <div className="mt-3 flex w-full items-center justify-start rounded-full">
            <Icon className="mr-2 size-5" />
            <label htmlFor={name}>{label}</label>
          </div>
          <div
            className={cn({
              "flex space-x-5 items-center": files.length > 0,
            })}
          >
            {files.length > 0 && (
              <ul>
                {files.map((file: File, index: number) => (
                  <li key={index} className="my-4">
                    {index + 1}. {file.name}
                  </li>
                ))}
              </ul>
            )}

            <Input
              type="file"
              id={name}
              onChange={(e) => handleFile(e)}
              className={cn("mt-2", {
                "flex space-x-5 items-center ml-3": files.length > 0,
              })}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default InputFileWithList
