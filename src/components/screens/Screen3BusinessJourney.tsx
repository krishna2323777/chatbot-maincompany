import React, { useEffect } from 'react';
import { UserData } from '../ChatBot';
import { ProgressBar } from '../ProgressBar';
import { ArrowLeftIcon } from 'lucide-react';
interface Screen3Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  addMessage: (type: 'bot' | 'user', content: string) => void;
  userData: UserData;
}
export const Screen3BusinessJourney: React.FC<Screen3Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  addMessage
}) => {
  useEffect(() => {
    addMessage('bot', 'Where are you in your business journey?');
  }, []);
  const handleSelection = (option: string) => {
    updateUserData({
      businessJourney: option
    });
    addMessage('user', option);
    nextScreen();
  };
  return <div className="space-y-3">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium">Business Journey</h3>
        </div>
      </div>
      <ProgressBar currentStep={2} totalSteps={6} />
      <div className="grid grid-cols-2 gap-2">
        <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium p-3 rounded-xl border border-gray-200 text-sm" onClick={() => handleSelection('Exploring Ideas')}>
          Exploring Ideas
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium p-3 rounded-xl border border-gray-200 text-sm" onClick={() => handleSelection('Existing Company')}>
          Existing Company
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium p-3 rounded-xl border border-gray-200 text-sm" onClick={() => handleSelection('Need New Entity')}>
          Need New Entity
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium p-3 rounded-xl border border-gray-200 text-sm" onClick={() => handleSelection('Managing Multiple')}>
          Managing Multiple
        </button>
      </div>
    </div>;
};