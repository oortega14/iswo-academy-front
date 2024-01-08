import DashboardContent from "@/components/dashboard/content/DashboardContent"
import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import DashboardSettings from "@/components/dashboard/settings/DashboardSettings"

interface DashboardPageProps {
  params: {
    id: string;
  };
}

export default function DashboardPag({params}: DashboardPageProps) {
  const {id} = params
  return (
    <section>
      <div className="flex min-h-screen overflow-y-hidden ">
        <Sidebar id={id}/>
        <DashboardContent />
        <DashboardSettings/>
      </div>
    </section>
  )
}
