import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncarTexto(texto: string, longitudMaxima: number) {
  if (texto.length > longitudMaxima) {
    return texto.slice(0, longitudMaxima) + "..."
  } else {
    return texto
  }
}
