import { ReactNode } from 'react';
import { useModalStore } from '../store/modalStore';

interface UseModalProps {
  title?: string;
  content: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showFooter?: boolean;
}

export const useModal = () => {
  const { openModal, closeModal } = useModalStore();

  const showModal = ({
    title,
    content,
    onConfirm,
    onCancel,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    showFooter = true,
  }: UseModalProps) => {
    openModal({
      title,
      content,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      showFooter,
    });
  };

  return {
    showModal,
    closeModal,
  };
}; 