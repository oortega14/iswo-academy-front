import { MotionDiv } from "@/components/animations/MotionDiv";
import AcademiesStatistics from "@/components/dashboard/superadmin/AcademiesStatistics";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function SuperAdminAcademiesPage() {
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
      <AcademiesStatistics />
    </MotionDiv>
  );
}
