import { CaseDocument } from './types';

export const mockCases: CaseDocument[] = [
  {
    id: 'case-demo-1',
    isDemo: true,
    title: 'Demo Case A (Sharma & Co. v. Tech Solutions Pvt Ltd)',
    court: 'Demo High Court',
    date: '2023-11-15',
    caseNumber: 'DEMO(COMM) 456/2023',
    jurisdiction: 'Demo Appellate',
    caseType: 'Commercial Suit',
    provisions: ['Demo Provision 1', 'Demo Provision 2'],
    summary: 'A demo dispute regarding interim injunction in a software licensing agreement containing an arbitration clause.',
    relevance: 95,
    verified: true,
    facts: 'The Plaintiff (Sharma & Co.) entered into a demo software development and licensing agreement with the Defendant (Tech Solutions). The Defendant allegedly terminated the agreement wrongfully and withheld source code. Plaintiff sought an interim injunction to prevent the Defendant from selling the software to third parties pending arbitration.',
    issues: [
      'Whether the dispute falls within the ambit of the arbitration clause?',
      'Whether an interim injunction can be granted under demo provisions when the primary relief is for specific performance?'
    ],
    arguments: {
      petitioner: [
        'The arbitration clause is broad enough to cover termination disputes.',
        'Irreparable harm will be caused if the Defendant sells the proprietary software to competitors.'
      ],
      respondent: [
        'The software was developed using open-source components not exclusive to the Plaintiff.',
        'The termination was valid due to non-payment of milestone dues by the Plaintiff.'
      ]
    },
    judgmentSummary: 'The Court granted a conditional interim injunction, restraining the Defendant from creating third-party rights, subject to the Plaintiff depositing the disputed milestone amount in court.',
    courtReasoning: 'The Court reasoned that while specific performance of a commercial contract is generally not granted if damages are an adequate remedy, the unique nature of the proprietary software justified preserving the status quo. The balance of convenience favored the Plaintiff, provided they demonstrate bona fide intent by depositing the outstanding dues.',
    outcome: 'Conditional Interim Injunction granted in favor of the Plaintiff. Parties directed to commence arbitration within 30 days.',
    citedCases: [
      { id: 'c1', title: 'Demo Related Case X', citation: 'DEMO CITATION 1', relation: 'cited' },
      { id: 'c2', title: 'Demo Related Case Y', citation: 'DEMO CITATION 2', relation: 'cited' }
    ],
    citingCases: [],
    timeline: [
      { id: 't1', stage: 'Filing', date: '2023-09-10', status: 'completed', description: 'Suit filed under Demo Act.' },
      { id: 't2', stage: 'Hearing', date: '2023-10-05', status: 'completed', description: 'Arguments heard on interim relief.' },
      { id: 't3', stage: 'Interim Order', date: '2023-11-15', status: 'completed', description: 'Conditional injunction granted.' },
      { id: 't4', stage: 'Judgment', status: 'upcoming', description: 'Pending final disposal or arbitration outcome.' }
    ],
    sourceUrl: 'https://example.com/demo-judgment-1'
  },
  {
    id: 'case-demo-2',
    isDemo: true,
    title: 'Demo Case B (R.K. Builders v. State of Maharashtra)',
    court: 'Demo Supreme Court',
    date: '2022-04-20',
    caseNumber: 'Demo Appeal No. 1122 of 2022',
    jurisdiction: 'Demo Appellate',
    caseType: 'Civil Appeal',
    provisions: ['Demo Provision 3', 'Demo Provision 4'],
    summary: 'Demo appeal regarding the calculation of damages in a state infrastructure contract delayed by force majeure events.',
    relevance: 88,
    verified: true
  },
  {
    id: 'case-demo-3',
    isDemo: true,
    title: 'Demo Case C (CyberGuard Inc. v. Union of India)',
    court: 'Demo High Court',
    date: '2024-01-10',
    caseNumber: 'DEMO(C) 89/2024',
    jurisdiction: 'Writ Jurisdiction',
    caseType: 'Writ Petition',
    provisions: ['Demo Constitutional Article', 'Demo IT Rules'],
    summary: 'Challenge to blocking orders issued under Demo Rules without prior hearing.',
    relevance: 82,
    verified: true
  }
];
