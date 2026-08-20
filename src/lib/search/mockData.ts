import { SearchResult } from './types';

export const mockSearchResults: SearchResult[] = [
  {
    id: 'res-1',
    title: '[DEMO ACT] Demo Criminal Procedure Code, 2026',
    type: 'act',
    date: '2026-01-01',
    jurisdiction: 'Demo Jurisdiction',
    shortExplanation: 'A demo procedural law for capstone testing.',
    relevance: 98,
    tags: ['Criminal Procedure', 'Statute'],
    verified: true
  },
  {
    id: 'res-2',
    title: '[DEMO SECTION] Section 437: Demo Bail Provision',
    type: 'section',
    section: '437',
    date: '2026-01-01',
    jurisdiction: 'Demo Jurisdiction',
    shortExplanation: 'Demo provision governing the discretionary power to grant bail.',
    relevance: 95,
    tags: ['Bail', 'Criminal Law'],
    verified: true
  },
  {
    id: 'res-3',
    title: '[DEMO JUDGMENT] Demo Case A v. State of Demo',
    type: 'judgment',
    court: 'Demo Supreme Court',
    date: '2023-04-24',
    jurisdiction: 'Appellate',
    shortExplanation: 'Demo judgment establishing a mock constitutional doctrine.',
    relevance: 90,
    tags: ['Constitutional Law', 'Basic Structure'],
    verified: true
  },
  {
    id: 'res-4',
    title: '[DEMO ACT] Demo Technology Act, 2026',
    type: 'act',
    date: '2026-06-09',
    jurisdiction: 'Demo Jurisdiction',
    shortExplanation: 'Demo law dealing with cybercrime and e-commerce.',
    relevance: 85,
    tags: ['Cyber Law', 'IT Act'],
    verified: true
  },
  {
    id: 'res-5',
    title: '[DEMO REGULATION] Demo Digital Lending Directions',
    type: 'regulation',
    date: '2025-09-02',
    jurisdiction: 'Demo Jurisdiction',
    shortExplanation: 'Demo regulatory framework for digital lending ecosystems.',
    relevance: 82,
    tags: ['Banking', 'Fintech'],
    verified: true
  }
];
