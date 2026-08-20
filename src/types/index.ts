import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  confidence?: number;
  verificationStatus?: 'verified' | 'partially-verified' | 'unverified' | 'conflicting';
  sources?: LegalSource[];
}

export interface LegalSource {
  id: string;
  title: string;
  type: 'act' | 'section' | 'judgment' | 'court' | 'regulation';
  section?: string;
  court?: string;
  date: string;
  jurisdiction: string;
  verificationStatus: 'verified' | 'partially-verified' | 'unverified' | 'conflicting';
}

export interface Case {
  id: string;
  title: string;
  court: string;
  date: string;
  caseNumber: string;
  summary: string;
  provisions: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  status: 'pending' | 'processing' | 'analyzed' | 'failed';
  analysis?: any; 
}

export interface NavItem {
  name: string;
  path: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
}
