
import React from "react";
import { FadeIn } from "./ui/FadeIn";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText } from "lucide-react";

export const PolicyScraper: React.FC = () => {
  return (
    <section id="policy-analyzer" className="section-padding bg-insura-lightblue/30">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <ChipBadge>AI Policy Analysis</ChipBadge>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="mt-4 mb-6 font-semibold">
              <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                Instant Document Analysis
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground">
              Our AI can analyze complex policy documents and translate them into simple, 
              easy-to-understand language with key points highlighted.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={300}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="p-8 text-center">
              <FileText className="h-16 w-16 text-insura-blue mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Document Analyzer</h3>
              <p className="text-muted-foreground mb-8">
                Upload any insurance policy document to get an instant analysis, summary, and 
                explanation of key terms in plain language.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex-1 sm:max-w-[200px]"
                >
                  See Example
                </Button>
                <Button 
                  className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity flex-1 sm:max-w-[200px]"
                  size="lg"
                >
                  Try Policy Analyzer
                </Button>
              </div>
              
              <div className="mt-8 bg-insura-lightblue rounded-xl p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-insura-blue flex-shrink-0" />
                <p className="text-sm text-insura-blue text-left">
                  For a complete analysis, visit our dedicated Policy Analyzer page where you can upload
                  your documents and get a comprehensive breakdown.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
