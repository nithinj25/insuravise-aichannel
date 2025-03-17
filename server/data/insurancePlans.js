
// Mock insurance plans data
const insurancePlans = [
  // Health Insurance Plans
  {
    id: "health-1",
    name: "Comprehensive Health Shield",
    type: "health",
    providerName: "Apollo Health",
    price: 5000,
    coverageAmount: 500000,
    features: [
      "Hospitalization coverage",
      "Cashless treatment at 5000+ hospitals",
      "No claim bonus up to 50%",
      "Free annual health check-up",
      "Coverage for 30+ critical illnesses",
      "Day care procedures covered"
    ],
    deductible: 5000,
    tpaService: "MediAssist",
    waitingPeriod: "30 days for illness, 2 years for pre-existing diseases",
    copay: "10% for senior citizens",
    matchScore: 85,
    ratingScore: 4.5,
    popularityRank: 2
  },
  {
    id: "health-2",
    name: "Family Health Premier",
    type: "health",
    providerName: "MaxBupa",
    price: 8000,
    coverageAmount: 1000000,
    features: [
      "Coverage for entire family",
      "Unlimited restoration of sum insured",
      "International emergency coverage",
      "Maternity benefits after 3 years",
      "Coverage for AYUSH treatments",
      "Home healthcare services"
    ],
    deductible: 10000,
    tpaService: "Health India TPA",
    waitingPeriod: "30 days for illness, 18 months for pre-existing diseases",
    copay: "None",
    matchScore: 92,
    ratingScore: 4.7,
    popularityRank: 1
  },
  {
    id: "health-3",
    name: "Individual Health Basic",
    type: "health",
    providerName: "ICICI Lombard",
    price: 3000,
    coverageAmount: 300000,
    features: [
      "Hospitalization coverage",
      "Cashless facility at 3000+ hospitals",
      "Organ donor expenses",
      "Ambulance charges covered",
      "Daily hospital cash allowance",
      "Domiciliary hospitalization"
    ],
    deductible: 2500,
    tpaService: "Paramount TPA",
    waitingPeriod: "30 days for illness, 3 years for pre-existing diseases",
    copay: "15% for certain hospitals",
    matchScore: 78,
    ratingScore: 4.2,
    popularityRank: 3
  },
  
  // Life Insurance Plans
  {
    id: "life-1",
    name: "Term Life Secure",
    type: "life",
    providerName: "LIC",
    price: 12000,
    coverageAmount: 10000000,
    features: [
      "Pure term insurance coverage",
      "Option to increase cover at key life stages",
      "Critical illness benefit rider",
      "Tax benefits under Section 80C",
      "Disability benefit option",
      "Terminal illness benefit"
    ],
    policyTerm: "10-40 years",
    paymentTerm: "Regular pay, Limited pay options",
    maturityBenefits: "None (pure protection plan)",
    surrenderValue: "None",
    matchScore: 88,
    ratingScore: 4.6,
    popularityRank: 1
  },
  {
    id: "life-2",
    name: "Endowment Assurance",
    type: "life",
    providerName: "SBI Life",
    price: 25000,
    coverageAmount: 5000000,
    features: [
      "Life insurance with savings",
      "Guaranteed returns",
      "Loan facility available",
      "Flexible premium payment terms",
      "Life cover with maturity benefit",
      "Optional riders available"
    ],
    policyTerm: "10-30 years",
    paymentTerm: "Equal to policy term",
    maturityBenefits: "Sum assured plus bonuses",
    surrenderValue: "Available after 3 years",
    matchScore: 75,
    ratingScore: 4.3,
    popularityRank: 3
  },
  {
    id: "life-3",
    name: "ULIP Growth Plus",
    type: "life",
    providerName: "HDFC Life",
    price: 50000,
    coverageAmount: 7500000,
    features: [
      "Market-linked returns",
      "Choice of investment funds",
      "Flexibility to switch funds",
      "Partial withdrawal facility",
      "Top-up premium option",
      "Tax-free returns under current law"
    ],
    policyTerm: "5-15 years",
    paymentTerm: "5-10 years",
    maturityBenefits: "Fund value on maturity",
    surrenderValue: "Fund value less charges after lock-in",
    matchScore: 82,
    ratingScore: 4.5,
    popularityRank: 2
  },
  
  // Auto Insurance Plans
  {
    id: "auto-1",
    name: "Comprehensive Car Shield",
    type: "auto",
    providerName: "Bajaj Allianz",
    price: 15000,
    coverageAmount: 1000000,
    features: [
      "Own damage coverage",
      "Third-party liability",
      "24/7 roadside assistance",
      "No claim bonus up to 50%",
      "Zero depreciation option",
      "Personal accident cover"
    ],
    deductible: 1000,
    addOns: "Engine protector, Consumables cover, Return to invoice",
    claimSettlementRatio: "95%",
    networkGarages: "4000+",
    matchScore: 90,
    ratingScore: 4.7,
    popularityRank: 1
  },
  {
    id: "auto-2",
    name: "Basic Auto Insurance",
    type: "auto",
    providerName: "ICICI Lombard",
    price: 8000,
    coverageAmount: 500000,
    features: [
      "Third-party liability",
      "Basic own damage coverage",
      "Limited roadside assistance",
      "No claim bonus up to 20%",
      "Personal accident cover",
      "Fire and theft protection"
    ],
    deductible: 2000,
    addOns: "None included (available at extra cost)",
    claimSettlementRatio: "92%",
    networkGarages: "3000+",
    matchScore: 75,
    ratingScore: 4.1,
    popularityRank: 3
  },
  {
    id: "auto-3",
    name: "Premium Motor Protection",
    type: "auto",
    providerName: "TATA AIG",
    price: 20000,
    coverageAmount: 1500000,
    features: [
      "Comprehensive coverage",
      "Enhanced third-party liability",
      "Premium roadside assistance",
      "No claim bonus up to 50%",
      "Zero depreciation included",
      "Additional personal accident cover"
    ],
    deductible: 500,
    addOns: "Included: Engine protector, Consumables, Key replacement, Tyre protection",
    claimSettlementRatio: "97%",
    networkGarages: "5000+",
    matchScore: 85,
    ratingScore: 4.5,
    popularityRank: 2
  },
  
  // Home Insurance Plans
  {
    id: "home-1",
    name: "Complete Home Security",
    type: "home",
    providerName: "HDFC ERGO",
    price: 7000,
    coverageAmount: 5000000,
    features: [
      "Structure coverage",
      "Contents protection",
      "Burglary and theft coverage",
      "Natural disaster protection",
      "Temporary accommodation costs",
      "Public liability cover"
    ],
    deductible: 5000,
    coverageArea: "Building and contents",
    exclusions: "Wear and tear, War and nuclear perils",
    addOns: "Jewellery protection, Electronic equipment cover",
    matchScore: 88,
    ratingScore: 4.6,
    popularityRank: 1
  },
  {
    id: "home-2",
    name: "Basic Home Insurance",
    type: "home",
    providerName: "SBI General",
    price: 3000,
    coverageAmount: 2000000,
    features: [
      "Basic structure coverage",
      "Fire and allied perils",
      "Limited contents coverage",
      "Natural disaster protection",
      "Minimal burglary cover",
      "Basic liability protection"
    ],
    deductible: 10000,
    coverageArea: "Primarily building structure",
    exclusions: "Contents over 5 years old, High-value items",
    addOns: "None included (available at extra cost)",
    matchScore: 72,
    ratingScore: 4.0,
    popularityRank: 3
  },
  {
    id: "home-3",
    name: "Premium Home Shield",
    type: "home",
    providerName: "Bajaj Allianz",
    price: 12000,
    coverageAmount: 10000000,
    features: [
      "Comprehensive structure coverage",
      "All-risk contents protection",
      "Enhanced burglary and theft coverage",
      "Extensive natural disaster coverage",
      "Extended temporary accommodation",
      "Higher liability limits"
    ],
    deductible: 2500,
    coverageArea: "Building, contents, and additional structures",
    exclusions: "Intentional damage, Undisclosed renovations",
    addOns: "Included: Valuable items, Home office equipment, Rent loss coverage",
    matchScore: 82,
    ratingScore: 4.4,
    popularityRank: 2
  }
];

module.exports = insurancePlans;
