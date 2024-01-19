import { MotionDiv } from "@/components/animations/MotionDiv";
import ProfileSidebar from "@/components/dashboard/sidebar/ProfileSidebar";
import Account from "@/components/profile/Account";

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
          <Account />
        </div>
      </section>
    </MotionDiv>
  )
}
