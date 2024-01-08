import { JetBrains_Mono as FontMono, Inter as FontSans, Montserrat_Alternates } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const monserratAlternates = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['400']
})
