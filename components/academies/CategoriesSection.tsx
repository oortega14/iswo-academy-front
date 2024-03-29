"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useGetAcademyByCategories } from "@/hooks/useGetAcademyByCategories"

import { MotionDiv } from "../animations/MotionDiv"
import AcademyCard from "./AcademyCard"

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
    <section className="relative top-20 flex flex-col justify-center bg-slate-200 px-5 py-10 pb-20 dark:bg-slate-950 md:px-24">
      {categories?.map((category) => (
        <div key={category.id}>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl ">
            {category.name}
          </h2>
          <hr className="mt-6 border-2 border-slate-900 dark:border-slate-400" />
          <div className="my-8 flex items-center justify-start gap-x-4">
            {category?.academies.map((academy) => (
              <MotionDiv
                key={academy?.id}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => handleNavigate(academy.id)}
              >
                <AcademyCard
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
