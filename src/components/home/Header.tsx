import { useState } from 'react';
import { NAV_LINKS, SEC_NAV_LINKS } from '@/constants/home';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { IswoIconLarge } from '@/icons';
import { Separator } from '../ui/separator';
import { ThemeToggle } from './ThemeToogle';
import HeaderButtons from './HeaderButtons';
import { LoaderShimmer } from './LoaderShimmer';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/solid';

export const Header = () => {
  const { academyId } = useParams() as { academyId: string };
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        y: { stiffness: 10 },
      },
    },
    open: {
      opacity: 1,
      transition: {
        y: { stiffness: 10, velocity: 100 },
      },
    },
  };

  return (
    <section className='fixed z-30 w-full shadow-md backdrop-blur-md'>
      <nav className='3xl:px-28 mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-2 sm:px-5 md:px-12 lg:px-24 md:py-3'>
        <div className='md:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='p-2'>
            {isMenuOpen ? (
              <XMarkIcon className='size-6' />
            ) : (
              <Bars3Icon className='size-6' />
            )}
          </button>
        </div>

        <Link to='/' className='shrink-0'>
          <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 1 }}>
            <IswoIconLarge className='size-12 dark:invert md:size-20' />
          </motion.div>
        </Link>

        <ul className='hidden md:flex md:space-x-6 lg:space-x-12'>
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                to={link.href}
                className='regular-16 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold text-sm lg:text-base'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle className='md:hidden' />

        <div className='hidden md:block'>
          <HeaderButtons />
        </div>
      </nav>
    </section>
  );
};

export default Header;
