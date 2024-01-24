import { MotionDiv } from "@/components/animations/MotionDiv"
import CategoriesSection from "@/components/academies/CategoriesSection"

export default function AcademiesPage() {
  return (
    <>
      <div className="mt-10 flex items-center gap-x-10">
        <MotionDiv
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="w-1/2 flex-col items-center justify-center pl-24"
        >
          <h2 className="font-extrabold text-4xl mb-5">
            Encuentra la mejor <br />
            academia para tí
          </h2>
          <p className="mt-3 text-pretty text-left ">
            Aqui podras encontrar las diferentes academias segun sus categorias
            para que encuentres un espacio grato hacia tus objetivos la idea es
            que pueda expresar mucho de lo que quieres aprender en jaja{" "}
          </p>
        </MotionDiv>
        <div className="w-1/2 flex justify-center pr-24 ">
          <div className="w-2/3 flex justify-center">
            <div className="rounded-full overflow-hidden w-full h-[450px] flex justify-center">
              <img
                src="/images/academies_banner.webp"
                alt="academies"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <CategoriesSection />
    </>
  )
}
