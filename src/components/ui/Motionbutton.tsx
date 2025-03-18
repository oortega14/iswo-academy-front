import { Button } from './button'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Motionbutton = ({ children, className, onClick, disabled, type }: { children: React.ReactNode, className?: string, onClick?: () => void, disabled?: boolean, type?: 'button' | 'submit' | 'reset' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'w-full flex justify-center items-center cursor-pointer transition-all hover:font-bold text-sm lg:text-base',
        className
      )}
    >
      <Button className='cursor-pointer w-full' onClick={onClick} disabled={disabled} type={type}>{children}</Button>
    </motion.div>
  )
}

export default Motionbutton