import { User } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export function Profile() {
  return (
    <div className="max-w-5xl mx-auto h-full flex items-center justify-center">
      <EmptyState 
        icon={User}
        title="Profile"
        description="Application shell deployed successfully. User profile and account management pending future implementation."
        className="w-full max-w-2xl"
      />
    </div>
  );
}
