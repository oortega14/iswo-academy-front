import { CoursesCardProps } from "@/types/courses"
import { Button } from "./button"

const CoursesCard = ({
  title,
  price,
  description,
  imageUrl,
}: CoursesCardProps) => {
  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }
  return (
    <div
      className="
        h-96 w-72 bg-gray-100 shadow-lg shadow-slate-500 rounded-xl my-6 mx-5 relative
        dark:shadow-slate-800
      "
    >
      {!!imageUrl ? (
        <img
          src={imageUrl}
          alt="imagen-course"
          className="w-full h-full object-cover opacity-80 rounded-xl"
        />
      ) : (
        <img
          src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="imagen-course"
          className="w-full h-full object-cover opacity-80 rounded-xl"
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-black/70 rounded-xl text-white flex flex-col items-center justify-center py-10 space-y-5 dark:bg-black/80">
        <span className="font-semibold px-5 text-center text-3xl">{title}</span>
        <span className="text-center px-5 text-sm">{truncarTexto(description, 120)}</span>
        <div className="rounded-xl dark:bg-slate-200 dark:text-blue-dark bg-blue-dark text-white p-3">Precio: {price} COP</div>
        <Button variant={"secondary"}>Acceder</Button>
      </div>
    </div>
  )
}

export default CoursesCard
