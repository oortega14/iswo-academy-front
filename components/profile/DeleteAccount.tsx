import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import AccountContent from "./AccountContent"
import DeleteAccountContent from "./DeleteAccountContent"

export const DeleteAccount = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <DeleteAccountContent/>
      </div>
    </>
  )
}
export default DeleteAccount
