import { useModalStore } from '@/store/modalStore';
import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function Modal({
  children,
  isOpen,
  onClose,
  className = '',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    // Cerrar el modal al presionar la tecla Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Cerrar el modal al hacer clic fuera de él
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/90'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            stiffness: 300,
            damping: 30,
            exit: {
              duration: 0.5,
              type: 'spring',
              stiffness: 200,
              damping: 25,
            },
          }}
        >
          <motion.div
            ref={modalRef}
            className={cn(
              'relative overflow-hidden rounded-lg z-50 bg-white shadow-lg dark:bg-gray-800',
              className
            )}
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 500, opacity: 0 }}
            transition={{
              duration: 0.5,
              type: 'spring',
              stiffness: 300,
              damping: 30,
              exit: {
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 25,
              },
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Componente de uso antiguo con store para compatibilidad
export function LegacyModal() {
  const { isOpen, modalContent, closeModal } = useModalStore();

  if (!isOpen || !modalContent) return null;

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className='w-full max-w-md p-6'>
      {/* Botón de cerrar */}
      <button
        onClick={closeModal}
        className='absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      {/* Título del modal */}
      {modalContent.title && (
        <h2 className='mb-4 text-xl font-bold dark:text-white'>
          {modalContent.title}
        </h2>
      )}

      {/* Contenido del modal */}
      <div className='mt-2'>{modalContent.content}</div>

      {/* Footer con botones (opcional) */}
      {modalContent.showFooter !== false && (
        <div className='mt-6 flex justify-end space-x-2'>
          {modalContent.onCancel && (
            <button
              onClick={() => {
                modalContent.onCancel?.();
                closeModal();
              }}
              className='rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            >
              {modalContent.cancelText || 'Cancelar'}
            </button>
          )}
          {modalContent.onConfirm && (
            <button
              onClick={() => {
                modalContent.onConfirm?.();
                closeModal();
              }}
              className='rounded bg-primary px-4 py-2 text-white hover:bg-primary/90'
            >
              {modalContent.confirmText || 'Aceptar'}
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}
