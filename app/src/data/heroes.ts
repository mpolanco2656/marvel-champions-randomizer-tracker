import type { Hero } from '../types';

export const heroes: Hero[] = [
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
  { name: "Thor", aspect: "Aggression", tier: "B", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Multiplayer", wave: 1, source: "Thor Hero Pack", description: "Necesita Asgard + minions", key: "thor" },
  { name: "Black Widow", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["Control", "Support"], optimization: "Multiplayer", wave: 1, source: "Black Widow Hero Pack", description: "Control del mazo de encuentros", key: "widow" },
  { name: "Doctor Strange", aspect: "Protection", tier: "S+", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 1, source: "Doctor Strange Hero Pack", description: "Mazo de invocación - imparable", key: "strange" },
  { name: "Hulk", aspect: "Aggression", tier: "C", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Solo", wave: 1, source: "Hulk Hero Pack", description: "4 cartas en mano", key: "hulk" },
  { name: "Ms. Marvel", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 1, source: "Ms. Marvel Hero Pack", description: "Mecánicas Embiggen", key: "msmarvel" },

  // Wave 2 - Galaxy's Most Wanted
  { name: "Groot", aspect: "Protection", tier: "C", complexity: "Beginner", playstyle: ["Support"], optimization: "Multiplayer", wave: 2, source: "Galaxy's Most Wanted", description: "Contadores de crecimiento", key: "groot" },
  { name: "Rocket Raccoon", aspect: "Aggression", tier: "B", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Galaxy's Most Wanted", description: "Mejoras de armas", key: "rocket" },
  { name: "Ant-Man", aspect: "Leadership", tier: "A", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Ant-Man Hero Pack", description: "Combos cambio de tamaño", key: "antman" },
  { name: "Wasp", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Wasp Hero Pack", description: "Inconsistente", key: "wasp" },
  { name: "Quicksilver", aspect: "Protection", tier: "A", complexity: "Beginner", playstyle: ["All-rounder"], optimization: "Both", wave: 2, source: "Quicksilver Hero Pack", description: "Always Be Running", key: "quicksilver" },
  { name: "Scarlet Witch", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 2, source: "Scarlet Witch Hero Pack", description: "Wild Magic", key: "witch" },

  // Wave 3 - Mad Titan's Shadow
  { name: "Adam Warlock", aspect: "Aggression", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Mad Titan's Shadow", description: "4 aspectos + ver top deck", key: "warlock" },
  { name: "Spectrum", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Mad Titan's Shadow", description: "Tres formas - flexibilidad total", key: "spectrum" },
  { name: "Star-Lord", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Solo", wave: 3, source: "Star-Lord Hero Pack", description: "Versatilidad Element Gun", key: "starlord" },
  { name: "Gamora", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Solo", wave: 3, source: "Gamora Hero Pack", description: "Eventos attack/thwart", key: "gamora" },
  { name: "Drax", aspect: "Protection", tier: "C", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Both", wave: 3, source: "Drax Hero Pack", description: "Contraataque falla vs grandes golpes", key: "drax" },
  { name: "Venom", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Aggro", "Resource Engine"], optimization: "Both", wave: 3, source: "Venom Hero Pack", description: "Alto daño + recursos wild", key: "venom" },
  { name: "Nebula", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Nebula Hero Pack", description: "Contadores de poder", key: "nebula" },
  { name: "War Machine", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Multiplayer", wave: 3, source: "War Machine Hero Pack", description: "Armas pesadas", key: "warmachine" },
  { name: "Valkyrie", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 3, source: "Valkyrie Hero Pack", description: "Enfocado en minions", key: "valkyrie" },
  { name: "Vision", aspect: "Protection", tier: "B", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Vision Hero Pack", description: "Manipulación de densidad", key: "vision" },

  // Wave 4 - Sinister Motives
  { name: "Ghost-Spider", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Sinister Motives", description: "Multiverso web-slinging", key: "ghostspider" },
  { name: "Spider-Man (Miles)", aspect: "Protection", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Sinister Motives", description: "Venom blast + camuflaje", key: "miles" },
  { name: "Nova", aspect: "Aggression", tier: "A", complexity: "Beginner", playstyle: ["Resource Engine", "Aggro"], optimization: "Both", wave: 4, source: "Nova Hero Pack", description: "Casco inmediato + recursos wild", key: "nova" },
  { name: "Ironheart", aspect: "Leadership", tier: "B", complexity: "Intermediate", playstyle: ["Setup"], optimization: "Multiplayer", wave: 4, source: "Ironheart Hero Pack", description: "Mejoras tech", key: "ironheart" },
  { name: "Spider-Ham", aspect: "Justice", tier: "S+", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Spider-Ham Hero Pack", description: "Toon Counters = versatilidad", key: "spiderham" },
  { name: "SP//dr", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Resource Engine"], optimization: "Both", wave: 4, source: "SP//dr Hero Pack", description: "3 cartas mano pero buenos recursos", key: "spdr" },

  // Wave 5 - Mutant Genesis
  { name: "Colossus", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Mutant Genesis", description: "Tank forma metal", key: "colossus" },
  { name: "Shadowcat", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 5, source: "Mutant Genesis", description: "Phasing", key: "shadowcat" },
  { name: "Cyclops", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Multiplayer", wave: 5, source: "Cyclops Hero Pack", description: "Coordinación táctica", key: "cyclops" },
  { name: "Phoenix", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Phoenix Hero Pack", description: "Unleashed/Restrained", key: "phoenix" },
  { name: "Wolverine", aspect: "Aggression", tier: "A", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Both", wave: 5, source: "Wolverine Hero Pack", description: "¿Puedes costear el costo de salud?", key: "wolverine" },
  { name: "Storm", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 5, source: "Storm Hero Pack", description: "Manipulación del clima", key: "storm" },
  { name: "Gambit", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Solo", wave: 5, source: "Gambit Hero Pack", description: "Daño explosivo en burst", key: "gambit" },
  { name: "Rogue", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Rogue Hero Pack", description: "Absorción de poder", key: "rogue" },

  // Wave 6 - NeXt Evolution
  { name: "Cable", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 6, source: "NeXt Evolution", description: "Manipulación del tiempo", key: "cable" },
  { name: "Domino", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "NeXt Evolution", description: "Manipulación de suerte", key: "domino" },
  { name: "Psylocke", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "Psylocke Hero Pack", description: "Combos high-skill", key: "psylocke" },
  { name: "Angel", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 6, source: "Angel Hero Pack", description: "Soporte aéreo", key: "angel" },
  { name: "X-23", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "X-23 Hero Pack", description: "Curación agresiva", key: "x23" },
  { name: "Deadpool", aspect: "Pool", tier: "B", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Solo", wave: 6, source: "Deadpool Hero Pack", description: "S+ solo, C multi", key: "deadpool" },

  // Wave 7 - Age of Apocalypse
  { name: "Bishop", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["Resource Engine"], optimization: "Both", wave: 7, source: "Age of Apocalypse", description: "Absorción de energía", key: "bishop" },
  { name: "Magik", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Age of Apocalypse", description: "Manipulación de Limbo", key: "magik" },
  { name: "Iceman", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Iceman Hero Pack", description: "Previene activaciones", key: "iceman" },
  { name: "Jubilee", aspect: "Justice", tier: "B", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 7, source: "Jubilee Hero Pack", description: "Soporte con fuegos artificiales", key: "jubilee" },
  { name: "Nightcrawler", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Nightcrawler Hero Pack", description: "Teletransportación", key: "nightcrawler" },
  { name: "Magneto", aspect: "Leadership", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Magneto Hero Pack", description: "Maestría magnética", key: "magneto" },

  // Wave 8 - Agents of SHIELD
  { name: "Maria Hill", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 8, source: "Agents of S.H.I.E.L.D.", description: "Comando táctico SHIELD", key: "mariahill" },
  { name: "Nick Fury", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 8, source: "Agents of S.H.I.E.L.D.", description: "Director de SHIELD", key: "nickfury" },
  { name: "Black Panther/Shuri", aspect: "Justice", tier: "B", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 8, source: "Black Panther/Shuri Hero Pack", description: "Héroe dual Wakanda", key: "panthershuri" },
  { name: "Silk", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 8, source: "Silk Hero Pack", description: "Mecánicas de telaraña", key: "silk" },
  { name: "Falcon", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 8, source: "Falcon Hero Pack", description: "Tácticas aéreas", key: "falcon" },
  { name: "Winter Soldier", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 8, source: "Winter Soldier Hero Pack", description: "Maestría en armas", key: "wintersoldier" },

  // Wave 9 - Civil War
  { name: "Hulkling", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Multiplayer", wave: 9, source: "Civil War", description: "Cambio de forma", key: "hulkling" },
  { name: "Tigra", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 9, source: "Civil War", description: "Combate feral", key: "tigra" },
  { name: "Wonder Man", aspect: "Justice", tier: "B", complexity: "Advanced", playstyle: ["All-rounder", "Resource Engine"], optimization: "Both", wave: 9, source: "Wonder Man Hero Pack", description: "Deckbuilding único con recursos Energy, Ionic Physiology", key: "wonderman" },
  { name: "Hercules", aspect: "Leadership", tier: "B", complexity: "Intermediate", playstyle: ["Setup", "All-rounder"], optimization: "Both", wave: 9, source: "Hercules Hero Pack", description: "Completa Labores para ganar Regalos divinos", key: "hercules" }
];
