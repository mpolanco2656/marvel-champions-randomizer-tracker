import { useTranslation } from 'react-i18next';
import type { ProgressionPhase } from '../../types';

interface ProgressionTabProps {
  progressionGuide: ProgressionPhase[];
}

export default function ProgressionTab({ progressionGuide }: ProgressionTabProps) {
  const { t } = useTranslation('progression');
  return (
    <div className="bg-black bg-opacity-40 rounded-lg p-6">
      <h2 className="text-3xl font-bold text-yellow-300 mb-4">{t('title')}</h2>
      <p className="text-gray-300 mb-6">{t('description')}</p>

      <div className="space-y-6">
        {progressionGuide.map((phase, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-purple-900 to-blue-900 bg-opacity-40 rounded-lg p-5 border-l-4 border-yellow-500"
          >
            <h3 className="text-2xl font-bold text-yellow-300 mb-2">{phase.name}</h3>
            <p className="text-gray-300 mb-4">{phase.description}</p>

            <div className="space-y-3">
              {phase.items.map((item, itemIdx) => (
                <div key={itemIdx} className="bg-black bg-opacity-40 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">{item.mode}</div>
                    </div>
                    <div className="bg-purple-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                      {item.type === 'campaign'
                        ? t('types.campaign')
                        : item.type === 'scenario'
                          ? t('types.scenario')
                          : t('types.heroes')}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-red-900 bg-opacity-40 border-l-4 border-red-500 rounded p-5">
          <div className="font-bold text-red-300 text-xl mb-3">{t('criticalNotes.title')}</div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• {t('criticalNotes.note1')}</li>
            <li>• {t('criticalNotes.note2')}</li>
            <li>• {t('criticalNotes.note3')}</li>
            <li>• {t('criticalNotes.note4')}</li>
            <li>• {t('criticalNotes.note5')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
