import PersonalInfoStepContent from './PersonalInfoStepContent';

const PersonalInfoStep = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}) => {

  return (
    <div className='py-6 w-full'>
      {/* Step Content */}
      <div className='mb-8'>
        <PersonalInfoStepContent setCurrentStep={setCurrentStep}/>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
