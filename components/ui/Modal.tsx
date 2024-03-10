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
        className="flex w-full flex-col items-center rounded-md p-2 lg:w-1/2"
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
