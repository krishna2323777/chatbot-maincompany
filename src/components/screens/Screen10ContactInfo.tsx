import React, { useState } from 'react';
import { UserData } from '../ChatBot';
import { ArrowLeftIcon } from 'lucide-react';
interface Screen10Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
}
export const Screen10ContactInfo: React.FC<Screen10Props> = ({
  nextScreen,
  prevScreen,
  updateUserData
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'email' | 'both' | null>(null);
  const handleSubmit = () => {
    updateUserData({
      contactInfo: {
        name,
        email,
        phone // Always include phone number
      }
    });
    nextScreen();
  };
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isValidForm = () => {
    if (!name || !email || !isValidEmail(email) || !phone) return false;
    if (contactMethod === null) return false;
    return true;
  };
  return <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Contact Information</h3>
        </div>
      </div>
      <div className="space-y-3">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-lg text-xs" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address *" className="w-full p-2 border border-gray-300 rounded-lg text-xs" required />
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number *" className="w-full p-2 border border-gray-300 rounded-lg text-xs" required />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className={`p-3 rounded-lg text-xs font-medium ${contactMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`} onClick={() => setContactMethod('email')}>
          Email Contact
        </button>
        <button className={`p-3 rounded-lg text-xs font-medium ${contactMethod === 'both' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`} onClick={() => setContactMethod('both')}>
          Email + Phone Contact
        </button>
      </div>
      <button className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg ${!isValidForm() ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleSubmit} disabled={!isValidForm()}>
        Submit
      </button>
    </div>;
};