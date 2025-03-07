
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, X, MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
      setMessages([
        {
          id: Date.now().toString(),
          content: "Hi there! I'm your InsuraBot assistant. How can I help you with your insurance needs today?",
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
      
      // Provide mock responses based on keywords in the user's message
      const userQuestion = inputValue.toLowerCase();
      let response = "I'm not sure how to help with that. Could you provide more details about your insurance needs?";
      
      if (userQuestion.includes("health") || userQuestion.includes("medical")) {
        response = "Our health insurance plans cover a wide range of medical needs, from basic coverage to comprehensive plans. The average premium is $350/month for individuals. Would you like me to check specific plans for you?";
      } else if (userQuestion.includes("car") || userQuestion.includes("auto") || userQuestion.includes("vehicle")) {
        response = "For auto insurance, we offer liability, collision, and comprehensive coverage. Rates start at $120/month depending on your driving history and vehicle. What specific auto insurance information are you looking for?";
      } else if (userQuestion.includes("home") || userQuestion.includes("property") || userQuestion.includes("house")) {
        response = "Our home insurance plans protect against damage, theft, and liability. The average coverage costs about $1,200 annually for a standard home. Would you like to know about specific coverages or discounts?";
      } else if (userQuestion.includes("life")) {
        response = "We offer term life and whole life insurance policies. Term policies start at $25/month for $250,000 in coverage. Would you like me to explain the difference between policy types?";
      } else if (userQuestion.includes("price") || userQuestion.includes("cost") || userQuestion.includes("quote")) {
        response = "Insurance costs vary based on several factors including coverage level, deductible, and your personal details. I can help you get a personalized quote if you share more specific information.";
      } else if (userQuestion.includes("discount")) {
        response = "We offer several discounts: multi-policy (10-15%), good driver (up to 20%), home security system (5-10%), and loyalty discounts for long-term customers. Which one interests you?";
      } else if (userQuestion.includes("claim")) {
        response = "To file a claim, you can use our online portal, mobile app, or call our 24/7 claims hotline. The process typically takes 5-7 business days. Would you like me to guide you through the steps?";
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
        <Card className="flex flex-col w-80 sm:w-96 h-96 shadow-premium rounded-lg border overflow-hidden">
          {/* Chat header */}
          <div className="bg-insura-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-medium">InsuraBot Assistant</h3>
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
                <p className="text-sm">{message.content}</p>
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
                  <p className="text-sm">InsuraBot is typing...</p>
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
                placeholder="Type your message..."
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
          </div>
        </Card>
      ) : (
        <Button
          onClick={toggleChatBox}
          className="h-14 w-14 rounded-full shadow-premium bg-insura-blue hover:bg-insura-blue/90 transition-all duration-200"
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </div>
  );
};
