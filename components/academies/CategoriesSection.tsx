"use client"

import { useState } from "react"
import { useGetAcademyByCategories } from "@/hooks/useGetAcademyByCategories"
import AcademyCard from "./AcademyCard"
import { MotionDiv } from "../animations/MotionDiv"
import { useRouter } from "next/navigation"

const CategoriesSection = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const categories = useGetAcademyByCategories({
    setLoadingCallback: setLoading,
  })

  const handleNavigate = (academyId: number) => {
    router.push(`/academies/${academyId}`)
  }

  if (loading) {
    return <span></span>
  }
  return (
    <section className="relative top-20 flex flex-col justify-center bg-slate-200 px-5 py-10 md:px-24 dark:bg-slate-950 pb-20">
      {categories?.map((category) => (
        <div key={category.id}>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl ">
            {category.name}
          </h2>
          <hr className="mt-6 border-2 border-slate-900 dark:border-slate-400" />
          <div className="flex items-center justify-start gap-x-4 my-8">
            {category?.academies.map((academy) => (
              <MotionDiv
                whileHover={{scale: 0.95}}
                whileTap={{scale: 1.05}}
                className="cursor-pointer"
                onClick={()=>handleNavigate(academy.id)}
              >
                <AcademyCard
                  key={academy?.id}
                  imageUrl={academy?.logo}
                  name={academy?.name}
                  description={academy?.description}
                />
              </MotionDiv>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default CategoriesSection
