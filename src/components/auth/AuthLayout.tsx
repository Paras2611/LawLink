import React from 'react';
import { Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-law-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center justify-center gap-3 group mb-4">
          <div className="w-10 h-10 bg-law-indigo rounded-xl flex items-center justify-center shadow-lg shadow-law-indigo/20 group-hover:scale-105 transition-transform">
            <Scale size={22} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-law-deep-navy tracking-widest">LAWLINK</span>
        </Link>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-law-text-primary">
          {title}
        </h2>
        <p className="mt-2 text-sm text-law-text-secondary">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-law-card py-8 px-4 shadow-xl shadow-law-deep-navy/5 sm:rounded-2xl sm:px-10 border border-law-border">
          {children}
        </div>
      </div>
    </div>
  );
}
