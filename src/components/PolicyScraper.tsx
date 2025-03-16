
import React, { useState } from "react";
import { FadeIn } from "./ui/FadeIn";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText, Link as LinkIcon, Upload, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { summarizePolicyUrl } from "@/services/policyAnalysisService";
import { PolicyAnalysis } from "@/types/insurance";
import { useToast } from "@/components/ui/use-toast";

export const PolicyScraper: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [policyUrl, setPolicyUrl] = useState("");
  const [analysis, setAnalysis] = useState<PolicyAnalysis | null>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await summarizePolicyUrl(policyUrl);
      if (result.success) {
        setAnalysis(result.data);
        toast({
          title: "Success",
          description: "Policy analyzed successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to analyze policy",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error analyzing policy:", error);
      toast({
        title: "Error",
        description: "An error occurred while analyzing the policy",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                Upload any insurance policy document or provide a URL to get an instant analysis, summary, and 
                explanation of key terms in plain language.
              </p>
              
              <Tabs defaultValue="url" className="max-w-xl mx-auto">
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="url">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Analyze by URL
                  </TabsTrigger>
                  <TabsTrigger value="upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="mb-6">
                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input 
                        type="url" 
                        placeholder="Enter policy URL (e.g., https://example.com/policy.pdf)" 
                        value={policyUrl}
                        onChange={(e) => setPolicyUrl(e.target.value)}
                        className="flex-grow"
                        required
                      />
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity sm:flex-shrink-0"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Policy"
                        )}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="upload" className="text-center">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full max-w-sm h-24 border-dashed border-2 flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="h-6 w-6 text-insura-blue" />
                    <span>Upload Policy Document</span>
                    <span className="text-xs text-muted-foreground">(Coming Soon)</span>
                  </Button>
                </TabsContent>
              </Tabs>
              
              {analysis && (
                <div className="mt-8 text-left border rounded-xl p-6 bg-insura-lightblue/10">
                  <h4 className="text-xl font-semibold mb-4">Policy Analysis</h4>
                  
                  {analysis.title && (
                    <div className="mb-4">
                      <div className="font-medium text-sm text-muted-foreground">Document Title</div>
                      <div className="font-semibold">{analysis.title}</div>
                    </div>
                  )}
                  
                  {analysis.summary && (
                    <div className="mb-4">
                      <div className="font-medium text-sm text-muted-foreground">Summary</div>
                      <div className="mt-1">{analysis.summary}</div>
                    </div>
                  )}
                  
                  {analysis.keyPoints && analysis.keyPoints.length > 0 && (
                    <div className="mb-4">
                      <div className="font-medium text-sm text-muted-foreground">Key Points</div>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {analysis.keyPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {analysis.exclusions && analysis.exclusions.length > 0 && (
                    <div className="mb-4">
                      <div className="font-medium text-sm text-muted-foreground">Exclusions</div>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {analysis.exclusions.map((exclusion, index) => (
                          <li key={index}>{exclusion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Readability Score</div>
                      <div className="font-semibold">{analysis.readabilityScore}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">Estimated Read Time</div>
                      <div className="font-semibold">{analysis.estimatedReadTime}</div>
                    </div>
                  </div>
                </div>
              )}
              
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
