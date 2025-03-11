
export interface UserPreferences {
  type: string;
  coverageLevel: number;
  budget?: number;
  familySize?: number;
  age?: number;
  preExistingConditions?: string[];
  smokingStatus?: string;
  drivingRecord?: string;
  propertyValue?: number;
  priorities?: string[];
}

export interface InsurancePlan {
  id: string;
  type: string;
  name: string;
  price: number;
  features: string[];
  policyUrl: string;
  providerName?: string;
  providerId?: string;
  matchScore?: number;
  matchDetails?: {
    coverageScore: number;
    priceScore: number;
    featureScore: number;
    demographicScore: number;
    priorityScore: number;
    appliedWeights?: {
      coverage: number;
      price: number;
      features: number;
      demographics: number;
      priorities: number;
    };
  };
  explanation?: string;
}

export interface PolicyAnalysis {
  title: string;
  summary: string;
  keyPoints: string[];
  exclusions?: string[];
  simplifiedRating: number;
  readabilityScore: string;
  estimatedReadTime: string;
  confidenceScore: number;
  sections?: {
    heading: string;
    content: string;
  }[];
  keyTerms?: string[];
}
