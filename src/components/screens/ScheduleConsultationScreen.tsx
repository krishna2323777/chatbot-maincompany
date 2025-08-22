import React, { useState } from 'react';
import { ArrowLeftIcon, MessageCircleIcon } from 'lucide-react';
import { UserData } from '../ChatBot';

interface ScheduleConsultationScreenProps {
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
}

export const ScheduleConsultationScreen: React.FC<ScheduleConsultationScreenProps> = ({
  prevScreen,
  updateUserData
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const API_URL = 'https://api-f1db6c.stack.tryrelevance.com/latest/agents/trigger';
  const API_KEY = '40f9760672f4-47b5-89f9-e3cdb99d658d:sk-MmQxZTU2ZGEtYjYxMC00ZDY0LWIwYzctZmNlZTAzMDUxZGFj';
  const AGENT_ID = '837d4a96-d138-484b-a35e-80512a14a474';

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = () => name.trim() && isValidEmail(email) && phone.trim();

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    updateUserData({ contactInfo: { name, email, phone } });

    const message = `Hello, I am ${name}. I would like to connect with an expert. My email is ${email} and my phone number is ${phone}.`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_KEY
        },
        body: JSON.stringify({
          message: { role: 'user', content: message },
          agent_id: AGENT_ID
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to trigger agent');
      }

      // Success: optionally show confirmation
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Call with Live Agent</h3>
        </div>
      </div>

      <div className="bg-pink-50 rounded-lg p-4 mb-2">
        <p className="text-xs text-center text-gray-700">
          Fill in your details below.
        </p>
      </div>

      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Full Name *"
          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
          required
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address *"
          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone Number *"
          className="w-full p-2 border border-gray-300 rounded-lg text-xs"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
        className={`w-full flex items-center justify-center ${
          isFormValid()
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90'
            : 'bg-gray-300 cursor-not-allowed'
        } text-white font-medium p-3.5 rounded-lg transition-all duration-200`}
      >
        {isSubmitting ? (
          <span>Connecting...</span>
        ) : (
          <>
            <MessageCircleIcon className="h-5 w-5 mr-2" />
            Connect with Relevance Agent
          </>
        )}
      </button>

      {errorMessage && <p className="text-xs text-red-500 text-center">{errorMessage}</p>}

      <p className="text-xs text-center text-gray-500 mt-2">
        Our team will respond to your chat request as soon as possible.
      </p>
    </div>
  );
};
