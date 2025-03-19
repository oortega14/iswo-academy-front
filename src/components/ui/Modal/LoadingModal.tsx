import { Modal } from './Modal';
import { IswoIconSmall } from '@/icons/IswoIconSmall';
import { motion } from 'framer-motion';

const LoadingModal = () => {
  return (
    <Modal isOpen={true} onClose={() => {}} className='w-full max-w-md p-6'>
      <div className='flex flex-col items-center justify-center py-4'>
        <div className='mb-4 relative w-24 h-24 '>
          <motion.div
            className='absolute inset-0'
            animate={{
              rotate: [0, 0, 0, 360, 360],
              scale: [1, 1, 1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              times: [0, 0.4, 0.5, 0.7, 1],
              ease: 'easeInOut',
            }}
          >
            <div className='w-full h-full'>
              <IswoIconSmall className='w-full h-full' />
            </div>
          </motion.div>

          <motion.div
            className='absolute bottom-0 w-full bg-white dark:bg-gray-800'
            initial={{ height: '100%' }}
            animate={{
              height: ['100%', '0%', '0%', '0%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              times: [0, 0.4, 0.6, 0.8, 1],
              ease: 'easeInOut',
            }}
          />
        </div>
        <h2 className='text-xl font-bold dark:text-white'>Cargando...</h2>
      </div>
    </Modal>
  );
};

export default LoadingModal;
