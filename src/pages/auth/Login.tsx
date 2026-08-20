import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { authService } from '../../lib/auth/authService';
import { useAuth } from '../../contexts/AuthContext';
import { AlertCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const { user, token } = await authService.login(email, password);
      login(user, token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign in to your account" 
      subtitle="Access your intelligent legal workspace"
    >
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

        <PasswordInput
          label="Password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between">
          <Checkbox 
            label="Remember me" 
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={isLoading}
          />
          <div className="text-sm">
            <Link to="/forgot-password" className="font-semibold text-law-indigo hover:text-law-navy transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign in
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-law-text-secondary">Don't have an account? </span>
        <Link to="/register" className="font-semibold text-law-indigo hover:text-law-navy transition-colors">
          Register now
        </Link>
      </div>
    </AuthLayout>
  );
}
