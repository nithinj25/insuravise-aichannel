
import React, { useState } from "react";
import { FadeIn } from "./ui/FadeIn";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Loader2, 
  BookOpen,
  Brain,
  Upload,
  Download,
  Check
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { analyzePolicyPdf } from "@/services/insuranceService";

export const PolicyAnalyzer: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setAnalysisResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "Please upload a policy document",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => Math.min(prev + 10, 90));
    }, 500);
    
    try {
      const response = await analyzePolicyPdf(uploadedFile);
      
      if (response.success) {
        setAnalysisResult(response.data);
        setAnalysisProgress(100);
        toast({
          title: "Success",
          description: "Successfully analyzed policy document",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to analyze document",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in analyzing:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
      setAnalysisProgress(100);
    }
  };

  return (
    <section id="analyzer" className="section-padding bg-insura-gray/10">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeIn>
            <ChipBadge>AI Features</ChipBadge>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="mt-4 mb-6 font-semibold">
              Insurance{" "}
              <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                Policy Analyzer
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground">
              Our advanced AI system can analyze insurance policy documents and extract key information,
              helping you understand complex terms and conditions in seconds.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <div className="premium-card p-6 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="policy-doc" className="block text-sm font-medium">
                    Upload Policy Document (PDF)
                  </label>
                  
                  <div className="border-2 border-dashed border-insura-gray/30 rounded-lg p-6 text-center cursor-pointer hover:bg-insura-gray/5 transition-colors">
                    <input 
                      type="file" 
                      id="policy-doc" 
                      accept=".pdf" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                    <label htmlFor="policy-doc" className="cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-insura-blue mb-2" />
                      <span className="text-sm font-medium block mb-1">
                        {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PDF (max. 10MB)
                      </span>
                    </label>
                  </div>
                  
                  {isLoading && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Analyzing document...</span>
                        <span className="text-sm font-medium">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="w-full" />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!uploadedFile || isLoading}
                  className="w-full bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Policy
                    </>
                  )}
                </Button>
              </form>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-insura-blue/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-insura-blue" />
                </div>
                <div>
                  <h3 className="font-medium">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">Our neural network extracts and summarizes key policy details.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-insura-teal/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-insura-teal" />
                </div>
                <div>
                  <h3 className="font-medium">Simplified Summaries</h3>
                  <p className="text-sm text-muted-foreground">Complex policy language converted into easy-to-understand points.</p>
                </div>
              </div>

              {analysisResult && (
                <Card className="p-4 mt-6 bg-white border border-insura-blue/20">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Policy Analysis</h3>
                    <ChipBadge variant="outline">AI Generated</ChipBadge>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-insura-blue" />
                      <span className="text-sm font-medium">Summary</span>
                    </div>
                    <p className="text-sm bg-insura-gray/10 p-3 rounded-lg">
                      {analysisResult.summary}
                    </p>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-insura-blue" />
                        <span className="text-sm font-medium">Key Points</span>
                      </div>
                      <ul className="space-y-2">
                        {analysisResult.keyPoints.map((point: string, index: number) => (
                          <li key={index} className="text-sm flex gap-2">
                            <Check className="h-4 w-4 text-insura-teal flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-2 flex justify-end">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Full Analysis
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
