import React, { useState } from 'react';
import { Screen1Initial } from './screens/Screen1Initial';
import { Screen2BusinessJourney } from './screens/Screen2BusinessJourney';
import { Screen3Geography } from './screens/Screen3Geography';
import { Screen4Services } from './screens/Screen4Services';
import { Screen5BusinessProfile } from './screens/Screen5BusinessProfile';
import { Screen7Timeline } from './screens/Screen7Timeline';
import { Screen8PlanSelection } from './screens/Screen8PlanSelection';
import { Screen9AddOns } from './screens/Screen9AddOns';
import { Screen10ContactInfo } from './screens/Screen10ContactInfo';
import { Screen11Summary } from './screens/Screen11Summary';
import { Screen12Consultation } from './screens/Screen12Consultation';
import { ScreenServicesAndAddOns } from './screens/ScreenServicesAndAddOns';
import { ScheduleConsultationScreen } from './screens/ScheduleConsultationScreen';
import { MessageCircleIcon } from 'lucide-react';
export type UserData = {
  flow: 'consultation' | 'quote' | null;
  businessJourney: string | null;
  geography: {
    basedIn: string | null;
    expandTo: string[];
  };
  services: string[];
  businessProfile: {
    website: string | null;
    linkedin: string | null;
    companySize: string | null;
  };
  timeline: string | null;
  plan: string | null;
  addOns: {
    name: string;
    price: number;
  }[];
  contactInfo: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
  nextStep: string | null;
  totalPrice: number;
  basePrice: number;
  countryFees: {
    country: string;
    fee: number;
  }[];
};
export const DirectChatInterface: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [screenHistory, setScreenHistory] = useState<number[]>([]);
  const [userData, setUserData] = useState<UserData>({
    flow: null,
    businessJourney: null,
    geography: {
      basedIn: null,
      expandTo: []
    },
    services: [],
    businessProfile: {
      website: null,
      linkedin: null,
      companySize: null
    },
    timeline: null,
    plan: null,
    addOns: [],
    contactInfo: {
      name: null,
      email: null,
      phone: null
    },
    nextStep: null,
    totalPrice: 0,
    basePrice: 0,
    countryFees: []
  });
  const [messages, setMessages] = useState<Array<{
    type: 'bot' | 'user';
    content: string;
  }>>([]);
  const addMessage = (type: 'bot' | 'user', content: string) => {
    setMessages(prev => [...prev, {
      type,
      content
    }]);
  };
  const nextScreen = (newScreen?: number) => {
    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(newScreen || currentScreen + 1);
  };
  const prevScreen = () => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };
  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }));
  };
  const renderScreen = () => {
    const props = {
      nextScreen,
      prevScreen,
      updateUserData,
      userData,
      addMessage
    };
    switch (currentScreen) {
      case 1:
        return <Screen1Initial {...props} />;
      case 2:
        return <Screen2BusinessJourney {...props} />;
      case 3:
        return <Screen3Geography {...props} />;
      case 4:
        return <Screen4Services {...props} />;
      case 5:
        return <Screen5BusinessProfile {...props} />;
      case 6:
        return <Screen7Timeline {...props} />;
      case 7:
        return <Screen8PlanSelection {...props} />;
      case 8:
        return <Screen9AddOns {...props} />;
      case 9:
        return <Screen10ContactInfo {...props} />;
      case 10:
        return <Screen11Summary {...props} />;
      case 11:
        return <Screen12Consultation {...props} />;
      case 12:
        return <ScreenServicesAndAddOns {...props} />;
      case 13:
        return <ScheduleConsultationScreen {...props} />;
      default:
        return <Screen1Initial {...props} />;
    }
  };
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 1:
        return null;
      case 2:
        return 'Where are you in your business journey?';
      case 3:
        return 'Where are you based, and where do you want to expand?';
      case 4:
        return 'Which services do you need help with?';
      case 5:
        return 'Tell us a bit more about your business';
      case 6:
        return 'When would you like to get started?';
      case 7:
        return 'Recommended Plan';
      case 8:
        return 'Would you like to add any of these?';
      case 9:
        return 'How shall we send your personalized solution?';
      case 10:
        return 'Your Business Expansion Plan';
      case 11:
        return userData.nextStep === 'Chat with Live Agent' ? 'Chat with Live Agent' : 'Connect with a Specialist';
      case 12:
        return 'Our Services & Add-ons';
      default:
        return null;
    }
  };
  const getScreenSubtitle = () => {
    switch (currentScreen) {
      case 2:
        return "Let's match you with the right expert. It'll take just 2 minutes.";
      case 3:
        return 'This helps us recommend the right services and pricing';
      case 4:
        return "Select all services you're interested in";
      case 5:
        return 'This helps us customize our suggestions for you';
      case 6:
        return "We can move faster than most firms, you're in good hands!";
      case 7:
        return 'Based on your needs, we recommend our eBranch Plan';
      case 8:
        return 'Enhance your plan with these additional services';
      case 9:
        return "I'm ready with your tailored solution";
      case 12:
        return 'Explore our full range of services for global expansion';
      default:
        return null;
    }
  };
  const getTotalSteps = () => {
    return userData.flow === 'consultation' ? 6 : 6;
  };
  const getCurrentStep = () => {
    if (currentScreen === 1) return 0;
    if (currentScreen > 10) return getTotalSteps();
    return currentScreen - 1;
  };
  return <div className="max-w-md mx-auto h-full">
      <div className="flex flex-col w-full h-full overflow-hidden bg-white shadow-lg">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-3 flex items-center">
          <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center mr-2">
            <MessageCircleIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold">House of Companies</h1>
            <p className="text-xs opacity-90">How can we help you expand?</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          {currentScreen > 1 && currentScreen <= 10 && <div className="px-4 pt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>
                  Step {getCurrentStep()} of {getTotalSteps()}
                </span>
                <span>
                  {Math.round(getCurrentStep() / getTotalSteps() * 100)}%
                  Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-1.5 rounded-full transition-all duration-500 ease-out" style={{
              width: `${getCurrentStep() / getTotalSteps() * 100}%`
            }}></div>
              </div>
            </div>}
          {getScreenTitle() && <div className="pt-4 px-4">
              <h2 className="text-lg md:text-xl font-bold text-center">
                {getScreenTitle()}
              </h2>
              {getScreenSubtitle() && <p className="text-center text-gray-600 text-xs md:text-sm mt-1">
                  {getScreenSubtitle()}
                </p>}
            </div>}
          <div className="p-4">{renderScreen()}</div>
        </div>
      </div>
    </div>;
};