import React from "react"

export interface InputWithIconProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  placeholder?: string
  name: string
  defaultValue?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface TextareaWithIconProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  placeholder?: string
  name: string
  defaultValue?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export interface InputFileWithImageProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  name: string
  previewImage: string
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>
  defaultImage?: string
  setImage: React.Dispatch<React.SetStateAction<Blob>>
}

export interface InputFileWithVideoProps {
  Icon:  React.ComponentType<{ className?: string }>
  label: string
  video:  {
    name: string
  }
  name: string
  defaultVideo?: string
  setVideo: React.Dispatch<React.SetStateAction<{ name: string }>>
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
