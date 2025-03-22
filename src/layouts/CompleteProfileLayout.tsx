import { ProgressBar } from '@/components/complete-profile/ProgressBar';
import { WIZARD_STEPS } from '@/constants/wizard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

// Interfaz para las props que pasamos a los hijos
interface ChildProps {
  currentStep: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<string>>;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const CompleteProfileLayout = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState('');

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        currentStep,
        setCurrentStep,
      } as ChildProps);
    }
    return child;
  });

  return (
    <motion.div
      className='w-full p-5'
      variants={variants}
      initial='hidden'
      animate='visible'
      transition={{
        ease: 'easeInOut',
        duration: 0.3,
      }}
      viewport={{ amount: 0 }}
    >
      <ProgressBar WIZARD_STEPS={WIZARD_STEPS} currentStep={currentStep} />
      <main className='flex justify-center'>{childrenWithProps}</main>
    </motion.div>
  );
};

export default CompleteProfileLayout;
