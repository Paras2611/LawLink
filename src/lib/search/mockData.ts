import { SearchResult } from './types';

export const mockSearchResults: SearchResult[] = [
  {
    id: 'res-1',
    title: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
    type: 'act',
    date: '2023-12-25',
    jurisdiction: 'Union of India',
    shortExplanation: 'The procedural criminal law replacing the Code of Criminal Procedure, 1973.',
    relevance: 98,
    tags: ['Criminal Procedure', 'Statute'],
    verified: true
  },
  {
    id: 'res-2',
    title: 'Section 437: When bail may be taken in case of non-bailable offence',
    type: 'section',
    section: '437',
    date: '2023-12-25',
    jurisdiction: 'Union of India',
    shortExplanation: 'Provision governing the discretionary power of courts and police officers to grant bail in non-bailable offences.',
    relevance: 95,
    tags: ['Bail', 'Criminal Law'],
    verified: true
  },
  {
    id: 'res-3',
    title: 'Kesavananda Bharati v. State of Kerala',
    type: 'judgment',
    court: 'Supreme Court of India',
    date: '1973-04-24',
    jurisdiction: 'Appellate',
    shortExplanation: 'Landmark judgment establishing the Basic Structure Doctrine of the Indian Constitution.',
    relevance: 90,
    tags: ['Constitutional Law', 'Basic Structure'],
    verified: true
  },
  {
    id: 'res-4',
    title: 'Information Technology Act, 2000',
    type: 'act',
    date: '2000-06-09',
    jurisdiction: 'Union of India',
    shortExplanation: 'Primary law in India dealing with cybercrime and electronic commerce.',
    relevance: 85,
    tags: ['Cyber Law', 'IT Act'],
    verified: true
  },
  {
    id: 'res-5',
    title: 'Reserve Bank of India (Digital Lending) Directions, 2022',
    type: 'regulation',
    date: '2022-09-02',
    jurisdiction: 'Union of India',
    shortExplanation: 'Regulatory framework for digital lending ecosystems to prevent unfair practices.',
    relevance: 82,
    tags: ['Banking', 'Fintech', 'RBI'],
    verified: true
  }
];
