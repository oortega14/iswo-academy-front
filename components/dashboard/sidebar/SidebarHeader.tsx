import { IswoIconLarge, IswoIconSmall } from "@/icons"
import { useUIStore } from "@/store/ui/ui-store"
import { IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/animations/MotionDiv"


export const SidebarHeader = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen)
  const changeSidebar = useUIStore((state) => state.changeSidebar)

  return (
    <>
      <div
        className={cn("flex items-center justify-between flex-shrink-0 px-2", {
          "lg:justify-center": !isSidebarOpen,
        })}
      >
        {isSidebarOpen ? (
          <MotionDiv
            className="w-full py-0 flex justify-center"
            initial={{ x: 0, scale: 1.2}}
              animate={{ rotate: 360, x:10 }}
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
          >
            <IswoIconLarge className="dark:invert size-28" />
          </MotionDiv>
        ) : (
          <div className="w-full py-3 flex justify-center">
            <IswoIconSmall className="dark:invert size-12" />
          </div>
        )}
        <button className="px-2 rounded-md lg:hidden" onClick={changeSidebar}>
          <IconX />
        </button>
      </div>
    </>
  )
}
export default SidebarHeader
