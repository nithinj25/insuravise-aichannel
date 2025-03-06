
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  Brain, 
  ArrowLeft, 
  FileText, 
  Search, 
  RefreshCw, 
  AlertCircle, 
  Check,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { ChipBadge } from "@/components/ui/ChipBadge";
import { fetchInsurancePlans } from "@/services/insuranceService";
import { PolicyDetailsModal } from "@/components/PolicyDetailsModal";

const InsuranceFinder: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("health");
  const [budget, setBudget] = useState([250]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [userInfo, setUserInfo] = useState({
    age: "",
    location: "",
    needs: ""
  });
  const [recommendedPlan, setRecommendedPlan] = useState<any>(null);
  
  const insuranceTypes = [
    { id: "health", label: "Health" },
    { id: "life", label: "Life" },
    { id: "auto", label: "Auto" },
    { id: "home", label: "Home" },
  ];

  useEffect(() => {
    fetchPlans(activeTab);
  }, [activeTab]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFindBestPlan = () => {
    setIsLoadingRecommendation(true);
    
    // Simulate AI analysis to find the best plan
    setTimeout(() => {
      // Simple algorithm based on budget and user info
      // In a real app, this would use more sophisticated matching
      const filteredPlans = plans.filter(plan => plan.price <= budget[0]);
      
      if (filteredPlans.length > 0) {
        // Sort by most features (as a simple proxy for value)
        const bestPlan = filteredPlans.sort((a, b) => 
          b.features.length - a.features.length
        )[0];
        
        setRecommendedPlan(bestPlan);
        
        toast({
          title: "Analysis Complete",
          description: "We've found the best insurance plan for your needs!",
        });
      } else {
        toast({
          title: "No Matching Plans",
          description: "We couldn't find plans within your budget. Try adjusting your criteria.",
          variant: "destructive",
        });
        setRecommendedPlan(null);
      }
      
      setIsLoadingRecommendation(false);
    }, 2000);
  };

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <Button 
        variant="outline" 
        className="mb-8" 
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-insura-blue" /> 
                Find Your Best Plan
              </CardTitle>
              <CardDescription>
                Tell us about your needs and our AI will find the perfect insurance plan for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4">
                  {insuranceTypes.map((type) => (
                    <TabsTrigger key={type.id} value={type.id} className="text-sm">
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label htmlFor="age" className="text-sm font-medium">Age</label>
                  <Input 
                    id="age" 
                    name="age" 
                    placeholder="Enter your age" 
                    value={userInfo.age}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">Location</label>
                  <Input 
                    id="location" 
                    name="location" 
                    placeholder="City, State" 
                    value={userInfo.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Monthly Budget</label>
                  <div className="pt-4 pb-2">
                    <Slider
                      value={budget}
                      onValueChange={setBudget}
                      max={500}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">$0</span>
                      <span className="text-sm font-medium">${budget[0]}</span>
                      <span className="text-sm text-muted-foreground">$500</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="needs" className="text-sm font-medium">Specific Needs</label>
                  <Textarea 
                    id="needs" 
                    name="needs" 
                    placeholder="Tell us about your specific requirements..."
                    className="resize-none"
                    rows={4}
                    value={userInfo.needs}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity"
                onClick={handleFindBestPlan}
                disabled={isLoadingRecommendation}
              >
                {isLoadingRecommendation ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Plans...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Find Best Plan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Insurance Plan Finder</h1>
            <p className="text-muted-foreground mt-2">
              Compare insurance plans and get AI-generated summaries of policy documents.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-12 border rounded-lg">
              <div className="text-center">
                <RefreshCw className="h-10 w-10 animate-spin text-insura-blue mb-4 mx-auto" />
                <p className="text-insura-blue">Fetching insurance plans...</p>
              </div>
            </div>
          ) : recommendedPlan ? (
            <div className="space-y-6">
              <div className="bg-insura-lightblue/20 rounded-xl p-6 border border-insura-blue/30">
                <div className="flex items-start justify-between">
                  <div>
                    <ChipBadge className="mb-2">AI Recommended</ChipBadge>
                    <h2 className="text-2xl font-bold">{recommendedPlan.providerName}</h2>
                    <p className="text-lg">{recommendedPlan.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      ${recommendedPlan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </div>
                    <ChipBadge variant="outline" className="mt-2">
                      {recommendedPlan.type.charAt(0).toUpperCase() + recommendedPlan.type.slice(1)}
                    </ChipBadge>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Plan Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recommendedPlan.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-insura-blue flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button 
                    onClick={() => handleViewPolicy(recommendedPlan)}
                    className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Policy Details
                  </Button>
                  <Button variant="outline">
                    Request Quote
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-medium mt-8 mb-4">Other Plans You Might Consider</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans
                  .filter(plan => plan.id !== recommendedPlan.id)
                  .slice(0, 4)
                  .map(plan => (
                    <Card key={plan.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{plan.providerName}</CardTitle>
                            <CardDescription>{plan.name}</CardDescription>
                          </div>
                          <div className="text-lg font-bold">
                            ${plan.price}<span className="text-xs font-normal text-muted-foreground">/mo</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <ul className="space-y-1">
                          {plan.features.slice(0, 3).map((feature: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-insura-blue flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-xs text-center text-muted-foreground pt-1">
                              +{plan.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewPolicy(plan)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Policy
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Find Your Perfect Insurance Plan</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Fill in your details and preferences on the left, then click "Find Best Plan" to get personalized recommendations.
              </p>
              <div className="flex justify-center gap-3">
                {insuranceTypes.map((type) => (
                  <ChipBadge 
                    key={type.id} 
                    variant={type.id === activeTab ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveTab(type.id)}
                  >
                    {type.label}
                  </ChipBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {showPolicyModal && selectedPolicy && (
        <PolicyDetailsModal 
          policy={selectedPolicy} 
          isOpen={showPolicyModal}
          onClose={() => setShowPolicyModal(false)}
        />
      )}
    </div>
  );
};

export default InsuranceFinder;
