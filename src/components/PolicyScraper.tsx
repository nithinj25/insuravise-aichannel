
import React, { useState } from "react";
import { FadeIn } from "./ui/FadeIn";
import { ChipBadge } from "./ui/ChipBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  ArrowRight, 
  Loader2, 
  DownloadCloud,
  Code,
  FileText
} from "lucide-react";
import { scrapeProviderWebsite } from "@/services/insuranceService";

export const PolicyScraper: React.FC = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scrapingResult, setScrapingResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await scrapeProviderWebsite(url);
      
      if (response.success) {
        setScrapingResult(response.data);
        toast({
          title: "Success",
          description: "Successfully scraped website data",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to scrape website",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in scraping:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="scraper" className="section-padding bg-insura-gray/10">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <FadeIn>
            <ChipBadge>Advanced Features</ChipBadge>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="mt-4 mb-6 font-semibold">
              Insurance{" "}
              <span className="bg-gradient-to-r from-insura-blue to-insura-teal bg-clip-text text-transparent">
                Web Scraper
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground">
              Our powerful web scraping technology can extract policy information directly from insurance provider websites,
              giving you access to the most up-to-date data.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <FadeIn>
            <div className="premium-card p-6 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="website-url" className="block text-sm font-medium">
                    Insurance Provider Website URL
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      id="website-url"
                      type="url"
                      placeholder="https://insurance-provider.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-insura-blue to-insura-teal hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Scraping...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Scrape Data
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of an insurance provider to extract policy information automatically.
                  </p>
                </div>

                <div className="bg-insura-lightblue/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Code className="mr-2 h-4 w-4" />
                    Example URLs to Try
                  </h3>
                  <div className="space-y-2">
                    <div className="text-xs p-2 bg-white/50 rounded border border-insura-blue/10">
                      https://www.aetna.com/individuals-families/health-insurance-plans.html
                    </div>
                    <div className="text-xs p-2 bg-white/50 rounded border border-insura-blue/10">
                      https://www.statefarm.com/insurance/auto
                    </div>
                    <div className="text-xs p-2 bg-white/50 rounded border border-insura-blue/10">
                      https://www.allstate.com/homeowners-insurance
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-insura-blue/10 flex items-center justify-center">
                  <DownloadCloud className="w-5 h-5 text-insura-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Real-time Data Extraction</h3>
                  <p className="text-sm text-muted-foreground">Our AI scrapes insurance websites to gather the latest policy details.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-insura-teal/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-insura-teal" />
                </div>
                <div>
                  <h3 className="font-medium">Policy PDF Analysis</h3>
                  <p className="text-sm text-muted-foreground">We automatically summarize complex policy documents into easy-to-understand formats.</p>
                </div>
              </div>

              {scrapingResult && (
                <Card className="p-4 mt-6 bg-white border border-insura-blue/20">
                  <h3 className="text-lg font-medium mb-2">Scraping Result</h3>
                  <p className="text-sm mb-4">Successfully extracted data from {url}</p>
                  
                  <div className="bg-insura-gray/10 p-3 rounded-lg">
                    <pre className="text-xs overflow-x-auto">
                      {JSON.stringify(scrapingResult, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Process Data
                    </Button>
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
