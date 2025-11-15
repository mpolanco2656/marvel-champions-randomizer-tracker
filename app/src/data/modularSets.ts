import type { ModularSet } from '../types';

export const modularSets: ModularSet[] = [
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
  { name: "Armies of Titan", difficulty: 4, source: "Mad Titan's Shadow", key: "armiesoftitan" },
  { name: "Infinity Gauntlet", difficulty: 5, source: "Mad Titan's Shadow", key: "gauntlet" },
  { name: "Legions of Hel", difficulty: 4, source: "Mad Titan's Shadow", key: "hel" },

  // Sinister Motives
  { name: "Goblin Gear", difficulty: 5, source: "Sinister Motives", key: "goblingear" },
  { name: "Sinister Assault", difficulty: 4, source: "Sinister Motives", key: "sinisterassault" },

  // Mutant Genesis
  { name: "Acolytes", difficulty: 4, source: "Mutant Genesis", key: "acolytes" },
  { name: "Brotherhood", difficulty: 4, source: "Mutant Genesis", key: "brotherhood" },
  { name: "Mutant Slayers", difficulty: 4, source: "Mutant Genesis", key: "slayers" },
  { name: "Sentinels", difficulty: 5, source: "Mutant Genesis", key: "sentinels" },

  // NeXt Evolution
  { name: "Military Grade", difficulty: 3, source: "NeXt Evolution", key: "militarygrade" },
  { name: "Mutant Hunters", difficulty: 4, source: "NeXt Evolution", key: "mutanthunters" },
  { name: "Mojoverse", difficulty: 3, source: "NeXt Evolution", key: "mojoverse" },
  { name: "Zero Tolerance", difficulty: 4, source: "NeXt Evolution", key: "zerotolerance" },

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
  { name: "A Mess of Things", difficulty: 4, source: "Green Goblin", key: "messofthings" },
  { name: "Power Drain", difficulty: 3, source: "Green Goblin", key: "powerdrain" },
  { name: "Running Interference", difficulty: 3, source: "Green Goblin", key: "interference" },
  { name: "Osborn Tech", difficulty: 3, source: "Green Goblin", key: "osborntech" },
  { name: "Goblin Gimmicks", difficulty: 4, source: "Green Goblin", key: "gimmicks" },
  { name: "Streets of New York", difficulty: 2, source: "Green Goblin", key: "streets" },

  // Kang Pack
  { name: "Anachronauts", difficulty: 5, source: "The Once and Future Kang", key: "anachronauts" },
  { name: "Master of Time", difficulty: 5, source: "The Once and Future Kang", key: "mastertime" },
  { name: "Temporal", difficulty: 4, source: "The Once and Future Kang", key: "temporal" },

  // The Hood Pack
  { name: "Bystanders", difficulty: 2, source: "The Hood", key: "bystanders" },
  { name: "Brothers Grimm", difficulty: 3, source: "The Hood", key: "brothersgrimm" },
  { name: "City in Chaos", difficulty: 3, source: "The Hood", key: "chaos" },
  { name: "Crime Syndicate", difficulty: 4, source: "The Hood", key: "syndicate" },
  { name: "Crossfire's Crew", difficulty: 4, source: "The Hood", key: "crossfire" },
  { name: "Mister Hyde", difficulty: 4, source: "The Hood", key: "misterhyde" },
  { name: "Ransacked Armory", difficulty: 3, source: "The Hood", key: "ransackedarmory" },
  { name: "Sinister Syndicate", difficulty: 4, source: "The Hood", key: "sinistersyndicate" },
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
  { name: "AI Protocols", difficulty: 4, source: "Synthezoid Smackdown", key: "aiprotocols" },

  // Hero Packs - Wave 5 (Sinister Motives Cycle)
  { name: "Zzzax", difficulty: 4, source: "Ironheart Hero Pack", key: "zzzax" },
  { name: "The Inheritors", difficulty: 5, source: "Spider-Ham Hero Pack", key: "inheritors" },
  { name: "Iron Spider's Sinister Six", difficulty: 4, source: "SP//dr Hero Pack", key: "issinistersix" },

  // Hero Packs - Wave 6 (Mutant Genesis Cycle)
  { name: "Shadow King", difficulty: 5, source: "Storm Hero Pack", key: "shadowking" },
  { name: "Deathstrike", difficulty: 4, source: "Wolverine Hero Pack", key: "deathstrike" },
  { name: "Exodus", difficulty: 5, source: "Gambit Hero Pack", key: "exodus" },
  { name: "Reavers", difficulty: 4, source: "Rogue Hero Pack", key: "reavers" },

  // Hero Packs - Wave 7 (Age of Apocalypse Cycle)
  { name: "Dreadpool", difficulty: 3, source: "Deadpool Hero Pack", key: "dreadpool" },

  // Hero Packs - Wave 8 (Agents of S.H.I.E.L.D. Cycle)
  { name: "Sauron", difficulty: 5, source: "Iceman Hero Pack", key: "sauron" },
  { name: "Arcade", difficulty: 4, source: "Jubilee Hero Pack", key: "arcade" },
  { name: "Crazy Gang", difficulty: 3, source: "Magneto Hero Pack", key: "crazygang" },
  { name: "Hellfire Club", difficulty: 5, source: "Nightcrawler Hero Pack", key: "hellfireclub" },

  // Hero Packs - Wave 9 (Civil War Cycle)
  { name: "Extreme Risk", difficulty: 4, source: "Black Panther/Shuri Hero Pack", key: "extremerisk" },
  { name: "Growing Strong", difficulty: 3, source: "Silk Hero Pack", key: "growingstrong" },
  { name: "Techno", difficulty: 4, source: "Falcon Hero Pack", key: "techno" },
  { name: "Whiteout", difficulty: 4, source: "Winter Soldier Hero Pack", key: "whiteout" }

  // TODO: Missing Modular Sets (pending confirmation)
  // - Civil War: 13+ additional modulars (names not yet confirmed)
  //   - Confirmed: Maria Hill (Registration), New Avengers (Resistance), The Defenders (Resistance)
  //   - Total expected: 16 modulars (8 Registration + 8 Resistance)
  // - Sinister Motives: 3+ additional modulars (pending official source verification)
  // - Special Sets: Standard III, Expert III, Ronan Modular Set (promo)
  //   - These require special handling as they don't belong to a specific product
];

