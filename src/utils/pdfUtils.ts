
// PDF analysis utility functions
export const calculateReadingTime = (wordCount: number) => {
  // Average reading speed is ~200-250 words per minute
  const readTimeMinutes = Math.ceil(wordCount / 200);
  return readTimeMinutes <= 1 ? "1 minute" : `${readTimeMinutes} minutes`;
};

export const formatPolicyText = (text: string) => {
  // Clean up common PDF extraction issues
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
};

export const extractPolicyKeywords = (text: string) => {
  const keywordPatterns = [
    { term: 'premium', regex: /premium/gi },
    { term: 'deductible', regex: /deductible/gi },
    { term: 'exclusion', regex: /exclusion|excluded|not covered/gi },
    { term: 'coverage', regex: /coverage|covered/gi },
    { term: 'limit', regex: /limit of (insurance|liability)/gi },
    { term: 'claim', regex: /claim/gi },
    { term: 'endorsement', regex: /endorsement/gi },
    { term: 'beneficiary', regex: /beneficiary/gi },
  ];
  
  const matches: Record<string, number> = {};
  
  keywordPatterns.forEach(({ term, regex }) => {
    const count = (text.match(regex) || []).length;
    if (count > 0) {
      matches[term] = count;
    }
  });
  
  return Object.entries(matches)
    .sort((a, b) => b[1] - a[1])
    .map(([term]) => term);
};

export const downloadAnalysisAsText = (analysis: any) => {
  const content = `
Insurance Policy Analysis
========================

SUMMARY
-------
Reading Time: ${analysis.estimatedReadTime}
Readability: ${analysis.readabilityScore}
Clarity Rating: ${analysis.simplifiedRating}/10
Word Count: ${analysis.wordCount}

SECTIONS
--------
${analysis.sections.map((section: any) => 
  `${section.heading}\n${'-'.repeat(section.heading.length)}\n${section.content}\n`
).join('\n')}

KEY TERMS
---------
${analysis.keyTerms.join('\n')}
`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'policy-analysis.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
