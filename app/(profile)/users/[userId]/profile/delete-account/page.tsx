import { MotionDiv } from "@/components/animations/MotionDiv";
import DashboardContent from "@/components/dashboard/content/DashboardContent";
import ProfileSidebar from "@/components/dashboard/sidebar/ProfileSidebar";
import DeleteAccount from "@/components/profile/DeleteAccount";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function UserPages() {
  return (
    <MotionDiv
      className="w-full"
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <section>
        <div className="flex min-h-screen overflow-y-hidden ">
          <ProfileSidebar />
          <DeleteAccount />
        </div>
      </section>
    </MotionDiv>
  )
}
