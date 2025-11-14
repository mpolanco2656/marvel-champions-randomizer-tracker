import {
  Shuffle,
  BookOpen,
  Archive,
  TrendingUp,
  Target,
} from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'randomizer', label: 'Randomizer', icon: Shuffle },
  { id: 'campaign', label: 'Campaign', icon: BookOpen },
  { id: 'collection', label: 'Collection', icon: Archive },
  { id: 'progression', label: 'Progression', icon: Target },
  { id: 'history', label: 'History', icon: TrendingUp },
];

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
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
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
