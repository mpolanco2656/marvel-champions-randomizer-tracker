import React, { useState, useEffect } from 'react';
import { Shuffle, BookOpen, Users, Target, Zap, Check, X, AlertTriangle, TrendingUp, Archive, Share2, Info } from 'lucide-react';

// ==================== TIPOS ====================
type Aspect = 'Leadership' | 'Justice' | 'Aggression' | 'Protection' | 'Pool';
type Tier = 'S+' | 'S' | 'A' | 'B' | 'C';
type Complexity = 'Beginner' | 'Intermediate' | 'Advanced';
type Playstyle = 'Control' | 'Aggro' | 'All-rounder' | 'Resource Engine' | 'Support' | 'Setup';
type PlayerOptimization = 'Solo' | 'Multiplayer' | 'Both';
type ContentType = 'campaign' | 'scenario' | 'core';

interface Hero {
  name: string;
  aspect: Aspect;
  tier: Tier;
  complexity: Complexity;
  playstyle: Playstyle[];
  optimization: PlayerOptimization;
  wave: number;
  source: string; // Campaign or scenario pack name
  description: string;
  key: string;
}

interface Villain {
  name: string;
  source: string;
  difficulty: number;
  mechanics: string;
  description: string;
  key: string;
  campaignOrder?: number;
}

interface ModularSet {
  name: string;
  difficulty: number;
  source: string;
  key: string;
}

interface Campaign {
  name: string;
  key: string;
  type: ContentType;
  villains: string[];
  wave: number;
}

interface ScenarioPack {
  name: string;
  key: string;
  villain: string;
  wave: number;
}

interface GameHistory {
  id: string;
  date: string;
  heroes: string[];
  villain: string;
  modulars: string[];
  result?: 'win' | 'loss';
}

interface Collection {
  campaigns: string[]; // Keys of owned campaigns
  scenarioPacks: string[]; // Keys of owned scenario packs
  heroes: string[]; // Keys of owned heroes (for granular tracking if desired)
}

interface ProgressionPhase {
  name: string;
  description: string;
  items: ProgressionItem[];
}

interface ProgressionItem {
  name: string;
  type: 'campaign' | 'scenario' | 'heroes';
  mode: string;
  note: string;
  key: string;
}

// ==================== DATOS COMPLETOS ====================

const campaigns: Campaign[] = [
  { name: "Core Set", key: "core", type: "core", villains: ["rhino", "klaw", "ultron"], wave: 0 },
  { name: "Rise of Red Skull", key: "riseofredskull", type: "campaign", villains: ["crossbones", "absorbingman", "taskmaster", "zola", "redskull"], wave: 1 },
  { name: "Galaxy's Most Wanted", key: "galaxysmostwanted", type: "campaign", villains: ["collector1", "nebula_gmw", "ronan", "collector2"], wave: 2 },
  { name: "Mad Titan's Shadow", key: "madtitansshadow", type: "campaign", villains: ["thanos", "hela", "loki", "tower"], wave: 3 },
  { name: "Sinister Motives", key: "sinistermotives", type: "campaign", villains: ["sandman", "venomgoblin", "mysterio", "sinistersix"], wave: 4 },
  { name: "Mutant Genesis", key: "mutantgenesis", type: "campaign", villains: ["magneto_villain", "sabretooth", "sinister", "stryfe"], wave: 5 },
  { name: "NeXt Evolution", key: "nextevolution", type: "campaign", villains: ["mojo", "juggernaut", "sentinelmk", "onslaught"], wave: 6 },
  { name: "Age of Apocalypse", key: "ageofapocalypse", type: "campaign", villains: ["apocalypse1", "apocalypse2", "apocalypse3", "apocalypse4"], wave: 7 },
  { name: "Agents of S.H.I.E.L.D.", key: "agentsofshield", type: "campaign", villains: ["shield1", "shield2", "shield3", "shield4"], wave: 8 },
  { name: "Civil War", key: "civilwar", type: "campaign", villains: ["civilwar1", "civilwar2", "civilwar3", "civilwar4"], wave: 9 }
];

const scenarioPacks: ScenarioPack[] = [
  { name: "Green Goblin", key: "greengoblin", villain: "greengoblin", wave: 1 },
  { name: "Wrecking Crew", key: "wreckingcrew", villain: "wreckingcrew", wave: 1 },
  { name: "The Once and Future Kang", key: "kang", villain: "kang", wave: 2 },
  { name: "The Hood", key: "hood", villain: "hood", wave: 3 },
  { name: "MojoMania", key: "mojomania", villain: "mojomania_villain", wave: 5 },
  { name: "Trickster Takeover", key: "trickster", villain: "trickster_villain", wave: 7 },
  { name: "Synthezoid Smackdown", key: "synthezoid", villain: "synthezoid_villain", wave: 9 }
];

