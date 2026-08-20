import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentUploader } from '../components/documents/DocumentUploader';
import { DocumentProgress } from '../components/documents/DocumentProgress';
import { uploadDocument } from '../lib/documents/documentService';
import { Document } from '../lib/documents/types';
import { FileText } from 'lucide-react';

export function Documents() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<Document['status']>('idle');

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setStatus('uploading');
    
    try {
      // Simulate the processing steps for the demo
      setTimeout(() => setStatus('extracting'), 1000);
      setTimeout(() => setStatus('analyzing'), 2500);
      setTimeout(() => setStatus('finding_law'), 4000);
      setTimeout(() => setStatus('verifying'), 5500);
      
      const docId = await uploadDocument(file);
      
      setStatus('complete');
      setTimeout(() => {
        navigate(`/documents/${docId}`);
      }, 1000);
      
    } catch (error) {
      console.error('Upload failed:', error);
      setStatus('failed');
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 z-10 shrink-0 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary">Analyze a Legal Document</h1>
            <p className="text-sm text-law-text-secondary mt-2 max-w-2xl">
              Upload a legal document and LawLink will identify important clauses, relevant legal provisions, potential issues and supporting authorities.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-xl">
          {isUploading ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center mb-8">
                 <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-law-indigo animate-pulse">
                   <FileText size={32} />
                 </div>
              </div>
              <DocumentProgress status={status} />
            </div>
          ) : (
            <DocumentUploader onFileSelect={handleFileSelect} />
          )}
        </div>
      </div>
    </div>
  );
}
