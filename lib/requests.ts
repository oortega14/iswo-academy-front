import { Answer } from "@/types/courses"
import {
  ConfigurateAcademyParams,
  CreateCourseSectionRequestProps,
  CreateLearningRouteParams,
  FetchRegisterParams,
  TokenResetProps,
  UpdateAccountParams,
  UpdateLearningRouteParams,
  UpdateSectionRequestParams,
} from "@/types/requests"

import { Question } from "../types/courses"
import { UpdateInfoUserParams } from "../types/requests"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

// Register

export async function RegisterNewUser(data: FetchRegisterParams) {
  try {
    const request = await fetch(`${baseUrl}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

//email-verification

export async function FetchEmailVerification(userId: string | string[]) {
  try {
    const request = await fetch(`${baseUrl}/email_verification?id=${userId}`, {
      method: "GET",
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {}
}

export async function SendTokenEmailVerification(token: string | null) {
  try {
    const request = await fetch(`${baseUrl}/users/${token}/confirm_email`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {}
}

//reset-email

export async function SendTokenResetEmail({
  token,
  password,
  data,
}: TokenResetProps) {
  try {
    const request = await fetch(
      `${baseUrl}/users/${token}/confirm_reset_password?password=${password}`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data),
      }
    )
    const response = await request.json()
    return [request, response]
  } catch (e) {}
}

//academies

export async function FetchAcademiesByCategory() {
  try {
    const request = await fetch(`${baseUrl}/academies`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function ConfigurateAcademy(userData: ConfigurateAcademyParams) {
  try {
    const request = await fetch(`${baseUrl}/academies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function FetchCoursesByAcademyId(id: string) {
  try {
    const request = await fetch(`${baseUrl}/courses?academy_id=${id}`, {
      method: "GET",
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

//logout
export async function Logout() {
  try {
    const request = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

//user-profile

export async function UpdateInfoUser({
  userConfiguration,
  userSocialNetwork,
  userId,
}: UpdateInfoUserParams) {
  let data3 = {
    user: {
      ...userConfiguration,
      social_network_attributes: { ...userSocialNetwork },
    },
    section: "information",
  }
  try {
    const request = await fetch(`${baseUrl}/users/${userId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data3),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function UpdateAccountRequest({
  data,
  userId,
}: UpdateAccountParams) {
  let data2 = {
    user: { ...data },
    section: "account_params",
  }
  try {
    const request = await fetch(`${baseUrl}/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
      body: JSON.stringify(data2),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function DeleteAccountRequest(userId: number) {
  try {
    const request = await fetch(`${baseUrl}/users/${userId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
    })

    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function CreateLearningRoute(
  learningRouteData: CreateLearningRouteParams
) {
  try {
    const request = await fetch(`${baseUrl}/learning_routes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(learningRouteData),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function DeleteCourseRequest(courseId: number) {
  try {
    const request = await fetch(`${baseUrl}/courses/${courseId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function DeleteLessonRequest(lessonId: number) {
  try {
    const request = await fetch(`${baseUrl}/lessons/${lessonId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function DeleteSectionRequest(sectionId: number) {
  try {
    const request = await fetch(`${baseUrl}/course_sections/${sectionId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    console.log(e)
    throw new Error("Error al realizar la solicitud")
  }
}

export async function CreateCourseSectionRequest({
  courseId,
  position,
  name,
}: CreateCourseSectionRequestProps) {
  const data = {
    position: position,
    name: name,
    course_id: courseId,
  }
  const data2 = {
    course_section: { ...data },
  }
  try {
    const request = await fetch(`${baseUrl}/course_sections`, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
      body: JSON.stringify(data2),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function UpdateLearningRoute({
  learningRouteData,
  learningRouteId,
}: UpdateLearningRouteParams) {
  try {
    const request = await fetch(
      `${baseUrl}/learning_routes/${learningRouteId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(learningRouteData),
      }
    )
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function UpdateSectionRequest({
  sectionData,
  sectionId,
}: UpdateSectionRequestParams) {
  try {
    const request = await fetch(`${baseUrl}/course_sections/${sectionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(sectionData),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function addNewQuestionRequest(question: string, courseId: string) {
  const newQuestion = {
    course_test_id: courseId,
    question: question,
  }
  try {
    const request = await fetch(`${baseUrl}/test_questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newQuestion),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function sendAnswersRequest(answers: Answer[], questionId: number) {
  try {
    const request = await fetch(`${baseUrl}/question_options/create_answers?question_id=${questionId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answers: answers}),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function EditQuestionRequest(question: { question: string }, questionId: number) {
  try {
    const request = await fetch(`${baseUrl}/test_questions/${questionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(question),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function DeleteQuestionRequest(questionId: number) {
  try {
    const request = await fetch(`${baseUrl}/test_questions/${questionId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
    })

    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function EditAnswerRequest(answer: { option_text: string }, answerId: number) {
  try {
    const request = await fetch(`${baseUrl}/question_options/${answerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(answer),
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function DeleteAnswerRequest(answerId: number) {
  try {
    const request = await fetch(`${baseUrl}/question_options/${answerId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      credentials: "include",
    })

    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}

export async function FetchCoursesByKeywordRequest(data: { keyword: string}) {
  try {
    const request = await fetch(`${baseUrl}/courses/search?keyword=${data.keyword}`, {
      method: "GET",
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {
    throw new Error("Error al realizar la solicitud")
  }
}
