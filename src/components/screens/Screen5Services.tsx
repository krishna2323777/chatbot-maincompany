import React, { useEffect, useState } from 'react';
import { UserData } from '../ChatBot';
import { ProgressBar } from '../ProgressBar';
import { BuildingIcon, FileTextIcon, FileIcon, CalculatorIcon, BarChartIcon, PlusIcon, UserIcon, CoinsIcon, ClipboardCheckIcon } from 'lucide-react';
interface Screen5Props {
  nextScreen: (screen?: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  addMessage: (type: 'bot' | 'user', content: string) => void;
}
export const Screen5Services: React.FC<Screen5Props> = ({
  nextScreen,
  updateUserData,
  addMessage
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState<string>('');
  useEffect(() => {
    addMessage('bot', 'Which services do you need help with?');
  }, []);
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
    addMessage('user', `Services: ${services.join(', ')}`);
    nextScreen();
  };
  const services = [{
    name: 'Branch Registration',
    icon: <BuildingIcon className="h-5 w-5" />
  }, {
    name: 'VAT ID Application',
    icon: <FileIcon className="h-5 w-5" />
  }, {
    name: 'Employer Registration',
    icon: <UserIcon className="h-5 w-5" />
  }, {
    name: 'Payroll & PEO Services',
    icon: <CoinsIcon className="h-5 w-5" />
  }, {
    name: 'Corporate Tax Filing',
    icon: <FileTextIcon className="h-5 w-5" />
  }, {
    name: 'VAT Filing',
    icon: <CalculatorIcon className="h-5 w-5" />
  }, {
    name: 'Annual Report Preparation',
    icon: <BarChartIcon className="h-5 w-5" />
  }, {
    name: 'Company Formation',
    icon: <ClipboardCheckIcon className="h-5 w-5" />
  }, {
    name: 'Other',
    icon: <PlusIcon className="h-5 w-5" />
  }];
  return <div className="space-y-4">
      <ProgressBar currentStep={4} totalSteps={6} />
      <div className="grid grid-cols-2 gap-2">
        {services.map(service => <button key={service.name} className={`flex items-center justify-center p-3 rounded-lg text-sm font-medium ${selectedServices.includes(service.name) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`} onClick={() => toggleService(service.name)}>
            <span className="mr-2">{service.icon}</span>
            {service.name}
          </button>)}
      </div>
      {selectedServices.includes('Other') && <input type="text" value={otherService} onChange={e => setOtherService(e.target.value)} placeholder="Please specify other service" className="w-full p-2 border border-gray-300 rounded-lg" />}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg" onClick={handleContinue} disabled={selectedServices.length === 0}>
        Continue
      </button>
    </div>;
};