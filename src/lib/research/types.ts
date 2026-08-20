export type HistoryGroup = 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Older';

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  lastActivity: string;
  category: string;
}

export type SavedItemType = 'answers' | 'sections' | 'cases' | 'documents' | 'sources';

export interface SavedItem {
  id: string;
  title: string;
  type: SavedItemType;
  dateSaved: string;
  description: string;
  url?: string;
}
