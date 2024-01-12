import DashboardContentMessages from "@/components/dashboard/content/DashboardContentMessages";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";

export default function MessagesPage() {
  return (
    <section>
      <div className="flex min-h-screen overflow-y-hidden ">
        <Sidebar/>
        <DashboardContentMessages />
      </div>
    </section>
  )
}
