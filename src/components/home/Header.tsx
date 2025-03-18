import { useState, useEffect } from 'react';
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
import { useUserStore } from '@/stores/user-store';
import { formatHeaderMenuHamburguer } from '@/lib/utils';
import { useAcademy } from '@/hooks/useAcademy';

export const Header = () => {
  const { academyId } = useParams() as { academyId: string };
  const user = useUserStore((state) => state.user);
  const { academy, loading, getAcademy } = useAcademy();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (academyId) {
      getAcademy(academyId);
    }
  }, [academyId, getAcademy]);

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

  if (loading) {
    return <LoaderShimmer width='8rem' height='4rem' />;
  }

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
        {!!user ? (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial='closed'
                animate='open'
                exit='closed'
                variants={menuVariants}
                className='absolute left-0 top-full flex w-full flex-col dark:bg-gray-800 md:hidden'
              >
                <motion.li className='py-2'>
                  <Link
                    to={formatHeaderMenuHamburguer(user)}
                    className='regular-16 flexCenter block cursor-pointer px-4 pb-1.5 font-semibold text-blue-600 transition-all hover:font-bold'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ir a dashboard
                  </Link>
                </motion.li>

                <Separator className=' dark:bg-white' />
                <span className='mb-1 mt-4 px-4 text-sm font-semibold text-slate-400'>
                  Links navegación
                </span>
                {NAV_LINKS.map((link) => (
                  <motion.li key={link.key} className='py-2'>
                    <Link
                      to={link.href}
                      className='regular-16 flexCenter block cursor-pointer px-4 pb-1.5 transition-all hover:font-bold'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial='closed'
                animate='open'
                exit='closed'
                variants={menuVariants}
                className='absolute left-0 top-full flex w-full flex-col dark:bg-gray-800 md:hidden'
              >
                {SEC_NAV_LINKS.map((link) => (
                  <motion.li key={link.key} className='py-2'>
                    <Link
                      to={link.href}
                      className='regular-16 flexCenter block cursor-pointer px-4 pb-1.5 font-semibold text-blue-600 transition-all hover:font-bold'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <Separator className='bg-slate-400 dark:bg-white' />
                <span className='mb-1 mt-4 px-4 text-sm font-semibold text-slate-400'>
                  Links navegación
                </span>
                {NAV_LINKS.map((link) => (
                  <motion.li key={link.key} className='py-2'>
                    <Link
                      to={link.href}
                      className='regular-16 flexCenter block cursor-pointer px-4 pb-1.5 transition-all hover:font-bold'
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
        <Link to='/' className='shrink-0'>
          <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 1 }}>
            {!!academy ? (
              <>
                {loading ? (
                  <LoaderShimmer width='8rem' height='4rem' />
                ) : (
                  <div className='flex h-16 items-center justify-center md:h-32'>
                    <img
                      src={academy?.logo}
                      className='h-10 w-auto dark:invert md:max-h-full'
                      alt='logo'
                    />
                  </div>
                )}
              </>
            ) : (
              <IswoIconLarge className='size-12 dark:invert md:size-20' />
            )}
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
