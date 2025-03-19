import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export interface AxiosErrorResponse {
  message: string;
  name: string;
  status?: number;
  code?: string;
  response?: {
    status?: number;
    data?: {
      error?: {
        code?: string;
        details?: string[];
        message?: string;
      };
    }
  }
}

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

export function formatAxiosError(error: AxiosErrorResponse): string {
  if (error.response?.data?.error?.details) {
    const details = error.response.data.error.details.map(detail => {
      return detail;
    });
    return details.join(', ');
  }

  if (error.response?.data?.error) {
    return error.response.data.error || 'Ocurrió un error inesperado';
  }

  // Verificar si el status está directamente en el objeto de error
  const statusCode = error.status || error.response?.status;

  switch (statusCode) {
    case 400:
      return 'Datos de solicitud inválidos';
    case 401:
      return 'No autorizado. Por favor, inicia sesión';
    case 403:
      return 'No tienes permiso para realizar esta acción';
    case 404:
      return 'Recurso no encontrado';
    case 422:
      return 'No se pudo procesar la solicitud';
    case 500:
      return 'Error interno del servidor';
    case 502:
      return 'Error de conexión con el servidor';
    default:
      return error.message || 'Ocurrió un error inesperado';
  }
}