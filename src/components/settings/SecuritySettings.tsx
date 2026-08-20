import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { ShieldCheck, MonitorSmartphone, XCircle } from 'lucide-react';

export function SecuritySettings() {
  const { t } = useI18n();

  const sessions = [
    { id: 1, device: 'MacBook Pro - Chrome', location: 'Mumbai, India', isCurrent: true, time: 'Active Now' },
    { id: 2, device: 'iPhone 14 - Safari', location: 'Pune, India', isCurrent: false, time: 'Last active 2 hours ago' },
  ];

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-law-text-primary mb-2">{t('settings.security.title')}</h2>
        <p className="text-sm text-law-text-secondary">{t('settings.security.desc')}</p>
      </div>

      <section>
        <h3 className="text-sm font-bold text-law-text-primary uppercase tracking-wider mb-4 border-b border-law-border pb-2">{t('settings.security.sessions')}</h3>
        <p className="text-sm text-law-text-secondary mb-4">{t('settings.security.sessionsDesc')}</p>
        
        <div className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-law-border rounded-xl bg-slate-50">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg border border-slate-200 text-law-indigo mt-0.5">
                  <MonitorSmartphone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-law-text-primary">{session.device}</h4>
                  <div className="text-xs text-law-text-secondary mt-1 flex items-center gap-2">
                    <span>{session.location}</span>
                    <span>•</span>
                    <span className={session.isCurrent ? 'text-emerald-600 font-semibold' : ''}>{session.time}</span>
                  </div>
                </div>
              </div>
              {session.isCurrent ? (
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-200">
                  {t('settings.security.currentSession')}
                </span>
              ) : (
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100">
                  <XCircle size={14} />
                  {t('settings.security.revoke')}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
