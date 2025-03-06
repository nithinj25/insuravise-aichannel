
import React from "react";
import { FadeIn } from "./ui/FadeIn";
import { Button } from "@/components/ui/button";
import { AnimatedGradient, GradientBlur } from "./ui/AnimatedGradient";
import { ArrowRight, BarChart3, Shield, MessageSquare } from "lucide-react";
import { ChipBadge } from "./ui/ChipBadge";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <AnimatedGradient />
      <GradientBlur />
      
      <div className="container-padding max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <FadeIn>
              <ChipBadge className="mb-4">
                Transforming Insurance Selection
              </ChipBadge>
            </FadeIn>
            
            <FadeIn delay={100}>
              <h1 className="font-bold">
                <span className="text-foreground">Find Your Perfect Insurance with </span>
                <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                  AI-Powered Precision
                </span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={200}>
              <p className="text-lg text-muted-foreground">
                InsuraAI simplifies complex insurance choices with personalized 
                recommendations, clear policy explanations, and automated comparisons
                to help you make confident decisions.
              </p>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </div>
            </FadeIn>
            
            <FadeIn delay={400}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-insura-blue/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-insura-blue" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Personalized</div>
                    <div className="text-xs text-muted-foreground">Recommendations</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-insura-teal/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-insura-teal" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Simplified</div>
                    <div className="text-xs text-muted-foreground">Policy Terms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <div className="w-10 h-10 rounded-full bg-insura-blue/10 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-insura-blue" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">Automated</div>
                    <div className="text-xs text-muted-foreground">Comparisons</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={200} direction="left">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-insura-blue/20 to-insura-teal/20 rounded-3xl transform rotate-3 scale-95 blur-xl animate-pulse-slow"></div>
              <div className="premium-card overflow-hidden relative rounded-3xl aspect-square md:aspect-[4/3]">
                <div className="absolute top-6 left-6 right-6 glass-card rounded-xl p-4 shadow-lg animate-float">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-insura-blue/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-insura-blue" />
                    </div>
                    <div className="font-medium">Policy Recommendation</div>
                  </div>
                  <div className="h-2 bg-insura-lightblue rounded-full w-3/4 mb-3"></div>
                  <div className="h-2 bg-insura-lightblue rounded-full w-1/2 mb-3"></div>
                  <div className="h-2 bg-insura-lightblue rounded-full w-5/6"></div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 glass-card rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-insura-teal/10 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-insura-teal" />
                    </div>
                    <div className="font-medium">Coverage Comparison</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-2 bg-insura-teal/10 rounded-full"></div>
                    <div className="h-2 bg-insura-blue/10 rounded-full"></div>
                    <div className="h-2 bg-insura-teal/20 rounded-full"></div>
                    <div className="h-2 bg-insura-blue/20 rounded-full"></div>
                    <div className="h-2 bg-insura-teal/30 rounded-full"></div>
                    <div className="h-2 bg-insura-blue/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
