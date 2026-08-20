export const mockConversations = [
  { id: '1', title: 'Bail conditions under Section 437 CrPC', date: 'Today' },
  { id: '2', title: 'Specific performance of contract', date: 'Yesterday' },
  { id: '3', title: 'Data protection obligations IT Act', date: 'Aug 18' },
];

export const mockChatHistory = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'What are the general principles for granting bail in non-bailable offences under Indian law?',
    timestamp: '10:00 AM'
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: '[DEMO SYSTEM] This is a mock AI response generated based on your query. In a production environment, this would hit the LawLink backend API to stream a verified legal response.\n\nThe principles for granting bail in non-bailable offences are primarily governed by Section 437 of the Bharatiya Nagarik Suraksha Sanhita, 2023 (formerly Section 437 of the Code of Criminal Procedure, 1973).\n\nHere is a detailed breakdown of the legal position.',
    timestamp: '10:01 AM',
    aiData: {
      answer: 'Bail in non-bailable offences is a matter of judicial discretion, not an absolute right. The court considers various factors including the nature and gravity of the charge, severity of punishment, danger of the accused absconding, character and behavior of the accused, and reasonable apprehension of witnesses being tampered with.',
      whyThisApplies: 'Your query asks for general principles under Indian criminal law for non-bailable offences, which directly points to the statutory provisions governing bail (Section 437 BNSS / CrPC) and established Supreme Court precedents.',
      relevantLaw: [
        {
          id: 'law-1',
          title: 'Section 437, Bharatiya Nagarik Suraksha Sanhita, 2023',
          description: 'When bail may be taken in case of non-bailable offence.',
          verified: true
        }
      ],
      relevantCases: [
        {
          id: 'case-1',
          title: 'Gurbaksh Singh Sibbia v. State of Punjab',
          citation: '(1980) 2 SCC 565',
          relevance: 'Established foundational principles for bail and anticipatory bail, emphasizing that "bail is the rule and jail is an exception".',
          verified: true
        },
        {
          id: 'case-2',
          title: 'P. Chidambaram v. Central Bureau of Investigation',
          citation: '(2019) 10 SCC 437',
          relevance: 'Reiterated the triple test for bail: flight risk, tampering with evidence, and influencing witnesses.',
          verified: true
        }
      ],
      nextSteps: [
        'Identify the specific offence and its punishment quantum (e.g., whether it is punishable with death or life imprisonment).',
        'Assess if the accused falls under any special category (e.g., under 16 years of age, woman, sick, or infirm) which allows for special consideration under the proviso to Section 437(1).',
        'Prepare grounds for bail addressing the "triple test" (flight risk, evidence tampering, witness influencing).'
      ],
      limitations: 'The principles for bail can vary significantly if the offence falls under special statutes with stringent bail conditions, such as the Unlawful Activities (Prevention) Act (UAPA), Prevention of Money Laundering Act (PMLA), or Narcotic Drugs and Psychotropic Substances Act (NDPS).',
      confidence: { score: 95, label: 'High' },
      verificationStatus: 'verified',
      sources: [
        { id: 'src-1', name: 'Bharatiya Nagarik Suraksha Sanhita, 2023', type: 'Statute' },
        { id: 'src-2', name: 'Supreme Court of India Judgments', type: 'Case Law' }
      ]
    }
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'I want to know the remedies for breach of contract.',
    timestamp: '10:05 AM'
  },
  {
    id: 'msg-4',
    role: 'assistant',
    type: 'clarification',
    content: 'Before I analyze this situation, I need some additional information.',
    timestamp: '10:05 AM',
    clarificationData: {
      introText: 'To provide accurate precedents for breach of contract under the Indian Contract Act, I need to understand the nature of the agreement.',
      questions: [
        {
          id: 'q1',
          type: 'yes-no',
          title: 'Was there a written agreement?',
          description: 'Oral contracts are valid but harder to prove.',
          required: true
        },
        {
          id: 'q2',
          type: 'single-choice',
          title: 'Is there a dispute resolution clause?',
          options: [
            { label: 'Yes, Arbitration', value: 'arbitration' },
            { label: 'Yes, Mediation', value: 'mediation' },
            { label: 'No/Not sure', value: 'none' }
          ],
          required: true
        },
        {
          id: 'q3',
          type: 'dropdown',
          title: 'Which state is the contract governed by?',
          options: [
            { label: 'Maharashtra', value: 'MH' },
            { label: 'Delhi', value: 'DL' },
            { label: 'Karnataka', value: 'KA' },
            { label: 'Other', value: 'OTHER' }
          ],
          required: true
        },
        {
          id: 'q4',
          type: 'multiple-choice',
          title: 'What remedies are you seeking?',
          description: 'Select all that apply.',
          options: [
            { label: 'Specific Performance (force them to complete the contract)', value: 'specific_performance' },
            { label: 'Damages / Financial Compensation', value: 'damages' },
            { label: 'Injunction (stop them from doing something)', value: 'injunction' }
          ],
          required: false
        }
      ]
    }
  }
];

export const mockProgressStates = [
  'Searching Indian legal sources...',
  'Finding relevant provisions...',
  'Retrieving judgments...',
  'Comparing authorities...',
  'Verifying legal claims...',
  'Generating response...'
];
