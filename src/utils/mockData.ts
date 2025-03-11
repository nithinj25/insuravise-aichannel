
import { InsurancePlan } from "@/types/insurance";

// Mock insurance plans
export const mockInsurancePlans: InsurancePlan[] = [
  {
    id: "1",
    name: "Premium Health Coverage",
    providerName: "BlueCross Insurance",
    type: "health",
    price: 350,
    matchScore: 92,
    policyUrl: "https://example.com/policy1.pdf",
    explanation: "This plan aligns closely with your medical needs and budget preferences. It includes comprehensive coverage for specialists and preventive care.",
    features: [
      "Low deductible of $500",
      "Coverage for specialist visits",
      "Prescription drug coverage",
      "Preventive care at no additional cost",
      "Telemedicine services included",
      "Mental health coverage"
    ]
  },
  {
    id: "2",
    name: "Family Life Protection",
    providerName: "Guardian Life",
    type: "life",
    price: 120,
    matchScore: 88,
    policyUrl: "https://example.com/policy2.pdf",
    explanation: "Based on your family situation, this plan provides excellent protection with flexible payout options and affordable premiums.",
    features: [
      "$500,000 coverage amount",
      "Term life policy for 20 years",
      "Level premiums guaranteed",
      "Convertible to permanent insurance",
      "Additional riders available",
      "Cash value accumulation"
    ]
  },
  {
    id: "3",
    name: "Complete Auto Protection",
    providerName: "AllState Motors",
    type: "auto",
    price: 175,
    matchScore: 85,
    policyUrl: "https://example.com/policy3.pdf",
    explanation: "This comprehensive auto policy includes the collision and liability coverage you need while fitting within your monthly budget constraints.",
    features: [
      "Collision coverage with $750 deductible",
      "Comprehensive coverage",
      "Liability: $100k/$300k",
      "Roadside assistance included",
      "Rental car reimbursement",
      "New car replacement"
    ]
  },
  {
    id: "4",
    name: "Standard Health Plan",
    providerName: "United Healthcare",
    type: "health",
    price: 290,
    matchScore: 78,
    policyUrl: "https://example.com/policy4.pdf",
    explanation: "A solid health insurance option with good general coverage but higher specialist copays compared to your preferred plan.",
    features: [
      "Medium deductible of $1,000",
      "Primary care visits: $25 copay",
      "Specialist visits: $60 copay",
      "Emergency room: $250 copay",
      "Generic prescription coverage",
      "Preventive care included"
    ]
  },
  {
    id: "5",
    name: "Basic Home Protection",
    providerName: "Travelers Insurance",
    type: "home",
    price: 145,
    matchScore: 72,
    policyUrl: "https://example.com/policy5.pdf",
    explanation: "Provides essential coverage for your home with standard protection against common perils like fire and theft.",
    features: [
      "Dwelling coverage up to $300,000",
      "Personal property: 50% of dwelling",
      "Liability: $100,000",
      "Deductible: $1,000",
      "Additional living expenses covered",
      "Standard peril coverage"
    ]
  },
  {
    id: "6",
    name: "Premium Auto Plus",
    providerName: "Progressive Auto",
    type: "auto",
    price: 210,
    matchScore: 68,
    policyUrl: "https://example.com/policy6.pdf",
    explanation: "Higher premium but includes comprehensive coverage options and lower deductibles than standard plans.",
    features: [
      "Collision coverage with $500 deductible",
      "Comprehensive coverage",
      "Liability: $250k/$500k",
      "24/7 premium roadside assistance",
      "Full rental car coverage",
      "Accident forgiveness included"
    ]
  },
  {
    id: "7",
    name: "Value Health Insurance",
    providerName: "Aetna Health",
    type: "health",
    price: 240,
    matchScore: 65,
    policyUrl: "https://example.com/policy7.pdf",
    explanation: "Budget-friendly option with higher out-of-pocket costs but good catastrophic coverage for major health events.",
    features: [
      "High deductible of $2,500",
      "Lower monthly premium",
      "HSA eligible plan",
      "Preventive care covered 100%",
      "Limited specialist network",
      "Basic prescription coverage"
    ]
  },
  {
    id: "8",
    name: "Deluxe Home Shield",
    providerName: "Liberty Mutual",
    type: "home",
    price: 195,
    matchScore: 62,
    policyUrl: "https://example.com/policy8.pdf",
    explanation: "Premium home insurance with extended coverage for valuables and additional perils beyond standard policies.",
    features: [
      "Dwelling coverage up to $500,000",
      "Personal property: 70% of dwelling",
      "Liability: $300,000",
      "Deductible: $750",
      "Identity theft protection included",
      "Water backup coverage"
    ]
  }
];
