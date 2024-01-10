import React from "react"
import { MotionDiv } from "../animations/MotionDiv"
import Backdrop from "./Backdrop"

interface ModalProps {
  children: React.ReactNode
  handleClose: () => void
  modalOpen: boolean
}

const Modal = ({ modalOpen, handleClose, children} : ModalProps) => {
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
      </MotionDiv>
    </Backdrop>
  )
}

export default Modal
