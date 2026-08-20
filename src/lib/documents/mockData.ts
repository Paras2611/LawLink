import { Document } from './types';

export const mockDocument: Document = {
  id: 'doc-123',
  filename: 'Demo_Software_License_Agreement.pdf',
  uploadDate: new Date().toISOString(),
  size: 2450000, // ~2.4MB
  status: 'complete',
  isDemo: true,
  analysis: {
    documentType: '[AI DEMO ANALYSIS] Software License Agreement',
    parties: [
      { name: 'Demo Licensor Pvt Ltd', role: 'Licensor' },
      { name: 'Demo Licensee Enterprises', role: 'Licensee' }
    ],
    dates: [
      { label: 'Effective Date', date: '2026-09-01' },
      { label: 'Expiration Date', date: '2028-08-31' }
    ],
    clauses: [
      {
        id: 'c1',
        title: 'Grant of Demo License',
        content: 'Subject to the terms and conditions of this Demo Agreement, Licensor grants Licensee a non-exclusive license to use the Software solely for internal business operations.',
        page: 2
      },
      {
        id: 'c2',
        title: 'Limitation of Liability (Demo)',
        content: 'In no event shall Licensor be liable for any indirect damages arising out of or related to this Demo Agreement.',
        page: 5
      },
      {
        id: 'c3',
        title: 'Termination for Convenience',
        content: 'Licensee may terminate this Agreement at any time by providing 30 days written notice to Licensor. Upon termination, no refunds of prepaid fees shall be provided.',
        page: 8
      }
    ],
    risks: [
      {
        id: 'r1',
        title: 'Broad Limitation of Liability',
        description: 'The limitation of liability clause excludes all indirect and consequential damages without a liability cap for direct damages. This could expose the Licensee to significant unrecoverable losses.',
        level: 'high',
        clauseId: 'c2',
        suggestion: 'Consider negotiating a mutual liability cap (e.g., 12 months of fees paid) and exceptions for confidentiality breaches or gross negligence.'
      },
      {
        id: 'r2',
        title: 'No Refund on Termination',
        description: 'The termination clause explicitly states no refunds will be provided for prepaid fees even if terminated early by the Licensee.',
        level: 'medium',
        clauseId: 'c3',
        suggestion: 'Propose a pro-rata refund of prepaid fees for the unused portion of the term if terminated.'
      }
    ],
    relatedLaws: [
      {
        id: 'law-1',
        title: 'Demo Contract Act',
        type: 'act',
        relevance: 'Governs the general principles of demo contract formation, breach, and damages.',
      },
      {
        id: 'law-2',
        title: 'Demo Section 73',
        type: 'section',
        relevance: 'Relevant to the limitation of liability and calculation of damages in case of breach.',
      }
    ],
    aiFindings: [
      '[DEMO FINDING] The agreement strongly favors the Licensor regarding liability and termination rights.',
      '[DEMO FINDING] No explicit indemnification clause for intellectual property infringement is present.',
      '[DEMO FINDING] Data privacy and security obligations are vaguely defined.'
    ]
  }
};
