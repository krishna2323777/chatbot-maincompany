import React from 'react';
import { UserData } from '../ChatBot';
import { LightbulbIcon, BuildingIcon, PlusIcon, LayersIcon } from 'lucide-react';
interface Screen2Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen2BusinessJourney: React.FC<Screen2Props> = ({
  nextScreen,
  prevScreen,
  updateUserData
}) => {
  const handleSelection = (option: string) => {
    updateUserData({
      businessJourney: option
    });
    nextScreen();
  };
  const journeyOptions = [{
    id: 'exploring',
    title: 'Exploring Ideas',
    description: 'Just getting started with business concepts',
    icon: <LightbulbIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-amber-500'
  }, {
    id: 'existing',
    title: 'Existing Company',
    description: 'Running a business and looking to expand',
    icon: <BuildingIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-blue-500'
  }, {
    id: 'new-entity',
    title: 'Need New Entity',
    description: 'Want to set up a new business structure',
    icon: <PlusIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-emerald-500'
  }, {
    id: 'multiple',
    title: 'Managing Multiple',
    description: 'Operating several business entities',
    icon: <LayersIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-purple-500'
  }];
  return <div className="space-y-4">
      <div className="space-y-3">
        {journeyOptions.map(option => <button key={option.id} className="w-full p-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl flex items-start transition-all duration-200 hover:shadow-md" onClick={() => handleSelection(option.title)}>
            <div className={`${option.bgColor} p-2 rounded-lg mr-3 flex-shrink-0`}>
              {option.icon}
            </div>
            <div className="text-left">
              <h3 className="font-medium">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </button>)}
      </div>
      <div className="pt-3">
        <button onClick={prevScreen} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          Back
        </button>
      </div>
    </div>;
};