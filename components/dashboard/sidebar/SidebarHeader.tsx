import { IswoIconLarge, IswoIconSmall } from "@/icons"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/store/ui/ui-store"
import { IconX } from "@tabler/icons-react"

export const SidebarHeader = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)

  return (
    <>
      {/* Sidebar Header */}
      <div
        className={cn("flex items-center justify-between flex-shrink-0 px-2", {
          "lg:justify-center": !isSidebarOpen,
        })}
      >
        {isSidebarOpen ? (
          <div className="w-full py-0 flex justify-center">
            <IswoIconLarge className="dark:invert size-28" />
          </div>
        ) : (
          <div className="w-full py-3 flex justify-center">
            <IswoIconSmall className="dark:invert size-12" />
          </div>
        )}
        <button className="px-2 rounded-md lg:hidden" onClick={changeSidebar}>
          <IconX/>
        </button>
      </div>
    </>
  )
}
export default SidebarHeader
