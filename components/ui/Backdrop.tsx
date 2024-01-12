import { BackdropProps } from "@/types/modals"
import { MotionDiv } from "../animations/MotionDiv"

const Backdrop = ({children, onClick}: BackdropProps) => {
  return (
    <MotionDiv
      className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[#030711e1]"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </MotionDiv>
  )
}
export default Backdrop
