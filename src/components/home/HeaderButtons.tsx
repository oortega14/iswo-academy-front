import { useUserStore } from '@/stores/user-store';
import { ThemeToggle } from './ThemeToogle';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, Bars3Icon } from '@heroicons/react/24/solid';
import { Button } from '../ui/button';
import Motionbutton from '../ui/Motionbutton';

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
        <div className='flex gap-4 justify-center items-center'>
          <Link to={'/login'} className='flex justify-center items-center'>
            <Motionbutton>Ingresar</Motionbutton>
          </Link>
          <Link to={'/register'} className='flex justify-center items-center'>
            <Motionbutton>Registrarse</Motionbutton>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    );
  }
};

export default HeaderButtons;
