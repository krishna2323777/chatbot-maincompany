import React, { useState } from 'react';
import { UserData } from '../ChatBot';
import { ArrowLeftIcon } from 'lucide-react';
interface Screen9Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen9AddOns: React.FC<Screen9Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState<{
    name: string;
    price: number;
    customNote?: string;
  }[]>([]);
  const [customNotes, setCustomNotes] = useState<Record<string, string>>({});
  const addOns = [{
    id: 'corporate-tax',
    name: 'Corporate Tax Filing',
    price: 125,
    description: 'Annual tax filing assistance'
  }, {
    id: 'vat-return',
    name: 'VAT Return Filing',
    price: 175,
    description: 'Quarterly VAT return filing assistance'
  }, {
    id: 'financial-statement',
    name: 'Annual Report Preparation',
    price: 395,
    description: 'Annual financial statement preparation'
  }, {
    id: 'payroll',
    name: 'Payroll Management',
    price: 25,
    description: '€25/month per employee'
  }, {
    id: 'eor',
    name: 'Professional Employment Service',
    price: 175,
    description: '€175/month per employee'
  }, {
    id: 'residency',
    name: 'Residency Permit Application',
    price: 550,
    description: 'Assistance with residency applications'
  }, {
    id: 'business-plan',
    name: 'AI Business Plan Preparation',
    price: 295,
    description: 'Customized business plan for your expansion'
  }, {
    id: 'other',
    name: 'Other Service',
    price: 0,
    description: 'Custom service not listed above'
  }];
  const toggleAddOn = (addOn: {
    name: string;
    price: number;
  }) => {
    setSelectedAddOns(prev => prev.some(a => a.name === addOn.name) ? prev.filter(a => a.name !== addOn.name) : [...prev, {
      ...addOn,
      customNote: customNotes[addOn.name] || ''
    }]);
  };
  const updateCustomNote = (name: string, note: string) => {
    setCustomNotes(prev => ({
      ...prev,
      [name]: note
    }));
    setSelectedAddOns(prev => prev.map(item => item.name === name ? {
      ...item,
      customNote: note
    } : item));
  };
  const isSelected = (name: string) => {
    return selectedAddOns.some(addOn => addOn.name === name);
  };
  const calculateTotalPrice = () => {
    const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return userData.totalPrice + addOnTotal;
  };
  const handleContinue = () => {
    const formattedAddOns = selectedAddOns.map(addon => ({
      name: addon.name === 'Other Service' && addon.customNote ? `Custom: ${addon.customNote}` : addon.name,
      price: addon.price
    }));
    updateUserData({
      addOns: formattedAddOns,
      totalPrice: calculateTotalPrice()
    });
    nextScreen();
  };
  return <div className="p-4 space-y-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <button onClick={prevScreen} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none" aria-label="Go back">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-semibold text-lg text-gray-900">Add-on Services</h3>
        </div>
      </div>
      <div className="space-y-4 max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2">
        {addOns.map(addOn => <div key={addOn.id} className="flex flex-col p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id={addOn.id} checked={isSelected(addOn.name)} onChange={() => toggleAddOn({
              name: addOn.name,
              price: addOn.price
            })} className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <div>
                  <label htmlFor={addOn.id} className="text-sm font-medium text-gray-800">
                    {addOn.name}
                  </label>
                  <p className="text-xs text-gray-600">{addOn.description}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {addOn.price > 0 ? `€${addOn.price}` : 'Custom'}
              </span>
            </div>
            {isSelected(addOn.name) && addOn.id === 'other' && <div className="mt-3 ml-8">
                <input type="text" value={customNotes[addOn.name] || ''} onChange={e => updateCustomNote(addOn.name, e.target.value)} placeholder="Describe the service you need" className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>}
          </div>)}
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex justify-between font-medium text-base">
          <span className="text-gray-700">Total Price:</span>
          <span className="text-gray-900">€{calculateTotalPrice()}</span>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors" onClick={handleContinue}>
        Continue
      </button>
    </div>;
};