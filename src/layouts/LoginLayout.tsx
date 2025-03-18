import { Header } from '@/components/home/Header';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LoginLayout = ({ children }: Props) => (
  <motion.div
    className='w-full'
    variants={variants}
    initial='hidden'
    animate='visible'
    transition={{
      ease: 'easeInOut',
      duration: 0.3,
    }}
    viewport={{ amount: 0 }}>
    <Header />
    <main className='flex justify-center'>{children}</main>
  </motion.div>
);

export default LoginLayout;
