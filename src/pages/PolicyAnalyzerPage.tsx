
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PolicyAnalyzer } from "@/components/PolicyAnalyzer";

const PolicyAnalyzerPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PolicyAnalyzer />
      </main>
      <Footer />
    </div>
  );
};

export default PolicyAnalyzerPage;
