export type LessonCompletionStates = {
  [lessonId: number]: "created" | "incompleted" | "completed"
}