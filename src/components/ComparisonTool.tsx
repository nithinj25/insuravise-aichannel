
import React, { useState } from "react";
import { FadeIn } from "./ui/FadeIn";
import { AnimatedGradient } from "./ui/AnimatedGradient";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Check, X, AlertCircle } from "lucide-react";

const insuranceTypes = [
  { id: "health", label: "Health" },
  { id: "life", label: "Life" },
  { id: "auto", label: "Auto" },
  { id: "home", label: "Home" },
];

export const ComparisonTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState("health");
  const [coverage, setCoverage] = useState([50]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section id="comparison" className="section-padding relative overflow-hidden">
      <AnimatedGradient className="opacity-30" />
      
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <ChipBadge>Interactive Demo</ChipBadge>
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
              See how InsuraAI instantly compares policies across providers to find your 
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

                {insuranceTypes.map((type) => (
                  <TabsContent key={type.id} value={type.id} className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="premium-card rounded-xl p-6 transition-all hover:shadow-md">
                        <div className="mb-3">
                          <ChipBadge className="mb-2" variant="outline">Basic</ChipBadge>
                          <h3 className="text-xl font-semibold">Provider A</h3>
                          <div className="text-3xl font-bold mt-2">$120<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        </div>
                        <ul className="space-y-2 mt-4">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">Essential coverage</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">24/7 customer support</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Premium benefits</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Advanced coverage</span>
                          </li>
                        </ul>
                        <Button variant="outline" className="w-full mt-6">View Details</Button>
                      </div>
                      
                      <div className="premium-card rounded-xl p-6 border-insura-blue transition-all hover:shadow-md relative">
                        <div className="absolute top-0 right-0 bg-insura-blue text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-medium">
                          Recommended
                        </div>
                        <div className="mb-3">
                          <ChipBadge className="mb-2">Standard</ChipBadge>
                          <h3 className="text-xl font-semibold">Provider B</h3>
                          <div className="text-3xl font-bold mt-2">$180<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        </div>
                        <ul className="space-y-2 mt-4">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">All basic features</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">Expanded coverage network</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">Lower deductibles</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <X className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Premium benefits</span>
                          </li>
                        </ul>
                        <Button className="w-full mt-6 bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity">View Details</Button>
                      </div>
                      
                      <div className="premium-card rounded-xl p-6 transition-all hover:shadow-md">
                        <div className="mb-3">
                          <ChipBadge className="mb-2" variant="accent">Premium</ChipBadge>
                          <h3 className="text-xl font-semibold">Provider C</h3>
                          <div className="text-3xl font-bold mt-2">$240<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                        </div>
                        <ul className="space-y-2 mt-4">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">All standard features</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">Comprehensive coverage</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">Priority claims processing</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-insura-blue" />
                            <span className="text-sm">Premium benefits</span>
                          </li>
                        </ul>
                        <Button variant="outline" className="w-full mt-6">View Details</Button>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-insura-lightblue rounded-xl p-4 flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-insura-blue flex-shrink-0" />
                      <p className="text-sm text-insura-blue">
                        Our AI suggests Provider B as the best match based on your coverage needs and budget preferences.
                      </p>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
