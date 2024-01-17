import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import InformationContent from "./InformationContent"
import PhotoContent from "./PhotoContent"

export const Photo = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <PhotoContent/>
      </div>
    </>
  )
}
export default Photo
