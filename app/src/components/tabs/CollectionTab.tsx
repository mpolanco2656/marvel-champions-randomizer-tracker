import { Check, PackageCheck, X } from 'lucide-react';
import { useState, type CSSProperties, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import type { Campaign, Collection, Hero, HeroPack, ModularSet, ScenarioPack, Villain } from '../../types';
import { campaignImagePath, heroPackImagePath, scenarioPackImagePath } from '../../utils/assetPaths';
import { ASPECT_COLORS, AspectBadge, SectionHeading } from '../ui/MarvelUI';

type CollectionSection = 'campaigns' | 'scenarios' | 'heroPacks';

interface CollectionTabProps {
  collection: Collection;
  setCollection: Dispatch<SetStateAction<Collection>>;
  campaigns: Campaign[];
  scenarioPacks: ScenarioPack[];
  heroPacks: HeroPack[];
  heroes: Hero[];
  villains: Villain[];
  modularSets: ModularSet[];
  getOwnedSources: () => string[];
}

const sections: CollectionSection[] = ['campaigns', 'scenarios', 'heroPacks'];

function pct(owned: number, total: number) {
  return total > 0 ? Math.round((owned / total) * 100) : 0;
}

function styleVars(vars: Record<string, string>) {
  return vars as CSSProperties;
}

export default function CollectionTab({
  collection,
  setCollection,
  campaigns,
  scenarioPacks,
  heroPacks,
  heroes,
  villains,
  modularSets,
  getOwnedSources,
}: CollectionTabProps) {
  const { t } = useTranslation('collection');
  const [section, setSection] = useState<CollectionSection>('campaigns');

  const heroPackKeys = collection.heroPacks || [];
  const ownedSources = getOwnedSources();
  const availableHeroes = heroes.filter(hero => ownedSources.includes(hero.source)).length;
  const availableVillains = villains.filter(villain => ownedSources.includes(villain.source)).length;
  const availableModulars = modularSets.filter(modular => ownedSources.includes(modular.source)).length;
  const totalCompletion = Math.round(
    (pct(collection.campaigns.length, campaigns.length) +
      pct(collection.scenarioPacks.length, scenarioPacks.length) +
      pct(heroPackKeys.length, heroPacks.length)) /
      3,
  );

  const tabLabels: Record<CollectionSection, string> = {
    campaigns: t('campaigns.title'),
    scenarios: t('scenarioPacks.title'),
    heroPacks: t('heroPacks.title'),
  };

  function toggleCampaign(key: string) {
    if (key === 'core') return;
    setCollection(prev => ({
      ...prev,
      campaigns: prev.campaigns.includes(key) ? prev.campaigns.filter(campaign => campaign !== key) : [...prev.campaigns, key],
    }));
  }

  function toggleScenario(key: string) {
    setCollection(prev => ({
      ...prev,
      scenarioPacks: prev.scenarioPacks.includes(key)
        ? prev.scenarioPacks.filter(pack => pack !== key)
        : [...prev.scenarioPacks, key],
    }));
  }

  function toggleHeroPack(key: string) {
    setCollection(prev => {
      const current = prev.heroPacks || [];
      return {
        ...prev,
        heroPacks: current.includes(key) ? current.filter(pack => pack !== key) : [...current, key],
      };
    });
  }

  function selectAll() {
    setCollection({
      campaigns: campaigns.map(campaign => campaign.key),
      scenarioPacks: scenarioPacks.map(pack => pack.key),
      heroPacks: heroPacks.map(pack => pack.key),
    });
  }

  function resetToCore() {
    setCollection({ campaigns: ['core'], scenarioPacks: [], heroPacks: [] });
  }

  return (
    <div className="mc-stack">
      <div className="mc-collection-stats">
        {[
          { label: t('summary.availableHeroes'), value: availableHeroes, total: heroes.length, color: '#5dade2' },
          { label: t('summary.availableVillains'), value: availableVillains, total: villains.length, color: '#e74c3c' },
          { label: t('summary.modularSets'), value: availableModulars, total: modularSets.length, color: '#d4a20a' },
          { label: t('summary.collectionCompletion'), value: totalCompletion, total: 100, color: '#2ecc71', suffix: '%' },
        ].map(stat => (
          <div
            key={stat.label}
            className="mc-collection-stat"
            style={styleVars({ '--stat-color': stat.color, '--stat-width': `${pct(stat.value, stat.total)}%` })}
          >
            <strong>
              {stat.value}
              {stat.suffix || ''}
            </strong>
            <span>{stat.label}</span>
            <i>
              <b />
            </i>
            <em>
              {stat.value}
              {stat.suffix || ` / ${stat.total}`}
            </em>
          </div>
        ))}
      </div>

      <div className="mc-collection-tools">
        <button type="button" className="mc-secondary-button" data-tone="success" onClick={selectAll}>
          <PackageCheck size={15} />
          {t('buttons.all')}
        </button>
        <button type="button" className="mc-secondary-button" onClick={resetToCore}>
          {t('buttons.coreOnly')}
        </button>
      </div>

      <div className="mc-panel">
        <div className="mc-collection-panel-head">
          <SectionHeading>{tabLabels[section]}</SectionHeading>
          <div className="mc-subtabs">
            {sections.map(tab => (
              <button key={tab} type="button" data-active={section === tab ? '1' : '0'} onClick={() => setSection(tab)}>
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>

        {section === 'campaigns' ? (
          <div className="mc-collection-grid">
            {campaigns.map(campaign => {
              const owned = collection.campaigns.includes(campaign.key);
              const isCore = campaign.key === 'core';
              return (
                <button
                  key={campaign.key}
                  type="button"
                  className="mc-collection-card mc-collection-card--campaign"
                  data-owned={owned ? '1' : '0'}
                  data-locked={isCore ? '1' : '0'}
                  onClick={() => toggleCampaign(campaign.key)}
                >
                  <img src={campaignImagePath(campaign)} alt="" onError={event => { event.currentTarget.hidden = true; }} />
                  <span className="mc-collection-card-body">
                    <strong>{campaign.name}</strong>
                    <small>
                      {t('wave')} {campaign.wave === 0 ? t('core') : campaign.wave}
                      {' / '}
                      {campaign.villains.length} {t('summary.availableVillains')}
                    </small>
                  </span>
                  <span className="mc-owned-mark">{owned ? <Check size={14} /> : <X size={13} />}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {section === 'scenarios' ? (
          <div className="mc-collection-grid">
            {scenarioPacks.map(pack => {
              const owned = collection.scenarioPacks.includes(pack.key);
              return (
                <button
                  key={pack.key}
                  type="button"
                  className="mc-collection-card mc-collection-card--scenario"
                  data-owned={owned ? '1' : '0'}
                  onClick={() => toggleScenario(pack.key)}
                >
                  <img src={scenarioPackImagePath(pack)} alt="" onError={event => { event.currentTarget.hidden = true; }} />
                  <span className="mc-collection-card-body">
                    <strong>{pack.name}</strong>
                    <small>
                      {t('wave')} {pack.wave}
                    </small>
                  </span>
                  <span className="mc-owned-mark">{owned ? <Check size={14} /> : <X size={13} />}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {section === 'heroPacks' ? (
          <div className="mc-collection-grid mc-collection-grid--heroes">
            {heroPacks.map(pack => {
              const owned = heroPackKeys.includes(pack.key);
              const hero = heroes.find(candidate => candidate.key === pack.hero);
              const colors = hero ? ASPECT_COLORS[hero.aspect] : null;
              return (
                <button
                  key={pack.key}
                  type="button"
                  className="mc-collection-card mc-collection-card--hero"
                  data-owned={owned ? '1' : '0'}
                  onClick={() => toggleHeroPack(pack.key)}
                  style={
                    colors
                      ? styleVars({
                          '--aspect-bg': colors.bg,
                          '--aspect-border': colors.border,
                          '--aspect-text': colors.text,
                        })
                      : undefined
                  }
                >
                  <img src={heroPackImagePath(pack)} alt="" onError={event => { event.currentTarget.hidden = true; }} />
                  <span className="mc-collection-card-body">
                    <strong>{pack.name}</strong>
                    <small>
                      {t('wave')} {pack.wave}
                    </small>
                    {hero ? <AspectBadge aspect={hero.aspect} small /> : null}
                  </span>
                  <span className="mc-owned-mark">{owned ? <Check size={14} /> : <X size={13} />}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
