import { ConfigurateAcademyParams, FetchRegisterParams, TokenResetProps } from "@/types/requests"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

// Register

export async function RegisterNewUser(data: FetchRegisterParams){
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
    throw new Error("Error al realizar la solicitud");
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
    throw new Error("Error al realizar la solicitud");
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
    throw new Error("Error al realizar la solicitud");
  }
}

//logout
export async function Logout() {
  try {
    const request = await fetch(`${baseUrl}/logout`,{
      method: 'POST',
      credentials: 'include'
    });
    const response = await request.json()
    return [request, response];
  } catch (e) {
    throw new Error("Error al realizar la solicitud");
  }
}
