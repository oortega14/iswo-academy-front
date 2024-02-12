import { AnimatePresence } from "framer-motion"
import { SearchModalProps } from "@/types/modals"
import Modal from "../ui/Modal"
import Loader from "../ui/Loader"

const LoadingModal = () => {
  const handleClose = () => {}
  const modalOpen = true
  return (
    <AnimatePresence>
      <Modal modalOpen={modalOpen} handleClose={handleClose}>
        <Loader/>
      </Modal>
    </AnimatePresence>
  )
}

export default LoadingModal
