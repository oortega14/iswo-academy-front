import React, { MouseEventHandler, useEffect, useState } from "react"
import { IconX } from "@tabler/icons-react"

import { ListItemsFromInputProps } from "@/types/forms"

import { Input } from "../ui/input"

const ListItemsFromInput = ({
  Icon,
  data,
  setData,
  label,
  placeholder,
  buttonLabel,
}: ListItemsFromInputProps) => {
  useEffect(() => {
    setData(data.filter((goal) => goal.description.trim() !== ""))
  }, [])

  const [newDescription, setNewDescription] = useState("")

  const handleChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value)
  }

  const insertNewGoal = (e: any) => {
    e.preventDefault()
    if (newDescription.trim() !== "") {
      setData([...data, { description: newDescription }])
      setNewDescription("")
    }
  }

  const removeGoal = (index: number) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  const filteredData = data.filter((goal) => goal.description.trim() !== "");

  return (
    <div>
      <div className="my-2 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor="course_goals">{label}</label>
      </div>
      {filteredData.map((goal, index) => (
        <div key={index} className="flex w-full items-center gap-3 ">
          <span className="my-2 w-full rounded-md border p-2">
            {goal.description}
          </span>
          <div
            onClick={() => removeGoal(index)}
            className=" hover:text-blue-dark cursor-pointer rounded-lg border border-red-600 p-2 text-red-600 hover:bg-red-600"
          >
            <IconX className="size-6" />
          </div>
        </div>
      ))}
      <div className="flex space-x-3">
        <Input
          type="text"
          name="description"
          value={newDescription}
          onChange={(e) => handleChangeGoal(e)}
          placeholder={placeholder}
          className=""
        />
        <button
          className="bg-blue-dark dark:text-blue-dark text-nowrap rounded-lg px-3 py-2 font-bold text-slate-200 hover:scale-95 dark:bg-slate-200"
          onClick={insertNewGoal}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default ListItemsFromInput
