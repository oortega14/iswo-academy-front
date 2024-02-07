import React, { SetStateAction } from "react"
import { Lesson } from "./sidebar";

export interface CourseSection {
  id:       number;
  name:     string;
  position: number;
  lessons:  Lesson[];
}

export interface EditLessonsModalProps {
  modalOpen: boolean
  close: () => void
  lessonId: number
}

export interface DeleteLessonsModalProps {
  modalOpen: boolean
  lessonId: number
  close: () => void
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface DeleteSectionModalProps {
  modalOpen: boolean
  sectionId: number
  close: () => void
  deleteFlag: boolean
  setDeleteFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface DeleteCourseModalProps {
  modalOpen: boolean
  courseId: number
  close: () => void
  deleteFlag: boolean
  setDeleteFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface DeleteAccountModalProps {
  modalOpen: boolean
  userId: number
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
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface SearchModalProps {
  modalOpen: boolean
  close: () => void
}

export interface EditSectionModalProps {
  modalOpen: boolean
  close: () => void
  sectionId: number
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface DeleteQuestionModalProps {
  modalOpen: boolean
  questionId: number
  close: () => void
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface DeleteAnswerModalProps {
  modalOpen: boolean
  answerId: number
  close: () => void
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface EditAnswersModalProps {
  modalOpen: boolean
  close: () => void
  questionId: number
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface EditAnswerModalProps {
  modalOpen: boolean
  close: () => void
  answerId: number
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}

export interface EditCourseModalProps {
  modalOpen: boolean
  close: () => void
  courseId: number
}

export interface UploadProgressModalProps{
  modalOpen: boolean
  close: () => void
  uploadProgress: number
}

export interface CreateSectionsModalProps {
  modalOpen: boolean
  close: () => void
  flag: boolean
  setFlag: React.Dispatch<SetStateAction<boolean>>
}
