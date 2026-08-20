import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MessageSquareText, BookOpen, FileText, Gavel, Scale, Landmark,
  Users, Briefcase, ShoppingCart, Laptop, ScrollText, HardHat, Building2,
  Clock, ArrowRight, Bookmark, File, ChevronRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';

const primaryActions = [
  { id: 'ask', name: 'Ask LawLink', icon: MessageSquareText, path: '/chat', description: 'Ask legal questions' },
  { id: 'laws', name: 'Search Laws', icon: BookOpen, path: '/search', description: 'Find acts & statutes' },
  { id: 'cases', name: 'Search Cases', icon: Gavel, path: '/cases', description: 'Explore precedents' },
  { id: 'analyze', name: 'Analyze Document', icon: FileText, path: '/documents', description: 'Upload for review' },
];

const legalDomains = [
  { name: 'Criminal Law', icon: Gavel },
  { name: 'Civil Law', icon: Scale },
  { name: 'Property Law', icon: Landmark },
  { name: 'Family Law', icon: Users },
  { name: 'Contract Law', icon: Briefcase },
  { name: 'Consumer Law', icon: ShoppingCart },
  { name: 'Cyber Law', icon: Laptop },
  { name: 'Constitutional Law', icon: ScrollText },
  { name: 'Labour Law', icon: HardHat },
  { name: 'Corporate Law', icon: Building2 },
];

const recentResearch = [
  { id: 1, title: 'Bail conditions under Section 437 CrPC', time: '2 hours ago' },
  { id: 2, title: 'Specific performance of contract', time: 'Yesterday' },
  { id: 3, title: 'Data protection obligations IT Act', time: 'Aug 18' },
];

// Empty list to demonstrate the polished EmptyState component
const recentDocuments: any[] = [];

const savedResearch = [
  { id: 1, title: 'Kesavananda Bharati v. State of Kerala', type: 'Case' },
  { id: 2, title: 'Article 21 - Constitution of India', type: 'Statute' },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this query would be passed to the Chat/Search module context.
      navigate('/chat');
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto pt-8 pb-10 md:pt-16 md:pb-16 px-2 md:px-4 shrink-0">
        <h1 className="text-3xl md:text-5xl font-bold text-law-text-primary tracking-tight mb-4">
          Understand the Law. <br className="hidden md:block" />
          <span className="text-law-indigo">Find the Authority.</span>
        </h1>
        <p className="text-sm md:text-lg text-law-text-secondary mb-8">
          AI-powered Indian legal information and research assistance.
        </p>
        
        <form onSubmit={handleSearch} className="relative group shadow-lg shadow-law-deep-navy/5 rounded-2xl overflow-hidden max-w-2xl mx-auto transition-shadow hover:shadow-law-indigo/10">
          <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
            <Search className="text-law-text-muted group-focus-within:text-law-indigo transition-colors w-5 h-5 md:w-6 md:h-6" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask LawLink a legal question..."
            className="w-full h-14 md:h-16 pl-12 md:pl-14 pr-24 md:pr-36 bg-law-card border border-law-border text-sm md:text-base text-law-text-primary focus:outline-none focus:border-law-indigo focus:ring-1 focus:ring-law-indigo transition-all placeholder:text-law-text-muted"
          />
          <div className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2">
            <Button type="submit" variant="primary" className="h-11 md:h-12 px-4 md:px-6 rounded-xl text-xs md:text-sm shadow-md">
              <span className="hidden sm:inline">Ask LawLink</span>
              <span className="sm:hidden">Ask</span>
            </Button>
          </div>
        </form>
      </div>

      <div className="px-2 md:px-4 pb-12 space-y-10 md:space-y-12">
        {/* Primary Quick Actions */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {primaryActions.map((action) => (
              <button
                key={action.id}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-start p-4 md:p-5 bg-law-card border border-law-border rounded-2xl shadow-sm hover:border-law-indigo hover:shadow-md transition-all text-left group"
              >
                <div className="w-10 h-10 bg-law-bg rounded-lg flex items-center justify-center text-law-text-secondary group-hover:bg-law-indigo group-hover:text-white transition-colors mb-4">
                  <action.icon size={20} />
                </div>
                <h3 className="font-semibold text-law-text-primary group-hover:text-law-indigo transition-colors text-sm md:text-base">{action.name}</h3>
                <p className="text-xs text-law-text-muted mt-1 hidden sm:block">{action.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Legal Domains */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-law-text-primary">Browse Legal Domains</h2>
            <button className="text-xs md:text-sm font-medium text-law-indigo hover:text-law-navy flex items-center transition-colors">
              View all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
            {legalDomains.map((domain) => (
              <button
                key={domain.name}
                className="flex items-center gap-3 p-3 bg-law-card border border-law-border rounded-xl shadow-sm hover:border-law-indigo/50 hover:bg-slate-50 transition-all text-left group"
              >
                <domain.icon size={16} className="text-law-text-muted group-hover:text-law-indigo transition-colors shrink-0" />
                <span className="text-xs md:text-sm font-medium text-law-text-primary group-hover:text-law-indigo transition-colors truncate">{domain.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Research & Documents */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Research */}
          <Card className="flex flex-col h-[350px]">
            <CardHeader className="py-4 px-5 pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock size={18} className="text-law-text-muted" />
                Recent Research
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {recentResearch.length > 0 ? (
                <div className="divide-y divide-law-border/50">
                  {recentResearch.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-law-text-primary group-hover:text-law-indigo transition-colors line-clamp-2">{item.title}</h4>
                        <p className="text-[11px] text-law-text-muted mt-1.5">{item.time}</p>
                      </div>
                      <ChevronRight size={14} className="text-law-text-muted mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <EmptyState icon={Clock} title="No recent research" description="Your latest queries will appear here." className="border-none shadow-none bg-transparent" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Research */}
          <Card className="flex flex-col h-[350px]">
            <CardHeader className="py-4 px-5 pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Bookmark size={18} className="text-law-text-muted" />
                Saved Research
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {savedResearch.length > 0 ? (
                <div className="divide-y divide-law-border/50">
                  {savedResearch.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex justify-between items-start gap-3">
                      <div>
                        <h4 className="text-sm font-medium text-law-text-primary group-hover:text-law-indigo transition-colors line-clamp-2">{item.title}</h4>
                        <span className="inline-block px-2 py-0.5 mt-2 text-[10px] font-medium bg-law-bg text-law-text-secondary rounded border border-law-border">
                          {item.type}
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-law-text-muted mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <EmptyState icon={Bookmark} title="No saved items" description="Bookmark cases and laws to read them later." className="border-none shadow-none bg-transparent" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="flex flex-col h-[350px]">
            <CardHeader className="py-4 px-5 pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <File size={18} className="text-law-text-muted" />
                Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto bg-slate-50/30">
              {recentDocuments.length > 0 ? (
                <div className="divide-y divide-law-border/50">
                  {recentDocuments.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start justify-between gap-3">
                      <h4 className="text-sm font-medium text-law-text-primary group-hover:text-law-indigo transition-colors line-clamp-2">{item.title}</h4>
                      <ChevronRight size={14} className="text-law-text-muted mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <EmptyState 
                    icon={FileText} 
                    title="No documents" 
                    description="Upload legal documents for AI analysis." 
                    className="border-none shadow-none bg-transparent py-4"
                    action={
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate('/documents')}>
                        Upload Document
                      </Button>
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
