import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    console.log('Register attempt:', { name, email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white border border-slate-200 p-8 rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">LAWLINK</h2>
          <p className="text-slate-500 mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none transition-colors",
                  error && !name ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-slate-400"
                )}
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none transition-colors",
                  error && !email ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-slate-400"
                )}
                placeholder="name@firm.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none transition-colors",
                  error && !password ? "border-red-300 focus:border-red-500" : "border-slate-200 focus:border-slate-400"
                )}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-950 text-white py-2 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors">
            Create Account <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-slate-900 font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
