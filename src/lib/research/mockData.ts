import { HistoryItem, SavedItem } from './types';

export const mockHistory: HistoryItem[] = [
  { id: 'h1', title: 'Contract Termination Clauses', date: new Date().toISOString(), lastActivity: new Date().toISOString(), category: 'Contract Law' },
  { id: 'h2', title: 'Arbitration Procedures', date: new Date().toISOString(), lastActivity: new Date(Date.now() - 3600000).toISOString(), category: 'Commercial Law' },
  { id: 'h3', title: 'Property Dispute Precedents', date: new Date(Date.now() - 86400000).toISOString(), lastActivity: new Date(Date.now() - 86400000).toISOString(), category: 'Property Law' },
  { id: 'h4', title: 'Consumer Protection Compliance', date: new Date(Date.now() - 3 * 86400000).toISOString(), lastActivity: new Date(Date.now() - 3 * 86400000).toISOString(), category: 'Consumer Law' },
  { id: 'h5', title: 'Corporate Governance Requirements', date: new Date(Date.now() - 10 * 86400000).toISOString(), lastActivity: new Date(Date.now() - 10 * 86400000).toISOString(), category: 'Corporate Law' },
];

export const mockSaved: SavedItem[] = [
  { id: 's1', title: 'Analysis of Limitation of Liability', type: 'answers', dateSaved: new Date().toISOString(), description: 'Detailed breakdown of standard liability limits in software agreements.' },
  { id: 's2', title: 'Section 73, Contract Act', type: 'sections', dateSaved: new Date(Date.now() - 86400000).toISOString(), description: 'Compensation for loss or damage caused by breach of contract.' },
  { id: 's3', title: 'Sharma & Co. v. Tech Solutions Pvt Ltd', type: 'cases', dateSaved: new Date(Date.now() - 2 * 86400000).toISOString(), description: 'Commercial suit regarding interim injunction and arbitration.' },
  { id: 's4', title: 'Software_License_Agreement_2026.pdf', type: 'documents', dateSaved: new Date(Date.now() - 5 * 86400000).toISOString(), description: 'Uploaded document analyzed for risk areas and compliance.' },
  { id: 's5', title: 'The Arbitration and Conciliation Act, 1996', type: 'sources', dateSaved: new Date(Date.now() - 15 * 86400000).toISOString(), description: 'Primary statute governing domestic and international arbitration.' }
];
