import BannerSection from "@/components/home/BannerSection"
import FeaturedAcademies from "@/components/home/FeaturedAcademies"
import Footer from "@/components/home/Footer"
import Header from "@/components/home/Header"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="relative overflow-hidden top-20">{children}</main>
      <BannerSection />
      <FeaturedAcademies />
      <Footer />
    </div>
  )
}