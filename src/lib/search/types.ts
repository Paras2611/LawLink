export type DocumentType = 'act' | 'section' | 'regulation' | 'judgment';

export interface SearchResult {
  id: string;
  title: string;
  type: DocumentType;
  section?: string;
  court?: string;
  date?: string;
  jurisdiction?: string;
  shortExplanation: string;
  relevance: number;
  tags?: string[];
  verified?: boolean;
}

export interface SearchFilters {
  domain: string[];
  state: string[];
  court: string[];
  jurisdiction: string[];
  documentType: string[];
}
