import {
  Shuffle,
  BookOpen,
  Archive,
  TrendingUp,
  Target,
  Dices,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'randomizer', translationKey: 'randomizer', icon: Shuffle },
  { id: 'campaign', translationKey: 'campaign', icon: BookOpen },
  { id: 'campaignrandomizer', translationKey: 'campaignRandomizer', icon: Dices },
  { id: 'collection', translationKey: 'collection', icon: Archive },
  { id: 'progression', translationKey: 'progression', icon: Target },
  { id: 'history', translationKey: 'history', icon: TrendingUp },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const { t } = useTranslation('tabs');

  return (
    <div className="flex gap-2 mb-6 flex-wrap justify-center">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              isActive
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            <Icon size={20} />
            {t(tab.translationKey)}
          </button>
        );
      })}
    </div>
  );
}
