import { Download, Upload, Languages } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function Header({ onExport, onImport }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImport(file);
    }
    // Reset input
    event.target.value = '';
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 flex justify-start">
          <button
            onClick={toggleLanguage}
            className="bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded flex items-center gap-2 transition-all"
            title={t(i18n.language === 'es' ? 'tooltips.switchToEnglish' : 'tooltips.switchToSpanish')}
          >
            <Languages size={18} />
            {i18n.language === 'es' ? 'English' : 'Español'}
          </button>
        </div>
        <div className="text-center flex-1">
          <h1 className="text-5xl font-bold mb-2 text-yellow-300 uppercase">{t('app.title')}</h1>
          <p className="text-xl text-gray-300">{t('app.subtitle')}</p>
        </div>
        <div className="flex-1 flex justify-end gap-3">
          <button
            onClick={onExport}
            className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded flex items-center gap-2 transition-all"
            title={t('tooltips.exportData')}
          >
            <Download size={18} />
            {t('buttons.exportAll')}
          </button>
          <button
            onClick={handleImportClick}
            className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded flex items-center gap-2 transition-all"
            title={t('tooltips.importData')}
          >
            <Upload size={18} />
            {t('buttons.importAll')}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
