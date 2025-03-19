import Lottier from 'lottie-react';

interface LottieAnimationProps {
  animationData: any
  className?: string
}

export const LottieAnimation = ({
  animationData,
  className,
}: LottieAnimationProps) => {
  return <Lottier animationData={animationData} className={className} />
}
