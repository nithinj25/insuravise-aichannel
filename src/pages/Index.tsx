
import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { EnhancedComparisonTool } from "@/components/EnhancedComparisonTool";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { PolicyScraper } from "@/components/PolicyScraper";
import { Footer } from "@/components/Footer";
import { ChatBox } from "@/components/ChatBox";

const Index = () => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({
            top: topOffset,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <EnhancedComparisonTool />
      <PolicyScraper />
      <RecommendationEngine />
      <Footer />
      <ChatBox />
    </div>
  );
};

export default Index;
