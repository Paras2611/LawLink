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

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreed) {
      setError('You must agree to the Terms and Conditions.');
      return;
    }

    setIsLoading(true);
    try {
      const { user, token } = await authService.register(name, email, password);
      login(user, token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Join LawLink for professional legal research"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 text-sm bg-law-critical/10 border border-law-critical/20 text-law-critical rounded-md flex items-start gap-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />

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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <PasswordInput
          label="Confirm password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />

        <div className="py-2">
          <Checkbox 
            label={
              <span>I agree to the <a href="#" className="text-law-indigo hover:underline">Terms of Service</a> and <a href="#" className="text-law-indigo hover:underline">Privacy Policy</a>.</span>
            } 
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create account
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-law-text-secondary">Already have an account? </span>
        <Link to="/login" className="font-semibold text-law-indigo hover:text-law-navy transition-colors">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
