import type { ModularSet } from '../types';

export const modularSets: ModularSet[] = [
  // ==================== CAMPAIGN BOXES ====================

  // Core Set (November 2019) - 5 sets
  { name: "Bomb Scare", difficulty: 1, source: "Core Set", key: "bombscare" },
  { name: "Masters of Evil", difficulty: 2, source: "Core Set", key: "mastersofevil" },
  { name: "Under Attack", difficulty: 3, source: "Core Set", key: "underattack" },
  { name: "Legions of Hydra", difficulty: 4, source: "Core Set", key: "hydra" },
  { name: "The Doomsday Chair", difficulty: 5, source: "Core Set", key: "doomsdaychair" },

  // Rise of Red Skull (September 2020) - 3 sets
  { name: "Hydra Assault", difficulty: 3, source: "Rise of Red Skull", key: "hydraassault" },
  { name: "Hydra Patrol", difficulty: 4, source: "Rise of Red Skull", key: "hydrapatrol" },
  { name: "Weapon Master", difficulty: 3, source: "Rise of Red Skull", key: "weaponmaster" },

  // Galaxy's Most Wanted (April 2021) - 7 sets
  { name: "Badoon Headhunter", difficulty: 4, source: "Galaxy's Most Wanted", key: "badoonhunter" },
  { name: "Band of Badoon", difficulty: 4, source: "Galaxy's Most Wanted", key: "badoon" },
  { name: "Galactic Artifacts", difficulty: 4, source: "Galaxy's Most Wanted", key: "artifacts" },
  { name: "Kree Militants", difficulty: 4, source: "Galaxy's Most Wanted", key: "kreemilitants" },
  { name: "Menagerie Medley", difficulty: 3, source: "Galaxy's Most Wanted", key: "menagerie" },
  { name: "Ship Command", difficulty: 3, source: "Galaxy's Most Wanted", key: "shipcommand" },
  { name: "Space Pirates", difficulty: 3, source: "Galaxy's Most Wanted", key: "spacepirates" },

  // Mad Titan's Shadow (October 2021) - 7 sets
  { name: "Armies of Titan", difficulty: 4, source: "Mad Titan's Shadow", key: "armiesoftitan" },
  { name: "Children of Thanos", difficulty: 4, source: "Mad Titan's Shadow", key: "childrenofthanos" },
  { name: "Enchantress", difficulty: 4, source: "Mad Titan's Shadow", key: "enchantress" },
  { name: "Frost Giants", difficulty: 4, source: "Mad Titan's Shadow", key: "frostgiants" },
  { name: "Infinity Gauntlet", difficulty: 5, source: "Mad Titan's Shadow", key: "gauntlet" },
  { name: "Legions of Hel", difficulty: 4, source: "Mad Titan's Shadow", key: "hel" },
  { name: "The Black Order", difficulty: 4, source: "Mad Titan's Shadow", key: "blackorder" },

  // Sinister Motives (2022) - 9 sets
  { name: "City in Chaos", difficulty: 3, source: "Sinister Motives", key: "cityinchaos" },
  { name: "Down to Earth", difficulty: 3, source: "Sinister Motives", key: "downtoearth" },
  { name: "Goblin Gear", difficulty: 5, source: "Sinister Motives", key: "goblingear" },
  { name: "Guerilla Tactics", difficulty: 4, source: "Sinister Motives", key: "guerillatactics" },
  { name: "Osborn Tech", difficulty: 3, source: "Sinister Motives", key: "osborntech" },
  { name: "Personal Nightmare", difficulty: 4, source: "Sinister Motives", key: "nightmare" },
  { name: "Sinister Assault", difficulty: 4, source: "Sinister Motives", key: "sinisterassault" },
  { name: "Symbiotic Strength", difficulty: 4, source: "Sinister Motives", key: "symbiotic" },
  { name: "Whispers of Paranoia", difficulty: 3, source: "Sinister Motives", key: "whispers" },

  // Mutant Genesis (2022-2023) - 6 sets
  { name: "Acolytes", difficulty: 4, source: "Mutant Genesis", key: "acolytes" },
  { name: "Brotherhood", difficulty: 4, source: "Mutant Genesis", key: "brotherhood" },
  { name: "Future Past", difficulty: 4, source: "Mutant Genesis", key: "futurepast" },
  { name: "Mystique", difficulty: 4, source: "Mutant Genesis", key: "mystique" },
  { name: "Sentinels", difficulty: 5, source: "Mutant Genesis", key: "sentinels" },
  { name: "Zero Tolerance", difficulty: 4, source: "Mutant Genesis", key: "zerotolerance" },

  // NeXt Evolution (2023-2024) - 11 sets
  { name: "Black Tom Cassidy", difficulty: 4, source: "NeXt Evolution", key: "blacktom" },
  { name: "Extreme Measures", difficulty: 4, source: "NeXt Evolution", key: "extrememeasures" },
  { name: "Flight", difficulty: 5, source: "NeXt Evolution", key: "flight" },
  { name: "Hope Summers", difficulty: 4, source: "NeXt Evolution", key: "hopesummers" },
  { name: "Marauders", difficulty: 4, source: "NeXt Evolution", key: "marauders" },
  { name: "Military Grade", difficulty: 3, source: "NeXt Evolution", key: "militarygrade" },
  { name: "Mutant Insurrection", difficulty: 4, source: "NeXt Evolution", key: "insurrection" },
  { name: "Mutant Slayers", difficulty: 4, source: "NeXt Evolution", key: "slayers" },
  { name: "Nasty Boys", difficulty: 4, source: "NeXt Evolution", key: "nastyboys" },
  { name: "Super Strength", difficulty: 5, source: "NeXt Evolution", key: "superstrength" },
  { name: "Telepathy", difficulty: 5, source: "NeXt Evolution", key: "telepathy" },

  // Age of Apocalypse (2024) - 11 sets
  { name: "Age of Apocalypse", difficulty: 4, source: "Age of Apocalypse", key: "aoasource" },
  { name: "Blue Moon", difficulty: 4, source: "Age of Apocalypse", key: "bluemoon" },
  { name: "Celestial Tech", difficulty: 4, source: "Age of Apocalypse", key: "celestialtech" },
  { name: "Clan Akkaba", difficulty: 4, source: "Age of Apocalypse", key: "clanakkaba" },
  { name: "Dark Riders", difficulty: 4, source: "Age of Apocalypse", key: "darkriders" },
  { name: "Dystopian Nightmare", difficulty: 4, source: "Age of Apocalypse", key: "dystopian" },
  { name: "Genosha", difficulty: 4, source: "Age of Apocalypse", key: "genosha" },
  { name: "Hounds", difficulty: 4, source: "Age of Apocalypse", key: "hounds" },
  { name: "Infinites", difficulty: 4, source: "Age of Apocalypse", key: "infinites" },
  { name: "Savage Land", difficulty: 4, source: "Age of Apocalypse", key: "savageland" },
  { name: "Standard III", difficulty: 3, source: "Age of Apocalypse", key: "standard3" },

  // Agents of S.H.I.E.L.D. (2025) - 13 sets
  // Thunderbolts Sets (6)
  { name: "Gravitational Pull", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "gravpull" },
  { name: "Hard Sound", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "hardsound" },
  { name: "Pale Little Spider", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "palespider" },
  { name: "Power of the Atom", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "poweratom" },
  { name: "Supersonic", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "supersonic" },
  { name: "The Leaper", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "leaper" },
  // Other Sets (7)
  { name: "A.I.M. Abduction", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "aimabduction" },
  { name: "A.I.M. Science", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "aimscience" },
  { name: "Batroc's Brigade", difficulty: 3, source: "Agents of S.H.I.E.L.D.", key: "batroc" },
  { name: "Executive Board Evidence", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "boardevidence" },
  { name: "S.H.I.E.L.D.", difficulty: 3, source: "Agents of S.H.I.E.L.D.", key: "shield" },
  { name: "S.H.I.E.L.D. Executive Board", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "shieldboard" },
  { name: "Scientist Supreme", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "scientistsupreme" },

  // Civil War (October 2025) - 16 sets
  // Registration Side (8)
  { name: "Cape-Killer", difficulty: 4, source: "Civil War", key: "capekiller" },
  { name: "Dangerous Recruits", difficulty: 4, source: "Civil War", key: "dangerousrecruits" },
  { name: "Heroes for Hire", difficulty: 4, source: "Civil War", key: "heroesforhire" },
  { name: "Maria Hill", difficulty: 4, source: "Civil War", key: "mariahill" },
  { name: "Martial Law", difficulty: 5, source: "Civil War", key: "martiallaw" },
  { name: "Mighty Avengers", difficulty: 4, source: "Civil War", key: "mightyavengers" },
  { name: "Paladin", difficulty: 4, source: "Civil War", key: "paladin" },
  { name: "The Initiative", difficulty: 4, source: "Civil War", key: "initiative" },
  // Resistance Side (8)
  { name: "Atlanteans", difficulty: 4, source: "Civil War", key: "atlanteans" },
  { name: "Cloak & Dagger", difficulty: 4, source: "Civil War", key: "cloakdagger" },
  { name: "Defenders", difficulty: 4, source: "Civil War", key: "defenders" },
  { name: "Hell's Kitchen", difficulty: 4, source: "Civil War", key: "hellskitchen" },
  { name: "Namor", difficulty: 5, source: "Civil War", key: "namor" },
  { name: "New Avengers", difficulty: 4, source: "Civil War", key: "newavengers" },
  { name: "Secret Avengers", difficulty: 4, source: "Civil War", key: "secretavengers" },
  { name: "Spider-Man", difficulty: 4, source: "Civil War", key: "spiderman" },

  // ==================== SCENARIO PACKS ====================

  // Green Goblin Scenario Pack (December 2019) - 4 sets
  { name: "A Mess of Things", difficulty: 4, source: "Green Goblin", key: "messofthings" },
  { name: "Goblin Gimmicks", difficulty: 4, source: "Green Goblin", key: "gimmicks" },
  { name: "Power Drain", difficulty: 3, source: "Green Goblin", key: "powerdrain" },
  { name: "Running Interference", difficulty: 3, source: "Green Goblin", key: "interference" },

  // The Once and Future Kang (October 2020) - 3 sets
  { name: "Anachronauts", difficulty: 5, source: "The Once and Future Kang", key: "anachronauts" },
  { name: "Master of Time", difficulty: 5, source: "The Once and Future Kang", key: "mastertime" },
  { name: "Temporal", difficulty: 4, source: "The Once and Future Kang", key: "temporal" },

  // The Hood Scenario Pack (Fall 2021) - 9 sets
  { name: "Streets of Mayhem", difficulty: 1, source: "The Hood", key: "mayhem" },
  { name: "Brothers Grimm", difficulty: 2, source: "The Hood", key: "brothersgrimm" },
  { name: "Ransacked Armory", difficulty: 3, source: "The Hood", key: "ransackedarmory" },
  { name: "State of Emergency", difficulty: 4, source: "The Hood", key: "emergency" },
  { name: "Beasty Boys", difficulty: 5, source: "The Hood", key: "beastyboys" },
  { name: "Mister Hyde", difficulty: 6, source: "The Hood", key: "misterhyde" },
  { name: "Sinister Syndicate", difficulty: 7, source: "The Hood", key: "sinistersyndicate" },
  { name: "Crossfire's Crew", difficulty: 8, source: "The Hood", key: "crossfire" },
  { name: "Wrecking Crew", difficulty: 9, source: "The Hood", key: "wreckingmod" },

  // MojoMania Scenario Pack (November 2022) - 7 sets
  { name: "Crime", difficulty: 4, source: "MojoMania", key: "crime" },
  { name: "Fantasy", difficulty: 4, source: "MojoMania", key: "fantasy" },
  { name: "Horror", difficulty: 4, source: "MojoMania", key: "horror" },
  { name: "Sci-Fi", difficulty: 4, source: "MojoMania", key: "scifi" },
  { name: "Sitcom", difficulty: 4, source: "MojoMania", key: "sitcom" },
  { name: "Western", difficulty: 4, source: "MojoMania", key: "western" },
  { name: "Longshot", difficulty: 2, source: "MojoMania", key: "longshot" },

  // Trickster Takeover Scenario Pack (August 2025) - 1 set
  { name: "Trickster Magic", difficulty: 4, source: "Trickster Takeover", key: "trickstermagic" },

  // Synthezoid Smackdown Scenario Pack (December 2025) - 8 sets
  // Registration Side (4)
  { name: "Mighty Avengers (SS)", difficulty: 4, source: "Synthezoid Smackdown", key: "mightyavengersss" },
  { name: "Taskmaster", difficulty: 4, source: "Synthezoid Smackdown", key: "taskmaster" },
  { name: "Thunderbolts (SS)", difficulty: 4, source: "Synthezoid Smackdown", key: "thunderboltsss" },
  { name: "Registration Set 4", difficulty: 4, source: "Synthezoid Smackdown", key: "ssreg4" },
  // Resistance Side (4)
  { name: "Moon Knight", difficulty: 4, source: "Synthezoid Smackdown", key: "moonknight" },
  { name: "Young Avengers", difficulty: 4, source: "Synthezoid Smackdown", key: "youngavengers" },
  { name: "Resistance Set 3", difficulty: 4, source: "Synthezoid Smackdown", key: "ssres3" },
  { name: "Resistance Set 4", difficulty: 4, source: "Synthezoid Smackdown", key: "ssres4" },

  // ==================== HERO PACKS ====================

  // Web-Warrior / Sinister Motives Era (2022) - 4 sets
  { name: "Armadillo", difficulty: 4, source: "Nova Hero Pack", key: "armadillo" },
  { name: "Zzzax", difficulty: 4, source: "Ironheart Hero Pack", key: "zzzax" },
  { name: "The Inheritors", difficulty: 5, source: "Spider-Ham Hero Pack", key: "inheritors" },
  { name: "Iron Spider's Sinister Six", difficulty: 4, source: "SP//dr Hero Pack", key: "issinistersix" },

  // Mutant Genesis Era (2022-2023) - 4 sets
  { name: "Lady Deathstrike", difficulty: 4, source: "Wolverine Hero Pack", key: "deathstrike" },
  { name: "Shadow King", difficulty: 5, source: "Storm Hero Pack", key: "shadowking" },
  { name: "Exodus", difficulty: 5, source: "Gambit Hero Pack", key: "exodus" },
  { name: "Reavers", difficulty: 4, source: "Rogue Hero Pack", key: "reavers" },

  // Age of Apocalypse Era (2024) - 1 set
  { name: "Sauron", difficulty: 5, source: "Iceman Hero Pack", key: "sauron" },

  // Agents of S.H.I.E.L.D. Era (2025) - 4 sets (Thunderbolts)
  { name: "Extreme Risk", difficulty: 4, source: "Black Panther/Shuri Hero Pack", key: "extremerisk" },
  { name: "Growing Strong", difficulty: 4, source: "Silk Hero Pack", key: "growingstrong" },
  { name: "Techno", difficulty: 4, source: "Falcon Hero Pack", key: "techno" },
  { name: "Whiteout", difficulty: 4, source: "Winter Soldier Hero Pack", key: "whiteout" }

  // TOTAL: 117 modular encounter sets
  // - Campaign Boxes: 72 sets
  // - Scenario Packs: 32 sets
  // - Hero Packs: 13 sets
];
