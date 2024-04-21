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

export function formatCurrency(value: number): string {
  const formattedValue = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value)

  return formattedValue
}

export function formatDate(value: string) {
  const fecha = new Date(value);
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate: any = fecha.toLocaleDateString('es-ES', options);

  return formattedDate;
}
