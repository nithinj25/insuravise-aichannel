import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, X, MessageSquare, Loader2, FileText, HelpCircle, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { getChatResponse } from "@/services/chatService";
import { formatINR } from "@/utils/currencyUtils";

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      const greeting = isInsuranceFinder
        ? "Hi there! I'm your InsuraBot assistant powered by AI. I can help you understand insurance policies, compare options, and complete this insurance finder form. All prices are shown in Indian Rupees (₹). What specific questions do you have about your insurance search?"
        : "Hi there! I'm your InsuraBot assistant powered by AI. I can help explain insurance policies, coverage details, and insurance terminology. All prices are shown in Indian Rupees (₹). What would you like to know about insurance today?";
      
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

  const getSuggestion = () => {
    if (isInsuranceFinder) {
      const suggestions = [
        `How much is coverage worth ${formatINR(500000)} in health insurance?`,
        "What factors affect my premium calculation?",
        "Should I choose higher or lower deductibles?",
        "How do I know which coverage level is right for me?",
        "What does 'pre-existing condition' mean in health insurance?",
        "How can I get the best price on auto insurance?",
        "What's the difference between third-party and comprehensive insurance?"
      ];
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    } else {
      const suggestions = [
        "What is term insurance?",
        "How do insurance claims work?",
        "What are exclusions in an insurance policy?",
        "How is my premium calculated?",
        "What happens if I miss a payment?"
      ];
      return suggestions[Math.floor(Math.random() * suggestions.length)];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
      const context = isInsuranceFinder ? 'insurance-finder' : 'general-insurance';
      
      const aiResponse = await getChatResponse(inputValue, context);
      
      if (aiResponse.success && aiResponse.message) {
        const aiMessage: Message = {
          id: Date.now().toString(),
          content: aiResponse.message,
          role: "assistant",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        toast({
          title: "Error",
          description: aiResponse.error || "Failed to get a response. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in chat:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <Card className="flex flex-col w-80 sm:w-96 h-[500px] shadow-premium rounded-lg border overflow-hidden">
          <div className="bg-insura-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">
                {isInsuranceFinder ? "AI Insurance Assistant" : "AI Policy Explainer"}
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
                    AI is generating a response...
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {messages.length <= 1 && !isLoading && (
            <div className="p-3 border-t bg-gray-50">
              <div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
                <Brain size={12} />
                <span>Try asking me:</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  variant="outline" 
                  className="text-xs justify-start h-auto py-2 text-left"
                  onClick={() => handleSuggestionClick(getSuggestion())}
                >
                  {getSuggestion()}
                </Button>
                <Button 
                  variant="outline" 
                  className="text-xs justify-start h-auto py-2 text-left"
                  onClick={() => handleSuggestionClick(getSuggestion())}
                >
                  {getSuggestion()}
                </Button>
              </div>
            </div>
          )}
          
          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isInsuranceFinder ? "Ask about insurance options, pricing in INR..." : "Ask about insurance terms, coverage in INR..."}
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
                  ? "Try asking: \"How much is ₹20,000 coverage?\" or \"What coverage level should I choose?\""
                  : "Try asking: \"What affects my premium in rupees?\" or \"How do insurance claims work?\""}
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
            {isInsuranceFinder ? "Get AI assistance with your search" : "Ask our AI about policies"}
          </span>
        </Button>
      )}
    </div>
  );
};
