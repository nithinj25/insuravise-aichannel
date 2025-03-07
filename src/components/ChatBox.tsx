import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, X, MessageSquare, Loader2, FileText, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

// Define the type for a message
interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const isInsuranceFinder = location.pathname.includes("insurance-finder");

  // Auto scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus the input when the chat box is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Toggle the chat box open/closed
  const toggleChatBox = () => {
    setIsOpen(!isOpen);
    // Add initial greeting if this is the first time opening
    if (!isOpen && messages.length === 0) {
      const greeting = isInsuranceFinder
        ? "Hi there! I'm your InsuraBot assistant. I can help you understand insurance policies, compare options, and complete this insurance finder form. What specific questions do you have about your insurance search?"
        : "Hi there! I'm your InsuraBot assistant. I can help explain insurance policies, coverage details, and insurance terminology. What would you like to know about insurance today?";
      
      setMessages([
        {
          id: Date.now().toString(),
          content: greeting,
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Simulate AI response delay (replace with actual API call when ready)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Provide policy-focused responses based on keywords in the user's message
      const userQuestion = inputValue.toLowerCase();
      let response = "I'm not sure how to help with that specific question. Could you ask about a specific insurance term, policy type, or coverage detail?";
      
      // Insurance finder specific responses
      if (isInsuranceFinder) {
        if (userQuestion.includes("form") || userQuestion.includes("fill") || userQuestion.includes("complete")) {
          response = "To complete this form effectively:\n\n• Insurance Type: Select the type of insurance you're looking for\n• Coverage Level: Higher percentages mean more comprehensive coverage\n• Monthly Budget: Set how much you can afford to pay each month\n• Personal Information: Your age and family size help determine appropriate plans\n• Priorities: Select what matters most to you in an insurance plan\n\nAfter filling out the form, click 'Find My Best Insurance Options' and I'll analyze the market for you!";
        } else if (userQuestion.includes("recommendations") || userQuestion.includes("results") || userQuestion.includes("options")) {
          response = "Our recommendation engine analyzes thousands of real policies to find your best matches. The results show:\n\n• Match Score: How well each plan aligns with your needs\n• Monthly Premium: What you'll pay each month\n• Key Features: The most important benefits of each plan\n• Policy Details: Click 'View Policy Details' to see the full coverage\n\nThe top recommendation will be highlighted and appear first in your results.";
        } else if (userQuestion.includes("match score") || userQuestion.includes("matching")) {
          response = "The Match Score shows how well an insurance policy aligns with your specific needs and preferences. It's calculated based on:\n\n• How well the coverage matches your desired level\n• Whether the premium fits within your budget\n• How the policy addresses your stated priorities\n• Whether the policy covers your specific situation (family size, age, etc.)\n\nA higher match score means the policy is more likely to meet your unique insurance needs.";
        }
      }

      // General insurance responses - keep existing logic
      if (response === "I'm not sure how to help with that specific question. Could you ask about a specific insurance term, policy type, or coverage detail?") {
        if (userQuestion.includes("premium") || userQuestion.includes("how much") || userQuestion.includes("cost")) {
          response = "Insurance premiums are the amount you pay to maintain your coverage. They're calculated based on risk factors such as:\n\n• Your coverage amount\n• Your deductible (higher deductibles typically mean lower premiums)\n• Your personal details (age, health status, driving record, etc.)\n• Property value or vehicle type\n• Location\n• Claim history\n\nWould you like me to explain more about how to potentially lower your premium costs?";
        } else if (userQuestion.includes("deductible")) {
          response = "A deductible is the amount you pay out-of-pocket before your insurance coverage kicks in. For example, if you have a $500 deductible and file a claim for $2,000, you'll pay $500 and your insurance would cover the remaining $1,500.\n\nHigher deductibles typically result in lower premium payments, but mean more out-of-pocket expenses when you file a claim. Lower deductibles mean higher premiums but less financial burden when filing a claim. It's all about balancing your monthly budget with your ability to cover unexpected costs.";
        } else if (userQuestion.includes("coverage") || userQuestion.includes("covered")) {
          response = "Insurance coverage defines what your policy will pay for. Coverage varies greatly by policy type:\n\n• Health insurance typically covers medical services, prescriptions, and sometimes dental/vision\n• Auto insurance can include liability, collision, comprehensive, and uninsured motorist coverage\n• Home insurance covers property damage, personal liability, and often your possessions\n\nIt's crucial to understand the specific coverages in your policy, including any exclusions or limitations. Would you like me to explain any of these coverage types in more detail?";
        } else if (userQuestion.includes("claim") || userQuestion.includes("filing")) {
          response = "To file an insurance claim:\n\n1. Document everything (photos, police reports, medical records)\n2. Contact your insurance provider promptly (many have 24/7 claims services)\n3. Provide all requested information honestly and completely\n4. Keep track of your claim number and follow up regularly\n5. Understand the timeframe (typically 2-4 weeks for simple claims)\n\nClaims can affect your premium rates in the future, so some people choose not to file small claims that are close to their deductible amount. Would you like advice about a specific type of claim?";
        } else if (userQuestion.includes("exclusion") || userQuestion.includes("not covered")) {
          response = "Policy exclusions are specific conditions, events, or items that your insurance doesn't cover. Common exclusions include:\n\n• Health insurance: Cosmetic procedures, experimental treatments\n• Auto insurance: Intentional damage, racing or off-road use\n• Home insurance: Floods, earthquakes (these usually require separate policies)\n\nIt's vital to understand what your policy excludes before you need to make a claim. I recommend carefully reviewing the 'Exclusions' section of any policy you're considering or already have.";
        } else if (userQuestion.includes("coinsurance") || userQuestion.includes("copay")) {
          response = "Coinsurance and copays are both forms of cost-sharing in health insurance:\n\n• Copay: A fixed amount you pay for a service ($25 for a doctor visit, $10 for a prescription)\n• Coinsurance: A percentage of costs you pay after meeting your deductible (you pay 20%, insurance pays 80%)\n\nThese differ from your deductible, which is the amount you pay before insurance begins covering costs. Your policy may include all three types of payments, and they contribute to your annual out-of-pocket maximum.";
        } else if (userQuestion.includes("pre-existing") || userQuestion.includes("preexisting")) {
          response = "Pre-existing conditions are health issues you had before your insurance coverage began. Under the Affordable Care Act (ACA) in the US, health insurance companies cannot deny coverage or charge more based on pre-existing conditions for ACA-compliant plans.\n\nHowever, for other insurance types like life insurance or short-term health plans, pre-existing conditions may affect your ability to get coverage or your premium costs. Always disclose pre-existing conditions honestly when applying for insurance to avoid potential claim denials.";
        } else if (userQuestion.includes("liability")) {
          response = "Liability insurance protects you from financial losses if you're legally responsible for injuries to others or damage to their property. It appears in several insurance types:\n\n• Auto liability covers damages you cause in car accidents\n• Home liability covers injuries to visitors on your property\n• Business liability protects against customer injuries or product defects\n\nLiability coverage is often expressed in thousands or millions of dollars. Experts typically recommend having enough liability coverage to protect your assets and future earnings in case of a lawsuit.";
        } else if (userQuestion.includes("quote") || userQuestion.includes("compare")) {
          response = "When comparing insurance quotes, look beyond just the premium price:\n\n1. Ensure coverage types and limits are identical across quotes\n2. Compare deductibles and out-of-pocket maximums\n3. Check company ratings for financial stability and customer service\n4. Look for specific benefits that matter to you\n5. Ask about available discounts\n\nI recommend getting at least 3 quotes before making a decision, and consider working with an independent agent who can compare multiple companies for you.";
        } else if (userQuestion.includes("life insurance") || userQuestion.includes("term") || userQuestion.includes("whole life")) {
          response = "The two main types of life insurance are:\n\n• Term life: Covers you for a specific period (10, 20, 30 years) with lower premiums but no cash value\n• Whole life: Covers your entire lifetime with higher premiums but builds cash value over time\n\nTerm is often recommended for most people due to its affordability, letting you purchase more coverage for less money. Whole life can be valuable for specific estate planning needs or if you want the forced savings component. The right choice depends on your financial goals and family situation.";
        } else if (userQuestion.includes("benefits") || userQuestion.includes("perks")) {
          response = "Many insurance policies offer benefits beyond basic coverage:\n\n• Auto insurance might include roadside assistance, rental car coverage, or accident forgiveness\n• Health insurance could offer telehealth services, gym membership discounts, or wellness programs\n• Home insurance might include identity theft protection or home systems warranty\n\nThese additional benefits can provide significant value, so they're worth considering when comparing policies, even if the premium is slightly higher.";
        } else if (userQuestion.includes("rider") || userQuestion.includes("endorsement")) {
          response = "Insurance riders (also called endorsements) are optional additions to your policy that provide extra coverage for specific needs. Common examples include:\n\n• Scheduled personal property riders for valuable items like jewelry or art\n• Flood or earthquake riders for home insurance\n• Critical illness riders for life insurance\n• Pet injury coverage for auto insurance\n\nRiders typically increase your premium, but they can provide valuable protection for your specific circumstances that standard policies don't cover.";
        } else if (userQuestion.includes("cancel") || userQuestion.includes("switch")) {
          response = "When canceling or switching insurance policies:\n\n1. Never cancel your current policy until the new one is in effect\n2. Check for cancellation fees or penalties\n3. Find out if you're entitled to a premium refund\n4. Get confirmation of cancellation in writing\n5. For auto insurance, make sure your state's DMV requirements are met\n\nThe best time to switch is usually at your policy renewal date, but you can generally change at any time. Some companies offer a seamless transition process if you're switching to them.";
        } else if (userQuestion.includes("bundle") || userQuestion.includes("multi")) {
          response = "Bundling multiple insurance policies with one company typically offers several advantages:\n\n• Discount of 5-25% on each policy (varies by company)\n• Simplified paperwork and billing\n• Single point of contact for claims and service\n• Potentially a single deductible for related claims\n\nCommon bundles include home and auto, or multiple vehicles. While bundling often saves money, it's still worth comparing the bundled price to separate policies from different companies occasionally.";
        }
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pressing Enter to send a message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="flex flex-col w-80 sm:w-96 h-[500px] shadow-premium rounded-lg border overflow-hidden">
          {/* Chat header */}
          <div className="bg-insura-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">
                {isInsuranceFinder ? "Insurance Finder Assistant" : "Policy Explainer Bot"}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChatBox}
              className="h-8 w-8 rounded-full text-white hover:bg-insura-blue/80"
            >
              <X size={18} />
            </Button>
          </div>
          
          {/* Messages container */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-3 max-w-[85%] rounded-lg p-3",
                  message.role === "user"
                    ? "bg-insura-blue text-white ml-auto"
                    : "bg-white text-gray-800 border"
                )}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-70 block mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="bg-white text-gray-800 border rounded-lg p-3 max-w-[85%] mb-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">
                    {isInsuranceFinder ? "Insurance Assistant is thinking..." : "Policy Explainer is thinking..."}
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isInsuranceFinder ? "Ask about insurance options, form help..." : "Ask about insurance terms, coverage..."}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === "" || isLoading}
                size="icon"
                className="bg-insura-blue hover:bg-insura-blue/90"
              >
                <Send size={18} />
              </Button>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <HelpCircle size={12} />
              <span>
                {isInsuranceFinder 
                  ? "Try asking: \"How do I fill out this form?\" or \"What is a match score?\""
                  : "Try asking: \"What is a deductible?\" or \"How do claims work?\""}
              </span>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={toggleChatBox}
          className="h-14 w-14 rounded-full shadow-premium bg-insura-blue hover:bg-insura-blue/90 transition-all duration-200 flex items-center justify-center relative group"
        >
          <MessageSquare size={24} />
          <span className="absolute -top-10 right-0 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap">
            {isInsuranceFinder ? "Get assistance with your search" : "Ask about policies"}
          </span>
        </Button>
      )}
    </div>
  );
};
