import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { authService } from '../../lib/auth/authService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

// Basic password strength calculation
const calculateStrength = (pwd: string) => {
  let score = 0;
  if (!pwd) return score;
  if (pwd.length > 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  return score;
};

const getStrengthLabel = (score: number) => {
  if (score === 0) return { label: 'None', color: 'bg-slate-200', text: 'text-slate-500' };
  if (score === 1) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
  if (score === 2) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
  if (score === 3) return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
  return { label: 'Strong', color: 'bg-green-500', text: 'text-green-500' };
};

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const strengthScore = calculateStrength(password);
  const strengthInfo = getStrengthLabel(strengthScore);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!password || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (strengthScore < 2) {
      setError('Please choose a stronger password.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. The link might be expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create new password" 
      subtitle={success ? "Password reset successful" : "Please enter your new password below"}
    >
      {success ? (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-law-text-secondary">
            Your password has been successfully reset. You can now use your new password to sign in to your account.
          </p>
          <div className="pt-4">
            <Button onClick={() => navigate('/login')} className="w-full">
              Sign in
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm bg-law-critical/10 border border-law-critical/20 text-law-critical rounded-md flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <PasswordInput
              label="New password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            {password && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 flex gap-1 h-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level} 
                      className={`h-full flex-1 rounded-full ${level <= strengthScore ? strengthInfo.color : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium w-12 text-right ${strengthInfo.text}`}>
                  {strengthInfo.label}
                </span>
              </div>
            )}
          </div>

          <PasswordInput
            label="Confirm new password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Reset password
            </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
