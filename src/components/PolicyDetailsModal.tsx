
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ChipBadge } from "./ui/ChipBadge";
import { summarizePolicyPdf } from "@/services/insuranceService";
import { AlertCircle, FileText, Check, XCircle, BookOpen, Clock, FileSpreadsheet } from "lucide-react";

interface PolicyDetailsModalProps {
  policy: any;
  isOpen: boolean;
  onClose: () => void;
}

export const PolicyDetailsModal: React.FC<PolicyDetailsModalProps> = ({
  policy,
  isOpen,
  onClose
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && policy) {
      fetchPolicySummary();
    }
  }, [isOpen, policy]);

  const fetchPolicySummary = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await summarizePolicyPdf(policy.policyUrl);
      if (response.success) {
        setSummary(response.data);
      } else {
        setError(response.error || "Failed to summarize policy");
      }
    } catch (error) {
      console.error("Error summarizing policy:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-insura-blue" />
            <span>{policy.providerName} - {policy.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">${policy.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
            <ChipBadge>{policy.type.charAt(0).toUpperCase() + policy.type.slice(1)} Insurance</ChipBadge>
          </div>

          {isLoading ? (
            <div className="py-8 space-y-4">
              <div className="text-center text-muted-foreground">
                <BookOpen className="h-10 w-10 mx-auto mb-4 animate-pulse" />
                <p className="mb-4">Analyzing and summarizing policy document...</p>
                <Progress value={45} className="w-full max-w-md mx-auto" />
              </div>
            </div>
          ) : error ? (
            <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
              <XCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 mb-2">Failed to summarize policy</p>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button 
                variant="outline" 
                onClick={fetchPolicySummary} 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : summary ? (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1 items-center text-insura-blue text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Estimated read time: {summary.estimatedReadTime}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex gap-1 items-center text-sm">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Readability: {summary.readabilityScore}</span>
                </div>
              </div>
              
              {summary.sections.map((section: any, index: number) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-medium text-insura-blue">{section.heading}</h3>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}
              
              <div className="bg-insura-lightblue/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Key Terms and Definitions</h3>
                <ul className="space-y-1">
                  {summary.keyTerms.map((term: string, index: number) => (
                    <li key={index} className="text-sm flex gap-2">
                      <Check className="h-4 w-4 text-insura-blue flex-shrink-0 mt-0.5" />
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-insura-gray/10 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Clarity Rating</h3>
                  <span className="text-xl font-semibold">{summary.simplifiedRating}/10</span>
                </div>
                <Progress value={summary.simplifiedRating * 10} className="w-full" />
                <p className="text-xs text-muted-foreground mt-2">This rating reflects how clearly the policy is written based on AI analysis.</p>
              </div>
            </div>
          ) : null}
          
          <div className="border-t border-border mt-6 pt-6">
            <h3 className="text-lg font-medium mb-3">Plan Features</h3>
            <ul className="space-y-2">
              {policy.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-insura-blue flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-700 font-medium mb-1">Important Disclaimer</p>
              <p className="text-sm text-yellow-600">
                This is a simplified summary and may not include all terms and conditions. 
                Always refer to the full policy documentation before making a decision.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity">
            Request Full Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
