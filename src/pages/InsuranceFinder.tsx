import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/FadeIn";
import { ChipBadge } from "@/components/ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Search, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck,
  DollarSign,
  Users,
  Heart,
  Cigarette,
  Car,
  Home,
  Star,
  FileText,
  Brain
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getPersonalizedRecommendations, UserPreferences, summarizePolicyPdf } from "@/services/insuranceService";
import { PolicyDetailsModal } from "@/components/PolicyDetailsModal";
import { RecommendationResults } from "@/components/RecommendationResults";
import { ChatBox } from "@/components/ChatBox";
import { convertUSDtoINR, formatINR } from "@/utils/currencyUtils";
import { enhanceRecommendationsWithAI } from "@/utils/recommendationUtils";

const InsuranceFinder: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  const [policyDetails, setPolicyDetails] = useState<any>(null);
  const [isPolicyLoading, setIsPolicyLoading] = useState(false);
  
  const [formData, setFormData] = useState<UserPreferences>({
    type: "health",
    coverageLevel: 50,
    budget: 200,
    familySize: 1,
    age: 30,
    preExistingConditions: [],
    smokingStatus: "non-smoker",
    drivingRecord: "good",
    propertyValue: 300000,
    priorities: []
  });
  
  const preExistingConditionOptions = [
    { id: "diabetes", label: "Diabetes" },
    { id: "heart-disease", label: "Heart Disease" },
    { id: "asthma", label: "Asthma" },
    { id: "cancer", label: "Cancer History" },
    { id: "hypertension", label: "Hypertension" },
    { id: "none", label: "None" }
  ];
  
  const priorityOptions = [
    { id: "price", label: "Low Price" },
    { id: "coverage", label: "Coverage Breadth" },
    { id: "network", label: "Provider Network" },
    { id: "deductible", label: "Low Deductible" },
    { id: "customer-service", label: "Customer Service" },
    { id: "digital-tools", label: "Digital Tools" }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [name]: value[0]
    }));
  };
  
  const handleCheckboxChange = (category: string, id: string) => {
    setFormData(prev => {
      if (category === 'preExistingConditions') {
        if (id === 'none') {
          return {
            ...prev,
            [category]: ['none']
          };
        } else {
          const updatedConditions = prev.preExistingConditions?.filter(item => item !== 'none') || [];
          if (updatedConditions.includes(id)) {
            return {
              ...prev,
              [category]: updatedConditions.filter(item => item !== id)
            };
          } else {
            return {
              ...prev,
              [category]: [...updatedConditions, id]
            };
          }
        }
      } else {
        const currentArray = prev[category as keyof UserPreferences] as string[] || [];
        if (currentArray.includes(id)) {
          return {
            ...prev,
            [category]: currentArray.filter(item => item !== id)
          };
        } else {
          return {
            ...prev,
            [category]: [...currentArray, id]
          };
        }
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await getPersonalizedRecommendations(formData);
      
      if (response.success) {
        const enhancedRecommendations = enhanceRecommendationsWithAI(response.data, formData);
        setRecommendations(enhancedRecommendations);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to get recommendations",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBackClick = () => {
    setShowResults(false);
  };
  
  const handleViewPolicy = async (plan: any) => {
    setSelectedPolicy(plan);
    setShowPolicyModal(true);
    setIsPolicyLoading(true);
    
    try {
      const policyResponse = await summarizePolicyPdf(plan.policyUrl);
      if (policyResponse.success) {
        setPolicyDetails(policyResponse.data);
      } else {
        toast({
          title: "Error",
          description: policyResponse.error || "Failed to load policy details",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching policy details:", error);
      toast({
        title: "Error",
        description: "Failed to load policy details",
        variant: "destructive",
      });
    } finally {
      setIsPolicyLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-insura-gray/20">
      <div className="container-padding max-w-6xl mx-auto py-12">
        <FadeIn>
          <div className="mb-8">
            <Button asChild variant="outline" className="mb-6">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <ChipBadge className="mb-4">Market Analyzer</ChipBadge>
              <h1 className="text-3xl font-semibold mb-4">
                Find Your Perfect{" "}
                <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                  Insurance Match
                </span>
              </h1>
              <p className="text-muted-foreground">
                Our AI analyzes thousands of real insurance policies from across the market to find the 
                best options for your unique needs.
              </p>
            </div>
          </div>
        </FadeIn>
        
        {!showResults ? (
          <FadeIn delay={100}>
            <div className="premium-card rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-insura-blue to-insura-teal p-6 text-white">
                <h2 className="text-xl font-medium">Tell Us About Your Needs</h2>
                <p className="text-white/80 text-sm mt-2">
                  Provide your preferences so we can find the best insurance policies for you
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Insurance Type</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["health", "life", "auto", "home"].map((type) => (
                      <div 
                        key={type}
                        className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                          formData.type === type 
                            ? 'border-insura-blue bg-insura-blue/5' 
                            : 'border-gray-200 hover:border-insura-blue/50'
                        }`}
                        onClick={() => setFormData({...formData, type})}
                      >
                        {type === "health" && <Heart className="h-6 w-6 mx-auto mb-2" />}
                        {type === "life" && <Users className="h-6 w-6 mx-auto mb-2" />}
                        {type === "auto" && <Car className="h-6 w-6 mx-auto mb-2" />}
                        {type === "home" && <Home className="h-6 w-6 mx-auto mb-2" />}
                        <div className="font-medium capitalize">{type}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-insura-blue" />
                    <h3 className="text-lg font-medium">Coverage Level</h3>
                  </div>
                  <div className="px-4">
                    <Slider
                      value={[formData.coverageLevel]}
                      onValueChange={(value) => handleSliderChange('coverageLevel', value)}
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
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-insura-blue" />
                    <h3 className="text-lg font-medium">Monthly Budget</h3>
                  </div>
                  <div className="px-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg font-medium">{formatINR(convertUSDtoINR(formData.budget))}</span>
                      <Slider
                        value={[formData.budget || 200]}
                        onValueChange={(value) => handleSliderChange('budget', value)}
                        min={50}
                        max={500}
                        step={10}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input 
                      type="number" 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min={18}
                      max={100}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Family Size</label>
                    <select
                      name="familySize"
                      value={formData.familySize}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-insura-blue focus:ring-offset-2"
                    >
                      <option value={1}>Just Me (1)</option>
                      <option value={2}>Me + Partner (2)</option>
                      <option value={3}>Small Family (3-4)</option>
                      <option value={5}>Large Family (5+)</option>
                    </select>
                  </div>
                </div>
                
                {formData.type === "health" && (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Pre-existing Conditions</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {preExistingConditionOptions.map((condition) => (
                          <div 
                            key={condition.id}
                            className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                              formData.preExistingConditions?.includes(condition.id)
                                ? 'border-insura-blue bg-insura-blue/5'
                                : 'border-gray-200 hover:border-insura-blue/50'
                            }`}
                            onClick={() => handleCheckboxChange('preExistingConditions', condition.id)}
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              formData.preExistingConditions?.includes(condition.id)
                                ? 'bg-insura-blue text-white'
                                : 'bg-gray-200'
                            }`}>
                              {formData.preExistingConditions?.includes(condition.id) && <CheckCircle2 className="h-4 w-4" />}
                            </div>
                            <span className="text-sm">{condition.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Cigarette className="h-5 w-5 text-insura-blue" />
                        <h3 className="text-lg font-medium">Smoking Status</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {["non-smoker", "smoker"].map((status) => (
                          <div 
                            key={status}
                            className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                              formData.smokingStatus === status 
                                ? 'border-insura-blue bg-insura-blue/5' 
                                : 'border-gray-200 hover:border-insura-blue/50'
                            }`}
                            onClick={() => setFormData({...formData, smokingStatus: status})}
                          >
                            <div className="font-medium capitalize">{status.replace('-', ' ')}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {formData.type === "auto" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-insura-blue" />
                      <h3 className="text-lg font-medium">Driving Record</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["excellent", "good", "fair", "poor"].map((record) => (
                        <div 
                          key={record}
                          className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${
                            formData.drivingRecord === record 
                              ? 'border-insura-blue bg-insura-blue/5' 
                              : 'border-gray-200 hover:border-insura-blue/50'
                          }`}
                          onClick={() => setFormData({...formData, drivingRecord: record})}
                        >
                          <div className="font-medium capitalize">{record}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {formData.type === "home" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-insura-blue" />
                      <h3 className="text-lg font-medium">Property Value</h3>
                    </div>
                    <div className="px-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-medium whitespace-nowrap">
                          {formatINR(convertUSDtoINR(formData.propertyValue || 300000))}
                        </span>
                        <Slider
                          value={[formData.propertyValue || 300000]}
                          onValueChange={(value) => handleSliderChange('propertyValue', value)}
                          min={100000}
                          max={1000000}
                          step={50000}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-insura-blue" />
                    <h3 className="text-lg font-medium">Your Priorities</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Select what matters most to you (choose up to 3)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {priorityOptions.map((priority) => (
                      <div 
                        key={priority.id}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.priorities?.includes(priority.id)
                            ? 'border-insura-blue bg-insura-blue/5'
                            : 'border-gray-200 hover:border-insura-blue/50'
                        } ${(formData.priorities?.length || 0) >= 3 && !formData.priorities?.includes(priority.id) ? 'opacity-50' : ''}`}
                        onClick={() => {
                          if ((formData.priorities?.length || 0) < 3 || formData.priorities?.includes(priority.id)) {
                            handleCheckboxChange('priorities', priority.id);
                          }
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          formData.priorities?.includes(priority.id)
                            ? 'bg-insura-blue text-white'
                            : 'bg-gray-200'
                        }`}>
                          {formData.priorities?.includes(priority.id) && <CheckCircle2 className="h-4 w-4" />}
                        </div>
                        <span className="text-sm">{priority.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>
                  <Textarea 
                    placeholder="Is there anything else we should know about your insurance needs?"
                    className="resize-none"
                    rows={3}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Market Options...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Find My Best Insurance Options
                    </>
                  )}
                </Button>
              </form>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="space-y-6">
              <Button variant="outline" onClick={handleBackClick} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Preferences
              </Button>
              
              <div className="premium-card rounded-2xl p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Your Personalized Analysis</h2>
                    <p className="text-muted-foreground">
                      Based on your {formData.priorities?.length ? formData.priorities?.length : 'key'} priorities and specified needs
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <ChipBadge variant="default">
                      {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Insurance
                    </ChipBadge>
                    <ChipBadge variant="outline">
                      Budget: {formatINR(convertUSDtoINR(formData.budget))}/mo
                    </ChipBadge>
                    <ChipBadge variant="accent">
                      Coverage: {formData.coverageLevel}%
                    </ChipBadge>
                  </div>
                </div>
                
                {recommendations.length > 0 && (
                  <div className="bg-gradient-to-r from-insura-blue/10 to-insura-teal/10 p-4 rounded-xl flex items-center gap-3 mb-2">
                    <Brain className="h-5 w-5 text-insura-blue flex-shrink-0" />
                    <p className="text-sm text-insura-blue">
                      Our AI has ranked these options based on a {recommendations[0]?.matchScore || 0}% match to your specific needs and preferences.
                    </p>
                  </div>
                )}
                
                <RecommendationResults 
                  recommendations={recommendations}
                  onViewPolicy={handleViewPolicy}
                />
              </div>
            </div>
          </FadeIn>
        )}
      </div>
      
      {showPolicyModal && selectedPolicy && (
        <PolicyDetailsModal 
          policy={selectedPolicy}
          isOpen={showPolicyModal}
          onClose={() => setShowPolicyModal(false)}
        />
      )}
      
      <ChatBox />
    </div>
  );
};

export default InsuranceFinder;
