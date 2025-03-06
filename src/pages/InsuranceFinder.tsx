
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
  ShieldCheck,
  Heart,
  Users,
  Car,
  Home as HomeIcon,
  Cigarette,
  Activity,
  DollarSign
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
    needs: "",
    // New parameters
    occupation: "",
    familySize: "1",
    hasPreExistingConditions: "no",
    coverageLevel: "standard",
    deductiblePreference: "medium",
    isSmoker: "no",
    drivingRecord: "clean",
    propertyValue: "",
    priorityFactor: "price" // price, coverage, customer_service
  });
  const [recommendedPlan, setRecommendedPlan] = useState<any>(null);
  
  const insuranceTypes = [
    { id: "health", label: "Health", icon: <Heart className="h-4 w-4" /> },
    { id: "life", label: "Life", icon: <Users className="h-4 w-4" /> },
    { id: "auto", label: "Auto", icon: <Car className="h-4 w-4" /> },
    { id: "home", label: "Home", icon: <HomeIcon className="h-4 w-4" /> },
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFindBestPlan = () => {
    setIsLoadingRecommendation(true);
    
    // Simulate AI analysis to find the best plan with enhanced algorithm
    setTimeout(() => {
      // Enhanced algorithm based on all user parameters
      let filteredPlans = plans.filter(plan => plan.price <= budget[0]);
      
      if (filteredPlans.length > 0) {
        // Apply weights to different factors based on user priorities
        const scoredPlans = filteredPlans.map(plan => {
          let score = 0;
          
          // Price score (inverse relationship - lower is better)
          const priceScore = 1 - (plan.price / budget[0]);
          
          // Coverage score (based on number of features)
          const coverageScore = plan.features.length / 10; // Normalize to 0-1 range assuming max 10 features
          
          // Apply weights based on user priority
          if (userInfo.priorityFactor === "price") {
            score = (priceScore * 0.7) + (coverageScore * 0.3);
          } else if (userInfo.priorityFactor === "coverage") {
            score = (priceScore * 0.3) + (coverageScore * 0.7);
          } else {
            score = (priceScore * 0.5) + (coverageScore * 0.5);
          }
          
          // Adjust score based on specific user parameters
          if (activeTab === "health") {
            if (userInfo.hasPreExistingConditions === "yes" && 
                plan.features.some((f: string) => f.toLowerCase().includes("pre-existing"))) {
              score += 0.2;
            }
            
            if (userInfo.coverageLevel === "premium" && 
                plan.features.some((f: string) => f.toLowerCase().includes("premium") || 
                                               f.toLowerCase().includes("comprehensive"))) {
              score += 0.15;
            }
          } else if (activeTab === "life") {
            if (userInfo.isSmoker === "yes" && 
                plan.features.some((f: string) => f.toLowerCase().includes("smoker"))) {
              score += 0.2;
            }
          } else if (activeTab === "auto") {
            if (userInfo.drivingRecord !== "clean" && 
                plan.features.some((f: string) => f.toLowerCase().includes("accident") || 
                                               f.toLowerCase().includes("violation"))) {
              score += 0.2;
            }
          }
          
          return { ...plan, score };
        });
        
        // Sort by score (highest first)
        const bestPlan = scoredPlans.sort((a, b) => b.score - a.score)[0];
        
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

  // Render insurance-specific form fields based on active tab
  const renderSpecificFields = () => {
    switch (activeTab) {
      case "health":
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="hasPreExistingConditions" className="text-sm font-medium">Pre-existing Conditions</label>
              <select 
                id="hasPreExistingConditions" 
                name="hasPreExistingConditions" 
                value={userInfo.hasPreExistingConditions}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="coverageLevel" className="text-sm font-medium">Desired Coverage Level</label>
              <select 
                id="coverageLevel" 
                name="coverageLevel" 
                value={userInfo.coverageLevel}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </>
        );
      
      case "life":
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="occupation" className="text-sm font-medium">Occupation</label>
              <Input 
                id="occupation" 
                name="occupation" 
                placeholder="Enter your occupation" 
                value={userInfo.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="isSmoker" className="text-sm font-medium">Smoking Status</label>
              <select 
                id="isSmoker" 
                name="isSmoker" 
                value={userInfo.isSmoker}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
              >
                <option value="no">Non-smoker</option>
                <option value="yes">Smoker</option>
              </select>
            </div>
          </>
        );
        
      case "auto":
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="drivingRecord" className="text-sm font-medium">Driving Record</label>
              <select 
                id="drivingRecord" 
                name="drivingRecord" 
                value={userInfo.drivingRecord}
                onChange={handleInputChange}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
              >
                <option value="clean">Clean record</option>
                <option value="minor">Minor violations</option>
                <option value="major">Major violations</option>
                <option value="accident">Recent accidents</option>
              </select>
            </div>
          </>
        );
        
      case "home":
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="propertyValue" className="text-sm font-medium">Property Value</label>
              <Input 
                id="propertyValue" 
                name="propertyValue" 
                placeholder="Estimated value in $" 
                value={userInfo.propertyValue}
                onChange={handleInputChange}
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
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
                    <TabsTrigger key={type.id} value={type.id} className="text-sm flex items-center gap-1">
                      {type.icon}
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="space-y-4 pt-4 max-h-[60vh] overflow-y-auto pr-2">
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
                  <label htmlFor="familySize" className="text-sm font-medium">Family Size</label>
                  <select 
                    id="familySize" 
                    name="familySize" 
                    value={userInfo.familySize}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
                  >
                    <option value="1">Individual (1)</option>
                    <option value="2">Couple (2)</option>
                    <option value="3">Small Family (3-4)</option>
                    <option value="5">Large Family (5+)</option>
                  </select>
                </div>
                
                {/* Insurance type specific fields */}
                {renderSpecificFields()}
                
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
                  <label htmlFor="priorityFactor" className="text-sm font-medium">Your Priority</label>
                  <select 
                    id="priorityFactor" 
                    name="priorityFactor" 
                    value={userInfo.priorityFactor}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
                  >
                    <option value="price">Lower Price</option>
                    <option value="coverage">Better Coverage</option>
                    <option value="customer_service">Customer Service</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="needs" className="text-sm font-medium">Additional Needs</label>
                  <Textarea 
                    id="needs" 
                    name="needs" 
                    placeholder="Tell us about your specific requirements..."
                    className="resize-none"
                    rows={3}
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
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Why This Plan Is Recommended For You</h3>
                  <div className="bg-white/80 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {userInfo.priorityFactor === 'price' && (
                        <li className="flex items-start gap-2">
                          <DollarSign className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                          <span>Meets your budget requirements while providing good value</span>
                        </li>
                      )}
                      {userInfo.priorityFactor === 'coverage' && (
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                          <span>Provides comprehensive coverage matching your needs</span>
                        </li>
                      )}
                      {userInfo.hasPreExistingConditions === 'yes' && activeTab === 'health' && (
                        <li className="flex items-start gap-2">
                          <Heart className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                          <span>Covers pre-existing conditions with favorable terms</span>
                        </li>
                      )}
                      {userInfo.isSmoker === 'yes' && activeTab === 'life' && (
                        <li className="flex items-start gap-2">
                          <Cigarette className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                          <span>Offers reasonable rates for smokers</span>
                        </li>
                      )}
                      {userInfo.drivingRecord !== 'clean' && activeTab === 'auto' && (
                        <li className="flex items-start gap-2">
                          <Car className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                          <span>Provides good coverage despite driving history</span>
                        </li>
                      )}
                      {Number(userInfo.familySize) > 1 && (
                        <li className="flex items-start gap-2">
                          <Users className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                          <span>Suitable for your family size of {userInfo.familySize}</span>
                        </li>
                      )}
                      <li className="flex items-start gap-2">
                        <Activity className="h-5 w-5 text-insura-teal flex-shrink-0 mt-0.5" />
                        <span>Tailored to your age and specific requirements</span>
                      </li>
                    </ul>
                  </div>
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
