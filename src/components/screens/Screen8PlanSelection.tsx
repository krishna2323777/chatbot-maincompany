import React, { useState } from 'react';
import { UserData } from '../ChatBot';
import { ArrowLeftIcon, InfoIcon, XIcon } from 'lucide-react';
interface Screen8Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen8PlanSelection: React.FC<Screen8Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const [showRecommendationPopup, setShowRecommendationPopup] = useState(false);
  const handleSelection = (option: string) => {
    const basePrice = 1995; // eBranch Plan base price is €1,995/year
    // Calculate country-specific fees
    const countryFees = getCountrySpecificFees();
    const totalCountryFees = countryFees.reduce((sum, item) => sum + item.fee, 0);
    const totalPrice = basePrice + totalCountryFees;
    updateUserData({
      plan: 'eBranch Plan',
      basePrice: basePrice,
      countryFees: countryFees,
      totalPrice: totalPrice
    });
    // Always proceed to the next screen
    nextScreen();
  };
  // Calculate country-specific pricing based on user selections
  const getCountrySpecificFees = () => {
    // These are the notary/government fees for branch registration under the eBranch Plan
    // Updated with comprehensive pricing data from the user's request
    const countryFees: Record<string, number> = {
      Netherlands: 50,
      Ireland: 50,
      Denmark: 80,
      Sweden: 200,
      Estonia: 190,
      Finland: 380,
      Belgium: 325,
      Luxembourg: 675,
      Germany: 900,
      France: 1850,
      Austria: 2000,
      Portugal: 900,
      Spain: 1050,
      Italy: 1300,
      Malta: 695,
      Cyprus: 840,
      Greece: 1100,
      Poland: 600,
      CzechRepublic: 600,
      Hungary: 750,
      Romania: 500,
      Slovakia: 600,
      Bulgaria: 450,
      Croatia: 550,
      Slovenia: 700,
      Latvia: 500,
      Lithuania: 450
    };
    return userData.geography.expandTo.map(country => ({
      country,
      fee: countryFees[country] || 550 // Default fee if country not found
    }));
  };
  const countryFees = getCountrySpecificFees();
  const totalCountryFees = countryFees.reduce((sum, item) => sum + item.fee, 0);
  const basePrice = 1995; // eBranch Plan base price is €1,995/year
  const totalPrice = basePrice + totalCountryFees;
  // Get the recommendation reasons based on user selections
  const getRecommendationReasons = () => {
    const reasons = [];
    // Based on business journey
    if (userData.businessJourney === 'Startup' || userData.businessJourney === 'Early Stage') {
      reasons.push('Your startup stage requires comprehensive support for international growth');
    } else if (userData.businessJourney === 'Established Business') {
      reasons.push('Your established business needs efficient expansion solutions');
    }
    // Based on geography
    if (userData.geography.expandTo.length > 1) {
      reasons.push(`Expanding to multiple countries (${userData.geography.expandTo.join(', ')}) requires our coordinated approach`);
    } else if (userData.geography.expandTo.length === 1) {
      reasons.push(`Expansion to ${userData.geography.expandTo[0]} is optimally supported by our eBranch Plan`);
    }
    // Based on services
    if (userData.services.includes('Virtual Office')) {
      reasons.push('You need a Virtual Office solution which is included in this plan');
    }
    if (userData.services.includes('Local Entity Setup')) {
      reasons.push('You need assistance with Local Entity Registration which is a core component of this plan');
    }
    if (userData.services.includes('VAT ID Application')) {
      reasons.push('VAT ID Application is included in this comprehensive plan');
    }
    // Based on timeline
    if (userData.timeline === 'ASAP') {
      reasons.push('Your urgent timeline requires our expedited services');
    } else if (userData.timeline === '1-3 months') {
      reasons.push('Your 1-3 month timeline aligns perfectly with our implementation process');
    }
    // If no specific reasons, provide general ones
    if (reasons.length === 0) {
      reasons.push('This plan offers the best value for your international expansion needs', 'All essential services for business expansion are included', 'Comprehensive compliance management is provided');
    }
    return reasons;
  };
  const recommendationReasons = getRecommendationReasons();
  return <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Recommended Plan</h3>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-base">eBranch Plan</h3>
          <button onClick={() => setShowRecommendationPopup(true)} className="p-1 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors" aria-label="Why this plan?">
            <InfoIcon className="h-4 w-4 text-pink-600" />
          </button>
        </div>
        <ul className="text-xs space-y-1 mb-3">
          <li>✓ Virtual Office Address</li>
          <li>✓ Local Entity Registration</li>
          <li>✓ VAT ID Application</li>
          <li>✓ Compliance Management</li>
          <li>✓ Dedicated Account Manager</li>
        </ul>
        <div className="border-t border-gray-200 pt-2 mb-2">
          <div className="flex justify-between text-xs">
            <span>Base package:</span>
            <span>€{basePrice}</span>
          </div>
          {countryFees.map((item, index) => <div key={index} className="flex justify-between text-xs">
              <span>{item.country} fees:</span>
              <span>€{item.fee}</span>
            </div>)}
          <div className="flex justify-between font-bold mt-2 text-sm">
            <span>Total:</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-lg text-xs" onClick={() => handleSelection('Continue')}>
        Continue
      </button>
      {/* Recommendation Explanation Popup */}
      {showRecommendationPopup && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] md:max-h-[80vh] overflow-y-auto m-2">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">
                  Why We Recommend This Plan
                </h3>
                <button onClick={() => setShowRecommendationPopup(false)} className="p-1 rounded-full hover:bg-gray-100" aria-label="Close popup">
                  <XIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200 mb-4">
                <p className="text-sm text-gray-700">
                  Based on your specific needs and selections, we've recommended
                  our eBranch Plan for your business expansion to{' '}
                  {userData.geography.expandTo.join(', ')}.
                </p>
              </div>
              <h4 className="font-semibold text-sm mb-2 text-gray-800">
                Key reasons for this recommendation:
              </h4>
              <ul className="space-y-2 mb-4">
                {recommendationReasons.map((reason, index) => <li key={index} className="flex items-start text-sm">
                    <div className="bg-pink-100 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                      <InfoIcon className="h-3 w-3 text-pink-600" />
                    </div>
                    <span>{reason}</span>
                  </li>)}
              </ul>
              <h4 className="font-semibold text-sm mb-2 text-gray-800">
                Plan highlights:
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Virtual Office:</span>{' '}
                  Professional business address and mail handling in{' '}
                  {userData.geography.expandTo.join(', ')}
                </p>
                <p>
                  <span className="font-medium">
                    Local Entity Registration:
                  </span>{' '}
                  Complete legal setup of your business entity
                </p>
                <p>
                  <span className="font-medium">VAT ID Application:</span>{' '}
                  Hassle-free VAT registration for tax compliance
                </p>
                <p>
                  <span className="font-medium">Compliance Management:</span>{' '}
                  Ongoing support to ensure regulatory compliance
                </p>
                <p>
                  <span className="font-medium">Dedicated Manager:</span> A
                  single point of contact for all your expansion needs
                </p>
              </div>
              {userData.services.length > 0 && <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-sm mb-1 text-green-800">
                    Your Selected Services:
                  </h4>
                  <ul className="space-y-1">
                    {userData.services.map((service, index) => <li key={index} className="text-sm text-green-800 flex items-center">
                        <div className="bg-green-100 p-1 rounded-full mr-2 flex-shrink-0">
                          <InfoIcon className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="break-words">{service}</span>
                      </li>)}
                  </ul>
                </div>}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-medium p-3 rounded-lg text-sm" onClick={() => setShowRecommendationPopup(false)}>
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>}
    </div>;
};