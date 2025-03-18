import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatHeaderMenuHamburguer(user: any) {
  let formattedUrl: string = ''
  switch (user?.role) {
    case 'Súper Administrador':
      return formattedUrl = `/super-admin/dashboard`
    case 'Administrador': 
      return formattedUrl = `/${user?.academy?.academy_configuration.domain}/admin/academies/${user?.academy?.id}/dashboard`
    case 'Estudiante': 
      return formattedUrl = `/${user.subscribed_academy?.domain}/student/dashboard`
    case 'Profesor': 
      return formattedUrl = `/teacher/dashboard`
  }
  return formattedUrl
}