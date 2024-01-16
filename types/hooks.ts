type CallbackFunction = (loading: boolean) => void;

export type GetCurrentUserProps = {
  baseUrl: string
  setLoadingCallback: CallbackFunction
}
export type getAcademyProps = {
  academyId: string
  setLoadingCallback: CallbackFunction
}

export type GetCourseProps = {
  courseId: string
  setLoadingCallback: CallbackFunction
}

export type GetCoursesProps = {
  academyId: string
  setLoadingCallback: CallbackFunction
}

export type GetLessonsProps = {
  courseId: string
  setLoadingCallback: CallbackFunction
}

export type GetQuestionsProps = {
  courseId: string
  setLoadingCallback: CallbackFunction
}

export type GetLessonProps = {
  lessonId: number
  setLoadingCallback: CallbackFunction
}

export type GetQuestionProps = {
  questionId: number
  setLoadingCallback: CallbackFunction
}

export type GetAnswersProps = {
  questionId: string
  setLoadingCallback: CallbackFunction
}

export type GetCategoriesProps = {
  setLoadingCallback: CallbackFunction
}

export type GetAnswerProps = {
  answerId: number
  setLoadingCallback: CallbackFunction
}
