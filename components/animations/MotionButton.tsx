import { motion } from 'framer-motion';
import { Button } from '../ui/button';

interface MotionButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  variant?: "link" | 'outline' | 'link' | 'default' | 'destructive' | 'secondary' | 'ghost' | null
}

const MotionButton = ({ children, className, variant, onClick, ...otherProps }: MotionButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 1.02 }}
      onClick={onClick}
      {...otherProps}
    >
      <Button
      className={`${className}`}
      variant={variant}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default MotionButton;
