import type { Campaign, CampaignScenario, Collection, ModularSet, Villain } from '../../types';
import { BookOpen, Check, Dices, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CampaignRandomizerTab from './CampaignRandomizerTab';
import { campaignImagePath, villainImagePath } from '../../utils/assetPaths';

interface CampaignTabProps {
  campaigns: Campaign[];
  villains: Villain[];
  collection: Collection;
  modularSets: ModularSet[];
  trackerActiveCampaign: string | null;
  completedScenarios: Record<string, number>;
  setTrackerActiveCampaign: (campaignKey: string | null) => void;
  toggleScenario: (campaignKey: string, scenarioIndex: number) => void;
  getCompletedCount: (campaignKey: string, totalScenarios: number) => number;
  clearCampaign: (campaignKey: string) => void;
  randomizerActiveCampaign: string | null;
  randomMode: 'campaign' | 'mixed';
  campaignScenarios: CampaignScenario[];
  mixedScenarios: CampaignScenario[];
  setRandomizerActiveCampaign: (campaignKey: string | null) => void;
  setCampaignScenarios: (scenarios: CampaignScenario[]) => void;
  markCampaignScenarioComplete: (index: number) => void;
  setRandomMode: (mode: 'campaign' | 'mixed') => void;
  setMixedScenarios: (scenarios: CampaignScenario[]) => void;
  markMixedScenarioComplete: (index: number) => void;
  clearCampaignScenarios: () => void;
  clearMixedScenarios: () => void;
}

type CampaignSubTab = 'tracker' | 'randomizer';

export default function CampaignTab({
  campaigns,
  villains,
  collection,
  modularSets,
  trackerActiveCampaign,
  completedScenarios,
  setTrackerActiveCampaign,
  toggleScenario,
  getCompletedCount,
  clearCampaign,
  randomizerActiveCampaign,
  randomMode,
  campaignScenarios,
  mixedScenarios,
  setRandomizerActiveCampaign,
  setCampaignScenarios,
  markCampaignScenarioComplete,
  setRandomMode,
  setMixedScenarios,
  markMixedScenarioComplete,
  clearCampaignScenarios,
  clearMixedScenarios,
}: CampaignTabProps) {
  const { t } = useTranslation('campaign');
  const [activeSubTab, setActiveSubTab] = useState<CampaignSubTab>('tracker');
  const filteredCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));
  const activeCampaignData = campaigns.find(c => c.key === trackerActiveCampaign);

  return (
    <div className="mc-stack">
      <div className="mc-campaign-hero">
        <div>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>
        <div className="mc-subtabs" role="tablist" aria-label="Campaign tools">
          <button
            type="button"
            role="tab"
            data-active={activeSubTab === 'tracker' ? '1' : '0'}
            onClick={() => setActiveSubTab('tracker')}
          >
            <BookOpen size={16} />
            {t('trackerTab')}
          </button>
          <button
            type="button"
            role="tab"
            data-active={activeSubTab === 'randomizer' ? '1' : '0'}
            onClick={() => setActiveSubTab('randomizer')}
          >
            <Dices size={16} />
            {t('randomizerTab')}
          </button>
        </div>
      </div>

      {activeSubTab === 'tracker' ? (
        <>
          <div className="mc-panel">
            <div className="mc-campaign-grid">
              {filteredCampaigns.map(campaign => {
                const completed = getCompletedCount(campaign.key, campaign.villains.length);
                const isActive = trackerActiveCampaign === campaign.key;

                return (
                  <button
                    key={campaign.key}
                    type="button"
                    onClick={() => setTrackerActiveCampaign(campaign.key)}
                    className="mc-campaign-card"
                    data-active={isActive ? '1' : '0'}
                  >
                    <img src={campaignImagePath(campaign)} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />
                    <span>{campaign.name}</span>
                    <small>
                      {t('wave')} {campaign.wave === 0 ? t('core') : campaign.wave} / {campaign.villains.length} {t('scenarios')}
                    </small>
                    <div>
                      <strong>{t('progress')} {completed}/{campaign.villains.length}</strong>
                      <i>
                        <b style={{ width: `${(completed / campaign.villains.length) * 100}%` }} />
                      </i>
                    </div>
                    {completed === campaign.villains.length ? <em>{t('completed')}</em> : null}
                  </button>
                );
              })}
            </div>

            {filteredCampaigns.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                {t('noCampaigns')}
              </div>
            ) : null}
          </div>

          {trackerActiveCampaign && activeCampaignData ? (
            <div className="mc-panel">
              <div className="mc-campaign-checklist-head">
                <div>
                  <h3>{activeCampaignData.name} - {t('checklist')}</h3>
                  <p>{t('checklistDescription')}</p>
                </div>
              </div>

              <div className="mc-campaign-checklist">
                {activeCampaignData.villains.map((villainKey, idx) => {
                  const isCompleted = Boolean(completedScenarios[`${trackerActiveCampaign}_${idx}`]);

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleScenario(trackerActiveCampaign, idx)}
                      className="mc-campaign-scenario"
                      data-completed={isCompleted ? '1' : '0'}
                    >
                      <span>
                        {isCompleted ? <Check size={15} /> : null}
                      </span>
                      <img src={villainImagePath(villainKey)} alt="" onError={(event) => { event.currentTarget.hidden = true; }} />
                      <div>
                        <small>{t('scenario')} {idx + 1}</small>
                        <strong>{villainKey.replace(/_/g, ' ')}</strong>
                      </div>
                      {isCompleted ? <em>{t('completedBadge')}</em> : null}
                    </button>
                  );
                })}
              </div>

              {getCompletedCount(trackerActiveCampaign, activeCampaignData.villains.length) > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t('resetConfirm', { name: activeCampaignData.name }))) {
                      clearCampaign(trackerActiveCampaign);
                    }
                  }}
                  className="mc-danger-button"
                >
                  <RotateCcw size={18} />
                  {t('resetButton')}
                </button>
              ) : null}

              {getCompletedCount(trackerActiveCampaign, activeCampaignData.villains.length) === activeCampaignData.villains.length ? (
                <div className="mc-complete-message">{t('campaignCompleted')}</div>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <CampaignRandomizerTab
          campaigns={campaigns}
          villains={villains}
          collection={collection}
          modularSets={modularSets}
          activeCampaign={randomizerActiveCampaign}
          randomMode={randomMode}
          campaignScenarios={campaignScenarios}
          mixedScenarios={mixedScenarios}
          setActiveCampaign={setRandomizerActiveCampaign}
          setCampaignScenarios={setCampaignScenarios}
          markScenarioComplete={markCampaignScenarioComplete}
          setRandomMode={setRandomMode}
          setMixedScenarios={setMixedScenarios}
          markMixedScenarioComplete={markMixedScenarioComplete}
          clearCampaignScenarios={clearCampaignScenarios}
          clearMixedScenarios={clearMixedScenarios}
        />
      )}
    </div>
  );
}
