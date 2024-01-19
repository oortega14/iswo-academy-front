import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import DashboardLearningRoutes from "@/components/dashboard/content/DashboardLearningRoutes"

export default function LearningRoutesPage() {
  return (
    <section>
      <div className="flex min-h-screen overflow-y-hidden ">
        <Sidebar/>
        <DashboardLearningRoutes/>
      </div>
    </section>
  )
}
