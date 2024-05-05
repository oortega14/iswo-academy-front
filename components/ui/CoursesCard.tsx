import { CoursesCardProps } from "@/types/courses"
import { Button } from "./button"
import { MotionDiv } from "../animations/MotionDiv"

const CoursesCard = ({
  title,
  price,
  description,
  imageUrl,
  course_condition
}: CoursesCardProps) => {
  function truncarTexto(texto: string, longitudMaxima: number) {
    if (texto.length > longitudMaxima) {
      return texto.slice(0, longitudMaxima) + "..."
    } else {
      return texto
    }
  }
  return (
    <MotionDiv
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 1.05 }}
      className="
        relative mx-5 my-6 h-96 w-72 cursor-pointer rounded-xl bg-gray-100 shadow-lg
        shadow-slate-500 dark:shadow-slate-800
      "
    >
      {!!imageUrl ? (
        <img
          src={imageUrl}
          alt="imagen-course"
          className="h-full w-full rounded-xl object-cover opacity-80"
        />
      ) : (
        <img
          src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="imagen-course"
          className="h-full w-full rounded-xl object-cover opacity-80"
        />
      )}

      <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center space-y-5 rounded-xl bg-black/80 py-10 text-white dark:bg-black/80">
        <span className="px-5 text-center text-3xl font-semibold">{title}</span>
        <span className="px-5 text-center text-sm">{truncarTexto(description, 120)}</span>
        <div className="dark:text-blue-dark bg-blue-dark rounded-xl p-3 text-white dark:bg-slate-200">
          {course_condition === 'ofInterest' ? (
            <span>Precio: {price} COP</span>
          ) : (
            <span>Curso Adquirido</span>
          )}

        </div>
      </div>
    </MotionDiv>
  )
}

export default CoursesCard
