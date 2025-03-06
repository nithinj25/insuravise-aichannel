
import React from "react";
import { AnimatedLogo } from "./ui/AnimatedLogo";
import { FadeIn } from "./ui/FadeIn";
import { ExternalLink, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container-padding max-w-7xl mx-auto py-12 md:py-16">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AnimatedLogo />
                <div className="font-semibold text-xl">InsuraAI</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming insurance selection with AI-powered recommendations, 
                clear policy explanations, and automated comparisons.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-muted-foreground hover:text-insura-blue transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-insura-blue transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-insura-blue transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#comparison" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm">
                    Policy Comparison
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm flex items-center gap-1">
                    Blog
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-insura-blue mt-1" />
                  <a href="mailto:contact@insuraai.com" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm">
                    contact@insuraai.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-insura-blue mt-1" />
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-insura-blue transition-colors text-sm">
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="pt-2 text-sm text-muted-foreground">
                  Business Hours:<br />
                  Monday-Friday: 9 AM - 6 PM EST
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Subscribe to Our Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest insurance insights and tips delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Email address" className="flex-1" />
                <Button className="bg-insura-blue hover:bg-insura-blue/90 transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} InsuraAI. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-insura-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-insura-blue transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-insura-blue transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
