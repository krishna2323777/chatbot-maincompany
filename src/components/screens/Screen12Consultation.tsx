import React, { useEffect, useState, Component } from 'react';
import { UserData } from '../ChatBot';
import { CalendarIcon, MessageCircleIcon, PhoneIcon, MailIcon, ArrowLeftIcon } from 'lucide-react';
interface Screen12Props {
  userData: UserData;
  addMessage: (type: 'bot' | 'user', content: string) => void;
  prevScreen: () => void;
}
export const Screen12Consultation: React.FC<Screen12Props> = ({
  userData,
  addMessage,
  prevScreen
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [agenda, setAgenda] = useState<string>('');
  const [connectionMethod, setConnectionMethod] = useState<string>('');
  // WhatsApp phone number
  const whatsappNumber = '+917013482933';
  // Direct call phone number
  const directCallNumber = '+18778999837';
  useEffect(() => {
    if (userData.nextStep === 'Chat with Live Agent') {
      addMessage('bot', "Choose a time that works best. You'll receive a confirmation email + calendar invite.");
    } else if (userData.nextStep === 'Speak to Specialist') {
      addMessage('bot', 'How would you like to connect?');
    }
  }, []);
  const handleSchedule = () => {
    addMessage('user', `Scheduled for ${selectedDate} at ${selectedTime}${agenda ? ` with agenda: ${agenda}` : ''}`);
    addMessage('bot', "Great! Your chat is confirmed. You'll receive a confirmation email with all the details shortly.");
  };
  const handleConnect = (method: string) => {
    setConnectionMethod(method);
    addMessage('user', `Connect via: ${method}`);
    if (method === 'Live Chat Now') {
      // Create WhatsApp link with predefined message
      const message = `Hello, I am ${userData.contactInfo.name || 'N/A'} and my email is ${userData.contactInfo.email || 'N/A'}. I would like to explore all the services.`;
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      addMessage('bot', `Connecting you with a specialist on WhatsApp. If the WhatsApp window didn't open, please click here: <a href="${whatsappUrl}" target="_blank" class="text-blue-600 underline">Open WhatsApp</a>`);
    } else if (method === 'Phone Call') {
      // Create direct phone call link
      const phoneUrl = `tel:${directCallNumber}`;
      // Attempt to initiate the call
      window.location.href = phoneUrl;
      addMessage('bot', `Initiating phone call to our specialist. If the call doesn't start automatically, please click here: <a href="${phoneUrl}" class="text-blue-600 underline">Call ${directCallNumber}</a>`);
    }
  };
  if (userData.nextStep === 'Chat with Live Agent') {
    return <div className="space-y-4">
        <div className="flex items-center mb-2">
          <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
            <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1 text-center">
            <h3 className="font-medium text-sm">Chat with Live Agent</h3>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Date
            </label>
            <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-xs">
              <option value="">Select date</option>
              <option value="Mon, May 20">Mon, May 20</option>
              <option value="Tue, May 21">Tue, May 21</option>
              <option value="Wed, May 22">Wed, May 22</option>
              <option value="Thu, May 23">Thu, May 23</option>
              <option value="Fri, May 24">Fri, May 24</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Time
            </label>
            <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg text-xs" disabled={!selectedDate}>
              <option value="">Select time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Agenda (Optional)
          </label>
          <textarea value={agenda} onChange={e => setAgenda(e.target.value)} placeholder="What would you like to discuss?" className="w-full p-2 border border-gray-300 rounded-lg h-20 text-xs"></textarea>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg text-xs" onClick={handleSchedule} disabled={!selectedDate || !selectedTime}>
          Schedule Chat
        </button>
      </div>;
  }
  return <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Connect with a Specialist</h3>
        </div>
      </div>
      {!connectionMethod ? <>
          <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg text-xs" onClick={() => handleConnect('Live Chat Now')}>
            <MessageCircleIcon className="h-4 w-4 mr-2" />
            Live Chat Now (WhatsApp)
          </button>
          <button className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium p-3 rounded-lg text-xs" onClick={() => handleConnect('Phone Call')}>
            <PhoneIcon className="h-4 w-4 mr-2" />
            Phone Call
          </button>
        </> : <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center text-xs">
          {connectionMethod === 'Live Chat Now' ? <div>
              <p>Connecting you with a specialist on WhatsApp...</p>
              <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(`Hello, I am ${userData.contactInfo.name || 'N/A'} and my email is ${userData.contactInfo.email || 'N/A'}. I would like to explore all the services.`)}`} target="_blank" className="text-blue-600 underline mt-2 inline-block">
                Click here to open WhatsApp
              </a>
            </div> : connectionMethod === 'Phone Call' ? <div>
              <p>Initiating phone call to our specialist...</p>
              <a href={`tel:${directCallNumber}`} className="text-blue-600 underline mt-2 inline-block">
                Click here to call {directCallNumber}
              </a>
            </div> : null}
        </div>}
    </div>;
};