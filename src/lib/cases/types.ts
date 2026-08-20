export interface RelatedCase {
  id: string;
  title: string;
  citation: string;
  relation: 'cited' | 'citing';
}

export interface CaseTimelineEvent {
  id: string;
  stage: 'Filing' | 'Hearing' | 'Interim Order' | 'Judgment' | 'Appeal' | 'Final Outcome';
  date?: string;
  status: 'completed' | 'current' | 'upcoming' | 'unavailable';
  description?: string;
}

export interface CaseDocument {
  id: string;
  title: string;
  court: string;
  date: string;
  caseNumber: string;
  jurisdiction: string;
  caseType: string;
  provisions: string[];
  summary: string;
  relevance?: number;
  
  // Detail fields
  facts?: string;
  issues?: string[];
  arguments?: {
    petitioner?: string[];
    respondent?: string[];
  };
  judgmentSummary?: string;
  courtReasoning?: string;
  outcome?: string;
  citedCases?: RelatedCase[];
  citingCases?: RelatedCase[];
  timeline?: CaseTimelineEvent[];
  sourceUrl?: string;
  verified?: boolean;
  isDemo?: boolean;
}

export interface CaseFilters {
  court: string[];
  state: string[];
  date: string[];
  provisions: string[];
  caseType: string[];
  jurisdiction: string[];
}
