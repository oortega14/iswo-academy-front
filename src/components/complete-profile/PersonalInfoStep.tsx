import { completeProfileService } from '@/services/complete-profile-service';
import { useUserStore } from '@/stores/user-store';
import { useNavigate } from 'react-router-dom';
import Motionbutton from '../ui/Motionbutton';
import PersonalInfoStepContent from './PersonalInfoStepContent';

const PersonalInfoStep = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}) => {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleStepSubmit = async (data: any) => {
    try {
      const response = await completeProfileService.updatePersonalInfo(
        user?.id?.toString() || '',
        data
      );
      console.log(response);
      setCurrentStep('update_password_step');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNext = () => {
    const currentForm = document.querySelector('form');
    currentForm?.requestSubmit();
    navigate('/user/complete-profile/update-password');
  };

  return (
    <div className='py-6 w-full'>
      {/* Step Content */}
      <div className='mb-8'>
        <PersonalInfoStepContent onStepSubmit={handleStepSubmit} />
      </div>

      {/* Navigation Buttons */}
      <div className='flex justify-between'>
        <Motionbutton
          variant='outline'
          disabled={currentStep === 'personal_info_step'}
        >
          Anterior
        </Motionbutton>
        <Motionbutton onClick={handleNext}>Siguiente</Motionbutton>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
