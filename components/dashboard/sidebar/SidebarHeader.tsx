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
        className={cn("flex shrink-0 items-center justify-between px-2", {
          "lg:justify-center": !isSidebarOpen,
        })}
      >
        {isSidebarOpen ? (
          <MotionDiv
            className="flex w-full justify-center py-0"
            initial={{ scale: 0 }}
              animate={{ scale: 1.3 }}
            transition={{
              duration: 1.4,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <IswoIconLarge className="size-28 dark:invert" />
          </MotionDiv>
        ) : (
          <div className="flex w-full justify-center py-3">
            <MotionDiv
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1.4,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <IswoIconSmall className="size-12 dark:invert mb-4" />
            </MotionDiv>
          </div>
        )}
        <button className="rounded-md px-2 lg:hidden" onClick={changeSidebar}>
          <IconX />
        </button>
      </div>
    </>
  )
}
export default SidebarHeader
