import React, { useState, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';
import { useAuth } from '../contexts/AuthContext';
import { User, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { profileService } from '../lib/auth/profileService';

export function Profile() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch latest profile
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.warn('Could not load real profile, using context data', error);
        setName(user?.name || 'Advocate User');
        setEmail(user?.email || 'user@lawlink.in');
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');
    
    try {
      await profileService.updateProfile({ name, email });
      setStatus('success');
      setIsEditing(false);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      console.error('Failed to update profile', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-law-border pt-6 sm:pt-8 px-4 sm:px-8 shrink-0 pb-6">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-law-indigo">
            <User size={20} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-law-text-primary">{t('profile.title')}</h1>
            <p className="text-sm text-law-text-secondary mt-1">{t('profile.description')}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {status === 'success' && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <p className="text-sm font-medium">{t('profile.successMessage')}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-800">
              <AlertCircle size={18} className="text-rose-600" />
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          <div className="bg-white border border-law-border rounded-xl p-6 sm:p-8 shadow-sm">
            
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              
              {/* Avatar */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-law-indigo text-3xl font-bold border-4 border-white shadow-md">
                  {name.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <button className="text-xs font-semibold text-law-indigo hover:text-indigo-800 transition-colors">
                    Change Photo
                  </button>
                )}
              </div>

              {/* Form Fields */}
              <div className="flex-1 w-full space-y-5">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-law-text-muted uppercase tracking-wider">{t('profile.name')}</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        className="w-full px-4 py-2 border border-law-border rounded-lg text-sm text-law-text-primary focus:outline-none focus:ring-2 focus:ring-law-indigo/20 focus:border-law-indigo transition-all"
                      />
                    ) : (
                      <p className="text-sm font-medium text-law-text-primary py-2">{name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-law-text-muted uppercase tracking-wider">{t('profile.email')}</label>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        className="w-full px-4 py-2 border border-law-border rounded-lg text-sm text-law-text-primary focus:outline-none focus:ring-2 focus:ring-law-indigo/20 focus:border-law-indigo transition-all"
                      />
                    ) : (
                      <p className="text-sm font-medium text-law-text-primary py-2">{email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-law-text-muted uppercase tracking-wider">{t('profile.status')}</label>
                  <div className="py-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                      <CheckCircle2 size={12} /> {t('profile.active')}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-law-border flex flex-wrap items-center gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={handleSave} 
                        disabled={isLoading}
                        className="px-5 py-2.5 bg-law-indigo text-white text-sm font-semibold rounded-lg hover:bg-law-navy transition-colors disabled:opacity-50 min-w-[120px]"
                      >
                        {isLoading ? 'Saving...' : t('profile.save')}
                      </button>
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          setName(user?.name || 'Advocate User');
                          setEmail(user?.email || 'user@lawlink.in');
                        }}
                        disabled={isLoading}
                        className="px-5 py-2.5 bg-white border border-law-border text-law-text-primary text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        {t('profile.cancel')}
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2.5 bg-law-indigo text-white text-sm font-semibold rounded-lg hover:bg-law-navy transition-colors"
                      >
                        {t('profile.editProfile')}
                      </button>
                      <button className="px-5 py-2.5 bg-white border border-law-border text-law-text-primary text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                        {t('profile.changePassword')}
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="mt-8 flex justify-end">
             <button 
               onClick={handleLogout}
               className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 rounded-lg transition-colors"
             >
               <LogOut size={16} />
               {t('profile.logout')}
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
