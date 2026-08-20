import { apiClient } from '../api/client';
import { mockDocument } from './mockData';
import { Document } from './types';

export async function uploadDocument(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/api/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.id;
  } catch (error) {
    console.warn("API failed, falling back to mock upload", error);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('doc-123');
      }, 2000);
    });
  }
}

export async function analyzeDocument(id: string): Promise<Document> {
  try {
    const response = await apiClient.post(`/api/documents/analyze`, { id });
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock analyze", error);
    return getDocumentAnalysis(id);
  }
}

export async function getDocumentAnalysis(id: string): Promise<Document> {
  try {
    const response = await apiClient.get(`/api/documents/${id}`);
    return response.data;
  } catch (error) {
    console.warn("API failed, falling back to mock document", error);
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
}
