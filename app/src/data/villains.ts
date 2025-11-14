import type { Villain } from '../types';

export const villains: Villain[] = [
  // Core Set
  { name: "Rhino", source: "Core Set", difficulty: 2, mechanics: "Attachment-focused", description: "Villano principiante", key: "rhino" },
  { name: "Klaw", source: "Core Set", difficulty: 4, mechanics: "Minion Swarm", description: "Defensa + minions", key: "klaw" },
  { name: "Ultron", source: "Core Set", difficulty: 6, mechanics: "Minion Swarm + Retaliate", description: "Benchmark de spam de drones", key: "ultron" },

  // Rise of Red Skull
  { name: "Crossbones", source: "Rise of Red Skull", difficulty: 3, mechanics: "Direct Damage", description: "Buen puente de dificultad", key: "crossbones", campaignOrder: 1 },
  { name: "Absorbing Man", source: "Rise of Red Skull", difficulty: 4, mechanics: "Attachment", description: "Copia traits", key: "absorbingman", campaignOrder: 2 },
  { name: "Taskmaster", source: "Rise of Red Skull", difficulty: 5, mechanics: "Side Schemes", description: "Mímica de initiative", key: "taskmaster", campaignOrder: 3 },
  { name: "Zola", source: "Rise of Red Skull", difficulty: 6, mechanics: "Minion Swarm", description: "Modificaciones genéticas", key: "zola", campaignOrder: 4 },
  { name: "Red Skull", source: "Rise of Red Skull", difficulty: 7, mechanics: "Side Schemes", description: "Boss campaña #7 favorito", key: "redskull", campaignOrder: 5 },

  // Galaxy's Most Wanted
  { name: "Collector I", source: "Galaxy's Most Wanted", difficulty: 5, mechanics: "Attachment", description: "Mecánicas de colección", key: "collector1", campaignOrder: 1 },
  { name: "Nebula (GMW)", source: "Galaxy's Most Wanted", difficulty: 7, mechanics: "Acceleration", description: "⚠️ Surge extremo - bottom 5", key: "nebula_gmw", campaignOrder: 2 },
  { name: "Ronan", source: "Galaxy's Most Wanted", difficulty: 10, mechanics: "Direct Damage", description: "⚠️ MÁS DIFÍCIL - 26% win rate", key: "ronan", campaignOrder: 3 },
  { name: "Collector Infinity", source: "Galaxy's Most Wanted", difficulty: 6, mechanics: "Side Schemes", description: "Colección de gemas", key: "collector2", campaignOrder: 4 },

  // Mad Titan's Shadow
  { name: "Thanos", source: "Mad Titan's Shadow", difficulty: 9, mechanics: "Acceleration + Direct Damage", description: "Gemas del Infinito - #8 favorito", key: "thanos", campaignOrder: 1 },
  { name: "Hela", source: "Mad Titan's Shadow", difficulty: 6, mechanics: "Unique Questing", description: "#2 FAVORITO escenario", key: "hela", campaignOrder: 2 },
  { name: "Loki", source: "Mad Titan's Shadow", difficulty: 8, mechanics: "Multi-Stage", description: "Múltiples versiones + attrition", key: "loki", campaignOrder: 3 },
  { name: "Tower Defense", source: "Mad Titan's Shadow", difficulty: 5, mechanics: "Defense-focused", description: "Mecánicas únicas de torre", key: "tower", campaignOrder: 4 },

  // Sinister Motives
  { name: "Sandman", source: "Sinister Motives", difficulty: 5, mechanics: "Transformation", description: "Cambio de forma", key: "sandman", campaignOrder: 1 },
  { name: "Venom Goblin", source: "Sinister Motives", difficulty: 9, mechanics: "Activation-based", description: "⚠️ 2DO MÁS DIFÍCIL con Goblin Gear", key: "venomgoblin", campaignOrder: 2 },
  { name: "Mysterio", source: "Sinister Motives", difficulty: 6, mechanics: "Illusion", description: "Misdirection", key: "mysterio", campaignOrder: 3 },
  { name: "Sinister Six", source: "Sinister Motives", difficulty: 7, mechanics: "Multi-villain", description: "Múltiples villanos", key: "sinistersix", campaignOrder: 4 },

  // Mutant Genesis
  { name: "Magneto", source: "Mutant Genesis", difficulty: 8, mechanics: "Counter Management", description: "Contadores magnéticos + Sentinels", key: "magneto_villain", campaignOrder: 1 },
  { name: "Sabretooth", source: "Mutant Genesis", difficulty: 5, mechanics: "Aggression", description: "Combate feral", key: "sabretooth", campaignOrder: 2 },
  { name: "Mister Sinister", source: "Mutant Genesis", difficulty: 6, mechanics: "Cloning", description: "Manipulación genética", key: "sinister", campaignOrder: 3 },
  { name: "Stryfe", source: "Mutant Genesis", difficulty: 7, mechanics: "Telepathy", description: "Asalto psíquico", key: "stryfe", campaignOrder: 4 },

  // NeXt Evolution
  { name: "Mojo", source: "NeXt Evolution", difficulty: 5, mechanics: "Reality TV", description: "Mecánicas de show", key: "mojo", campaignOrder: 1 },
  { name: "Juggernaut", source: "NeXt Evolution", difficulty: 6, mechanics: "Momentum", description: "Imparable en movimiento", key: "juggernaut", campaignOrder: 2 },
  { name: "Sentinel Mark IV", source: "NeXt Evolution", difficulty: 6, mechanics: "Minion Swarm", description: "Cazadores de mutantes", key: "sentinelmk", campaignOrder: 3 },
  { name: "Onslaught", source: "NeXt Evolution", difficulty: 7, mechanics: "Psychic", description: "Fusión psíquica", key: "onslaught", campaignOrder: 4 },

  // Age of Apocalypse
  { name: "Apocalypse I", source: "Age of Apocalypse", difficulty: 7, mechanics: "Horsemen", description: "Era de Apocalypse fase 1", key: "apocalypse1", campaignOrder: 1 },
  { name: "Apocalypse II", source: "Age of Apocalypse", difficulty: 8, mechanics: "Horsemen", description: "Era de Apocalypse fase 2", key: "apocalypse2", campaignOrder: 2 },
  { name: "Apocalypse III", source: "Age of Apocalypse", difficulty: 8, mechanics: "Horsemen", description: "Era de Apocalypse fase 3", key: "apocalypse3", campaignOrder: 3 },
  { name: "Apocalypse IV", source: "Age of Apocalypse", difficulty: 9, mechanics: "Horsemen", description: "Era de Apocalypse fase final", key: "apocalypse4", campaignOrder: 4 },

  // Agents of SHIELD
  { name: "HYDRA Infiltration", source: "Agents of S.H.I.E.L.D.", difficulty: 5, mechanics: "Infiltration", description: "SHIELD comprometido", key: "shield1", campaignOrder: 1 },
  { name: "Agent Ward", source: "Agents of S.H.I.E.L.D.", difficulty: 6, mechanics: "Betrayal", description: "Agente doble", key: "shield2", campaignOrder: 2 },
  { name: "Graviton", source: "Agents of S.H.I.E.L.D.", difficulty: 7, mechanics: "Gravity Control", description: "Control gravitacional", key: "shield3", campaignOrder: 3 },
  { name: "Hive", source: "Agents of S.H.I.E.L.D.", difficulty: 8, mechanics: "Infestation", description: "Entidad parasítica Inhuman", key: "shield4", campaignOrder: 4 },

  // Civil War
  { name: "Civil War Clash I", source: "Civil War", difficulty: 6, mechanics: "Hero vs Hero", description: "PvP fase 1", key: "civilwar1", campaignOrder: 1 },
  { name: "Civil War Clash II", source: "Civil War", difficulty: 7, mechanics: "Hero vs Hero", description: "PvP fase 2", key: "civilwar2", campaignOrder: 2 },
  { name: "Civil War Clash III", source: "Civil War", difficulty: 7, mechanics: "Hero vs Hero", description: "PvP fase 3", key: "civilwar3", campaignOrder: 3 },
  { name: "Civil War Final", source: "Civil War", difficulty: 8, mechanics: "Hero vs Hero", description: "PvP confrontación final", key: "civilwar4", campaignOrder: 4 },

  // Scenario Packs
  { name: "Green Goblin (Mutagen)", source: "Green Goblin", difficulty: 7, mechanics: "Transformation", description: "#3 FAVORITO - transformación", key: "greengoblin" },
  { name: "Wrecking Crew", source: "Wrecking Crew", difficulty: 4, mechanics: "Team Fight", description: "No recomendado - sin modulares", key: "wreckingcrew" },
  { name: "Kang (Variants)", source: "The Once and Future Kang", difficulty: 7, mechanics: "Multi-Stage + Time", description: "#1 FAVORITO - múltiples variantes", key: "kang" },
  { name: "The Hood", source: "The Hood", difficulty: 6, mechanics: "Crime Syndicate", description: "#6 favorito - alta varianza", key: "hood" },
  { name: "MojoMania", source: "MojoMania", difficulty: 6, mechanics: "Reality Show", description: "Escenario único de entretenimiento", key: "mojomania_villain" },
  { name: "Loki (Trickster)", source: "Trickster Takeover", difficulty: 7, mechanics: "Illusion + Trickery", description: "Maestro del engaño", key: "trickster_villain" },
  { name: "Ultron (Synthezoid)", source: "Synthezoid Smackdown", difficulty: 8, mechanics: "Advanced AI", description: "Ultron mejorado", key: "synthezoid_villain" }
];
