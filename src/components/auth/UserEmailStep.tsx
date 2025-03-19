import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motionbutton from '../ui/Motionbutton';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const UserEmailStep = () => {
  const navigate = useNavigate();
  return (
    <section className='min-h-screen w-full max-w-[1440px] p-10 lg:p-16'>
      <div className='bg-light-dotted dark:bg-dark-dotted'></div>
      <motion.div
        className='flex size-full items-center justify-center '
        variants={variants}
        initial='hidden'
        animate='visible'
        transition={{
          delay: 0,
          ease: 'easeInOut',
          duration: 0.5,
        }}
        viewport={{ amount: 0 }}
      >
        <div className='min-h-2/3  w-full max-w-[1000px] rounded-xl p-6 bg-blue-dark dark:bg-white dark:text-blue-dark  shadow-lg'>
          <motion.div
            className='flex w-full justify-center'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              ease: 'easeIn',
              duration: 0.3,
            }}
          >
            <img
              src={'/email_sent.webp'}
              alt='email_confirmado'
              className='w-40 h-40 md:w-48 md:h-48 object-contain'
            />
          </motion.div>
          <h2 className='mb-3 w-full text-center text-3xl md:text-4xl font-extrabold text-white dark:text-blue-dark'>
            Confirmación de Correo Electrónico
          </h2>
          <div className='mb-3 flex w-full items-center justify-center'>
            <p className='max-w-[850px] text-sm md:text-base text-center text-white dark:text-blue-dark'>
              Te hemos enviado un correo a la dirección ingresada en el anterior
              paso, para confirmar la validez de tu correo electrónico. Después
              de recibir el correo sigue el link que se te envió para completar
              el registro.
            </p>
          </div>
          <div className='flex w-full justify-center'>
            <hr className='w-3/4 my-4 border-gray-300 dark:border-gray-600' />
          </div>
          <div className='mt-4 flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-center md:gap-x-4'>
            <Motionbutton onClick={() => navigate('/')}>
              Volver al inicio
            </Motionbutton>
            <Motionbutton
              variant={'outline'}
              onClick={() => navigate('/login')}
            >
              Ir al login
            </Motionbutton>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UserEmailStep;
