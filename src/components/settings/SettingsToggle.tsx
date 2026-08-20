import React from 'react';
import { cn } from '@/src/lib/utils';

interface SettingsToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingsToggle({ title, description, checked, onChange }: SettingsToggleProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 border-b border-law-border last:border-0">
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-law-text-primary">{title}</h4>
        <p className="text-sm text-law-text-secondary mt-1">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-law-indigo focus:ring-offset-2",
          checked ? "bg-law-indigo" : "bg-slate-200"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
