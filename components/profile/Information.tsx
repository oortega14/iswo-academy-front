import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import InformationContent from "./InformationContent"

export const Information = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <InformationContent/>
      </div>
    </>
  )
}
export default Information
