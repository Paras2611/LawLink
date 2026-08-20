import { Settings as SettingsIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export function Settings() {
  return (
    <div className="max-w-5xl mx-auto h-full flex items-center justify-center">
      <EmptyState 
        icon={SettingsIcon}
        title="Settings"
        description="Application shell deployed successfully. Configuration and preference panels pending future implementation."
        className="w-full max-w-2xl"
      />
    </div>
  );
}
