import React, { useEffect, useState } from 'react';
import { UserData } from '../ChatBot';
import { ProgressBar } from '../ProgressBar';
interface Screen6Props {
  nextScreen: (screen?: number) => void;
  updateUserData: (data: Partial<UserData>) => void;
  addMessage: (type: 'bot' | 'user', content: string) => void;
}
export const Screen6BusinessProfile: React.FC<Screen6Props> = ({
  nextScreen,
  updateUserData,
  addMessage
}) => {
  const [shareLinks, setShareLinks] = useState<boolean | null>(null);
  const [website, setWebsite] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [companySize, setCompanySize] = useState<string>('');
  useEffect(() => {
    addMessage('bot', 'Want to share your website or LinkedIn? This helps me customize suggestions.');
  }, []);
  const handleContinue = () => {
    updateUserData({
      businessProfile: {
        website: shareLinks ? website : null,
        linkedin: shareLinks ? linkedin : null,
        companySize
      }
    });
    let responseMessage = `Company size: ${companySize}`;
    if (shareLinks && (website || linkedin)) {
      responseMessage += `, Website: ${website}, LinkedIn: ${linkedin}`;
    } else {
      responseMessage += ', Skipped sharing links';
    }
    addMessage('user', responseMessage);
    nextScreen();
  };
  return <div className="space-y-4">
      <ProgressBar currentStep={5} totalSteps={6} />
      <div className="flex space-x-2">
        <button className={`flex-1 p-3 rounded-lg text-sm font-medium ${shareLinks === true ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`} onClick={() => setShareLinks(true)}>
          Yes
        </button>
        <button className={`flex-1 p-3 rounded-lg text-sm font-medium ${shareLinks === false ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`} onClick={() => setShareLinks(false)}>
          Skip for Now
        </button>
      </div>
      {shareLinks && <div className="space-y-3">
          <input type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="Company website (https://...)" className="w-full p-2 border border-gray-300 rounded-lg" />
          <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn profile (https://...)" className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company size
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['Solo', '2-10', '11-50', '50+'].map(size => <button key={size} className={`p-3 rounded-lg text-sm font-medium ${companySize === size ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`} onClick={() => setCompanySize(size)}>
              {size}
            </button>)}
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg" onClick={handleContinue} disabled={shareLinks === null || companySize === ''}>
        Continue
      </button>
    </div>;
};