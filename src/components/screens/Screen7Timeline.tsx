import React, { useState } from 'react';
import { UserData } from '../ChatBot';
import { ArrowLeftIcon, ZapIcon, CalendarIcon, ClockIcon } from 'lucide-react';
interface Screen7Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen7Timeline: React.FC<Screen7Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const [timeline, setTimeline] = useState<string>(userData.timeline || '');
  const handleContinue = () => {
    updateUserData({
      timeline
    });
    nextScreen();
  };
  const timelineOptions = [{
    id: 'immediate',
    label: 'Immediately (0-30 days)',
    description: 'I need to get started right away',
    icon: <ZapIcon className="h-5 w-5" />,
    color: 'bg-pink-500',
    textColor: 'text-pink-500',
    borderColor: 'border-pink-500'
  }, {
    id: 'soon',
    label: 'Soon (1-3 months)',
    description: 'I want to plan for the near future',
    icon: <CalendarIcon className="h-5 w-5" />,
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500'
  }, {
    id: 'planning',
    label: 'Planning Ahead (3+ months)',
    description: "I'm researching for future expansion",
    icon: <ClockIcon className="h-5 w-5" />,
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500'
  }];
  return <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Timeline</h3>
        </div>
      </div>
      <div className="space-y-3">
        {timelineOptions.map(option => <button key={option.id} onClick={() => setTimeline(option.label)} className={`w-full p-4 rounded-xl transition-all duration-200 flex items-center border-2 ${timeline === option.label ? `${option.borderColor} bg-gray-50` : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
            <div className={`${timeline === option.label ? option.color : 'bg-gray-200'} p-2 rounded-full mr-3`}>
              <div className={`${timeline === option.label ? 'text-white' : 'text-gray-500'}`}>
                {option.icon}
              </div>
            </div>
            <div className="text-left">
              <h3 className={`font-medium ${timeline === option.label ? option.textColor : 'text-gray-800'}`}>
                {option.label}
              </h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </button>)}
      </div>
      <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleContinue} disabled={!timeline}>
        Continue
      </button>
    </div>;
};