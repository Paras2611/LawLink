export type QuestionType = 'yes-no' | 'single-choice' | 'multiple-choice' | 'text' | 'date' | 'number' | 'dropdown';

export interface QuestionOptionDef {
  label: string;
  value: string;
}

export interface ClarificationQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options?: QuestionOptionDef[];
  required?: boolean;
  placeholder?: string;
}

export interface ClarificationData {
  introText?: string;
  questions: ClarificationQuestion[];
}
