import React from "react"

export interface EditLessonsModalProps {
  modalOpen: boolean
  close: () => void
  lessonId: number
}

export interface DeleteLessonsModalProps {
  modalOpen: boolean
  lessonId: number
  close: () => void
}

export interface BackdropProps {
  children: React.ReactNode
  onClick: React.MouseEventHandler
}
