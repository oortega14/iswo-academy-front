type CallbackFunction = (loading: boolean) => void;

export type GetCoursesProps = {
  academyId: string
  setLoadingCallback: CallbackFunction
}

export type GetLessonsProps = {
  courseId: string
  setLoadingCallback: CallbackFunction
}

export type GetLessonProps = {
  lessonId: number
  setLoadingCallback: CallbackFunction
}
