import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authService } from '../../lib/auth/authService';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle={success ? "Check your inbox" : "Enter your email and we'll send you a link to reset your password"}
    >
      {success ? (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-law-text-secondary">
            We have sent a password reset link to <span className="font-medium text-law-text-primary">{email}</span>. 
            Please check your email and follow the instructions.
          </p>
          <div className="pt-4">
            <Link to="/login" className="text-sm font-semibold text-law-indigo hover:text-law-navy transition-colors">
              Return to sign in
            </Link>
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

          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send reset link
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-law-text-secondary">Remember your password? </span>
            <Link to="/login" className="font-semibold text-law-indigo hover:text-law-navy transition-colors">
              Sign in
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
