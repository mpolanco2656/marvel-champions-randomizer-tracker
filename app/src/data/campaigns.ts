import type { Campaign } from '../types';

export const campaigns: Campaign[] = [
  { name: "Core Set", key: "core", type: "core", villains: ["rhino", "klaw", "ultron"], wave: 0 },
  { name: "Rise of Red Skull", key: "riseofredskull", type: "campaign", villains: ["crossbones", "absorbingman", "taskmaster", "zola", "redskull"], wave: 1 },
  { name: "Galaxy's Most Wanted", key: "galaxysmostwanted", type: "campaign", villains: ["collector1", "nebula_gmw", "ronan", "collector2"], wave: 2 },
  { name: "Mad Titan's Shadow", key: "madtitansshadow", type: "campaign", villains: ["thanos", "hela", "loki", "tower"], wave: 3 },
  { name: "Sinister Motives", key: "sinistermotives", type: "campaign", villains: ["sandman", "venomgoblin", "mysterio", "sinistersix"], wave: 5 },
  { name: "Mutant Genesis", key: "mutantgenesis", type: "campaign", villains: ["magneto_villain", "sabretooth", "sinister", "stryfe"], wave: 6 },
  { name: "NeXt Evolution", key: "nextevolution", type: "campaign", villains: ["mojo", "juggernaut", "sentinelmk", "onslaught"], wave: 7 },
  { name: "Age of Apocalypse", key: "ageofapocalypse", type: "campaign", villains: ["apocalypse1", "apocalypse2", "apocalypse3", "apocalypse4"], wave: 8 },
  { name: "Agents of S.H.I.E.L.D.", key: "agentsofshield", type: "campaign", villains: ["shield1", "shield2", "shield3", "shield4"], wave: 9 },
  { name: "Civil War", key: "civilwar", type: "campaign", villains: ["civilwar1", "civilwar2", "civilwar3", "civilwar4"], wave: 9 }
];
