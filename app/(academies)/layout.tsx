import BannerSection from "@/components/home/BannerSection"
import FeaturedAcademies from "@/components/home/FeaturedAcademies"
import Footer from "@/components/home/Footer"
import Header from "@/components/home/Header"
import { MotionDiv } from "@/components/animations/MotionDiv"
import CategoriesSection from "@/components/academies/CategoriesSection"

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function AcademiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MotionDiv
      className="w-full"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="relative top-28 overflow-hidden">{children}</main>
      <Footer />
    </div>
    </MotionDiv>
  )
}
