import { useUserStore } from '@/stores/user-store';
import { ThemeToggle } from './ThemeToogle';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, Bars3Icon } from '@heroicons/react/24/solid';

const HeaderButtons = () => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/choose-academy');
  };

  if (!!user) {
    return (
      <div className='flex items-center'>
        <motion.button onClick={handleDashboardClick}>
          Escoger academia
          <ArrowRightIcon className='ml-2 size-4' />
        </motion.button>
        <ThemeToggle />
      </div>
    );
  } else {
    return (
      <div className='flex items-center'>
        <Bars3Icon className='inline-block size-8 cursor-pointer md:hidden' />
        <div className='flex gap-4'>
          <Link
            to={'/login'}
            className='regular-16 flex justify-center items-center cursor-pointer pb-1.5 transition-all hover:font-bold text-sm lg:text-base'
          >
            Ingresar
          </Link>
          <Link
            to={'/register'}
            className='regular-16 flex justify-center items-center cursor-pointer pb-1.5 transition-all hover:font-bold text-sm lg:text-base'
          >
            Registrarse
          </Link>
          <ThemeToggle />
        </div>
      </div>
    );
  }
};

export default HeaderButtons;
