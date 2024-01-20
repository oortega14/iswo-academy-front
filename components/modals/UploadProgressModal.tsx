

const UploadProgressModal = ({
  uploadProgress,
  modalOpen,
  close,
}: UploadProgressModalProps) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <Modal
          show={modalOpen}
          onClose={close}
          className="bg-[#030711e1] flex justify-center items-center"
        >
          <Modal.Body className="bg-[#030711e1] rounded-lg">
            <div className="flex justify-center items-center">
              <label className="text-2xl font-semibold w-full text-center">
                Progreso de carga {uploadProgress}
              </label>
            </div>

          </Modal.Body>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default UploadProgressModal
