import { HeaderDashboard } from "../dashboard/content/HeaderDashboard"
import AccountContent from "./AccountContent"

export const Account = () => {
  return (
    <>
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <HeaderDashboard/>
        <AccountContent/>
      </div>
    </>
  )
}
export default Account
