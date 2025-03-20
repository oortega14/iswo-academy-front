interface ProgressBarProps {
  WIZARD_STEPS: { title: string; description: string }[]
  currentStep: string
}

export const ProgressBar = ({
  WIZARD_STEPS,
  currentStep,
}: ProgressBarProps) => {

  const stepToIndex: { [key: string]: number } = {
    personal_info_step: 0,
    password_step: 1,
    academy_step: 2,
    preferences_step: 3,
    confirmation_step: 4,
  }

  const currentStepIndex = stepToIndex[currentStep] || 0

  return (
    <div className="mb-3 shadow-lg rounded-lg p-4">
      <div className="flex justify-between">
        {WIZARD_STEPS.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                ${
                  index <= currentStepIndex
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300"
                }`}
            >
              {index + 1}
            </div>
            <span className="text-sm mt-2 text-center">
              <span className="hidden md:block">{step.title}</span>
              <span className="md:hidden">
                {index === currentStepIndex ? step.title : "•••"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
