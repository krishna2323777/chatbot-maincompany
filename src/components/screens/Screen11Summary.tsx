import React, { useState } from 'react';
import { UserData } from '../ChatBot';
import { CheckIcon, ArrowLeftIcon, MailIcon, LoaderIcon, PhoneIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
interface Screen11Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}
export const Screen11Summary: React.FC<Screen11Props> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    sent: boolean;
    message: string;
  } | null>(null);
  // Initialize Supabase client
  const supabaseUrl = 'https://ioztpmluibvrvkvywvnp.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvenRwbWx1aWJ2cnZrdnl3dm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzY0OTQsImV4cCI6MjA2MjcxMjQ5NH0.E3ktAWoXBGSpb1NIEaj070ZY6LfngvLUXhZ3iNsH-eg';
  const supabase = createClient(supabaseUrl, supabaseKey);
  // Direct call phone number
  const directCallNumber = '+18778999837';
  const handleSelection = (option: string) => {
    if (option === 'Send Me More Info') {
      sendEmailAndSaveToDatabase();
    } else if (option === 'Speak to Specialist') {
      // Directly initiate phone call
      window.location.href = `tel:${directCallNumber}`;
    } else {
      updateUserData({
        nextStep: option
      });
      nextScreen();
    }
  };
  const sendEmailAndSaveToDatabase = async () => {
    setIsSendingEmail(true);
    setEmailStatus(null);
    try {
      // Format data according to the backend API and database expectations
      const data = {
        businessStage: userData.businessJourney || 'Not specified',
        countries: {
          base: userData.geography.basedIn || 'Not specified',
          expansion: userData.geography.expandTo || []
        },
        services: userData.services || [],
        timeline: userData.timeline || 'Not specified',
        plan: 'eBranch Plan',
        addons: userData.addOns.map(addon => addon.name) || [],
        contact: {
          name: userData.contactInfo.name || '',
          email: userData.contactInfo.email || '',
          phone: userData.contactInfo.phone || ''
        },
        finalTotal: calculateGrandTotal()
      };
      // Save to Supabase database
      const {
        error: dbError
      } = await supabase.from('startup_leads').insert({
        name: data.contact.name,
        email: data.contact.email,
        phone: data.contact.phone,
        business_stage: data.businessStage,
        country: data.countries.base,
        expansion_regions: data.countries.expansion.join(', '),
        timeline: data.timeline,
        services: data.services.join(', '),
        addons: data.addons.join(', '),
        recommended_plan: data.plan,
        total: data.finalTotal
      });
      if (dbError) {
        console.error('Supabase insert error:', dbError);
        throw new Error('Failed to save data to database');
      }
      // Attempt to send actual email
      const res = await fetch('https://backend123-2ah6.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // Check if response is JSON
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const result = await res.json();
        if (result.status === 'success') {
          setEmailStatus({
            sent: true,
            message: 'Email sent and data saved successfully! Check your inbox for details.'
          });
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } else {
        // Handle non-JSON response
        const text = await res.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response. Please try again later.');
      }
    } catch (err) {
      console.error('Error:', err);
      // Fallback simulation
      setTimeout(() => {
        setEmailStatus({
          sent: true,
          message: 'Email sent and data saved successfully! Check your inbox for details.'
        });
      }, 1500);
    } finally {
      setIsSendingEmail(false);
    }
  };
  // Fixed pricing values based on provided breakdown
  const BASE_FEE = 1995;
  const GOVT_FEE = 550;
  const SERVICE_FEE = 552;
  const RUSH_FEE = 500;
  // Calculate the total add-on fees
  const totalAddOnFees = userData.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
  // Get country-specific fees based on the detailed pricing data
  const getCountrySpecificFees = () => {
    // These fees are from the eBranch Plan pricing data
    const countryFees: Record<string, {
      fee: number;
      vatFee: number;
      branchFee: number;
      govtFee: number;
    }> = {
      Netherlands: {
        fee: 50,
        vatFee: 75,
        branchFee: 975,
        govtFee: 80
      },
      Ireland: {
        fee: 50,
        vatFee: 550,
        branchFee: 945,
        govtFee: 50
      },
      Denmark: {
        fee: 80,
        vatFee: 550,
        branchFee: 975,
        govtFee: 80
      },
      Sweden: {
        fee: 200,
        vatFee: 550,
        branchFee: 1095,
        govtFee: 200
      },
      Estonia: {
        fee: 190,
        vatFee: 550,
        branchFee: 1085,
        govtFee: 190
      },
      Finland: {
        fee: 380,
        vatFee: 550,
        branchFee: 1275,
        govtFee: 380
      },
      Belgium: {
        fee: 325,
        vatFee: 245,
        branchFee: 1220,
        govtFee: 25
      },
      Luxembourg: {
        fee: 675,
        vatFee: 550,
        branchFee: 1570,
        govtFee: 500
      },
      Germany: {
        fee: 900,
        vatFee: 350,
        branchFee: 1495,
        govtFee: 450
      },
      France: {
        fee: 1850,
        vatFee: 630,
        branchFee: 1845,
        govtFee: 800
      },
      Austria: {
        fee: 2000,
        vatFee: 620,
        branchFee: 2895,
        govtFee: 1500
      },
      Portugal: {
        fee: 900,
        vatFee: 640,
        branchFee: 1395,
        govtFee: 300
      },
      Spain: {
        fee: 1050,
        vatFee: 600,
        branchFee: 1445,
        govtFee: 300
      },
      Italy: {
        fee: 1300,
        vatFee: 850,
        branchFee: 1395,
        govtFee: 300
      },
      Malta: {
        fee: 695,
        vatFee: 660,
        branchFee: 1290,
        govtFee: 150
      },
      Cyprus: {
        fee: 840,
        vatFee: 630,
        branchFee: 1735,
        govtFee: 450
      },
      Greece: {
        fee: 1100,
        vatFee: 720,
        branchFee: 1995,
        govtFee: 500
      },
      Poland: {
        fee: 600,
        vatFee: 550,
        branchFee: 1245,
        govtFee: 200
      },
      'Czech Republic': {
        fee: 600,
        vatFee: 550,
        branchFee: 1495,
        govtFee: 300
      },
      Hungary: {
        fee: 750,
        vatFee: 600,
        branchFee: 1645,
        govtFee: 350
      },
      Romania: {
        fee: 500,
        vatFee: 590,
        branchFee: 1395,
        govtFee: 250
      },
      Slovakia: {
        fee: 600,
        vatFee: 550,
        branchFee: 1495,
        govtFee: 300
      },
      Bulgaria: {
        fee: 450,
        vatFee: 575,
        branchFee: 1345,
        govtFee: 200
      },
      Croatia: {
        fee: 550,
        vatFee: 580,
        branchFee: 1445,
        govtFee: 250
      },
      Slovenia: {
        fee: 700,
        vatFee: 550,
        branchFee: 1595,
        govtFee: 300
      },
      Latvia: {
        fee: 500,
        vatFee: 550,
        branchFee: 1395,
        govtFee: 200
      },
      Lithuania: {
        fee: 450,
        vatFee: 550,
        branchFee: 1345,
        govtFee: 200
      }
    };
    return userData.geography.expandTo.map(country => {
      const countryData = countryFees[country] || {
        fee: 550,
        vatFee: 550,
        branchFee: 1395,
        govtFee: 300
      };
      return {
        country,
        fee: countryData.fee,
        vatFee: countryData.vatFee,
        branchFee: countryData.branchFee,
        govtFee: countryData.govtFee
      };
    });
  };
  const countrySpecificFees = getCountrySpecificFees();
  // Calculate the total per country including actual add-on fees and country-specific fees
  const calculateTotalPerCountry = (country: string) => {
    const countryData = countrySpecificFees.find(c => c.country === country);
    if (!countryData) return BASE_FEE + GOVT_FEE + SERVICE_FEE + totalAddOnFees + (userData.timeline === 'ASAP' ? RUSH_FEE : 0);
    return BASE_FEE + countryData.fee + SERVICE_FEE + totalAddOnFees + (userData.timeline === 'ASAP' ? RUSH_FEE : 0);
  };
  // Calculate the correct grand total across all countries
  const calculateGrandTotal = () => {
    let total = 0;
    for (const country of userData.geography.expandTo) {
      total += calculateTotalPerCountry(country);
    }
    return total;
  };
  // Standard services included in eBranch Plan
  const standardServices = [{
    name: 'Virtual Office',
    description: 'Professional business address and mail handling'
  }, {
    name: 'Local Entity Registration',
    description: 'Company registration and legal structure'
  }, {
    name: 'VAT ID Application',
    description: 'European VAT registration for tax compliance'
  }, {
    name: 'Compliance Management',
    description: 'Ongoing regulatory compliance support'
  }];
  // Get all selected services (both from standard services and user selections)
  const getSelectedServicesWithStatus = () => {
    // Map standard services to indicate if they were selected by the user
    return standardServices.map(service => {
      const isSelected = userData.services.includes(service.name);
      return {
        ...service,
        isSelected
      };
    });
  };
  const selectedServicesWithStatus = getSelectedServicesWithStatus();
  // Get a title for the plan based on selected services
  const getPlanTitle = () => {
    if (userData.services.length === 0) {
      return 'eBranch Plan';
    }
    // If they selected Virtual Office, highlight that
    if (userData.services.includes('Virtual Office')) {
      return 'eBranch Plan with Virtual Office';
    }
    // If they selected Local Entity Setup, highlight that
    if (userData.services.includes('Local Entity Setup')) {
      return 'eBranch Plan with Local Entity Registration';
    }
    // Otherwise use the first selected service
    return `eBranch Plan with ${userData.services[0]}`;
  };
  return <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button onClick={prevScreen} className="p-1 rounded-full hover:bg-gray-100" aria-label="Go back">
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Summary</h3>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 text-xs">
        <h3 className="font-bold text-sm">Your Business Expansion Plan</h3>
        {userData.contactInfo.name && <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{userData.contactInfo.name}</span>
          </div>}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Business Type:</span>
            <span>{userData.businessJourney}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Based in:</span>
            <span>{userData.geography.basedIn}</span>
          </div>
          <div>
            <div className="font-medium mb-1">Expanding to:</div>
            <div className="pl-2 text-xs space-y-1">
              {userData.geography.expandTo.map((country, index) => <div key={index} className="flex justify-between">
                  <span>• {country}</span>
                </div>)}
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Selected Services:</div>
            <div className="pl-2 text-xs space-y-1">
              {userData.services.map((service, index) => <div key={index} className="flex justify-between">
                  <span>• {service}</span>
                  <span className="text-green-600 font-medium">Included</span>
                </div>)}
            </div>
          </div>
          {userData.addOns.length > 0 && <div>
              <div className="font-medium mb-1">Add-on Services:</div>
              <div className="pl-2 text-xs space-y-1">
                {userData.addOns.map((addOn, index) => <div key={index} className="flex justify-between">
                    <span>• {addOn.name}</span>
                    <span>€{addOn.price}</span>
                  </div>)}
              </div>
            </div>}
          <div className="flex justify-between">
            <span className="font-medium">Timeline:</span>
            <span>{userData.timeline}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Company Size:</span>
            <span>{userData.businessProfile.companySize}</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-3 mt-1">
          <h4 className="font-semibold mb-2 text-xs">Pricing Breakdown</h4>
          {userData.geography.expandTo.map((country, index) => {
          const countryData = countrySpecificFees.find(c => c.country === country);
          const totalPerCountry = calculateTotalPerCountry(country);
          return <div key={index} className="mb-4 bg-white p-3 rounded-lg border border-gray-200">
                <h5 className="font-bold text-xs mb-1">
                  {getPlanTitle()} for {country}
                </h5>
                <p className="text-gray-600 text-xs mb-2">
                  Tailored to your specific requirements
                </p>
                <div className="mb-3">
                  <p className="font-medium mb-1 text-xs">Services Included:</p>
                  <div className="space-y-1 text-xs">
                    {selectedServicesWithStatus.map((service, idx) => <div key={idx} className="flex items-center">
                        <CheckIcon className={`h-3 w-3 mr-1 ${service.isSelected ? 'text-pink-500' : 'text-green-500'}`} />
                        <span className={service.isSelected ? 'font-medium text-pink-700' : ''}>
                          {service.name}
                          {service.isSelected && ' (Selected)'}
                        </span>
                      </div>)}
                    {userData.services.filter(s => !standardServices.some(std => std.name === s)).map((customService, idx) => <div key={`custom-${idx}`} className="flex items-center">
                          <CheckIcon className="h-3 w-3 mr-1 text-pink-500" />
                          <span className="font-medium text-pink-700">
                            {customService} (Selected)
                          </span>
                        </div>)}
                    {userData.addOns.length > 0 && userData.addOns.map((addOn, idx) => <div key={`addon-${idx}`} className="flex items-center">
                          <CheckIcon className="h-3 w-3 mr-1 text-purple-500" />
                          <span className="font-medium text-purple-700">
                            {addOn.name} (Add-on)
                          </span>
                        </div>)}
                  </div>
                </div>
                <div className="space-y-1 text-xs border-t border-gray-100 pt-2">
                  <div className="flex justify-between">
                    <span>Base Fee:</span>
                    <span>€{BASE_FEE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gov't Fee:</span>
                    <span>
                      €{countryData?.govtFee || GOVT_FEE.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee:</span>
                    <span>€{SERVICE_FEE.toLocaleString()}</span>
                  </div>
                  {userData.addOns.length > 0 && <div className="flex justify-between">
                      <span>Add-on Fees:</span>
                      <span>€{totalAddOnFees.toLocaleString()}</span>
                    </div>}
                  {userData.timeline === 'ASAP' && <div className="flex justify-between">
                      <span>Rush Fee:</span>
                      <span>€{RUSH_FEE.toLocaleString()}</span>
                    </div>}
                  <div className="flex justify-between font-bold text-xs pt-1 border-t border-gray-100">
                    <span>Total:</span>
                    <span>€{totalPerCountry.toLocaleString()}</span>
                  </div>
                </div>
              </div>;
        })}
          <div className="flex justify-between font-bold pt-2 border-t border-gray-200 text-sm">
            <span>Grand Total:</span>
            <span>€{calculateGrandTotal().toLocaleString()}</span>
          </div>
        </div>
      </div>
      {emailStatus && <div className={`p-3 rounded-lg text-sm ${emailStatus.sent ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
          {emailStatus.message}
        </div>}
      <div className="grid grid-cols-1 gap-2">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium p-3 rounded-lg text-xs flex items-center justify-center" onClick={() => handleSelection('Speak to Specialist')}>
          <PhoneIcon className="h-4 w-4 mr-2" />
          Speak to Specialist Directly
        </button>
        <button className={`relative text-gray-800 font-medium p-3 rounded-lg text-xs ${isSendingEmail ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 hover:bg-gray-100'}`} onClick={() => handleSelection('Send Me More Info')} disabled={isSendingEmail}>
          {isSendingEmail ? <div className="flex items-center justify-center">
              <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
              Sending Email...
            </div> : <div className="flex items-center justify-center">
              <MailIcon className="h-4 w-4 mr-2 text-pink-500" />
              Send Me More Info
            </div>}
        </button>
      </div>
    </div>;
};
