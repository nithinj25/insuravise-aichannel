
import React, { useState, useEffect } from "react";
import { FadeIn } from "./ui/FadeIn";
import { AnimatedGradient } from "./ui/AnimatedGradient";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Check, X, AlertCircle, Download, FileText, Search, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchInsurancePlans } from "@/services/insuranceService";
import { PolicyDetailsModal } from "./PolicyDetailsModal";

const insuranceTypes = [
  { id: "health", label: "Health" },
  { id: "life", label: "Life" },
  { id: "auto", label: "Auto" },
  { id: "home", label: "Home" },
];

export const EnhancedComparisonTool: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("health");
  const [coverage, setCoverage] = useState([50]);
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    fetchPlans(value);
  };

  const fetchPlans = async (type: string) => {
    setIsLoading(true);
    try {
      const response = await fetchInsurancePlans(type);
      if (response.success) {
        setPlans(response.data);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch insurance plans",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPolicy = (plan: any) => {
    setSelectedPolicy(plan);
    setShowPolicyModal(true);
  };

  useEffect(() => {
    fetchPlans(activeTab);
  }, []);

  // Generate recommended plan based on coverage level
  const getRecommendedPlan = () => {
    if (plans.length === 0) return null;
    
    const coverageValue = coverage[0];
    // Simple algorithm: Recommend different plans based on coverage slider
    if (coverageValue <= 30) {
      return plans[0]; // Basic plan
    } else if (coverageValue <= 70) {
      return plans.length > 1 ? plans[1] : plans[0]; // Standard plan
    } else {
      return plans.length > 2 ? plans[2] : plans[plans.length - 1]; // Premium plan
    }
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <section id="comparison" className="section-padding relative overflow-hidden">
      <AnimatedGradient className="opacity-30" />
      
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <ChipBadge>Live Insurance Data</ChipBadge>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="mt-4 mb-6 font-semibold">
              Experience the{" "}
              <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                Comparison Tool
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground">
              See how InsuraAI instantly compares real insurance policies across providers to find your 
              ideal coverage at the best possible price.
            </p>
          </FadeIn>
        </div>

        <div className="premium-card overflow-hidden p-1 max-w-5xl mx-auto">
          <FadeIn>
            <Tabs defaultValue="health" className="w-full" onValueChange={handleTabChange}>
              <div className="bg-insura-gray/30 p-3 rounded-xl">
                <TabsList className="grid grid-cols-2 md:grid-cols-4">
                  {insuranceTypes.map((type) => (
                    <TabsTrigger key={type.id} value={type.id} className="text-sm">
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="mb-8">
                  <h4 className="text-lg font-medium mb-4">Coverage Level</h4>
                  <div className="px-4">
                    <Slider
                      value={coverage}
                      onValueChange={setCoverage}
                      max={100}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Basic</span>
                      <span>Standard</span>
                      <span>Premium</span>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex items-center justify-center p-12">
                    <div className="text-center">
                      <RefreshCw className="h-10 w-10 animate-spin text-insura-blue mb-4 mx-auto" />
                      <p className="text-insura-blue">Fetching the latest insurance data...</p>
                    </div>
                  </div>
                ) : (
                  insuranceTypes.map((type) => (
                    <TabsContent key={type.id} value={type.id} className="mt-0">
                      {plans.length === 0 ? (
                        <div className="text-center p-8">
                          <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                          <p>No insurance plans found for this category.</p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => fetchPlans(type.id)}
                          >
                            Retry
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {plans.slice(0, 3).map((plan, index) => {
                              const isRecommended = recommendedPlan && plan.id === recommendedPlan.id;
                              return (
                                <div 
                                  key={plan.id} 
                                  className={`premium-card rounded-xl p-6 transition-all hover:shadow-md relative
                                    ${isRecommended ? 'border-insura-blue' : ''}`}
                                >
                                  {isRecommended && (
                                    <div className="absolute top-0 right-0 bg-insura-blue text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-medium">
                                      Recommended
                                    </div>
                                  )}
                                  <div className="mb-3">
                                    <ChipBadge 
                                      className="mb-2" 
                                      variant={index === 0 ? "outline" : index === 1 ? "default" : "accent"}
                                    >
                                      {index === 0 ? "Basic" : index === 1 ? "Standard" : "Premium"}
                                    </ChipBadge>
                                    <h3 className="text-xl font-semibold">{plan.providerName}</h3>
                                    <p className="text-sm text-muted-foreground">{plan.name}</p>
                                    <div className="text-3xl font-bold mt-2">
                                      ${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                                    </div>
                                  </div>
                                  <ul className="space-y-2 mt-4">
                                    {plan.features.slice(0, 4).map((feature: string, i: number) => (
                                      <li key={i} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-insura-blue" />
                                        <span className="text-sm">{feature}</span>
                                      </li>
                                    ))}
                                    {plan.features.length > 4 && (
                                      <li className="text-sm text-center text-muted-foreground pt-2">
                                        +{plan.features.length - 4} more features
                                      </li>
                                    )}
                                  </ul>
                                  <div className="flex gap-2 mt-6">
                                    <Button 
                                      variant={isRecommended ? "default" : "outline"} 
                                      className={`flex-1 ${isRecommended ? 'bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity' : ''}`}
                                      onClick={() => handleViewPolicy(plan)}
                                    >
                                      <FileText className="h-4 w-4 mr-2" />
                                      View Policy
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {recommendedPlan && (
                            <div className="mt-8 bg-insura-lightblue rounded-xl p-4 flex items-center gap-3">
                              <AlertCircle className="h-5 w-5 text-insura-blue flex-shrink-0" />
                              <p className="text-sm text-insura-blue">
                                Our AI suggests {recommendedPlan.providerName}'s {recommendedPlan.name} as the best match based on your coverage needs and budget preferences.
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </TabsContent>
                  ))
                )}
              </div>
            </Tabs>
          </FadeIn>
        </div>
      </div>
      
      {showPolicyModal && selectedPolicy && (
        <PolicyDetailsModal 
          policy={selectedPolicy} 
          isOpen={showPolicyModal}
          onClose={() => setShowPolicyModal(false)}
        />
      )}
    </section>
  );
};
