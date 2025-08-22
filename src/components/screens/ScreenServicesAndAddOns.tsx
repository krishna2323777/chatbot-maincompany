import React from 'react';
import { UserData } from '../ChatBot';
import {
  BuildingIcon,
  FileTextIcon,
  FileIcon,
  CalculatorIcon,
  BarChartIcon,
  PlusIcon,
  UserIcon,
  CoinsIcon,
  ClipboardCheckIcon,
  ArrowLeftIcon,
  CheckIcon,
  HomeIcon,
  ZapIcon,
  StarIcon,
  CrownIcon
} from 'lucide-react';

interface ScreenServicesAndAddOnsProps {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}

export const ScreenServicesAndAddOns: React.FC<ScreenServicesAndAddOnsProps> = ({
  nextScreen,
  prevScreen,
  updateUserData,
  userData
}) => {
  const handleSelection = (option: string) => {
    let flow: 'consultation' | 'quote' | null = null;
    if (option === 'Get a Personalized Quote') {
      flow = 'quote'; // or 'consultation' based on your flow logic
      updateUserData({ flow });
      nextScreen(2); // optionally use nextScreen(14) to go to a specific screen
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      subtitle: 'Get started with basics',
      price: '€0',
      period: '/month (3 months)',
      originalPrice: null,
      badge: 'STARTER',
      badgeColor: 'bg-green-100 text-green-700',
      icon: ZapIcon,
      iconColor: 'text-green-600',
      gradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      buttonStyle: 'bg-green-600 hover:bg-green-700',
      features: [
        'Virtual EU office',
        'Phone number',
        '25 credits',
        'AI Market Entry Strategy',
        'Basic AI tools'
      ],
      popular: false
    },
    {
      id: 'ebranch',
      name: 'eBranch Plan',
      subtitle: 'Most popular for businesses',
      price: '€1,995',
      period: '/year',
      originalPrice: '€2,495',
      badge: 'MOST POPULAR',
      badgeColor: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white',
      icon: StarIcon,
      iconColor: 'text-pink-600',
      gradient: 'from-pink-50 to-purple-50',
      borderColor: 'border-pink-300',
      buttonStyle:
        'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
      features: [
        'All Free Plan features',
        'Financial Reporting Portal',
        'AI Mailbox',
        'Registered office',
        'VAT/EORI/Employer registration',
        'Quarterly VAT filing',
        'Annual Corporate Analysis',
        'AI Corporate Agent',
        'Lifetime deal (April–May)'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      subtitle: 'For scaling businesses',
      price: 'Custom',
      period: 'Pricing',
      originalPrice: null,
      badge: 'PREMIUM',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white',
      icon: CrownIcon,
      iconColor: 'text-purple-600',
      gradient: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-300',
      buttonStyle:
        'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700',
      features: [
        'All eBranch features',
        'Customized Portal',
        'Dedicated Manager',
        'Priority Support',
        'Flexible Add-ons'
      ],
      popular: false
    }
  ];

  const services = [
    {
      id: 'virtual-office',
      name: 'Virtual Office',
      description: 'Professional business address and mail handling',
      icon: <BuildingIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-pink-500',
      popular: true
    },
    {
      id: 'entity-setup',
      name: 'Local Entity Setup',
      description: 'Company registration and legal structure',
      icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-pink-500',
      popular: true
    },
    {
      id: 'vat-id',
      name: 'VAT ID Application',
      description: 'European VAT registration for tax compliance',
      icon: <FileIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-pink-500'
    },
    {
      id: 'vat-filing',
      name: 'VAT Filing',
      description: 'Quarterly VAT return submissions',
      icon: <CalculatorIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-pink-500'
    },
    {
      id: 'annual-reports',
      name: 'Annual Financial Reports',
      description: 'Complete financial statements and compliance',
      icon: <BarChartIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-pink-500',
      popular: true
    }
  ];

  const addOns = [
    {
      id: 'corporate-tax',
      name: 'Corporate Tax Filing',
      price: 125,
      description: 'Annual tax filing assistance',
      icon: <FileTextIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500'
    },
    {
      id: 'vat-return',
      name: 'VAT Return Filing',
      price: 175,
      description: 'Quarterly VAT return filing assistance',
      icon: <CalculatorIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500'
    },
    {
      id: 'financial-statement',
      name: 'Annual Report Preparation',
      price: 395,
      description: 'Annual financial statement preparation',
      icon: <BarChartIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500',
      popular: true
    },
    {
      id: 'payroll',
      name: 'Payroll Management',
      price: 25,
      description: '€25/month per employee',
      icon: <CoinsIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500',
      popular: true
    },
    {
      id: 'eor',
      name: 'Professional Employment Service',
      price: 175,
      description: '€175/month per employee',
      icon: <UserIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500'
    },
    {
      id: 'residency',
      name: 'Residency Permit Application',
      price: 550,
      description: 'Assistance with residency applications',
      icon: <FileIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500'
    },
    {
      id: 'business-plan',
      name: 'AI Business Plan Preparation',
      price: 295,
      description: 'Customized business plan for your expansion',
      icon: <ClipboardCheckIcon className="h-5 w-5 text-white" />,
      bgColor: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        <button
          onClick={prevScreen}
          className="p-1 rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1 text-center">
          <h3 className="font-medium text-sm">Our Services & Add-ons</h3>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 mb-4">
        <h3 className="font-semibold mb-2 text-blue-700">Pricing Plans</h3>
        <p className="text-xs text-blue-700 mb-3">
          Choose the plan that best fits your business needs
        </p>
        <div className="space-y-3">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                className={`border rounded-lg p-3 bg-gradient-to-r ${plan.gradient} ${plan.borderColor}`}
              >
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 bg-white`}>
                    <IconComponent className={`h-5 w-5 ${plan.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${plan.badgeColor}`}>
                          {plan.badge}
                        </span>
                        <h3 className="font-bold text-sm mt-1">{plan.name}</h3>
                        <p className="text-xs text-gray-600">{plan.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {plan.originalPrice && (
                            <span className="text-xs text-gray-500 line-through mr-1">
                              {plan.originalPrice}
                            </span>
                          )}
                          <span className="font-bold text-lg">{plan.price}</span>
                        </div>
                        <span className="text-xs text-gray-600">{plan.period}</span>
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs">
                          <CheckIcon className="h-3 w-3 text-green-500 mr-1" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Services */}
      <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
        <h3 className="font-semibold mb-2 text-pink-700">Core Services</h3>
        <p className="text-xs text-pink-700 mb-2">Essential services for your international expansion</p>
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-3 bg-white border-gray-200">
              <div className="flex items-start">
                <div className={`${service.bgColor} p-2 rounded-lg mr-3`}>{service.icon}</div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-sm">{service.name}</h3>
                    {service.popular && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
        <h3 className="font-semibold mb-2 text-purple-700">Add-on Services</h3>
        <p className="text-xs text-purple-700 mb-2">Enhance your plan with these additional services</p>
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
          {addOns.map((addon) => (
            <div key={addon.id} className="border rounded-lg p-3 bg-white border-gray-200">
              <div className="flex items-start">
                <div className={`${addon.bgColor} p-2 rounded-lg mr-3`}>{addon.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className="font-medium text-sm">{addon.name}</h3>
                      {addon.popular && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">€{addon.price}</span>
                  </div>
                  <p className="text-xs text-gray-600">{addon.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="pt-2 flex justify-center space-x-4 text-xs text-gray-600">
        <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
          <span>30+ countries</span>
        </div>
        <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
          <span>Expert support</span>
        </div>
        <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
          <span>Transparent pricing</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-medium p-3.5 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-md"
        onClick={() => handleSelection('Get a Personalized Quote')}
      >
        <HomeIcon className="h-5 w-5 mr-2 text-white" />
        Get a Personalized Quote
      </button>
    </div>
  );
};
