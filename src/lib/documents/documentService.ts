import { mockDocument } from './mockData';
import { Document } from './types';

// Mock service for frontend development
export async function uploadDocument(file: File): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('doc-123');
    }, 2000);
  });
}

export async function getDocumentAnalysis(id: string): Promise<Document> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 'doc-123') {
        resolve(mockDocument);
      } else {
        reject(new Error('Document not found'));
      }
    }, 1000);
  });
}
