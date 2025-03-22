import { motion } from 'framer-motion';
import { UpdatePasswordStepContent } from './UpdatePasswordStepContent';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const UpdatePasswordStep = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}) => {
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
      <div className='mb-8'>
        <UpdatePasswordStepContent setCurrentStep={setCurrentStep} />
      </div>
    </motion.div>
  );
};

export default UpdatePasswordStep;
