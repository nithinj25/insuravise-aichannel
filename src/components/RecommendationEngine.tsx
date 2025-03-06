import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "./ui/FadeIn";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Send, 
  MessageSquare, 
  Shield,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Search
} from "lucide-react";

export const RecommendationEngine: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };
  
  return (
    <section className="section-padding relative bg-gradient-to-b from-white to-insura-gray/30">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="space-y-6 max-w-xl">
              <ChipBadge>AI-Powered</ChipBadge>
              <h2 className="font-semibold">
                Get Personalized{" "}
                <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                  Insurance Recommendations
                </span>
              </h2>
              <p className="text-muted-foreground">
                Tell us about your needs and our AI will analyze thousands of policies to find 
                the perfect match for your unique situation.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-insura-blue/10 flex items-center justify-center mt-1">
                    <Brain className="w-5 h-5 text-insura-blue" />
                  </div>
                  <div>
                    <div className="font-medium">Advanced AI</div>
                    <div className="text-sm text-muted-foreground">Our algorithm analyzes your specific needs against thousands of insurance options.</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-insura-teal/10 flex items-center justify-center mt-1">
                    <Shield className="w-5 h-5 text-insura-teal" />
                  </div>
                  <div>
                    <div className="font-medium">Privacy First</div>
                    <div className="text-sm text-muted-foreground">Your information is encrypted and never shared with third parties without consent.</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-4 w-4 text-insura-blue" />
                  <div className="text-sm font-medium">What users are saying</div>
                </div>
                
                <div className="premium-card p-4 rounded-xl">
                  <p className="text-sm italic text-muted-foreground">
                    "InsuraAI helped me find coverage that saved me over $300 annually while getting better benefits than my previous plan."
                  </p>
                  <div className="mt-2 text-sm font-medium">— Sarah T., Healthcare Professional</div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity"
                >
                  <Link to="/insurance-finder">
                    <Search className="mr-2 h-4 w-4" />
                    Try Our Advanced Insurance Finder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn direction="left">
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-insura-blue to-insura-teal p-6 text-white">
                <h3 className="text-xl font-medium">Get Your Personalized Insurance Report</h3>
                <p className="text-white/80 text-sm mt-2">
                  Fill in your details and our AI will analyze your needs in seconds
                </p>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="insuranceType" className="text-sm font-medium">Insurance Type</label>
                    <select 
                      id="insuranceType" 
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="health">Health Insurance</option>
                      <option value="life">Life Insurance</option>
                      <option value="auto">Auto Insurance</option>
                      <option value="home">Home Insurance</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="needs" className="text-sm font-medium">Describe Your Needs</label>
                    <Textarea 
                      id="needs" 
                      placeholder="Tell us about your specific requirements and priorities..."
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing Your Needs...
                      </>
                    ) : (
                      <>
                        Get Recommendations
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="p-6 space-y-6">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-insura-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-insura-blue" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Analysis Complete!</h3>
                    <p className="text-muted-foreground">
                      We've analyzed your information and prepared your personalized report.
                    </p>
                  </div>
                  
                  <div className="premium-card p-4 rounded-xl border border-insura-blue/20">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-medium">Your Insurance Report</div>
                      <ChipBadge variant="outline">Ready</ChipBadge>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-insura-lightblue rounded-full w-full"></div>
                      <div className="h-2 bg-insura-lightblue rounded-full w-5/6"></div>
                      <div className="h-2 bg-insura-lightblue rounded-full w-4/6"></div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity">
                    View Your Recommendations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
