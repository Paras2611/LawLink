import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { SettingsToggle } from './SettingsToggle';

export function PrivacySettings() {
  const { t } = useI18n();
  const [history, setHistory] = useState(true);
  const [saved, setSaved] = useState(true);
  const [retention, setRetention] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-law-text-primary mb-2">{t('settings.privacy.title')}</h2>
        <p className="text-sm text-law-text-secondary">{t('settings.privacy.desc')}</p>
      </div>
      <div className="bg-slate-50 border border-law-border rounded-xl px-5">
        <SettingsToggle title={t('settings.privacy.history')} description={t('settings.privacy.historyDesc')} checked={history} onChange={setHistory} />
        <SettingsToggle title={t('settings.privacy.saved')} description={t('settings.privacy.savedDesc')} checked={saved} onChange={setSaved} />
        <SettingsToggle title={t('settings.privacy.retention')} description={t('settings.privacy.retentionDesc')} checked={retention} onChange={setRetention} />
      </div>
    </div>
  );
}
