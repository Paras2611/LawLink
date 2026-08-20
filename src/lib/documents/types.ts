export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Party {
  name: string;
  role: string;
}

export interface Clause {
  id: string;
  title: string;
  content: string;
  page?: number;
}

export interface RiskArea {
  id: string;
  title: string;
  description: string;
  level: RiskLevel;
  clauseId?: string;
  suggestion?: string;
}

export interface RelatedLaw {
  id: string;
  title: string;
  type: 'act' | 'section' | 'judgment';
  relevance: string;
  url?: string;
}

export interface DocumentAnalysis {
  documentType: string;
  parties: Party[];
  dates: { label: string; date: string }[];
  clauses: Clause[];
  risks: RiskArea[];
  relatedLaws: RelatedLaw[];
  aiFindings: string[];
}

export interface Document {
  id: string;
  filename: string;
  uploadDate: string;
  size: number;
  status: 'idle' | 'uploading' | 'extracting' | 'analyzing' | 'finding_law' | 'verifying' | 'complete' | 'failed';
  analysis?: DocumentAnalysis;
  isDemo?: boolean;
}
