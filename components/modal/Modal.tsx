import { MotionDiv } from "../animations/MotionDiv"
import Backdrop from "./Backdrop"

const Modal = ({ children, handleClose}) => {
  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      }
    }
  }
  return (
    <Backdrop onClick={handleClose}>
      <MotionDiv
        onClick={(e)=> e.stopPropagation()}
        className="w-full lg:w-1/2 m-auto p-2 rounded-md flex flex-col items-center"
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        {children}
        <button onClick={handleClose}>Close</button>
      </MotionDiv>
    </Backdrop>
  )
}

export default Modal
