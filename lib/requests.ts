const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export async function FetchEmailVerification(){
  try {
    const request = await fetch(`${baseUrl}/email_verification?id=19`, {
      method: 'GET',
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {}
}

export async function FetchCoursesByAcademyId( id: string ){
  try {
    const request = await fetch(`${baseUrl}/courses?academy_id=${id}`, {
      method: 'GET',
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {}
}
