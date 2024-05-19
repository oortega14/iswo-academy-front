import React, { useEffect, useState } from "react"
import { IconX } from "@tabler/icons-react"

import { ListItemsFromInputProps } from "@/types/forms"

import { Input } from "../ui/input"

const ListItemsFromInputEdit = ({
  Icon,
  data,
  setData,
  label,
  placeholder,
  buttonLabel,
  setFinalData,
}: ListItemsFromInputProps) => {
  const [newDescription, setNewDescription] = useState("")
  const [goals, setGoals] = useState<any>([])

  useEffect(() => {
    setData(data.filter((goal) => goal.description.trim() !== ""))
  }, [])

  useEffect(() => {
    const dataWithDestroy = data.map((item: any) => {
      return { ...item, _destroy: "0" }
    })
    setGoals(dataWithDestroy)
  }, [data])

  console.log(goals)

  const handleChangeGoal = (e: string) => {
    const parsed_e = JSON.parse(e)
    const updatedGoals = goals.map((goal: any, index: number) =>
      index === parsed_e.indexGoal ? { ...goal, description: parsed_e.value } : goal
    )
    setGoals(updatedGoals)
  }

  const handleChangeInputNewGoal = (e: any) => {
    e.preventDefault()
    const { value } = e.target
    setNewDescription(value)
  }

  const insertNewGoal = (e: any) => {
    e.preventDefault()
    if (newDescription !== "") {
      setGoals([
        ...goals,
        { id: null, description: newDescription, _destroy: "0" },
      ])
      setNewDescription("")
    }
  }

  const removeGoal = (indexToRemove: number) => {
    const newData: any = [...goals]
    const newArray = newData.map((item: any, index: number) => {
      if (index === indexToRemove) {
        return { ...item, _destroy: "1" }
      }
      return item
    })
    setGoals(newArray)
  }

  useEffect(() => {
    const newData: any = [...goals]
    let filteredArray = newData
      .filter((item: any) => !(item.id === null && item._destroy === '1'))
      .map((item: any) => {
        if (item.id === null) {
          return { description: item.description };
        } else {
          return item;
        }
      });
    setFinalData(filteredArray)
  }, [goals])

  return (
    <div className="mb-2">
      <div className="my-2 flex w-full items-center justify-start rounded-full">
        <Icon className="mr-2 size-5" />
        <label htmlFor="course_goals">{label}</label>
      </div>
      {goals.map((goal: any, index: number) => (
        <div
          key={goal.id}
          className={`flex w-full items-center gap-3 ${
            goal._destroy === "1" ? "hidden" : ""
          }`}
        >
          <Input
            type="text"
            name="description"
            value={goal.description}
            onChange={(e) =>
              handleChangeGoal(
                JSON.stringify({ value: e.target.value, indexGoal: index })
              )
            }
            className="text-sm my-1"
          />
          <div
            onClick={() => removeGoal(index)}
            className=" hover:text-blue-dark cursor-pointer rounded-lg border border-red-600 p-2 text-red-600 hover:bg-red-600"
          >
            <IconX className="size-6" />
          </div>
        </div>
      ))}
      <div className="flex space-x-3 mt-2">
        <Input
          type="text"
          name="description"
          value={newDescription}
          onChange={(e) => handleChangeInputNewGoal(e)}
          placeholder={placeholder}
          className="text-sm"
        />
        <button
          className="bg-blue-dark dark:text-blue-dark text-nowrap rounded-lg px-3 py-2 font-bold text-slate-200 hover:scale-95 dark:bg-slate-200 text-sm"
          onClick={insertNewGoal}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}

export default ListItemsFromInputEdit
