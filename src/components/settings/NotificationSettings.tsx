import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { SettingsToggle } from './SettingsToggle';

export function NotificationSettings() {
  const { t } = useI18n();
  const [research, setResearch] = useState(true);
  const [docs, setDocs] = useState(true);
  const [system, setSystem] = useState(false);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-law-text-primary mb-2">{t('settings.notifications.title')}</h2>
        <p className="text-sm text-law-text-secondary">{t('settings.notifications.desc')}</p>
      </div>
      <div className="bg-slate-50 border border-law-border rounded-xl px-5">
        <SettingsToggle title={t('settings.notifications.research')} description={t('settings.notifications.researchDesc')} checked={research} onChange={setResearch} />
        <SettingsToggle title={t('settings.notifications.docs')} description={t('settings.notifications.docsDesc')} checked={docs} onChange={setDocs} />
        <SettingsToggle title={t('settings.notifications.system')} description={t('settings.notifications.systemDesc')} checked={system} onChange={setSystem} />
      </div>
    </div>
  );
}
