import React, { useState, useRef } from 'react';
import { UploadCloud, FileType, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';

interface DocumentUploaderProps {
  onFileSelect: (file: File) => void;
  className?: string;
}

export function DocumentUploader({ onFileSelect, className }: DocumentUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File) => {
    setError(null);
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return false;
    }
    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      setError('File size must be less than 20MB.');
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all bg-white cursor-pointer",
          isDragging ? "border-law-indigo bg-indigo-50/50" : "border-law-border hover:border-law-indigo/50 hover:bg-slate-50",
          error && "border-rose-300 bg-rose-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-law-indigo">
          <UploadCloud size={32} />
        </div>
        
        <h3 className="text-lg font-bold text-law-text-primary mb-2">Upload Legal Document</h3>
        <p className="text-sm text-law-text-secondary text-center max-w-sm mb-6">
          Drag and drop your PDF here, or click to browse. LawLink will analyze clauses, risks, and relevant laws.
        </p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-law-text-muted bg-slate-100 px-4 py-2 rounded-lg">
          <span className="flex items-center gap-1.5"><FileType size={14} /> PDF Only</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Max 20MB</span>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-sm text-rose-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
