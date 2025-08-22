import React, { useEffect, useState } from 'react';
import { UserData } from '../ChatBot';
import { ProgressBar } from '../ProgressBar';
import { ChevronDownIcon, ArrowLeftIcon } from 'lucide-react';
interface Screen3Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
  addMessage: (type: 'bot' | 'user', content: string) => void;
}
export const Screen3Geography: React.FC<Screen3Props> = ({
  nextScreen,
  prevScreen,
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
  // List of EU countries with their specific registration fees (updated with detailed pricing)
  const euCountries = [{
    name: 'Netherlands',
    fee: 50,
    govtFee: 80,
    branchFee: 975,
    vatFee: 75
  }, {
    name: 'Germany',
    fee: 900,
    govtFee: 450,
    branchFee: 1495,
    vatFee: 350
  }, {
    name: 'France',
    fee: 1850,
    govtFee: 800,
    branchFee: 1845,
    vatFee: 630
  }, {
    name: 'Italy',
    fee: 1300,
    govtFee: 300,
    branchFee: 1395,
    vatFee: 850
  }, {
    name: 'Spain',
    fee: 1050,
    govtFee: 300,
    branchFee: 1445,
    vatFee: 600
  }, {
    name: 'Poland',
    fee: 600,
    govtFee: 200,
    branchFee: 1245,
    vatFee: 550
  }, {
    name: 'Portugal',
    fee: 900,
    govtFee: 300,
    branchFee: 1395,
    vatFee: 640
  }, {
    name: 'Ireland',
    fee: 50,
    govtFee: 50,
    branchFee: 945,
    vatFee: 550
  }, {
    name: 'Denmark',
    fee: 80,
    govtFee: 80,
    branchFee: 975,
    vatFee: 550
  }, {
    name: 'Sweden',
    fee: 200,
    govtFee: 200,
    branchFee: 1095,
    vatFee: 550
  }, {
    name: 'Austria',
    fee: 2000,
    govtFee: 1500,
    branchFee: 2895,
    vatFee: 620
  }, {
    name: 'Belgium',
    fee: 325,
    govtFee: 25,
    branchFee: 1220,
    vatFee: 245
  }, {
    name: 'Luxembourg',
    fee: 675,
    govtFee: 500,
    branchFee: 1570,
    vatFee: 550
  }, {
    name: 'Finland',
    fee: 380,
    govtFee: 380,
    branchFee: 1275,
    vatFee: 550
  }, {
    name: 'Estonia',
    fee: 190,
    govtFee: 190,
    branchFee: 1085,
    vatFee: 550
  }, {
    name: 'Malta',
    fee: 695,
    govtFee: 150,
    branchFee: 1290,
    vatFee: 660
  }, {
    name: 'Cyprus',
    fee: 840,
    govtFee: 450,
    branchFee: 1735,
    vatFee: 630
  }, {
    name: 'Greece',
    fee: 1100,
    govtFee: 500,
    branchFee: 1995,
    vatFee: 720
  }, {
    name: 'Czech Republic',
    fee: 600,
    govtFee: 300,
    branchFee: 1495,
    vatFee: 550
  }, {
    name: 'Hungary',
    fee: 750,
    govtFee: 350,
    branchFee: 1645,
    vatFee: 600
  }, {
    name: 'Romania',
    fee: 500,
    govtFee: 250,
    branchFee: 1395,
    vatFee: 590
  }, {
    name: 'Slovakia',
    fee: 600,
    govtFee: 300,
    branchFee: 1495,
    vatFee: 550
  }, {
    name: 'Bulgaria',
    fee: 450,
    govtFee: 200,
    branchFee: 1345,
    vatFee: 575
  }, {
    name: 'Croatia',
    fee: 550,
    govtFee: 250,
    branchFee: 1445,
    vatFee: 580
  }, {
    name: 'Slovenia',
    fee: 700,
    govtFee: 300,
    branchFee: 1595,
    vatFee: 550
  }, {
    name: 'Latvia',
    fee: 500,
    govtFee: 200,
    branchFee: 1395,
    vatFee: 550
  }, {
    name: 'Lithuania',
    fee: 450,
    govtFee: 200,
    branchFee: 1345,
    vatFee: 550
  }];
  // List of regions for based-in selection (expanded)
  const regions = ['United States', 'United Kingdom', 'European Union', 'Asia-Pacific', 'Middle East', 'Africa', 'Latin America', 'Canada', 'Australia', 'New Zealand', 'Japan', 'China', 'India', 'Singapore', 'Hong Kong', 'South Korea', 'Brazil', 'Mexico', 'Argentina', 'UAE', 'Saudi Arabia', 'Israel', 'South Africa', 'Nigeria', 'Kenya', 'Other'];
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