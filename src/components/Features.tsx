
import React from "react";
import { FadeIn } from "./ui/FadeIn";
import { FeatureCard } from "./ui/FeatureCard";
import { ChipBadge } from "./ui/ChipBadge";
import { 
  Brain, 
  FileText, 
  BarChart3, 
  Shield, 
  DollarSign, 
  UserCheck,
  Clock,
  Calculator
} from "lucide-react";

export const Features: React.FC = () => {
  return (
    <section id="features" className="section-padding relative bg-insura-gray/50">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <ChipBadge>Core Features</ChipBadge>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="mt-4 mb-6 font-semibold">
              <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Insurance Solutions
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground">
              InsuraAI combines advanced artificial intelligence with deep insurance 
              expertise to transform how you discover, understand, and select insurance policies.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <FadeIn delay={100}>
            <FeatureCard
              title="Personalized Recommendations"
              description="Our AI analyzes your specific needs, financial situation, and risk factors to recommend the ideal insurance coverage."
              icon={Brain}
              chip="AI-Driven"
            />
          </FadeIn>
          
          <FadeIn delay={200}>
            <FeatureCard
              title="Policy Simplification"
              description="Complex insurance documents translated into clear, understandable language so you know exactly what you're getting."
              icon={FileText}
              chip="Clarity"
              chipVariant="accent"
            />
          </FadeIn>
          
          <FadeIn delay={300}>
            <FeatureCard
              title="Automated Comparisons"
              description="Instantly compare policies across multiple providers to find the perfect balance of coverage and cost."
              icon={BarChart3}
              chip="Efficiency"
              chipVariant="secondary"
            />
          </FadeIn>
          
          <FadeIn delay={400}>
            <FeatureCard
              title="Risk Assessment"
              description="Identify potential coverage gaps and understand the specific risks you should address with your insurance."
              icon={Shield}
              chip="Protection"
            />
          </FadeIn>
          
          <FadeIn delay={500}>
            <FeatureCard
              title="Cost Optimization"
              description="Find opportunities to save without sacrificing the coverage you need through our intelligent analysis."
              icon={DollarSign}
              chip="Savings"
              chipVariant="accent"
            />
          </FadeIn>
          
          <FadeIn delay={600}>
            <FeatureCard
              title="Tailored Experience"
              description="The more you use InsuraAI, the more it learns about your preferences for increasingly personalized guidance."
              icon={UserCheck}
              chip="Adaptive"
              chipVariant="secondary"
            />
          </FadeIn>
        </div>
        
        <div className="mt-16 glass-card rounded-2xl p-8 max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <ChipBadge variant="outline">Why InsuraAI?</ChipBadge>
                <h3 className="font-semibold">Real Benefits for Real People</h3>
                <p className="text-muted-foreground">
                  Our platform delivers measurable advantages for everyday insurance shoppers:
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-insura-blue/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-insura-blue" />
                    </div>
                    <div>
                      <div className="font-medium">Save Time</div>
                      <div className="text-sm text-muted-foreground">80% faster decisions</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-insura-teal/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-insura-teal" />
                    </div>
                    <div>
                      <div className="font-medium">Save Money</div>
                      <div className="text-sm text-muted-foreground">15-30% cost reduction</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-insura-blue to-insura-teal rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                      98%
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Customer Satisfaction
                    </div>
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
