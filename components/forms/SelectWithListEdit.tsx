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
import { useParams } from "next/navigation"

interface CourseLearningRoute {
  id:                   string | null;
  course_id:            string;
  learning_route_id:    string;
  learning_route_name:  string;
  _destroy:             string;
}

const SelectWithListEdit = ({
  Icon,
  info,
  data,
  setData,
  label,
  placeholder,
  buttonLabel,
  modalSetter,
  setFinalData
}: SelectWithListProps) => {
  const { courseId } = useParams<{courseId: string}>()
  const [courseLearningRoutes, setCourseLearningRoutes] = useState<CourseLearningRoute[]>([])

  useEffect(() => {
    const dataWithDestroy = data.map((item: any) => {
      return { ...item, _destroy: '0' }
    })
    setCourseLearningRoutes(dataWithDestroy)
  }, [data])

  const handleSelect = (e: string) => {
    const parsed_e = JSON.parse(e)
    setCourseLearningRoutes([
      ...courseLearningRoutes,
      {
        id: null,
        course_id: courseId,
        learning_route_id: JSON.stringify(parsed_e.id),
        learning_route_name: parsed_e.name,
        _destroy: '0'
      },
    ])
  }

  const removeItem = (indexToRemove
    : number) => {
    const newData: any = [...courseLearningRoutes]
    const newArray = newData.map((item: any, index: number) => {
      if (index === indexToRemove) {
        return { ...item, _destroy: "1" }
      }
      return item
    })
    setCourseLearningRoutes(newArray)
  }

  useEffect(() => {
    const newData: any = [...courseLearningRoutes]
    let filteredArray = newData
      .filter((item: any) => !(item.id === null && item._destroy === '1'))
      .map((item: any) => {
        if (item.id === null) {
          return { learning_route_id: item.learning_route_id };
        } else {
          let { learning_route_name, ...rest } = item;
          return rest;
        }
      });
    setFinalData(filteredArray)
  }, [courseLearningRoutes])


  return (
    <div className="mb-2">
      <div className="my-2 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor="course_learning_routes">{label}</label>
      </div>
      {courseLearningRoutes.map((data_child: any, index: number) => (
        <div key={index} className={`flex w-full items-center gap-3 ${data_child._destroy === '1' ? 'hidden' : ''}`}>
          <span className="bg-blue-dark dark:text-blue-dark my-2 w-full rounded-md border p-2 text-sm font-semibold text-white dark:bg-white">
            {data_child.learning_route_name}
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

export default SelectWithListEdit
