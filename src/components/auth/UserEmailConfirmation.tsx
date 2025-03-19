import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Motionbutton from '../ui/Motionbutton';
import { cn } from '@/lib/utils';
import { IswoIconLarge } from '@/icons';
import Lottier from 'lottie-react';
import data from '@/animations//EmailAnimation.json';
import { useAuth } from '@/hooks/useAuth';
import { formatAxiosError, AxiosErrorResponse } from '@/lib/utils';
import { toast } from 'sonner';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const UserEmailConfirmation = () => {
  const navigate = useNavigate();
  const { confirmEmail } = useAuth();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('confirmation_token') || '';

  const handleConfirmEmail = async () => {
    try {
      await confirmEmail(token);
      navigate('/login');
      toast.success('Email confirmado correctamente');
    } catch (error) {
      toast.error(formatAxiosError(error as AxiosErrorResponse));
    }
  };

  return (
    <section className='min-h-screen w-full max-w-[1440px] p-10 lg:p-16'>
      <motion.div
        className='flex flex-col size-full items-center justify-center pt-6 lg:pt-10'
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
        <motion.div
          initial={{ x: 0, scale: 1.7 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.4,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          drag
          dragConstraints={{
            top: -100,
            left: -100,
            right: 100,
            bottom: 100,
          }}
          className='mb-5'
        >
          <IswoIconLarge className='size-24 dark:invert md:size-32' />
        </motion.div>
        <motion.div
          className='flex w-full md:max-w-[600px] lg:max-w-[800px]'
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
          <div
            className={cn(
              'flex w-full flex-col items-center justify-center rounded-lg bg-slate-950 px-4 text-white py-8',
              'shadow-md ',
              'dark:bg-slate-200 dark:text-black'
            )}
          >
            <h2 className='text-center text-4xl font-extrabold'>
              ¡Bienvenido a nuestra plataforma!
            </h2>
            <div className='flex w-1/2 justify-center pt-10'>
              <Lottier animationData={data} />
            </div>
            <p className='mt-8 text-center text-lg font-semibold '>
              Dando click en el siguiente boton confirmaras tu email para poder
              usar nuestra plataforma
            </p>
            <Motionbutton
              variant='secondary'
              className='w-1/2 mt-3 '
              onClick={handleConfirmEmail}
            >
              Confirmar email
            </Motionbutton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UserEmailConfirmation;
