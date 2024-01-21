import React from "react"

export interface InputWithIconProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  placeholder: string
  name: string
  defaultValue?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface TextareaWithIconProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  placeholder: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export interface InputFileWithImageProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  image:  string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InputFileWithVideoProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  video:  {
    name: string
  }
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface Goal {
  description: string;
}

export interface ListItemsFromInputProps {
  Icon:  React.ComponentType<{ className?: string }>
  data: Goal[]
  setData: React.Dispatch<React.SetStateAction<Goal[]>>
  label: string
  placeholder: string
  buttonLabel: string
}
