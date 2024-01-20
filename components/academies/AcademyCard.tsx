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
    <Card className="w-[300px] min-h-[400px] flex flex-col items-center justify-center">
      <CardHeader >
        {!!imageUrl ? (
          <div className="w-full justify-center flex items-center">
            <img
              src={imageUrl}
              alt="imagen-course"
              className="w-[180px] h-[180px] object-cover opacity-80 rounded-xl"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">

            <img
              src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="imagen-course"
              className="w-[180px] h-[180px] object-cover opacity-80 rounded-xl"
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <h3 className="font-extrabold text-xl mb-3">{name}</h3>
        <h4 className="text-md">{!!description && truncarTexto(description, 100)}</h4>
      </CardContent>
    </Card>
  )
}

export default AcademyCard
