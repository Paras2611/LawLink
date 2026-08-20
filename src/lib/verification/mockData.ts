import { LegalSource, LegalClaim, Citation } from './types';

export const mockSources: LegalSource[] = [
  {
    id: 'src-1',
    title: '[DEMO ACT] Demo Contract Act, 2026',
    sourceType: 'act',
    date: '2026-09-01',
    jurisdiction: 'Demo Jurisdiction',
    verificationStatus: 'verified'
  },
  {
    id: 'src-2',
    title: '[DEMO SECTION] Section 73',
    sourceType: 'section',
    section: '73',
    jurisdiction: 'Demo Jurisdiction',
    verificationStatus: 'verified'
  },
  {
    id: 'src-3',
    title: '[DEMO JUDGMENT] Demo Case A v. Demo Case B',
    sourceType: 'judgment',
    court: 'Demo Exchequer',
    date: '1854-02-23',
    jurisdiction: 'Demo Common Law',
    verificationStatus: 'partially_verified'
  },
  {
    id: 'src-4',
    title: '[DEMO JUDGMENT] State of Demo v. Demo Industries',
    sourceType: 'judgment',
    court: 'Demo Supreme Court',
    date: '2020-05-15',
    jurisdiction: 'Demo Jurisdiction',
    verificationStatus: 'conflicting'
  }
];

export const mockClaims: LegalClaim[] = [
  {
    id: 'claim-1',
    claim: 'Damages for breach of contract are awarded to put the injured party in the same position as if the contract had been performed.',
    status: 'verified',
    sourceIds: ['src-1', 'src-2'],
    confidence: { score: 95, label: 'High' }
  },
  {
    id: 'claim-2',
    claim: 'Special damages can only be claimed if they were reasonably foreseeable by both parties at the time of making the contract.',
    status: 'partially_verified',
    sourceIds: ['src-3'],
    confidence: { score: 75, label: 'Medium' },
    explanation: 'The principle is established in English common law but application in specific Indian contexts may vary.'
  },
  {
    id: 'claim-3',
    claim: 'A company can unilaterally terminate a contract without notice under force majeure even if not specified in the contract.',
    status: 'unverified',
    sourceIds: [],
    confidence: { score: 10, label: 'Low' },
    explanation: 'LawLink could not verify this claim against the available legal sources.'
  },
  {
    id: 'claim-4',
    claim: 'Limitation period for filing a suit for breach of contract is 3 years from the date the breach occurs.',
    status: 'conflicting',
    sourceIds: ['src-4'],
    confidence: { score: 50, label: 'Medium' },
    explanation: 'Recent judgments have differing interpretations on when the breach is considered to have occurred.'
  }
];

export const mockCitations: Citation[] = [
  {
    id: 'cit-1',
    text: 'Compensation for loss or damage caused by breach of contract.',
    sourceId: 'src-2'
  },
  {
    id: 'cit-2',
    text: 'Where two parties have made a contract which one of them has broken, the damages which the other party ought to receive...',
    sourceId: 'src-3'
  }
];
