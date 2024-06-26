import React, { MouseEventHandler, useEffect, useState } from "react"
import { IconX } from "@tabler/icons-react"

import { SelectWithListProps } from "@/types/forms"

import MotionButton from "../animations/MotionButton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const SelectWithList = ({
  Icon,
  info,
  data,
  setData,
  label,
  placeholder,
  buttonLabel,
  modalSetter,
}: SelectWithListProps) => {
  const handleSelect = (e: string) => {
    const parsed_e = JSON.parse(e)
    setData([
      ...data,
      {
        name: parsed_e.name,
        id: JSON.stringify(parsed_e.id),
        academy_id: JSON.stringify(parsed_e.academy_id),
      },
    ])
  }

  const removeItem = (index: number) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  return (
    <div className="mb-2">
      <div className="my-2 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor="course_learning_routes">{label}</label>
      </div>
      {data.map((data_child: any, index: number) => (
        <div key={index} className="flex w-full items-center gap-3 ">
          <span className="bg-blue-dark dark:text-blue-dark my-2 w-full rounded-md border p-2 text-sm font-semibold text-white dark:bg-white">
            {data_child.name}
          </span>
          <div
            onClick={() => removeItem(index)}
            className=" cursor-pointer rounded-lg border border-red-600 p-2 text-red-600 hover:bg-red-600 hover:text-red-100"
          >
            <IconX className="size-6" />
          </div>
        </div>
      ))}
      <div className="flex items-center justify-start space-x-3">
        <Select onValueChange={(e) => handleSelect(e)}>
          <SelectTrigger className="my-2">
            <SelectValue
              className="text-muted-foreground"
              placeholder={placeholder}
            />
          </SelectTrigger>
          <SelectContent>
            {info.map((info_child: any) => (
              <SelectItem
                key={info_child.id}
                value={JSON.stringify({
                  id: info_child?.id,
                  name: info_child?.name,
                  academy_id: info_child?.academy_id,
                })}
              >
                {info_child.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <MotionButton
          className="whitespace-nowrap font-semibold"
          onClick={() => {
            modalSetter(true)
          }}
        >
          {buttonLabel}
        </MotionButton>
      </div>
    </div>
  )
}

export default SelectWithList
