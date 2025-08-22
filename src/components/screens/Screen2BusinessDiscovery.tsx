import React, { useEffect } from 'react';
import { UserData } from '../ChatBot';
import { ProgressBar } from '../ProgressBar';
import { ArrowLeftIcon } from 'lucide-react';
interface Screen2Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
  addMessage: (type: 'bot' | 'user', content: string) => void;
}
export const Screen2BusinessDiscovery: React.FC<Screen2Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData,
  addMessage
}) => {
  useEffect(() => {
    if (userData.flow === 'consultation') {
      addMessage('bot', "Let's match you with the right expert. It'll take just 2 minutes.");
    } else {
      addMessage('bot', "Let's build your custom quote — 2 mins max and you get it instantly!");
    }
  }, []);
  const handleSelection = (option: string) => {
    addMessage('user', option);
    nextScreen();
  };
  return <div className="space-y-3">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium">Let's Get Started</h3>
        </div>
      </div>
      <ProgressBar currentStep={1} totalSteps={6} />
      <div className="grid grid-cols-1 gap-3">
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-medium p-3 rounded-xl" onClick={() => handleSelection('Start Quick Questions')}>
          Start Quick Questions
        </button>
        <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium p-3 rounded-xl border border-gray-200" onClick={() => handleSelection(userData.flow === 'consultation' ? 'See Services First' : 'Explore Plans First')}>
          {userData.flow === 'consultation' ? 'See Services First' : 'Explore Plans First'}
        </button>
      </div>
    </div>;
};