const heroes: Hero[] = [
  // Core Set
  { name: "Captain America", aspect: "Leadership", tier: "A", complexity: "Beginner", playstyle: ["All-rounder"], optimization: "Both", wave: 0, source: "Core Set", description: "Sin debilidades, puede thwart 4-6 o atacar 4 turno 1", key: "cap" },
  { name: "Captain Marvel", aspect: "Justice", tier: "S", complexity: "Beginner", playstyle: ["Resource Engine", "All-rounder"], optimization: "Both", wave: 0, source: "Core Set", description: "Energy Absorption = 3 recursos, 12 salud", key: "marvel" },
  { name: "Spider-Man", aspect: "Justice", tier: "A", complexity: "Beginner", playstyle: ["Control"], optimization: "Both", wave: 0, source: "Core Set", description: "Alta defensa, control con stun/confuse", key: "spidey" },
  { name: "Iron Man", aspect: "Aggression", tier: "B", complexity: "Advanced", playstyle: ["Setup", "Resource Engine"], optimization: "Multiplayer", wave: 0, source: "Core Set", description: "De cero a héroe - necesita setup", key: "ironman" },
  { name: "She-Hulk", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 0, source: "Core Set", description: "Límite de 4 cartas en mano", key: "shehulk" },
  { name: "Black Panther", aspect: "Protection", tier: "B", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 0, source: "Core Set", description: "Retaliate y tecnología de Wakanda", key: "panther" },
  
  // Wave 1 - Rise of Red Skull
  { name: "Spider-Woman", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder", "Support"], optimization: "Multiplayer", wave: 1, source: "Rise of Red Skull", description: "Doble aspecto único", key: "spiderwoman" },
  { name: "Hawkeye", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 1, source: "Rise of Red Skull", description: "Requiere arco", key: "hawkeye" },
  { name: "Thor", aspect: "Aggression", tier: "B", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Multiplayer", wave: 1, source: "Hero Pack", description: "Necesita Asgard + minions", key: "thor" },
  { name: "Black Widow", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["Control", "Support"], optimization: "Multiplayer", wave: 1, source: "Hero Pack", description: "Control del mazo de encuentros", key: "widow" },
  { name: "Doctor Strange", aspect: "Protection", tier: "S+", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 1, source: "Hero Pack", description: "Mazo de invocación - imparable", key: "strange" },
  { name: "Hulk", aspect: "Aggression", tier: "C", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Solo", wave: 1, source: "Hero Pack", description: "4 cartas en mano", key: "hulk" },
  { name: "Ms. Marvel", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 1, source: "Hero Pack", description: "Mecánicas Embiggen", key: "msmarvel" },
  
  // Wave 2 - Galaxy's Most Wanted
  { name: "Groot", aspect: "Protection", tier: "C", complexity: "Beginner", playstyle: ["Support"], optimization: "Multiplayer", wave: 2, source: "Galaxy's Most Wanted", description: "Contadores de crecimiento", key: "groot" },
  { name: "Rocket Raccoon", aspect: "Aggression", tier: "B", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Galaxy's Most Wanted", description: "Mejoras de armas", key: "rocket" },
  { name: "Ant-Man", aspect: "Leadership", tier: "A", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Combos cambio de tamaño", key: "antman" },
  { name: "Wasp", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Inconsistente", key: "wasp" },
  { name: "Quicksilver", aspect: "Protection", tier: "A", complexity: "Beginner", playstyle: ["All-rounder"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Always Be Running", key: "quicksilver" },
  { name: "Scarlet Witch", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Wild Magic", key: "witch" },
  
  // Wave 3 - Mad Titan's Shadow
  { name: "Adam Warlock", aspect: "Aggression", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Mad Titan's Shadow", description: "4 aspectos + ver top deck", key: "warlock" },
  { name: "Spectrum", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Mad Titan's Shadow", description: "Tres formas - flexibilidad total", key: "spectrum" },
  { name: "Star-Lord", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Solo", wave: 3, source: "Hero Pack", description: "Versatilidad Element Gun", key: "starlord" },
  { name: "Gamora", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Solo", wave: 3, source: "Hero Pack", description: "Eventos attack/thwart", key: "gamora" },
  { name: "Drax", aspect: "Protection", tier: "C", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Contraataque falla vs grandes golpes", key: "drax" },
  { name: "Venom", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Aggro", "Resource Engine"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Alto daño + recursos wild", key: "venom" },
  { name: "Nebula", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Contadores de poder", key: "nebula" },
  { name: "War Machine", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Multiplayer", wave: 3, source: "Hero Pack", description: "Armas pesadas", key: "warmachine" },
  { name: "Valkyrie", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Enfocado en minions", key: "valkyrie" },
  { name: "Vision", aspect: "Protection", tier: "B", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Manipulación de densidad", key: "vision" },
  
  // Wave 4 - Sinister Motives
  { name: "Ghost-Spider", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Sinister Motives", description: "Multiverso web-slinging", key: "ghostspider" },
  { name: "Spider-Man (Miles)", aspect: "Protection", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Sinister Motives", description: "Venom blast + camuflaje", key: "miles" },
  { name: "Nova", aspect: "Aggression", tier: "A", complexity: "Beginner", playstyle: ["Resource Engine", "Aggro"], optimization: "Both", wave: 4, source: "Hero Pack", description: "Casco inmediato + recursos wild", key: "nova" },
  { name: "Ironheart", aspect: "Leadership", tier: "B", complexity: "Intermediate", playstyle: ["Setup"], optimization: "Multiplayer", wave: 4, source: "Hero Pack", description: "Mejoras tech", key: "ironheart" },
  { name: "Spider-Ham", aspect: "Justice", tier: "S+", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Hero Pack", description: "Toon Counters = versatilidad", key: "spiderham" },
  { name: "SP//dr", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Resource Engine"], optimization: "Both", wave: 4, source: "Hero Pack", description: "3 cartas mano pero buenos recursos", key: "spdr" },
  
  // Wave 5 - Mutant Genesis
  { name: "Colossus", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Mutant Genesis", description: "Tank forma metal", key: "colossus" },
  { name: "Shadowcat", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 5, source: "Mutant Genesis", description: "Phasing", key: "shadowcat" },
  { name: "Cyclops", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Multiplayer", wave: 5, source: "Hero Pack", description: "Coordinación táctica", key: "cyclops" },
  { name: "Phoenix", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Unleashed/Restrained", key: "phoenix" },
  { name: "Wolverine", aspect: "Aggression", tier: "A", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Both", wave: 5, source: "Hero Pack", description: "¿Puedes costear el costo de salud?", key: "wolverine" },
  { name: "Storm", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Manipulación del clima", key: "storm" },
  { name: "Gambit", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Solo", wave: 5, source: "Hero Pack", description: "Daño explosivo en burst", key: "gambit" },
  { name: "Rogue", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Absorción de poder", key: "rogue" },
  
  // Wave 6 - NeXt Evolution
  { name: "Cable", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 6, source: "NeXt Evolution", description: "Manipulación del tiempo", key: "cable" },
  { name: "Domino", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "NeXt Evolution", description: "Manipulación de suerte", key: "domino" },
  { name: "Psylocke", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "Hero Pack", description: "Combos high-skill", key: "psylocke" },
  { name: "Angel", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 6, source: "Hero Pack", description: "Soporte aéreo", key: "angel" },
  { name: "X-23", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "Hero Pack", description: "Curación agresiva", key: "x23" },
  { name: "Deadpool", aspect: "Pool", tier: "B", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Solo", wave: 6, source: "Hero Pack", description: "S+ solo, C multi", key: "deadpool" },
  
  // Wave 7 - Age of Apocalypse
  { name: "Bishop", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["Resource Engine"], optimization: "Both", wave: 7, source: "Age of Apocalypse", description: "Absorción de energía", key: "bishop" },
  { name: "Magik", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Age of Apocalypse", description: "Manipulación de Limbo", key: "magik" },
  { name: "Iceman", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Hero Pack", description: "Previene activaciones", key: "iceman" },
  { name: "Jubilee", aspect: "Justice", tier: "B", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 7, source: "Hero Pack", description: "Soporte con fuegos artificiales", key: "jubilee" },
  { name: "Nightcrawler", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Hero Pack", description: "Teletransportación", key: "nightcrawler" },
  { name: "Magneto", aspect: "Leadership", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Hero Pack", description: "Maestría magnética", key: "magneto" },
  
  // Wave 8 - Agents of SHIELD
  { name: "Maria Hill", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 8, source: "Agents of S.H.I.E.L.D.", description: "Comando táctico SHIELD", key: "mariahill" },
  { name: "Nick Fury", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 8, source: "Agents of S.H.I.E.L.D.", description: "Director de SHIELD", key: "nickfury" },
  { name: "Black Panther/Shuri", aspect: "Justice", tier: "B", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 8, source: "Hero Pack", description: "Héroe dual Wakanda", key: "panthershuri" },
  { name: "Silk", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 8, source: "Hero Pack", description: "Mecánicas de telaraña", key: "silk" },
  { name: "Falcon", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 8, source: "Hero Pack", description: "Tácticas aéreas", key: "falcon" },
  { name: "Winter Soldier", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 8, source: "Hero Pack", description: "Maestría en armas", key: "wintersoldier" },
  
  // Wave 9 - Civil War
  { name: "Hulkling", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Multiplayer", wave: 9, source: "Civil War", description: "Cambio de forma", key: "hulkling" },
  { name: "Tigra", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 9, source: "Civil War", description: "Combate feral", key: "tigra" }
];

const villains: Villain[] = [
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

const modularSets: ModularSet[] = [
  // Core Set
  { name: "Bomb Scare", difficulty: 1, source: "Core Set", key: "bombscare" },
  { name: "Masters of Evil", difficulty: 2, source: "Core Set", key: "mastersofevil" },
  { name: "Under Attack", difficulty: 3, source: "Core Set", key: "underattack" },
  { name: "Legions of Hydra", difficulty: 4, source: "Core Set", key: "hydra" },
  { name: "Doomsday Chair", difficulty: 5, source: "Core Set", key: "doomsdaychair" },
  
  // Rise of Red Skull
  { name: "Hydra Assault", difficulty: 3, source: "Rise of Red Skull", key: "hydraassault" },
  { name: "Hydra Patrol", difficulty: 4, source: "Rise of Red Skull", key: "hydrapatrol" },
  { name: "Weapon Master", difficulty: 3, source: "Rise of Red Skull", key: "weaponmaster" },
  { name: "Experimental Weapons", difficulty: 3, source: "Rise of Red Skull", key: "expweapons" },
  
  // Galaxy's Most Wanted
  { name: "Kree Fanatic", difficulty: 5, source: "Galaxy's Most Wanted", key: "kreefanatic" },
  { name: "Space Pirates", difficulty: 3, source: "Galaxy's Most Wanted", key: "spacepirates" },
  { name: "Galactic Artifacts", difficulty: 4, source: "Galaxy's Most Wanted", key: "artifacts" },
  { name: "Band of Badoon", difficulty: 4, source: "Galaxy's Most Wanted", key: "badoon" },
  
  // Mad Titan's Shadow
  { name: "Black Order", difficulty: 4, source: "Mad Titan's Shadow", key: "blackorder" },
  { name: "Children of Thanos", difficulty: 4, source: "Mad Titan's Shadow", key: "childrenofthanos" },
  { name: "Infinity Gauntlet", difficulty: 5, source: "Mad Titan's Shadow", key: "gauntlet" },
  { name: "Legions of Hel", difficulty: 4, source: "Mad Titan's Shadow", key: "hel" },
  
  // Sinister Motives
  { name: "A Mess of Things", difficulty: 4, source: "Sinister Motives", key: "messofthings" },
  { name: "Power Drain", difficulty: 3, source: "Sinister Motives", key: "powerdrain" },
  { name: "Running Interference", difficulty: 3, source: "Sinister Motives", key: "interference" },
  { name: "Goblin Gear", difficulty: 5, source: "Sinister Motives", key: "goblingear" },
  { name: "Sinister Assault", difficulty: 4, source: "Sinister Motives", key: "sinisterassault" },
  
  // Mutant Genesis
  { name: "Acolytes", difficulty: 4, source: "Mutant Genesis", key: "acolytes" },
  { name: "Brotherhood", difficulty: 4, source: "Mutant Genesis", key: "brotherhood" },
  { name: "Mutant Slayers", difficulty: 4, source: "Mutant Genesis", key: "slayers" },
  { name: "Sentinels", difficulty: 5, source: "Mutant Genesis", key: "sentinels" },
  
  // NeXt Evolution
  { name: "X-Force", difficulty: 4, source: "NeXt Evolution", key: "xforce" },
  { name: "Mojoverse", difficulty: 3, source: "NeXt Evolution", key: "mojoverse" },
  { name: "Mutant Hunters", difficulty: 4, source: "NeXt Evolution", key: "mutanthunters" },
  
  // Age of Apocalypse
  { name: "Horsemen", difficulty: 5, source: "Age of Apocalypse", key: "horsemen" },
  { name: "Apocalypse's Forces", difficulty: 4, source: "Age of Apocalypse", key: "apocalypseforces" },
  { name: "Mission Schemes", difficulty: 3, source: "Age of Apocalypse", key: "missionschemes" },
  
  // Agents of SHIELD
  { name: "HYDRA Infiltrators", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "hydrainfiltrators" },
  { name: "Secret Warriors", difficulty: 3, source: "Agents of S.H.I.E.L.D.", key: "secretwarriors" },
  { name: "Inhumans", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "inhumans" },
  
  // Civil War
  { name: "Registration Act", difficulty: 4, source: "Civil War", key: "registration" },
  { name: "Divided Heroes", difficulty: 5, source: "Civil War", key: "dividedheroes" },
  { name: "Hero Conflicts", difficulty: 4, source: "Civil War", key: "heroconflicts" },
  
  // Green Goblin Pack
  { name: "Osborn Tech", difficulty: 3, source: "Green Goblin", key: "osborntech" },
  { name: "Goblin Gimmicks", difficulty: 4, source: "Green Goblin", key: "gimmicks" },
  { name: "Streets of New York", difficulty: 2, source: "Green Goblin", key: "streets" },
  
  // Kang Pack
  { name: "Anachronauts", difficulty: 5, source: "The Once and Future Kang", key: "anachronauts" },
  { name: "Master of Time", difficulty: 5, source: "The Once and Future Kang", key: "mastertime" },
  { name: "Temporal", difficulty: 4, source: "The Once and Future Kang", key: "temporal" },
  
  // The Hood Pack
  { name: "Bystanders", difficulty: 2, source: "The Hood", key: "bystanders" },
  { name: "City in Chaos", difficulty: 3, source: "The Hood", key: "chaos" },
  { name: "Crime Syndicate", difficulty: 4, source: "The Hood", key: "syndicate" },
  { name: "Crossfire's Crew", difficulty: 4, source: "The Hood", key: "crossfire" },
  { name: "Wrecking Crew Modular", difficulty: 3, source: "The Hood", key: "wreckingmod" },
  { name: "Standard II", difficulty: 3, source: "The Hood", key: "standard2" },
  { name: "Expert II", difficulty: 4, source: "The Hood", key: "expert2" },
  
  // MojoMania
  { name: "Mojo's Arena", difficulty: 4, source: "MojoMania", key: "mojoarena" },
  { name: "Ratings Battle", difficulty: 3, source: "MojoMania", key: "ratings" },
  
  // Trickster Takeover
  { name: "Loki's Illusions", difficulty: 4, source: "Trickster Takeover", key: "lokiillusions" },
  { name: "Asgardian Schemes", difficulty: 4, source: "Trickster Takeover", key: "asgardianschemes" },
  
  // Synthezoid Smackdown
  { name: "Advanced Drones", difficulty: 5, source: "Synthezoid Smackdown", key: "advanceddrones" },
  { name: "AI Protocols", difficulty: 4, source: "Synthezoid Smackdown", key: "aiprotocols" }
];

// Progression guide completo
const progressionGuide: ProgressionPhase[] = [
  {
    name: "Fase 1: Fundamentos",
    description: "Aprender mecánicas básicas y construir card pool inicial",
    items: [
      { name: "Core Set", type: "campaign", mode: "Standard: Rhino → Klaw → Ultron", note: "Aprender el juego", key: "core" },
      { name: "Core Set", type: "campaign", mode: "Expert para práctica", note: "Dominar modo Expert", key: "core" },
      { name: "4 Hero Packs", type: "heroes", mode: "1 por aspecto", note: "Empezar a construir card pool", key: "heropacks1" },
      { name: "Rise of Red Skull", type: "campaign", mode: "Expert", note: "✨ Puente perfecto desde Core. Universal 1ra expansión", key: "riseofredskull" },
      { name: "Green Goblin", type: "scenario", mode: "Mutagen Formula", note: "⭐ #3 FAVORITO. 3 modulares excelentes Spider-Man", key: "greengoblin" }
    ]
  },
  {
    name: "Fase 2: Desafío Intermedio",
    description: "Expandir card pool y enfrentar mecánicas más complejas",
    items: [
      { name: "4-6 Hero Packs", type: "heroes", mode: "Diversificar aspectos", note: "Continuar construyendo card pool", key: "heropacks2" },
      { name: "Sinister Motives", type: "campaign", mode: "Expert", note: "⭐ Una de las MEJORES expansiones. Venom Goblin es brutal", key: "sinistermotives" },
      { name: "The Hood", type: "scenario", mode: "Variedad modular", note: "⭐ 9 modulares + Standard/Expert II. Hace todo más interesante", key: "hood" },
      { name: "The Once and Future Kang", type: "scenario", mode: "Si juegan multiplayer", note: "⭐⭐ #1 FAVORITO. Para solo: opcional (muy largo)", key: "kang" },
      { name: "NeXt Evolution", type: "campaign", mode: "Expert", note: "Caja X-Men más fácil. Juggernaut interesante", key: "nextevolution" }
    ]
  },
  {
    name: "Fase 3: Contenido Avanzado",
    description: "Card pool grande, enfrentar desafíos mayores",
    items: [
      { name: "4-6 Hero Packs", type: "heroes", mode: "Completar aspectos", note: "Card pool robusto para Expert", key: "heropacks3" },
      { name: "Mutant Genesis", type: "campaign", mode: "Expert", note: "⭐ MEJOR caja X-Men. Magneto es difícil", key: "mutantgenesis" },
      { name: "MojoMania", type: "scenario", mode: "Escenario único", note: "Mecánicas de reality show", key: "mojomania" },
      { name: "Age of Apocalypse", type: "campaign", mode: "Expert", note: "⭐ Escenarios excelentes. Bishop/Magik top-tier", key: "ageofapocalypse" },
      { name: "Agents of S.H.I.E.L.D.", type: "campaign", mode: "Expert", note: "Contenido reciente (Feb 2025)", key: "agentsofshield" }
    ]
  },
  {
    name: "Fase 4: Maestría Final",
    description: "Los desafíos más duros del juego",
    items: [
      { name: "Hero Packs Restantes", type: "heroes", mode: "Completar colección", note: "Card pool completo para máxima flexibilidad", key: "heropacks4" },
      { name: "Trickster Takeover", type: "scenario", mode: "Escenario Loki", note: "Mecánicas de engaño", key: "trickster" },
      { name: "Mad Titan's Shadow", type: "campaign", mode: "Expert", note: "⭐ Dificultad aumentada. Thanos y Hela = PEAK", key: "madtitansshadow" },
      { name: "Civil War", type: "campaign", mode: "Expert", note: "⚔️ PvP único (Octubre 2025)", key: "civilwar" },
      { name: "Synthezoid Smackdown", type: "scenario", mode: "Ultron mejorado", note: "Desafío AI avanzado (Dic 2025)", key: "synthezoid" },
      { name: "Galaxy's Most Wanted", type: "campaign", mode: "Expert - ¡ÚLTIMO!", note: "⚠️⚠️ PEOR contenido. Ronan 26% win. Guardar para el final", key: "galaxysmostwanted" },
      { name: "Wrecking Crew", type: "scenario", mode: "Solo completionistas", note: "❌ No recomendado - siempre juega igual sin modulares", key: "wreckingcrew" }
    ]
  }
];

// ==================== COMPONENTE PRINCIPAL ====================
export default function MarvelChampionsUltimate() {
  const [activeTab, setActiveTab] = useState<'progression' | 'randomizer' | 'campaign' | 'collection' | 'history'>('randomizer');
  
  // Collection tracking
  const [collection, setCollection] = useState<Collection>(() => {
    const saved = localStorage.getItem('mcCollection');
    return saved ? JSON.parse(saved) : { 
      campaigns: ['core'], // Core Set siempre incluido
      scenarioPacks: [],
      heroes: []
    };
  });
  
  // History tracking
  const [history, setHistory] = useState<GameHistory[]>(() => {
    const saved = localStorage.getItem('mcHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Campaign mode
  const [activeCampaign, setActiveCampaign] = useState<string | null>(null);
  const [campaignProgress, setCampaignProgress] = useState<number>(0);
  
  // Filtros Hero
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [complexity, setComplexity] = useState<Complexity | 'Any'>('Any');
  const [playstyle, setPlaystyle] = useState<Playstyle | 'Any'>('Any');
  const [tier, setTier] = useState<Tier | 'Any'>('Any');
  const [optimization, setOptimization] = useState<PlayerOptimization | 'Any'>('Any');
  const [onlyUnplayed, setOnlyUnplayed] = useState(false);
  const [showComplexityHelp, setShowComplexityHelp] = useState(false);
  const [showDifficultyHelp, setShowDifficultyHelp] = useState(false);
  
  // Filtros Villain
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Any'>('Any');
  const [modularCount, setModularCount] = useState<number>(2);
  const [thematicPairing, setThematicPairing] = useState(false);
  
  // Resultados
  const [randomHeroes, setRandomHeroes] = useState<Hero[]>([]);
  const [randomVillain, setRandomVillain] = useState<Villain | null>(null);
  const [randomModulars, setRandomModulars] = useState<ModularSet[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  // Save collection
  useEffect(() => {
    localStorage.setItem('mcCollection', JSON.stringify(collection));
  }, [collection]);
  
  // Save history
  useEffect(() => {
    localStorage.setItem('mcHistory', JSON.stringify(history));
  }, [history]);
  
  // Helper: Get owned content sources
  const getOwnedSources = (): string[] => {
    const sources = new Set<string>();
    
    // Add campaigns
    collection.campaigns.forEach(campaignKey => {
      const campaign = campaigns.find(c => c.key === campaignKey);
      if (campaign) sources.add(campaign.name);
    });
    
    // Add scenario packs
    collection.scenarioPacks.forEach(packKey => {
      const pack = scenarioPacks.find(p => p.key === packKey);
      if (pack) sources.add(pack.name);
    });
    
    return Array.from(sources);
  };
  
  // Funciones de filtrado
  const filterHeroes = () => {
    const ownedSources = getOwnedSources();
    
    return heroes.filter(hero => {
      // Collection filter - CRITICAL: Only show heroes from owned content
      if (!ownedSources.includes(hero.source)) return false;
      
      // Unplayed filter
      if (onlyUnplayed) {
        const played = history.some(game => game.heroes.includes(hero.key));
        if (played) return false;
      }
      
      if (complexity !== 'Any' && hero.complexity !== complexity) return false;
      if (playstyle !== 'Any' && !hero.playstyle.includes(playstyle)) return false;
      if (tier !== 'Any' && hero.tier !== tier) return false;
      if (optimization !== 'Any' && hero.optimization !== optimization && hero.optimization !== 'Both') return false;
      return true;
    });
  };
  
  const filterVillains = () => {
    const ownedSources = getOwnedSources();
    
    return villains.filter(villain => {
      // Collection filter - CRITICAL: Only show villains from owned content
      if (!ownedSources.includes(villain.source)) return false;
      
      if (difficulty === 'Any') return true;
      if (difficulty === 'Easy' && villain.difficulty <= 3) return true;
      if (difficulty === 'Medium' && villain.difficulty >= 4 && villain.difficulty <= 6) return true;
      if (difficulty === 'Hard' && villain.difficulty >= 7 && villain.difficulty <= 8) return true;
      if (difficulty === 'Expert' && villain.difficulty >= 9) return true;
      return false;
    });
  };
  
  const filterModulars = () => {
    const ownedSources = getOwnedSources();
    
    return modularSets.filter(modular => {
      // Collection filter - CRITICAL: Only show modulars from owned content
      return ownedSources.includes(modular.source);
    });
  };
  
  const generateWarningsAndSuggestions = (heroes: Hero[], villain: Villain | null) => {
    const newWarnings: string[] = [];
    const newSuggestions: string[] = [];
    
    // 2-handed warnings
    if (playerCount === 2 && heroes.length === 2) {
      const aspects = heroes.map(h => h.aspect);
      if (aspects.includes('Aggression') && aspects.includes('Protection') && !aspects.includes('Justice')) {
        newWarnings.push('⚠️ Aggression + Protection en 2-handed puede tener problemas con threat. Considera añadir Justice.');
      }
    }
    
    // Deadpool multiplayer warning
    if (playerCount > 1 && heroes.some(h => h.key === 'deadpool')) {
      newWarnings.push('⚠️ Deadpool es S+ solo pero C-tier multiplayer. ¡Unkillable es un problema para el equipo!');
    }
    
    // Setup heroes warning
    const setupHeroes = heroes.filter(h => h.playstyle.includes('Setup'));
    if (setupHeroes.length > 1) {
      newWarnings.push(`⚠️ Múltiples héroes setup (${setupHeroes.map(h => h.name).join(', ')}). El early game será lento.`);
    }
    
    // Villain-specific warnings
    if (villain) {
      if (villain.key === 'ronan') {
        newWarnings.push('🔴 RONAN: Villano más difícil (26% win). Overkill + Piercing contrarrestan todas las defensas. Muchos saltan este.');
      } else if (villain.key === 'venomgoblin') {
        newSuggestions.push('💡 Venom Goblin: Aspecto Justice altamente recomendado. Remover Advanced Glider ASAP.');
      } else if (villain.key === 'magneto_villain') {
        newSuggestions.push('💡 Magneto: No puedes hacer daño hasta remover Orbital Decay. Prepárate para pérdida de tempo.');
      } else if (villain.key === 'nebula_gmw') {
        newWarnings.push('⚠️ Nebula: Densidad de Surge extrema = muy random. Uno de los villanos menos populares.');
      }
      
      // Difficulty vs hero power
      if (villain.difficulty >= 8) {
        const avgTier = heroes.reduce((sum, h) => {
          const tierValues = { 'S+': 5, 'S': 4, 'A': 3, 'B': 2, 'C': 1 };
          return sum + tierValues[h.tier];
        }, 0) / heroes.length;
        
        if (avgTier < 3) {
          newSuggestions.push(`💡 Villano dificultad ${villain.difficulty}/10 con héroes tier promedio ${avgTier < 2 ? 'B-C' : 'B'}. Considera héroes más fuertes o bajar dificultad.`);
        }
      }
    }
    
    // Solo-optimized heroes in multiplayer
    if (playerCount > 2) {
      const soloOptimized = heroes.filter(h => h.optimization === 'Solo');
      if (soloOptimized.length > 0) {
        newSuggestions.push(`💡 ${soloOptimized.map(h => h.name).join(', ')} optimizado para solo. Puede rendir bajo en ${playerCount} jugadores.`);
      }
    }
    
    setWarnings(newWarnings);
    setSuggestions(newSuggestions);
  };
  
  const generateHeroes = () => {
    const filtered = filterHeroes();
    if (filtered.length === 0) {
      alert('No hay héroes que coincidan con estos filtros y tu colección');
      return;
    }
    
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(playerCount, shuffled.length));
    setRandomHeroes(selected);
    generateWarningsAndSuggestions(selected, randomVillain);
  };
  
  const generateVillainSetup = () => {
    const filteredVillains = filterVillains();
    if (filteredVillains.length === 0) {
      alert('No hay villanos que coincidan con estos filtros y tu colección');
      return;
    }
    
    const randomVillainIndex = Math.floor(Math.random() * filteredVillains.length);
    const selectedVillain = filteredVillains[randomVillainIndex];
    setRandomVillain(selectedVillain);
    
    // Smart modular selection
    const availableModulars = filterModulars();
    
    if (availableModulars.length === 0) {
      alert('No hay sets modulares disponibles en tu colección');
      setRandomModulars([]);
      return;
    }
    
    // Thematic pairing
    if (thematicPairing && selectedVillain) {
      if (selectedVillain.key === 'venomgoblin') {
        // Force Goblin Gear for Venom Goblin
        const goblinGear = availableModulars.find(m => m.key === 'goblingear');
        if (goblinGear) {
          const remaining = availableModulars.filter(m => m.key !== 'goblingear').sort(() => Math.random() - 0.5);
          setRandomModulars([goblinGear, ...remaining.slice(0, Math.min(modularCount - 1, remaining.length))]);
          generateWarningsAndSuggestions(randomHeroes, selectedVillain);
          return;
        }
      }
      
      // Spider-Man villains get spider modulars
      if (['greengoblin', 'venomgoblin', 'mysterio'].includes(selectedVillain.key)) {
        const spiderModulars = availableModulars.filter(m => 
          ['messofthings', 'powerdrain', 'interference', 'osborntech', 'gimmicks', 'streets'].includes(m.key)
        );
        const prioritized = [...spiderModulars, ...availableModulars.filter(m => !spiderModulars.includes(m))];
        const shuffled = prioritized.sort(() => Math.random() - 0.5);
        setRandomModulars(shuffled.slice(0, Math.min(modularCount, shuffled.length)));
        generateWarningsAndSuggestions(randomHeroes, selectedVillain);
        return;
      }
    }
    
    const shuffled = availableModulars.sort(() => Math.random() - 0.5);
    setRandomModulars(shuffled.slice(0, Math.min(modularCount, shuffled.length)));
    generateWarningsAndSuggestions(randomHeroes, selectedVillain);
  };
  
  const generateComplete = () => {
    generateHeroes();
    setTimeout(() => generateVillainSetup(), 100);
  };
  
  const saveToHistory = (result?: 'win' | 'loss') => {
    if (randomHeroes.length === 0 || !randomVillain) return;
    
    const game: GameHistory = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      heroes: randomHeroes.map(h => h.key),
      villain: randomVillain.key,
      modulars: randomModulars.map(m => m.key),
      result
    };
    
    setHistory([game, ...history]);
    alert('¡Juego guardado en historial!');
  };
  
  const nextCampaignScenario = () => {
    if (!activeCampaign) return;
    
    const campaign = campaigns.find(c => c.key === activeCampaign);
    if (!campaign) return;
    
    if (campaignProgress >= campaign.villains.length) {
      alert('¡Campaña completada!');
      return;
    }
    
    const villainKey = campaign.villains[campaignProgress];
    const villain = villains.find(v => v.key === villainKey);
    if (villain) {
      setRandomVillain(villain);
      
      // Random modulars from owned content
      const availableModulars = filterModulars();
      const shuffled = availableModulars.sort(() => Math.random() - 0.5);
      setRandomModulars(shuffled.slice(0, Math.min(modularCount, shuffled.length)));
      
      setCampaignProgress(campaignProgress + 1);
      generateWarningsAndSuggestions(randomHeroes, villain);
    }
  };
  
  const exportSetup = () => {
    const setup = {
      heroes: randomHeroes.map(h => h.name),
      villain: randomVillain?.name,
      modulars: randomModulars.map(m => m.name),
      difficulty: randomVillain?.difficulty,
      date: new Date().toLocaleDateString()
    };
    
    const text = `MARVEL CHAMPIONS SETUP\n\n` +
      `Héroes: ${setup.heroes.join(', ')}\n` +
      `Villano: ${setup.villain} (${setup.difficulty}/10)\n` +
      `Modulares: ${setup.modulars.join(', ')}\n` +
      `Fecha: ${setup.date}`;
    
    navigator.clipboard.writeText(text);
    alert('¡Setup copiado al clipboard!');
  };
  
  // Stats calculations
  const stats = {
    gamesPlayed: history.length,
    winRate: history.filter(g => g.result === 'win').length / history.length * 100 || 0,
    uniqueHeroes: new Set(history.flatMap(g => g.heroes)).size,
    uniqueVillains: new Set(history.map(g => g.villain)).size,
    mostPlayed: heroes.reduce((acc, hero) => {
      const count = history.filter(g => g.heroes.includes(hero.key)).length;
      return count > acc.count ? { hero: hero.name, count } : acc;
    }, { hero: '', count: 0 }),
    collectionPercentage: {
      campaigns: (collection.campaigns.length / campaigns.length * 100).toFixed(0),
      scenarioPacks: (collection.scenarioPacks.length / scenarioPacks.length * 100).toFixed(0),
      heroes: ((heroes.filter(h => getOwnedSources().includes(h.source)).length / heroes.length) * 100).toFixed(0)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-blue-900 to-purple-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-2 text-yellow-300">MARVEL CHAMPIONS</h1>
          <p className="text-xl text-gray-300">Ultimate Randomizer con Collection Tracking</p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setActiveTab('randomizer')} className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg font-bold transition-all ${activeTab === 'randomizer' ? 'bg-yellow-500 text-black' : 'bg-black bg-opacity-40 hover:bg-opacity-60'}`}>
            <Shuffle className="inline mr-2" size={20} />
            Randomizer
          </button>
          <button onClick={() => setActiveTab('campaign')} className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg font-bold transition-all ${activeTab === 'campaign' ? 'bg-yellow-500 text-black' : 'bg-black bg-opacity-40 hover:bg-opacity-60'}`}>
            <BookOpen className="inline mr-2" size={20} />
            Modo Campaña
          </button>
          <button onClick={() => setActiveTab('collection')} className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg font-bold transition-all ${activeTab === 'collection' ? 'bg-yellow-500 text-black' : 'bg-black bg-opacity-40 hover:bg-opacity-60'}`}>
            <Archive className="inline mr-2" size={20} />
            Colección
          </button>
          <button onClick={() => setActiveTab('history')} className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg font-bold transition-all ${activeTab === 'history' ? 'bg-yellow-500 text-black' : 'bg-black bg-opacity-40 hover:bg-opacity-60'}`}>
            <TrendingUp className="inline mr-2" size={20} />
            Historial
          </button>
          <button onClick={() => setActiveTab('progression')} className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg font-bold transition-all ${activeTab === 'progression' ? 'bg-yellow-500 text-black' : 'bg-black bg-opacity-40 hover:bg-opacity-60'}`}>
            <Target className="inline mr-2" size={20} />
            Guía Progresión
          </button>
        </div>
        
        {/* RANDOMIZER TAB */}
        {activeTab === 'randomizer' && (
          <div className="space-y-6">
            {/* Quick Stats Bar */}
            <div className="bg-black bg-opacity-40 rounded-lg p-4 flex flex-wrap justify-around gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">{stats.gamesPlayed}</div>
                <div className="text-xs text-gray-400">Juegos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.winRate.toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.collectionPercentage.campaigns}%</div>
                <div className="text-xs text-gray-400">Campañas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.collectionPercentage.scenarioPacks}%</div>
                <div className="text-xs text-gray-400">Scenarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{stats.collectionPercentage.heroes}%</div>
                <div className="text-xs text-gray-400">Héroes</div>
              </div>
            </div>
            
            {/* Main Controls */}
            <div className="bg-black bg-opacity-40 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Jugadores</label>
                  <select value={playerCount} onChange={(e) => setPlayerCount(Number(e.target.value))} className="w-full p-2 rounded bg-gray-800 border border-gray-600">
                    <option value={1}>1 (True Solo)</option>
                    <option value={2}>2 (Recomendado)</option>
                    <option value={3}>3 Jugadores</option>
                    <option value={4}>4 Jugadores</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-bold">Dificultad</label>
                    <button onClick={() => setShowDifficultyHelp(!showDifficultyHelp)} className="text-yellow-400 hover:text-yellow-300">
                      <Info size={16} />
                    </button>
                  </div>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} className="w-full p-2 rounded bg-gray-800 border border-gray-600">
                    <option value="Any">Cualquiera</option>
                    <option value="Easy">Fácil (1-3)</option>
                    <option value="Medium">Medio (4-6)</option>
                    <option value="Hard">Difícil (7-8)</option>
                    <option value="Expert">Experto (9-10)</option>
                  </select>
                  {showDifficultyHelp && (
                    <div className="mt-2 p-3 bg-blue-900 bg-opacity-60 rounded text-xs">
                      <div className="font-bold mb-1">Dificultad de Villanos:</div>
                      <div><span className="text-green-400">Fácil (1-3):</span> Rhino, Crossbones - para aprender</div>
                      <div><span className="text-yellow-400">Medio (4-6):</span> Klaw, Hela - desafío balanceado</div>
                      <div><span className="text-orange-400">Difícil (7-8):</span> Red Skull, Loki - estrategia sólida</div>
                      <div><span className="text-red-400">Experto (9-10):</span> Thanos, Ronan - los más duros</div>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-sm font-bold">Complejidad</label>
                    <button onClick={() => setShowComplexityHelp(!showComplexityHelp)} className="text-yellow-400 hover:text-yellow-300">
                      <Info size={16} />
                    </button>
                  </div>
                  <select value={complexity} onChange={(e) => setComplexity(e.target.value as any)} className="w-full p-2 rounded bg-gray-800 border border-gray-600">
                    <option value="Any">Cualquiera</option>
                    <option value="Beginner">Principiante</option>
                    <option value="Intermediate">Intermedio</option>
                    <option value="Advanced">Avanzado</option>
                  </select>
                  {showComplexityHelp && (
                    <div className="mt-2 p-3 bg-purple-900 bg-opacity-60 rounded text-xs">
                      <div className="font-bold mb-1">Complejidad de Héroes:</div>
                      <div><span className="text-green-400">Principiante:</span> Mecánicas simples, pocas decisiones (Cap America, Quicksilver)</div>
                      <div><span className="text-yellow-400">Intermedio:</span> Timing y planificación (Black Widow, Spider-Ham)</div>
                      <div><span className="text-red-400">Avanzado:</span> Múltiples capas de decisión (Doctor Strange, Adam Warlock)</div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Modulares</label>
                  <select value={modularCount} onChange={(e) => setModularCount(Number(e.target.value))} className="w-full p-2 rounded bg-gray-800 border border-gray-600">
                    <option value={1}>1 Set</option>
                    <option value={2}>2 Sets</option>
                    <option value={3}>3 Sets</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={onlyUnplayed} onChange={(e) => setOnlyUnplayed(e.target.checked)} className="w-5 h-5" />
                  <span className="text-sm">Solo Héroes No Jugados</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={thematicPairing} onChange={(e) => setThematicPairing(e.target.checked)} className="w-5 h-5" />
                  <span className="text-sm">Emparejamiento Temático</span>
                </label>
              </div>
              
              <button onClick={generateComplete} className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 mb-4">
                <Shuffle className="inline mr-2" size={24} />
                Generar Setup Completo
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button onClick={generateHeroes} className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded">
                  <Users className="inline mr-2" size={16} />
                  Solo Héroes
                </button>
                <button onClick={generateVillainSetup} className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded">
                  <Target className="inline mr-2" size={16} />
                  Solo Villano
                </button>
              </div>
            </div>
            
            {/* Warnings & Suggestions */}
            {(warnings.length > 0 || suggestions.length > 0) && (
              <div className="space-y-2">
                {warnings.map((warning, idx) => (
                  <div key={idx} className="bg-red-900 bg-opacity-40 border-l-4 border-red-500 rounded p-3 flex items-start gap-2">
                    <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{warning}</span>
                  </div>
                ))}
                {suggestions.map((suggestion, idx) => (
                  <div key={idx} className="bg-blue-900 bg-opacity-40 border-l-4 border-blue-500 rounded p-3 flex items-start gap-2">
                    <Zap size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Results */}
            {randomHeroes.length > 0 && (
              <div className="bg-black bg-opacity-40 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-blue-400">Héroes</h2>
                  <button onClick={exportSetup} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 text-sm">
                    <Share2 size={16} />
                    Exportar
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {randomHeroes.map((hero, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg p-4 border-2 border-yellow-400">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-yellow-300">{hero.name}</h3>
                          <div className="text-xs text-gray-300">{hero.source}</div>
                        </div>
                        <div className="bg-yellow-500 text-black px-3 py-1 rounded font-bold h-fit">{hero.tier}</div>
                      </div>
                      <div className="text-sm space-y-1 mb-2">
                        <div><span className="text-yellow-300">Aspecto:</span> {hero.aspect}</div>
                        <div><span className="text-yellow-300">Complejidad:</span> {hero.complexity}</div>
                        <div><span className="text-yellow-300">Estilo:</span> {hero.playstyle.join(', ')}</div>
                      </div>
                      <div className="bg-black bg-opacity-40 rounded p-2 text-xs text-gray-300">{hero.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {randomVillain && (
              <div className="bg-black bg-opacity-40 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Villano & Modulares</h2>
                <div className="bg-gradient-to-br from-red-800 to-orange-800 rounded-lg p-5 border-2 border-yellow-400 mb-4">
                  <div className="flex justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-300">{randomVillain.name}</h3>
                      <div className="text-sm text-gray-300">{randomVillain.source}</div>
                    </div>
                    <div className="bg-yellow-500 text-black px-4 py-2 rounded font-bold text-xl">{randomVillain.difficulty}/10</div>
                  </div>
                  <div className="bg-black bg-opacity-40 rounded p-3 text-sm">
                    <div className="font-bold text-yellow-300 mb-1">Mecánicas: {randomVillain.mechanics}</div>
                    <div className="text-gray-300">{randomVillain.description}</div>
                  </div>
                </div>
                
                {randomModulars.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {randomModulars.map((modular, idx) => (
                      <div key={idx} className="bg-purple-900 bg-opacity-40 rounded p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold">{modular.name}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-3 h-3 rounded-full ${i < modular.difficulty ? 'bg-red-500' : 'bg-gray-600'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{modular.source}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  <button onClick={() => saveToHistory('win')} className="flex-1 bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded">
                    <Check size={16} className="inline mr-1" />
                    Victoria
                  </button>
                  <button onClick={() => saveToHistory('loss')} className="flex-1 bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded">
                    <X size={16} className="inline mr-1" />
                    Derrota
                  </button>
                  <button onClick={() => saveToHistory()} className="flex-1 bg-gray-600 hover:bg-gray-700 font-bold py-2 px-4 rounded">
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* CAMPAIGN MODE TAB */}
        {activeTab === 'campaign' && (
          <div className="space-y-6">
            <div className="bg-black bg-opacity-40 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-yellow-300 mb-4">Modo Campaña</h2>
              <p className="text-gray-300 mb-6">Juega campañas completas con modulares randomizados por escenario.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.filter(c => collection.campaigns.includes(c.key)).map(campaign => (
                  <div key={campaign.key} className="bg-gradient-to-br from-purple-800 to-blue-800 rounded-lg p-5 border-2 border-yellow-400 hover:border-yellow-300 cursor-pointer transition-all" onClick={() => { setActiveCampaign(campaign.key); setCampaignProgress(0); }}>
                    <h3 className="text-xl font-bold text-yellow-300 mb-2">{campaign.name}</h3>
                    <div className="text-sm text-gray-300 mb-3">Wave {campaign.wave === 0 ? 'Core' : campaign.wave} • {campaign.villains.length} Escenarios</div>
                    {activeCampaign === campaign.key && (
                      <div className="bg-black bg-opacity-40 rounded p-3">
                        <div className="text-sm font-bold mb-2">Progreso: {campaignProgress}/{campaign.villains.length}</div>
                        <div className="w-full bg-gray-700 rounded h-2 mb-3">
                          <div className="bg-yellow-500 h-2 rounded transition-all" style={{ width: `${(campaignProgress / campaign.villains.length) * 100}%` }} />
                        </div>
                        {campaignProgress < campaign.villains.length && (
                          <button onClick={(e) => { e.stopPropagation(); nextCampaignScenario(); }} className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold py-2 px-4 rounded">
                            Siguiente Escenario
                          </button>
                        )}
                        {campaignProgress >= campaign.villains.length && (
                          <div className="text-center text-green-400 font-bold">✓ ¡Completada!</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {campaigns.filter(c => collection.campaigns.includes(c.key)).length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No tienes campañas en tu colección. Ve a la pestaña Colección para añadirlas.
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* COLLECTION TAB */}
        {activeTab === 'collection' && (
          <div className="space-y-6">
            {/* Campaigns */}
            <div className="bg-black bg-opacity-40 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                Campañas ({collection.campaigns.length}/{campaigns.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {campaigns.map(campaign => (
                  <div key={campaign.key} onClick={() => {
                    if (campaign.key === 'core') return; // Core always included
                    setCollection(prev => ({
                      ...prev,
                      campaigns: prev.campaigns.includes(campaign.key) 
                        ? prev.campaigns.filter(c => c !== campaign.key)
                        : [...prev.campaigns, campaign.key]
                    }));
                  }} className={`p-3 rounded cursor-pointer transition-all ${
                    campaign.key === 'core' ? 'bg-gray-600 cursor-not-allowed' :
                    collection.campaigns.includes(campaign.key) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      {collection.campaigns.includes(campaign.key) ? <Check size={16} /> : <X size={16} />}
                      <div>
                        <div className="text-sm font-bold">{campaign.name}</div>
                        <div className="text-xs text-gray-300">Wave {campaign.wave === 0 ? 'Core' : campaign.wave}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCollection(prev => ({ ...prev, campaigns: campaigns.map(c => c.key) }))} className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded">
                  Todas
                </button>
                <button onClick={() => setCollection(prev => ({ ...prev, campaigns: ['core'] }))} className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded">
                  Solo Core
                </button>
              </div>
            </div>
            
            {/* Scenario Packs */}
            <div className="bg-black bg-opacity-40 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                Scenario Packs ({collection.scenarioPacks.length}/{scenarioPacks.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                {scenarioPacks.map(pack => (
                  <div key={pack.key} onClick={() => {
                    setCollection(prev => ({
                      ...prev,
                      scenarioPacks: prev.scenarioPacks.includes(pack.key) 
                        ? prev.scenarioPacks.filter(p => p !== pack.key)
                        : [...prev.scenarioPacks, pack.key]
                    }));
                  }} className={`p-3 rounded cursor-pointer transition-all ${
                    collection.scenarioPacks.includes(pack.key) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      {collection.scenarioPacks.includes(pack.key) ? <Check size={16} /> : <X size={16} />}
                      <div>
                        <div className="text-sm font-bold">{pack.name}</div>
                        <div className="text-xs text-gray-300">Wave {pack.wave}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCollection(prev => ({ ...prev, scenarioPacks: scenarioPacks.map(p => p.key) }))} className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded">
                  Todos
                </button>
                <button onClick={() => setCollection(prev => ({ ...prev, scenarioPacks: [] }))} className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded">
                  Ninguno
                </button>
              </div>
            </div>
            
            {/* Summary */}
            <div className="bg-gradient-to-r from-green-900 to-blue-900 bg-opacity-60 rounded-lg p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">Resumen de Colección</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-green-400">{heroes.filter(h => getOwnedSources().includes(h.source)).length}</div>
                  <div className="text-sm text-gray-400">Héroes Disponibles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-400">{villains.filter(v => getOwnedSources().includes(v.source)).length}</div>
                  <div className="text-sm text-gray-400">Villanos Disponibles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">{modularSets.filter(m => getOwnedSources().includes(m.source)).length}</div>
                  <div className="text-sm text-gray-400">Sets Modulares</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-black bg-opacity-40 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-yellow-300 mb-4">Historial & Estadísticas</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-900 bg-opacity-50 rounded p-4 text-center">
                  <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
                  <div className="text-sm text-gray-400">Total Juegos</div>
                </div>
                <div className="bg-green-900 bg-opacity-50 rounded p-4 text-center">
                  <div className="text-3xl font-bold">{stats.winRate.toFixed(1)}%</div>
                  <div className="text-sm text-gray-400">Win Rate</div>
                </div>
                <div className="bg-purple-900 bg-opacity-50 rounded p-4 text-center">
                  <div className="text-3xl font-bold">{stats.uniqueHeroes}</div>
                  <div className="text-sm text-gray-400">Héroes Jugados</div>
                </div>
                <div className="bg-red-900 bg-opacity-50 rounded p-4 text-center">
                  <div className="text-3xl font-bold">{stats.uniqueVillains}</div>
                  <div className="text-sm text-gray-400">Villanos Enfrentados</div>
                </div>
              </div>
              
              {stats.mostPlayed.count > 0 && (
                <div className="bg-yellow-900 bg-opacity-30 rounded p-4 mb-6">
                  <div className="text-sm text-gray-400">Héroe Más Jugado</div>
                  <div className="text-2xl font-bold text-yellow-300">{stats.mostPlayed.hero} ({stats.mostPlayed.count} juegos)</div>
                </div>
              )}
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {history.map(game => {
                  const gameHeroes = heroes.filter(h => game.heroes.includes(h.key));
                  const gameVillain = villains.find(v => v.key === game.villain);
                  
                  return (
                    <div key={game.id} className="bg-gray-800 bg-opacity-50 rounded p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold">{gameHeroes.map(h => h.name).join(', ')}</div>
                          <div className="text-sm text-gray-400">vs {gameVillain?.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {game.result === 'win' && <div className="bg-green-600 px-3 py-1 rounded font-bold text-sm">WIN</div>}
                          {game.result === 'loss' && <div className="bg-red-600 px-3 py-1 rounded font-bold text-sm">LOSS</div>}
                          <div className="text-xs text-gray-400">{new Date(game.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {history.length > 0 && (
                <button onClick={() => { if (window.confirm('¿Limpiar todo el historial?')) setHistory([]); }} className="mt-4 w-full bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded">
                  Limpiar Historial
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* PROGRESSION TAB */}
        {activeTab === 'progression' && (
          <div className="bg-black bg-opacity-40 rounded-lg p-6">
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Guía de Progresión Completa</h2>
            <p className="text-gray-300 mb-6">Orden optimizado para dificultad Expert/Heroic con estrategia de construcción de card pool.</p>
            
            <div className="space-y-6">
              {progressionGuide.map((phase, idx) => (
                <div key={idx} className="bg-gradient-to-r from-purple-900 to-blue-900 bg-opacity-40 rounded-lg p-5 border-l-4 border-yellow-500">
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
                          <div className="bg-purple-700 px-2 py-1 rounded text-xs font-bold">
                            {item.type === 'campaign' ? '📦 Campaña' : item.type === 'scenario' ? '🎯 Scenario' : '🦸 Heroes'}
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
                  <li>• <span className="text-yellow-300">Construir card pool entre campañas es CRÍTICO</span> para éxito en Expert</li>
                  <li>• <span className="text-red-400">Galaxy's Most Wanted es ÚLTIMO</span> - extremadamente punitivo (Ronan 26% win rate)</li>
                  <li>• <span className="text-green-400">Rise of Red Skull es la expansión universal #1</span> después de Core</li>
                  <li>• Expert difficulty escala con el tamaño del card pool - más opciones = más manejable</li>
                  <li>• <span className="text-purple-400">Wrecking Crew SOLO para completionistas</span> - comunidad dice "no lo necesitas"</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
