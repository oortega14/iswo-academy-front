"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { AcademyCardProps } from "@/types/academies"

const AcademyCard = ({ imageUrl, name, description }: AcademyCardProps) => {
  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }
  return (
    <Card className="flex min-h-[400px] w-[300px] flex-col items-center justify-center">
      <CardHeader >
        {!!imageUrl ? (
          <div className="flex w-full items-center justify-center">
            <img
              src={imageUrl}
              alt="imagen-course"
              className="h-[180px] w-[180px] rounded-xl object-cover opacity-80"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">

            <img
              src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="imagen-course"
              className="h-[180px] w-[180px] rounded-xl object-cover opacity-80"
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <h3 className="mb-3 text-xl font-extrabold">{name}</h3>
        <h4 className="text-md">{!!description && truncarTexto(description, 100)}</h4>
      </CardContent>
    </Card>
  )
}

export default AcademyCard
