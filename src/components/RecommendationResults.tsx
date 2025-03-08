
import React from "react";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { FileText, Check, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/utils/currencyUtils";

interface RecommendationResultsProps {
  recommendations: any[];
  onViewPolicy: (plan: any) => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({ 
  recommendations,
  onViewPolicy
}) => {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center p-8">
        <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
        <p>No recommendations found based on your preferences.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Your Personalized Recommendations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((plan, index) => (
          <div 
            key={plan.id} 
            className={`premium-card rounded-xl p-6 transition-all hover:shadow-md relative
              ${index === 0 ? 'border-insura-blue md:col-span-2' : ''}`}
          >
            {index === 0 && (
              <div className="absolute top-0 right-0 bg-insura-blue text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-xl font-medium">
                Top Recommendation
              </div>
            )}
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <ChipBadge 
                  variant={plan.matchScore >= 80 ? "default" : plan.matchScore >= 60 ? "accent" : "outline"}
                >
                  Match Score: {plan.matchScore}%
                </ChipBadge>
                <span className="text-sm text-muted-foreground">{plan.type} insurance</span>
              </div>
              
              <h3 className="text-xl font-semibold">{plan.providerName}</h3>
              <p className="text-sm text-muted-foreground">{plan.name}</p>
              
              <div className="mt-3">
                <Progress value={plan.matchScore} className="h-2" />
              </div>
              
              <div className="text-3xl font-bold mt-3">
                {formatPrice(plan.price)}<span className="text-sm font-normal text-muted-foreground">/mo</span>
              </div>
            </div>
            
            <p className="text-sm italic bg-insura-gray/20 p-2 rounded mb-3">
              "{plan.explanation}"
            </p>
            
            <ul className="space-y-2 mt-4">
              {plan.features.slice(0, 4).map((feature: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-insura-blue flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
              {plan.features.length > 4 && (
                <li className="text-sm text-center text-muted-foreground pt-2">
                  +{plan.features.length - 4} more features
                </li>
              )}
            </ul>
            
            <Button 
              variant={index === 0 ? "default" : "outline"} 
              className={`w-full mt-4 ${index === 0 ? 'bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity' : ''}`}
              onClick={() => onViewPolicy(plan)}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Policy Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
