import DashboardContent from "@/components/dashboard/content/DashboardContent";
import DashboardSettings from "@/components/dashboard/settings/DashboardSettings";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { SidebarProps } from "@/types/sidebar";

export default function MessagesPage({params}: SidebarProps) {
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
