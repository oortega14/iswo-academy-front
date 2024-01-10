import { MotionDiv } from "../animations/MotionDiv"

const Backdrop = ({children, onClick}) => {
  return (
    <MotionDiv
      className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-[#030711e1]"
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
