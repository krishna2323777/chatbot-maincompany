import React, { useState, useRef, useEffect } from "react";
import { UserData } from "../DirectChatInterface";
import {
  FileTextIcon,
  PackageIcon,
  CheckIcon,
  MessageCircleIcon,
  SendHorizonal,
} from "lucide-react";

interface Screen1Props {
  nextScreen: (screen?: number) => void;
  prevScreen: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}

type Message = {
  sender: "user" | "ai";
  text: string;
};

export const Screen1Initial: React.FC<Screen1Props> = ({
  nextScreen,
  updateUserData,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSelection = (option: string) => {
    let flow: "consultation" | "quote" | null = null;
    if (option === "Get a Personalized Quote") {
      flow = "consultation";
      updateUserData({ flow });
      nextScreen();
    } else if (option === "Browse Our Services") {
      flow = "consultation";
      updateUserData({ flow });
      nextScreen(12);
    } else if (option === "Chat with Live Agent") {
      flow = "consultation";
      updateUserData({ flow });
      nextScreen(13);
    }
  };

  // ✅ Gemini 2.5 Flash API Call with Chat-like Responses
  const handleSend = async (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    // Check if API key is available
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file." },
      ]);
      return;
    }

    // add user message
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setInput("");

    setLoading(true);
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
          import.meta.env.VITE_GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ 
              role: "user", 
              parts: [{ 
                text: `You are a business consultant from House of Companies, specializing in European business expansion and compliance services. 

Company Knowledge:
- We help businesses expand to Europe with services like company registration, VAT compliance, virtual offices, and ongoing compliance management
- Our eBranch Plan includes virtual office, local entity registration, VAT ID application, and compliance management
- We serve 30+ European countries including Netherlands, Germany, France, Ireland, Denmark, Sweden, Estonia, Finland, Belgium, Luxembourg, Austria, Portugal, Spain, Italy, Malta, Cyprus, Greece, Poland, Czech Republic, Hungary, Romania, Slovakia, Bulgaria, Croatia, Slovenia, Latvia, and Lithuania
- We offer add-on services like corporate tax filing, VAT returns, annual reports, payroll management, and residency permits
- Our pricing starts at €1,995/year for the eBranch Plan plus country-specific fees
- We provide expert support with dedicated account managers
- No accountant needed - we handle all compliance requirements

Keep responses short and conversational (1-2 sentences max). Be friendly, direct, and reference our specific services when relevant. User question: ${query}` 
              }] 
            }],
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API returned an error');
      }

      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    } catch (err) {
      console.error('AI API Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `⚠️ Error: ${errorMessage}. Please check your API key and try again.` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "What's included in your eBranch Plan?",
    "How much does it cost to expand to Germany?",
    "Do you handle VAT compliance?",
    "Can you help with virtual office setup?",
  ];

  // ✅ Enhanced auto scroll to bottom on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      // Smooth scroll with a small delay to ensure content is rendered
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "end",
          inline: "nearest"
        });
      }, 100);
    }
  }, [messages, loading]);

  return (
    <div className="space-y-4">
      {/* Intro Card */}
      <div className="bg-pink-50 rounded-xl p-4 md:p-6">
        <div className="flex justify-center mb-4">
          <img
            src="/image.png"
            alt="House of Companies Logo"
            className="h-16 w-[4.1875rem] md:h-20 md:w-20"
          />
        </div>
        <h2 className="text-lg font-bold text-center mb-2">
          Welcome to House of Companies!
        </h2>
        <p className="text-center text-gray-600 text-xs md:text-sm">
          I can help you expand your business and handle compliance — no
          accountant needed!
        </p>
      </div>

      {/* Buttons */}
      <button
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 text-white font-medium p-3 md:p-3.5 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-md active:scale-98"
        onClick={() => handleSelection("Chat with Live Agent")}
      >
        <MessageCircleIcon className="h-5 w-5 mr-2" />
        Call with Live Agent
      </button>
      <button
        className="w-full bg-gradient-to-r from-teal-400 to-green-500 hover:opacity-90 text-white font-medium p-3 md:p-3.5 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-md active:scale-98"
        onClick={() => handleSelection("Get a Personalized Quote")}
      >
        <FileTextIcon className="h-5 w-5 mr-2" />
        Get a Personalized Quote
      </button>
      <button
        className="w-full bg-white hover:bg-gray-50 text-gray-800 font-medium p-3 md:p-3.5 rounded-xl border border-gray-200 flex items-center justify-center transition-all duration-200 hover:shadow-md active:scale-98"
        onClick={() => handleSelection("Browse Our Services")}
      >
        <PackageIcon className="h-5 w-5 mr-2" />
        Browse Our Services
      </button>

      {/* Features */}
      <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs text-gray-600">
        <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
          <span>No accountant needed</span>
        </div>
        <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
          <span>2-minute setup</span>
        </div>
        <div className="flex items-center">
          <CheckIcon className="h-4 w-4 text-green-500 mr-1" />
          <span>Expert support</span>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500">
        Trusted by 1000+ businesses across Europe and beyond
      </p>

      {/* ✅ Integrated Chat Responses in Main Flow */}
      {messages.length > 0 && (
        <div className="border-t pt-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-lg text-sm max-w-[85%] ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Input Bar */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
          <input
            type="text"
            placeholder="Ask me anything about business expansion in Europe..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-0 outline-none text-sm placeholder-gray-500 focus:ring-0"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-2 rounded-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="flex flex-wrap gap-2 mt-3">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="bg-gray-50 hover:bg-gray-100 text-xs px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:text-gray-900 transition-all duration-200 hover:border-gray-300"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
