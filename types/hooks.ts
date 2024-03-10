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

export type GetExamProps = {
  evaluationId: string
  userId: string
  setLoadingCallback: CallbackFunction
}

export type GetEvaluationProps = {
  evaluationId: string
  setLoadingCallback: CallbackFunction
}

export type GetCourseSectionProps = {
  sectionId: string
  setLoadingCallback: CallbackFunction
  flag: boolean
}

export type GetCoursesProps = {
  academyId: string
  setLoadingCallback: CallbackFunction
  flag: boolean
}
export type GetCourseSectionsProps = {
  courseId: string
  setLoadingCallback: CallbackFunction
  flag?: boolean
}

export type GetCoursesInformationProps = {
  userId: string
  status: number
  setLoadingCallback: CallbackFunction
}

export type GetCoursesStatusProps = {
  userId: string
  setLoadingCallback: CallbackFunction
}

export type GetLessonsProps = {
  courseId: string
  setLoadingCallback: CallbackFunction
}

export type GetQuestionsProps = {
  evaluationId: string
  setLoadingCallback: CallbackFunction
  flag: boolean
}

export type GetLessonProps = {
  lessonId: number
  setLoadingCallback: CallbackFunction
}

export type GetQuestionProps = {
  questionId: number
  setLoadingCallback: CallbackFunction
  flag: boolean
}

export type GetAnswersProps = {
  questionId: string
  setLoadingCallback: CallbackFunction
  flag: boolean
}

export type GetCategoriesProps = {
  setLoadingCallback: CallbackFunction
}

export type GetCommentsProps = {
  lessonId: string
  setLoadingCallback: CallbackFunction
  flag: boolean
}

export type GetAnswerProps = {
  answerId: number
  setLoadingCallback: CallbackFunction
  flag: boolean
}

export type GetLearningRoutesProps = {
  academyId: String
  setLoadingCallback: CallbackFunction
  changeFlag: boolean
}

export type GetLearningRouteProps = {
  learningRouteId: string
  setLoadingCallback: CallbackFunction
  changeFlag: boolean
}
export type GetAcademyByCategoryProps = {
  setLoadingCallback: CallbackFunction
}
