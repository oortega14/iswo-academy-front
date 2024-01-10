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

export interface EditQuestionModalProps {
  modalOpen: boolean
  close: () => void
  questionId: number
}

export interface DeleteQuestionModalProps {
  modalOpen: boolean
  questionId: number
  close: () => void
}

export interface EditAnswersModalProps {
  modalOpen: boolean
  close: () => void
  questionId: number
}

export interface EditAnswerModalProps {
  modalOpen: boolean
  close: () => void
  answerId: number
}
