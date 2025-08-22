import React, { useState } from 'react';
import { UserData } from '../ChatBot';
import { BuildingIcon, FileTextIcon, FileIcon, CalculatorIcon, BarChartIcon, PlusIcon, UserIcon, CoinsIcon, ClipboardCheckIcon } from 'lucide-react';
interface Screen4Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen4Services: React.FC<Screen4Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(userData.services || []);
  const [otherService, setOtherService] = useState<string>('');
  const toggleService = (service: string) => {
    setSelectedServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };
  const handleContinue = () => {
    const services = [...selectedServices];
    if (selectedServices.includes('Other') && otherService) {
      services.push(`Other: ${otherService}`);
    }
    updateUserData({
      services
    });
    nextScreen();
  };
  const services = [{
    id: 'virtual-office',
    name: 'Virtual Office',
    description: 'Professional business address and mail handling',
    icon: <BuildingIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-pink-500',
    popular: true
  }, {
    id: 'entity-setup',
    name: 'Local Entity Setup',
    description: 'Company registration and legal structure',
    icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-pink-500',
    popular: true
  }, {
    id: 'vat-id',
    name: 'VAT ID Application',
    description: 'European VAT registration for tax compliance',
    icon: <FileIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-pink-500'
  }, {
    id: 'vat-filing',
    name: 'VAT Filing',
    description: 'Quarterly VAT return submissions',
    icon: <CalculatorIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-pink-500'
  }, {
    id: 'annual-reports',
    name: 'Annual Financial Reports',
    description: 'Complete financial statements and compliance',
    icon: <BarChartIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-pink-500',
    popular: true
  }, {
    id: 'other',
    name: 'Other',
    description: 'Tell us what else you need',
    icon: <PlusIcon className="h-5 w-5 text-white" />,
    bgColor: 'bg-gray-500'
  }];
  return <div>
      <div className="space-y-3 max-h-[320px] overflow-y-auto">
        {services.map(service => <div key={service.id} className={`border rounded-xl p-3 ${selectedServices.includes(service.name) ? 'border-pink-500 bg-pink-50' : 'border-gray-200 bg-white'}`}>
            <label className="flex items-start cursor-pointer">
              <input type="checkbox" checked={selectedServices.includes(service.name)} onChange={() => toggleService(service.name)} className="h-5 w-5 mt-1 text-pink-500 border-gray-300 rounded focus:ring-pink-500" />
              <div className="ml-3 flex items-start">
                <div className={`${service.bgColor} p-2 rounded-lg mr-3 flex-shrink-0`}>
                  {service.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{service.name}</h3>
                    {service.popular && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Popular
                      </span>}
                  </div>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
            </label>
            {service.name === 'Other' && selectedServices.includes('Other') && <div className="mt-2 ml-8">
                <input type="text" value={otherService} onChange={e => setOtherService(e.target.value)} placeholder="Please specify other service" className="w-full p-2 border border-gray-300 rounded-lg text-xs" />
              </div>}
          </div>)}
      </div>
      {selectedServices.length > 0 && <div className="mt-4 p-3 bg-pink-50 border border-pink-100 rounded-lg">
          <h4 className="font-medium text-sm mb-1">Selected Services:</h4>
          <div className="space-y-1">
            {selectedServices.map(service => <div key={service} className="flex items-center">
                <div className="w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center mr-2">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">{service}</span>
              </div>)}
          </div>
        </div>}
      <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
        <button onClick={prevScreen} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          Back
        </button>
        <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleContinue} disabled={selectedServices.length === 0}>
          Continue
        </button>
      </div>
    </div>;
};