import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, Loader2, CheckCircle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

type UploadState = 'idle' | 'uploading' | 'analyzing' | 'done';

export function DocumentUploader() {
  const [state, setState] = useState<UploadState>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFile = useCallback((file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF document.');
      return;
    }

    setState('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setState('analyzing');
        setTimeout(() => setState('done'), 2000);
      }
    }, 200);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  if (state === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-slate-200 rounded-lg bg-white shadow-sm">
        <Loader2 className="animate-spin text-slate-500 mb-4" size={32} />
        <p className="text-sm font-medium text-slate-900">Analyzing document...</p>
        <p className="text-xs text-slate-500">Finding relevant provisions and potential issues</p>
      </div>
    );
  }

  if (state === 'done') {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-green-200 rounded-lg bg-green-50 shadow-sm">
        <CheckCircle className="text-green-600 mb-4" size={32} />
        <p className="text-sm font-medium text-green-900">Document analyzed successfully</p>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative p-12 border-2 border-dashed rounded-lg transition-all text-center",
        isDragging ? "border-slate-400 bg-slate-50" : "border-slate-200 bg-white"
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        className="hidden"
        accept="application/pdf"
      />
      <Upload className="mx-auto text-slate-400 mb-4" size={32} />
      <h3 className="text-sm font-medium text-slate-900 mb-1">Drag and drop your PDF</h3>
      <p className="text-xs text-slate-500 mb-6">or click to browse. Max size 10MB.</p>
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800 transition-colors"
      >
        Browse Files
      </button>

      {state === 'uploading' && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center rounded-lg">
          <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-900 transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-500 mt-2">Uploading {progress}%</p>
        </div>
      )}
    </div>
  );
}
