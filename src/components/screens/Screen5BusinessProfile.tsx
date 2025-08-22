import React, { useState } from 'react';
import { UserData } from '../ChatBot';
interface Screen5Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen5BusinessProfile: React.FC<Screen5Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const [shareLinks, setShareLinks] = useState<boolean | null>(userData.businessProfile.website || userData.businessProfile.linkedin ? true : null);
  const [website, setWebsite] = useState<string>(userData.businessProfile.website || '');
  const [linkedin, setLinkedin] = useState<string>(userData.businessProfile.linkedin || '');
  const [companySize, setCompanySize] = useState<string>(userData.businessProfile.companySize || '');
  const handleContinue = () => {
    updateUserData({
      businessProfile: {
        website: shareLinks ? website : null,
        linkedin: shareLinks ? linkedin : null,
        companySize
      }
    });
    nextScreen();
  };
  const companySizes = [{
    id: 'solo',
    label: 'Solo',
    description: 'Just me'
  }, {
    id: 'small',
    label: '2-10',
    description: 'Small team'
  }, {
    id: 'medium',
    label: '11-50',
    description: 'Growing company'
  }, {
    id: 'large',
    label: '50+',
    description: 'Established business'
  }];
  return <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium mb-2">
          Want to share your website or LinkedIn?
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          This helps me customize suggestions based on your business
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button className={`py-3 px-4 rounded-lg text-center ${shareLinks === true ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => setShareLinks(true)}>
            Yes, I'll Share Links
          </button>
          <button className={`py-3 px-4 rounded-lg text-center ${shareLinks === false ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => setShareLinks(false)}>
            Skip for Now
          </button>
        </div>
        {shareLinks && <div className="space-y-3">
            <input type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="Company website (https://...)" className="w-full p-3 border border-gray-300 rounded-lg" />
            <input type="url" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn profile (https://...)" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium mb-3">Company Size</h3>
        <div className="grid grid-cols-2 gap-3">
          {companySizes.map(size => <button key={size.id} className={`p-3 rounded-lg text-center ${companySize === size.label ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`} onClick={() => setCompanySize(size.label)}>
              <div className="font-medium">{size.label}</div>
              <div className="text-xs mt-1">{size.description}</div>
            </button>)}
        </div>
      </div>
      <div className="flex justify-between pt-3">
        <button onClick={prevScreen} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
          Back
        </button>
        <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleContinue} disabled={shareLinks === null || companySize === ''}>
          Continue
        </button>
      </div>
    </div>;
};