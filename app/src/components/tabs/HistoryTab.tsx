import { Check, Trash2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { GameHistory, Hero, Stats, Villain } from '../../types';
import { heroImagePath, villainImagePath } from '../../utils/assetPaths';
import { EmptyState, SectionHeading } from '../ui/MarvelUI';

interface HistoryTabProps {
  history: GameHistory[];
  stats: Stats;
  heroes: Hero[];
  villains: Villain[];
  clearHistory: () => void;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export default function HistoryTab({
  history,
  stats,
  heroes,
  villains,
  clearHistory,
}: HistoryTabProps) {
  const { t } = useTranslation('history');
  const wins = history.filter(game => game.result === 'win').length;
  const losses = history.filter(game => game.result === 'loss').length;
  const mostPlayedHero = heroes.find(hero => hero.name === stats.mostPlayed.hero);

  return (
    <div className="mc-stack">
      {history.length > 0 ? (
        <div className="mc-history-stats">
          {[
            { label: t('stats.totalGames'), value: stats.gamesPlayed, color: '#c0c8e8' },
            { label: t('results.win'), value: wins, color: '#2ecc71' },
            { label: t('results.loss'), value: losses, color: '#e74c3c' },
            {
              label: t('stats.winRate'),
              value: `${Number.isFinite(stats.winRate) ? stats.winRate.toFixed(1) : '0.0'}%`,
              color: stats.winRate >= 50 ? '#2ecc71' : '#e74c3c',
            },
            { label: t('stats.playedHeroes'), value: stats.uniqueHeroes, color: '#5dade2' },
            { label: t('stats.facedVillains'), value: stats.uniqueVillains, color: '#d4a20a' },
          ].map(stat => (
            <div key={stat.label} className="mc-history-stat">
              <strong style={{ color: stat.color }}>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      {stats.mostPlayed.count > 0 ? (
        <div className="mc-history-feature">
          {mostPlayedHero ? (
            <img src={heroImagePath(mostPlayedHero)} alt="" onError={event => { event.currentTarget.hidden = true; }} />
          ) : null}
          <div>
            <span>{t('stats.mostPlayedHero')}</span>
            <strong>
              {stats.mostPlayed.hero} ({stats.mostPlayed.count} {t('stats.games')})
            </strong>
          </div>
        </div>
      ) : null}

      {history.length > 0 ? (
        <div className="mc-history-actions">
          <button type="button" className="mc-secondary-button" data-tone="danger" onClick={clearHistory}>
            <Trash2 size={15} />
            {t('buttons.clearHistory')}
          </button>
        </div>
      ) : null}

      <div className="mc-panel">
        <SectionHeading>{t('recentGames')}</SectionHeading>

        {history.length > 0 ? (
          <div className="mc-history-list">
            {history.map(game => {
              const gameHeroes = heroes.filter(hero => game.heroes.includes(hero.key));
              const gameVillain = villains.find(villain => villain.key === game.villain);

              return (
                <article key={game.id} className="mc-history-card" data-result={game.result || 'none'}>
                  <div className="mc-history-media">
                    {gameHeroes.slice(0, 2).map(hero => (
                      <img key={hero.key} src={heroImagePath(hero)} alt="" onError={event => { event.currentTarget.hidden = true; }} />
                    ))}
                    {gameVillain ? (
                      <img src={villainImagePath(gameVillain)} alt="" onError={event => { event.currentTarget.hidden = true; }} />
                    ) : null}
                  </div>

                  <div className="mc-history-body">
                    <div className="mc-history-card-head">
                      <div>
                        <strong>{gameHeroes.map(hero => hero.name).join(', ') || '-'}</strong>
                        <span>vs {gameVillain?.name || game.villain}</span>
                      </div>
                      <time>{formatDate(game.date)}</time>
                    </div>

                    <div className="mc-history-tags">
                      {gameHeroes.map(hero => (
                        <span key={hero.key} data-tone="hero">{hero.name}</span>
                      ))}
                      <span data-tone="villain">vs {gameVillain?.name || game.villain}</span>
                      {game.modulars.length > 0 ? (
                        <span data-tone="modular">
                          {t('modularSets')}: {game.modulars.length}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <span className="mc-result-badge" data-result={game.result || 'none'}>
                    {game.result === 'win' ? <Check size={13} /> : game.result === 'loss' ? <X size={13} /> : null}
                    {game.result === 'win' ? t('results.win') : game.result === 'loss' ? t('results.loss') : t('noResult')}
                  </span>
                </article>
              );
            })}
          </div>
        ) : (
          <EmptyState title={t('empty')} />
        )}
      </div>
    </div>
  );
}
