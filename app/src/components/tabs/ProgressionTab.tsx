import type { ProgressionPhase } from '../../types';

interface ProgressionTabProps {
  progressionGuide: ProgressionPhase[];
}

export default function ProgressionTab({ progressionGuide }: ProgressionTabProps) {
  return (
    <div className="bg-black bg-opacity-40 rounded-lg p-6">
      <h2 className="text-3xl font-bold text-yellow-300 mb-4">Guía de Progresión Completa</h2>
      <p className="text-gray-300 mb-6">
        Orden optimizado para dificultad Expert/Heroic con estrategia de construcción de card pool.
      </p>

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
                        ? '📦 Campaña'
                        : item.type === 'scenario'
                          ? '🎯 Scenario'
                          : '🦸 Heroes'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-red-900 bg-opacity-40 border-l-4 border-red-500 rounded p-5">
          <div className="font-bold text-red-300 text-xl mb-3">⚠️ Notas Críticas</div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              •{' '}
              <span className="text-yellow-300">Construir card pool entre campañas es CRÍTICO</span> para éxito en
              Expert
            </li>
            <li>
              • <span className="text-red-400">Galaxy's Most Wanted es ÚLTIMO</span> - extremadamente punitivo (Ronan 26%
              win rate)
            </li>
            <li>
              • <span className="text-green-400">Rise of Red Skull es la expansión universal #1</span> después de
              Core
            </li>
            <li>• Expert difficulty escala con el tamaño del card pool - más opciones = más manejable</li>
            <li>
              • <span className="text-purple-400">Wrecking Crew SOLO para completionistas</span> - comunidad dice "no
              lo necesitas"
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
