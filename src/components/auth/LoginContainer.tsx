import { IswoIconLarge } from '@/icons/IswoIconLarge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import LoginFormContainer from './LoginFormContainer';

const LoginContainer = () => {
  return (
    <section className='min-h-screen w-full max-w-[1440px] px-10 flex flex-col lg:flex-row py-3 justify-center items-center mt-10 '>
      <div
        className='
          flex  min-h-[420px] w-full flex-col items-center justify-center lg:min-h-[550px] lg:w-1/2 border border-white p-4 rounded-lg shadow-md dark:shadow-white/50 lg:mr-5
        '>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1.6 }}
          transition={{
            delay: 0.4,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}>
          <IswoIconLarge className='size-24 dark:invert lg:size-32' />
        </motion.div>
        <LoginFormContainer />
      </div>
      <div
        className={cn(
          'flex flex-col mt-10 w-full lg:w-1/2 items-center justify-center'
        )}>
        <h2 className='text-center text-4xl font-extrabold'>
          ¡Bienvenido a ISWO Academy!
        </h2>
        <p className='mt-8 text-center text-xl font-semibold'>
          Continúa aprendiendo y compartiendo tus conocimientos con el mundo
        </p>
      </div>
    </section>
  );
};

export default LoginContainer;
