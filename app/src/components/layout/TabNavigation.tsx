import { Archive, BookOpen, Shuffle, Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'randomizer', translationKey: 'randomizer', icon: Shuffle },
  { id: 'campaign', translationKey: 'campaign', icon: BookOpen },
  { id: 'collection', translationKey: 'collection', icon: Archive },
  { id: 'progression', translationKey: 'progression', icon: Target },
  { id: 'history', translationKey: 'history', icon: TrendingUp },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const { t } = useTranslation('tabs');

  return (
    <nav className="mc-tabs" aria-label="Main navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            className="mc-tab-button"
            data-active={activeTab === tab.id ? '1' : '0'}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon size={17} />
            <span>{t(tab.translationKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
