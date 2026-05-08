import { Download, Languages, Upload } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => void;
  stats: {
    heroes: number;
    villains: number;
    modulars: number;
    games: number;
  };
}

export default function Header({ onExport, onImport, stats }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) onImport(file);
    event.target.value = '';
  }

  function toggleLanguage() {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  }

  return (
    <header className="mc-header">
      <div className="mc-shell">
        <div className="mc-header-top">
          <div className="mc-brand">
            <h1><span>Marvel</span> Champions</h1>
            <p>{t('app.subtitle')}</p>
          </div>

          <div className="mc-header-actions">
            <div className="mc-stats-bar" aria-label="Collection stats">
              <div className="mc-stat"><strong style={{ color: '#5dade2' }}>{stats.heroes}</strong><span>{t('stats.heroes')}</span></div>
              <div className="mc-stat"><strong style={{ color: '#e74c3c' }}>{stats.villains}</strong><span>{t('stats.villains')}</span></div>
              <div className="mc-stat"><strong style={{ color: '#d4a20a' }}>{stats.modulars}</strong><span>{t('stats.modulars')}</span></div>
              <div className="mc-stat"><strong style={{ color: '#2ecc71' }}>{stats.games}</strong><span>{t('stats.games')}</span></div>
            </div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="mc-header-button"
              title={t(i18n.language === 'es' ? 'tooltips.switchToEnglish' : 'tooltips.switchToSpanish')}
            >
              <Languages size={17} />
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
            <button type="button" onClick={onExport} className="mc-header-button" title={t('tooltips.exportData')}>
              <Download size={17} />
              {t('buttons.exportAll')}
            </button>
            <button type="button" onClick={handleImportClick} className="mc-header-button" title={t('tooltips.importData')}>
              <Upload size={17} />
              {t('buttons.importAll')}
            </button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
