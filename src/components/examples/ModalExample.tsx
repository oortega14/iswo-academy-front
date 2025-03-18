import { useState } from 'react';
import { Modal } from '../../components/ui/Modal/Modal';

export const ModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);

  const handleConfirm = () => {
    console.log('Acción confirmada');
    closeConfirmModal();
  };

  const handleCancel = () => {
    console.log('Acción cancelada');
    closeConfirmModal();
  };

  const handleFormSubmit = () => {
    console.log('Formulario enviado');
    closeFormModal();
  };

  return (
    <div className='space-y-4 p-28'>
      <h1 className='text-2xl font-bold'>Ejemplos de Modal</h1>
      <div className='flex flex-wrap gap-4'>
        <button
          onClick={openModal}
          className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
        >
          Modal Informativo
        </button>
        <button
          onClick={openConfirmModal}
          className='rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700'
        >
          Modal de Confirmación
        </button>
        <button
          onClick={openFormModal}
          className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'
        >
          Modal con Formulario
        </button>
      </div>

      {/* Modal informativo simple */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className='w-full max-w-md p-6'
      >
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
        <h2 className='mb-4 text-xl font-bold dark:text-white'>Modal Simple</h2>
        <div className='mt-2'>
          <p>Este es un modal simple con solo información.</p>
        </div>
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        className='w-full max-w-md p-6'
      >
        <button
          onClick={closeConfirmModal}
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
        <h2 className='mb-4 text-xl font-bold dark:text-white'>
          Confirmar Acción
        </h2>
        <div className='mt-2'>
          <p>¿Estás seguro de que deseas realizar esta acción?</p>
        </div>
        <div className='mt-6 flex justify-end space-x-2'>
          <button
            onClick={handleCancel}
            className='rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Confirmar
          </button>
        </div>
      </Modal>

      {/* Modal con formulario */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
        className='w-full max-w-md p-6'
      >
        <button
          onClick={closeFormModal}
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
        <h2 className='mb-4 text-xl font-bold dark:text-white'>
          Formulario Personalizado
        </h2>
        <div className='mt-2'>
          <form className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Nombre
              </label>
              <input
                type='text'
                id='name'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                placeholder='Tu nombre'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                placeholder='tu@email.com'
              />
            </div>
          </form>
        </div>
        <div className='mt-6 flex justify-end space-x-2'>
          <button
            onClick={closeFormModal}
            className='rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
          >
            Cancelar
          </button>
          <button
            onClick={handleFormSubmit}
            className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Enviar
          </button>
        </div>
      </Modal>
    </div>
  );
};
