import React from 'react';
interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps
}) => {
  const progress = currentStep / totalSteps * 100;
  return <div className="w-full mb-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-1.5 rounded-full transition-all duration-500 ease-out" style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>;
};