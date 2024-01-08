import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function FetchEmailVerification(){
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  try {
    const request = await fetch(`${baseUrl}/email_verification?id=19`, {
      method: 'GET',
      credentials: "include",
    })
    const response = await request.json()
    return [request, response]
  } catch (e) {}
}
