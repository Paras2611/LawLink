export type VerificationStatus = 'verified' | 'partially_verified' | 'unverified' | 'conflicting';

export interface ConfidenceScore {
  score: number;
  label: 'High' | 'Medium' | 'Low';
}

export interface LegalSource {
  id: string;
  title: string;
  sourceType: 'act' | 'section' | 'judgment' | 'regulation' | 'other';
  section?: string;
  court?: string;
  date?: string;
  jurisdiction?: string;
  url?: string;
  verificationStatus: VerificationStatus;
}

export interface Citation {
  id: string;
  text: string;
  sourceId: string;
}

export interface LegalClaim {
  id: string;
  claim: string;
  status: VerificationStatus;
  sourceIds: string[];
  confidence: ConfidenceScore;
  explanation?: string;
}
