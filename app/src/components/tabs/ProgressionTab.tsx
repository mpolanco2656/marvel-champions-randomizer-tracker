import { AlertTriangle, Check, ChevronDown, ChevronUp, Circle, Sparkles } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import type { Campaign, Collection, ProgressionItem, ProgressionPhase, ScenarioPack } from '../../types';
import { campaignImagePath, scenarioPackImagePath } from '../../utils/assetPaths';
import { SectionHeading } from '../ui/MarvelUI';

interface ProgressionTabProps {
  progressionGuide: ProgressionPhase[];
  collection: Collection;
  campaigns: Campaign[];
  scenarioPacks: ScenarioPack[];
}

const phaseColors = ['#2ecc71', '#d4a20a', '#e67e22', '#c0392b'];

function itemTypeLabel(item: ProgressionItem) {
  if (item.type === 'campaign') return 'Campaign';
  if (item.type === 'scenario') return 'Scenario';
  return 'Heroes';
}

export default function ProgressionTab({ progressionGuide, collection, campaigns, scenarioPacks }: ProgressionTabProps) {
  const { t } = useTranslation('progression');
  const [openPhase, setOpenPhase] = useState(0);

  function isOwned(item: ProgressionItem) {
    if (item.type === 'campaign') return collection.campaigns.includes(item.key);
    if (item.type === 'scenario') return collection.scenarioPacks.includes(item.key);
    return false;
  }

  function itemImage(item: ProgressionItem) {
    if (item.type === 'campaign') {
      const campaign = campaigns.find(candidate => candidate.key === item.key);
      return campaign ? campaignImagePath(campaign) : null;
    }
    if (item.type === 'scenario') {
      const pack = scenarioPacks.find(candidate => candidate.key === item.key);
      return pack ? scenarioPackImagePath(pack) : null;
    }
    return null;
  }

  return (
    <div className="mc-stack">
      <div className="mc-guide-hero">
        <div>
          <SectionHeading>{t('title')}</SectionHeading>
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
        </div>
        <div className="mc-guide-meter">
          <strong>{progressionGuide.length}</strong>
          <span>Phases</span>
        </div>
      </div>

      <div className="mc-guide-list">
        {progressionGuide.map((phase, phaseIndex) => {
          const phaseColor = phaseColors[phaseIndex] || '#d4a20a';
          const isOpen = openPhase === phaseIndex;
          const ownedItems = phase.items.filter(item => item.type !== 'heroes' && isOwned(item)).length;
          const ownableItems = phase.items.filter(item => item.type !== 'heroes').length;
          const complete = ownableItems > 0 && ownedItems === ownableItems;

          return (
            <section
              key={phase.name}
              className="mc-guide-phase"
              data-open={isOpen ? '1' : '0'}
              style={{ '--phase-color': phaseColor } as CSSProperties}
            >
              <button type="button" className="mc-guide-phase-head" onClick={() => setOpenPhase(isOpen ? -1 : phaseIndex)}>
                <span>
                  <strong>{phase.name}</strong>
                  <small>{phase.description}</small>
                </span>
                <em>
                  {complete ? (
                    <>
                      <Check size={13} /> Owned
                    </>
                  ) : (
                    `${ownedItems}/${ownableItems}`
                  )}
                </em>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isOpen ? (
                <div className="mc-guide-items">
                  {phase.items.map((item, itemIndex) => {
                    const owned = isOwned(item);
                    const image = itemImage(item);
                    const isHeroItem = item.type === 'heroes';

                    return (
                      <article key={`${item.key}-${itemIndex}`} className="mc-guide-item" data-owned={owned ? '1' : '0'}>
                        <span className="mc-guide-status">
                          {owned ? <Check size={13} /> : isHeroItem ? <Sparkles size={13} /> : <Circle size={12} />}
                        </span>
                        {image ? (
                          <img src={image} alt="" onError={event => { event.currentTarget.hidden = true; }} />
                        ) : (
                          <span className="mc-guide-image-placeholder">
                            <Sparkles size={15} />
                          </span>
                        )}
                        <div>
                          <span className="mc-guide-type" data-type={item.type}>
                            {itemTypeLabel(item)}
                          </span>
                          <strong>{item.name}</strong>
                          <p>{item.mode}</p>
                          <small>{item.note}</small>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <aside className="mc-guide-notes">
        <div>
          <AlertTriangle size={18} />
          <strong>{t('criticalNotes.title')}</strong>
        </div>
        <ul>
          <li>{t('criticalNotes.note1')}</li>
          <li>{t('criticalNotes.note2')}</li>
          <li>{t('criticalNotes.note3')}</li>
          <li>{t('criticalNotes.note4')}</li>
          <li>{t('criticalNotes.note5')}</li>
        </ul>
      </aside>
    </div>
  );
}
