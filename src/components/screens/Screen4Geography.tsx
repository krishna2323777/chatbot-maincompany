import React, { useEffect, useState } from 'react';
import { UserData } from '../ChatBot';
import { ProgressBar } from '../ProgressBar';
interface Screen4Props {
  nextScreen: (screen?: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
  addMessage: (type: 'bot' | 'user', content: string) => void;
}
export const Screen4Geography: React.FC<Screen4Props> = ({
  nextScreen,
  updateUserData,
  userData,
  addMessage
}) => {
  const [basedIn, setBasedIn] = useState<string>('');
  const [expandTo, setExpandTo] = useState<string[]>([]);
  useEffect(() => {
    addMessage('bot', 'Where are you based, and where do you want to expand?');
  }, []);
  const handleExpandToChange = (region: string) => {
    setExpandTo(prev => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);
  };
  const handleContinue = () => {
    updateUserData({
      geography: {
        basedIn,
        expandTo
      }
    });
    addMessage('user', `Based in: ${basedIn}, Expanding to: ${expandTo.join(', ')}`);
    nextScreen();
  };
  // List of EU countries with their specific registration fees
  const euCountries = [{
    name: 'Netherlands',
    fee: 450
  }, {
    name: 'Germany',
    fee: 450
  }, {
    name: 'France',
    fee: 800
  }, {
    name: 'Italy',
    fee: 300
  }, {
    name: 'Spain',
    fee: 300
  }, {
    name: 'Poland',
    fee: 200
  }, {
    name: 'Portugal',
    fee: 300
  }, {
    name: 'Ireland',
    fee: 50
  }, {
    name: 'Denmark',
    fee: 80
  }, {
    name: 'Sweden',
    fee: 200
  }, {
    name: 'Austria',
    fee: 1500
  }, {
    name: 'Belgium',
    fee: 25
  }, {
    name: 'Luxembourg',
    fee: 500
  }, {
    name: 'Finland',
    fee: 380
  }, {
    name: 'Estonia',
    fee: 190
  }, {
    name: 'Malta',
    fee: 150
  }, {
    name: 'Cyprus',
    fee: 450
  }, {
    name: 'Greece',
    fee: 500
  }, {
    name: 'Czech Republic',
    fee: 300
  }, {
    name: 'Hungary',
    fee: 350
  }, {
    name: 'Romania',
    fee: 250
  }, {
    name: 'Slovakia',
    fee: 300
  }, {
    name: 'Bulgaria',
    fee: 200
  }, {
    name: 'Croatia',
    fee: 250
  }, {
    name: 'Slovenia',
    fee: 300
  }, {
    name: 'Latvia',
    fee: 200
  }, {
    name: 'Lithuania',
    fee: 200
  }];
  // List of regions for based-in selection
  const regions = ['United States', 'United Kingdom', 'European Union', 'Asia-Pacific', 'Middle East', 'Africa', 'Latin America', 'Other'];
  return <div className="space-y-4">
      <ProgressBar currentStep={3} totalSteps={6} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Where is your business based?
        </label>
        <select value={basedIn} onChange={e => setBasedIn(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
          <option value="">Select region</option>
          {regions.map(region => <option key={region} value={region}>
              {region}
            </option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Where do you want to expand? (Select all that apply)
        </label>
        <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-2">
          {euCountries.map(country => <div key={country.name} className="flex items-center">
              <input type="checkbox" id={country.name} checked={expandTo.includes(country.name)} onChange={() => handleExpandToChange(country.name)} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label htmlFor={country.name} className="ml-2 text-sm text-gray-700">
                {country.name}
              </label>
            </div>)}
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg" onClick={handleContinue} disabled={!basedIn || expandTo.length === 0}>
        Continue
      </button>
    </div>;
};