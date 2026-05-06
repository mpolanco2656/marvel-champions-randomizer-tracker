// Marvel Champions — Game Data
window.MCData = (function () {

  const campaigns = [
    { name: "Core Set", key: "core", type: "core", villains: ["rhino","klaw","ultron"], wave: 0 },
    { name: "Rise of Red Skull", key: "riseofredskull", type: "campaign", villains: ["crossbones","absorbingman","taskmaster","zola","redskull"], wave: 1 },
    { name: "Galaxy's Most Wanted", key: "galaxysmostwanted", type: "campaign", villains: ["collector1","nebula_gmw","ronan","collector2"], wave: 2 },
    { name: "Mad Titan's Shadow", key: "madtitansshadow", type: "campaign", villains: ["thanos","hela","loki","tower"], wave: 3 },
    { name: "Sinister Motives", key: "sinistermotives", type: "campaign", villains: ["sandman","venomgoblin","mysterio","sinistersix"], wave: 4 },
    { name: "Mutant Genesis", key: "mutantgenesis", type: "campaign", villains: ["magneto_villain","sabretooth","sinister","stryfe"], wave: 5 },
    { name: "NeXt Evolution", key: "nextevolution", type: "campaign", villains: ["mojo","juggernaut","sentinelmk","onslaught"], wave: 6 },
    { name: "Age of Apocalypse", key: "ageofapocalypse", type: "campaign", villains: ["apocalypse1","apocalypse2","apocalypse3","apocalypse4"], wave: 7 },
    { name: "Agents of S.H.I.E.L.D.", key: "agentsofshield", type: "campaign", villains: ["shield1","shield2","shield3","shield4"], wave: 8 },
    { name: "Civil War", key: "civilwar", type: "campaign", villains: ["civilwar1","civilwar2","civilwar3","civilwar4"], wave: 9 }
  ];

  const scenarioPacks = [
    { name: "Green Goblin", key: "greengoblin", villain: "greengoblin", wave: 1 },
    { name: "Wrecking Crew", key: "wreckingcrew", villain: "wreckingcrew", wave: 1 },
    { name: "The Once and Future Kang", key: "kang", villain: "kang", wave: 2 },
    { name: "The Hood", key: "hood", villain: "hood", wave: 3 },
    { name: "MojoMania", key: "mojomania", villain: "mojomania_villain", wave: 5 },
    { name: "Trickster Takeover", key: "trickster", villain: "trickster_villain", wave: 7 },
    { name: "Synthezoid Smackdown", key: "synthezoid", villain: "synthezoid_villain", wave: 9 }
  ];

  // Hero packs (individual packs — 1 hero each)
  const heroPacks = [
    { name: "Thor", key: "thor", wave: 1 },
    { name: "Black Widow", key: "widow", wave: 1 },
    { name: "Doctor Strange", key: "strange", wave: 1 },
    { name: "Hulk", key: "hulk", wave: 1 },
    { name: "Ms. Marvel", key: "msmarvel", wave: 1 },
    { name: "Ant-Man", key: "antman", wave: 2 },
    { name: "Wasp", key: "wasp", wave: 2 },
    { name: "Quicksilver", key: "quicksilver", wave: 2 },
    { name: "Scarlet Witch", key: "witch", wave: 2 },
    { name: "Star-Lord", key: "starlord", wave: 3 },
    { name: "Gamora", key: "gamora", wave: 3 },
    { name: "Drax", key: "drax", wave: 3 },
    { name: "Venom", key: "venom", wave: 3 },
    { name: "Nebula", key: "nebula", wave: 3 },
    { name: "War Machine", key: "warmachine", wave: 3 },
    { name: "Valkyrie", key: "valkyrie", wave: 3 },
    { name: "Vision", key: "vision", wave: 3 },
    { name: "Nova", key: "nova", wave: 4 },
    { name: "Ironheart", key: "ironheart", wave: 4 },
    { name: "Spider-Ham", key: "spiderham", wave: 4 },
    { name: "SP//dr", key: "spdr", wave: 4 },
    { name: "Cyclops", key: "cyclops", wave: 5 },
    { name: "Phoenix", key: "phoenix", wave: 5 },
    { name: "Wolverine", key: "wolverine", wave: 5 },
    { name: "Storm", key: "storm", wave: 5 },
    { name: "Gambit", key: "gambit", wave: 5 },
    { name: "Rogue", key: "rogue", wave: 5 },
    { name: "Psylocke", key: "psylocke", wave: 6 },
    { name: "Angel", key: "angel", wave: 6 },
    { name: "X-23", key: "x23", wave: 6 },
    { name: "Deadpool", key: "deadpool", wave: 6 },
    { name: "Iceman", key: "iceman", wave: 7 },
    { name: "Jubilee", key: "jubilee", wave: 7 },
    { name: "Nightcrawler", key: "nightcrawler", wave: 7 },
    { name: "Magneto", key: "magneto", wave: 7 },
    { name: "Black Panther/Shuri", key: "panthershuri", wave: 8 },
    { name: "Silk", key: "silk", wave: 8 },
    { name: "Falcon", key: "falcon", wave: 8 },
    { name: "Winter Soldier", key: "wintersoldier", wave: 8 }
  ];

  const heroes = [
    // Core Set
    { name: "Captain America", aspect: "Leadership", tier: "A", complexity: "Beginner", playstyle: ["All-rounder"], optimization: "Both", wave: 0, source: "Core Set", description: "No weaknesses, thwart 4-6 or attack 4 turn 1", key: "cap" },
    { name: "Captain Marvel", aspect: "Justice", tier: "S", complexity: "Beginner", playstyle: ["Resource Engine","All-rounder"], optimization: "Both", wave: 0, source: "Core Set", description: "Energy Absorption = 3 resources, 12 HP", key: "marvel" },
    { name: "Spider-Man", aspect: "Justice", tier: "A", complexity: "Beginner", playstyle: ["Control"], optimization: "Both", wave: 0, source: "Core Set", description: "High defense, control via stun/confuse", key: "spidey" },
    { name: "Iron Man", aspect: "Aggression", tier: "B", complexity: "Advanced", playstyle: ["Setup","Resource Engine"], optimization: "Multiplayer", wave: 0, source: "Core Set", description: "Zero to hero — needs setup time", key: "ironman" },
    { name: "She-Hulk", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 0, source: "Core Set", description: "4 card hand limit", key: "shehulk" },
    { name: "Black Panther", aspect: "Protection", tier: "B", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 0, source: "Core Set", description: "Retaliate and Wakandan tech", key: "panther" },
    // Rise of Red Skull
    { name: "Spider-Woman", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder","Support"], optimization: "Multiplayer", wave: 1, source: "Rise of Red Skull", description: "Unique dual aspect", key: "spiderwoman" },
    { name: "Hawkeye", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 1, source: "Rise of Red Skull", description: "Requires bow setup", key: "hawkeye" },
    // Wave 1 hero packs
    { name: "Thor", aspect: "Aggression", tier: "B", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Multiplayer", wave: 1, source: "Hero Pack", description: "Needs Asgard + minions to shine", key: "thor" },
    { name: "Black Widow", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["Control","Support"], optimization: "Multiplayer", wave: 1, source: "Hero Pack", description: "Encounter deck control", key: "widow" },
    { name: "Doctor Strange", aspect: "Protection", tier: "S+", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 1, source: "Hero Pack", description: "Invocation deck — unstoppable", key: "strange" },
    { name: "Hulk", aspect: "Aggression", tier: "C", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Solo", wave: 1, source: "Hero Pack", description: "4 card hand limit", key: "hulk" },
    { name: "Ms. Marvel", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 1, source: "Hero Pack", description: "Embiggen mechanics", key: "msmarvel" },
    // Galaxy's Most Wanted
    { name: "Groot", aspect: "Protection", tier: "C", complexity: "Beginner", playstyle: ["Support"], optimization: "Multiplayer", wave: 2, source: "Galaxy's Most Wanted", description: "Growth counters mechanic", key: "groot" },
    { name: "Rocket Raccoon", aspect: "Aggression", tier: "B", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Galaxy's Most Wanted", description: "Weapon upgrades", key: "rocket" },
    { name: "Ant-Man", aspect: "Leadership", tier: "A", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Size-change combos", key: "antman" },
    { name: "Wasp", aspect: "Aggression", tier: "C", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Inconsistent but fun", key: "wasp" },
    { name: "Quicksilver", aspect: "Protection", tier: "A", complexity: "Beginner", playstyle: ["All-rounder"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Always Be Running", key: "quicksilver" },
    { name: "Scarlet Witch", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 2, source: "Hero Pack", description: "Wild Magic chaos", key: "witch" },
    // Mad Titan's Shadow
    { name: "Adam Warlock", aspect: "Aggression", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Mad Titan's Shadow", description: "4 aspects + top deck manipulation", key: "warlock" },
    { name: "Spectrum", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Mad Titan's Shadow", description: "Three forms — total flexibility", key: "spectrum" },
    { name: "Star-Lord", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Solo", wave: 3, source: "Hero Pack", description: "Element Gun versatility", key: "starlord" },
    { name: "Gamora", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Solo", wave: 3, source: "Hero Pack", description: "Attack/thwart events", key: "gamora" },
    { name: "Drax", aspect: "Protection", tier: "C", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Retaliate fails vs big hits", key: "drax" },
    { name: "Venom", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Aggro","Resource Engine"], optimization: "Both", wave: 3, source: "Hero Pack", description: "High damage + wild resources", key: "venom" },
    { name: "Nebula", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Power counters", key: "nebula" },
    { name: "War Machine", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Multiplayer", wave: 3, source: "Hero Pack", description: "Heavy weapons platform", key: "warmachine" },
    { name: "Valkyrie", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Minion-focused fighter", key: "valkyrie" },
    { name: "Vision", aspect: "Protection", tier: "B", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 3, source: "Hero Pack", description: "Density manipulation", key: "vision" },
    // Sinister Motives
    { name: "Ghost-Spider", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Sinister Motives", description: "Multiverse web-slinging", key: "ghostspider" },
    { name: "Spider-Man (Miles)", aspect: "Protection", tier: "S", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Sinister Motives", description: "Venom blast + camouflage", key: "miles" },
    { name: "Nova", aspect: "Aggression", tier: "A", complexity: "Beginner", playstyle: ["Resource Engine","Aggro"], optimization: "Both", wave: 4, source: "Hero Pack", description: "Helmet resource + wild generation", key: "nova" },
    { name: "Ironheart", aspect: "Leadership", tier: "B", complexity: "Intermediate", playstyle: ["Setup"], optimization: "Multiplayer", wave: 4, source: "Hero Pack", description: "Tech upgrades platform", key: "ironheart" },
    { name: "Spider-Ham", aspect: "Justice", tier: "S+", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 4, source: "Hero Pack", description: "Toon Counters = extreme versatility", key: "spiderham" },
    { name: "SP//dr", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Resource Engine"], optimization: "Both", wave: 4, source: "Hero Pack", description: "3 hand size but great resources", key: "spdr" },
    // Mutant Genesis
    { name: "Colossus", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Mutant Genesis", description: "Metal form tank", key: "colossus" },
    { name: "Shadowcat", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 5, source: "Mutant Genesis", description: "Phasing through danger", key: "shadowcat" },
    { name: "Cyclops", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Multiplayer", wave: 5, source: "Hero Pack", description: "Tactical X-Men coordination", key: "cyclops" },
    { name: "Phoenix", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Unleashed/Restrained dual mode", key: "phoenix" },
    { name: "Wolverine", aspect: "Aggression", tier: "A", complexity: "Beginner", playstyle: ["Aggro"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Can you pay the health cost?", key: "wolverine" },
    { name: "Storm", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Weather manipulation", key: "storm" },
    { name: "Gambit", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Solo", wave: 5, source: "Hero Pack", description: "Explosive burst damage", key: "gambit" },
    { name: "Rogue", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 5, source: "Hero Pack", description: "Power absorption", key: "rogue" },
    // NeXt Evolution
    { name: "Cable", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 6, source: "NeXt Evolution", description: "Time manipulation", key: "cable" },
    { name: "Domino", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "NeXt Evolution", description: "Luck manipulation", key: "domino" },
    { name: "Psylocke", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "Hero Pack", description: "High-skill combos", key: "psylocke" },
    { name: "Angel", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 6, source: "Hero Pack", description: "Aerial support", key: "angel" },
    { name: "X-23", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 6, source: "Hero Pack", description: "Aggressive healing", key: "x23" },
    { name: "Deadpool", aspect: "Pool", tier: "B", complexity: "Advanced", playstyle: ["Aggro"], optimization: "Solo", wave: 6, source: "Hero Pack", description: "S+ solo, C multiplayer", key: "deadpool" },
    // Age of Apocalypse
    { name: "Bishop", aspect: "Justice", tier: "A", complexity: "Intermediate", playstyle: ["Resource Engine"], optimization: "Both", wave: 7, source: "Age of Apocalypse", description: "Energy absorption", key: "bishop" },
    { name: "Magik", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Age of Apocalypse", description: "Limbo manipulation", key: "magik" },
    { name: "Iceman", aspect: "Justice", tier: "S", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Hero Pack", description: "Prevents villain activations", key: "iceman" },
    { name: "Jubilee", aspect: "Justice", tier: "B", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 7, source: "Hero Pack", description: "Fireworks support", key: "jubilee" },
    { name: "Nightcrawler", aspect: "Protection", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Hero Pack", description: "Teleportation tactics", key: "nightcrawler" },
    { name: "Magneto", aspect: "Leadership", tier: "A", complexity: "Advanced", playstyle: ["Control"], optimization: "Both", wave: 7, source: "Hero Pack", description: "Magnetic mastery", key: "magneto" },
    // Agents of SHIELD
    { name: "Maria Hill", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 8, source: "Agents of S.H.I.E.L.D.", description: "SHIELD tactical command", key: "mariahill" },
    { name: "Nick Fury", aspect: "Justice", tier: "A", complexity: "Advanced", playstyle: ["All-rounder"], optimization: "Both", wave: 8, source: "Agents of S.H.I.E.L.D.", description: "SHIELD director", key: "nickfury" },
    { name: "Black Panther/Shuri", aspect: "Justice", tier: "B", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Both", wave: 8, source: "Hero Pack", description: "Dual Wakanda hero", key: "panthershuri" },
    { name: "Silk", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["Control"], optimization: "Both", wave: 8, source: "Hero Pack", description: "Web mechanics", key: "silk" },
    { name: "Falcon", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Support"], optimization: "Multiplayer", wave: 8, source: "Hero Pack", description: "Aerial tactics", key: "falcon" },
    { name: "Winter Soldier", aspect: "Leadership", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 8, source: "Hero Pack", description: "Weapons mastery", key: "wintersoldier" },
    // Civil War
    { name: "Hulkling", aspect: "Protection", tier: "A", complexity: "Intermediate", playstyle: ["All-rounder"], optimization: "Multiplayer", wave: 9, source: "Civil War", description: "Shape-shifting tank", key: "hulkling" },
    { name: "Tigra", aspect: "Aggression", tier: "A", complexity: "Intermediate", playstyle: ["Aggro"], optimization: "Both", wave: 9, source: "Civil War", description: "Feral combat", key: "tigra" }
  ];

  const villains = [
    { name: "Rhino", source: "Core Set", difficulty: 2, mechanics: "Attachment", description: "Beginner villain", key: "rhino" },
    { name: "Klaw", source: "Core Set", difficulty: 4, mechanics: "Minion Swarm", description: "Defense + minions", key: "klaw" },
    { name: "Ultron", source: "Core Set", difficulty: 6, mechanics: "Minion Swarm + Retaliate", description: "Drone spam benchmark", key: "ultron" },
    { name: "Crossbones", source: "Rise of Red Skull", difficulty: 3, mechanics: "Direct Damage", description: "Good difficulty bridge", key: "crossbones", campaignOrder: 1 },
    { name: "Absorbing Man", source: "Rise of Red Skull", difficulty: 4, mechanics: "Attachment Copy", description: "Copies hero traits", key: "absorbingman", campaignOrder: 2 },
    { name: "Taskmaster", source: "Rise of Red Skull", difficulty: 5, mechanics: "Side Schemes", description: "Initiative mimicry", key: "taskmaster", campaignOrder: 3 },
    { name: "Arnim Zola", source: "Rise of Red Skull", difficulty: 6, mechanics: "Minion Swarm", description: "Genetic modifications", key: "zola", campaignOrder: 4 },
    { name: "Red Skull", source: "Rise of Red Skull", difficulty: 7, mechanics: "Side Schemes", description: "Campaign boss — top 7 favorite", key: "redskull", campaignOrder: 5 },
    { name: "Collector I", source: "Galaxy's Most Wanted", difficulty: 5, mechanics: "Attachment", description: "Collection mechanics", key: "collector1", campaignOrder: 1 },
    { name: "Nebula (GMW)", source: "Galaxy's Most Wanted", difficulty: 7, mechanics: "Acceleration", description: "⚠️ Extreme surge — bottom 5", key: "nebula_gmw", campaignOrder: 2 },
    { name: "Ronan", source: "Galaxy's Most Wanted", difficulty: 10, mechanics: "Direct Damage + Overkill", description: "⚠️ HARDEST — 26% win rate", key: "ronan", campaignOrder: 3 },
    { name: "Collector II", source: "Galaxy's Most Wanted", difficulty: 6, mechanics: "Side Schemes", description: "Infinity gem collection", key: "collector2", campaignOrder: 4 },
    { name: "Thanos", source: "Mad Titan's Shadow", difficulty: 9, mechanics: "Acceleration + Direct Damage", description: "Infinity Stones — top 8 favorite", key: "thanos", campaignOrder: 1 },
    { name: "Hela", source: "Mad Titan's Shadow", difficulty: 6, mechanics: "Unique Questing", description: "#2 FAVORITE scenario", key: "hela", campaignOrder: 2 },
    { name: "Loki", source: "Mad Titan's Shadow", difficulty: 8, mechanics: "Multi-Stage", description: "Multiple versions + attrition", key: "loki", campaignOrder: 3 },
    { name: "Tower Defense", source: "Mad Titan's Shadow", difficulty: 5, mechanics: "Defense-focused", description: "Unique tower mechanics", key: "tower", campaignOrder: 4 },
    { name: "Sandman", source: "Sinister Motives", difficulty: 5, mechanics: "Transformation", description: "Shape-shifting villain", key: "sandman", campaignOrder: 1 },
    { name: "Venom Goblin", source: "Sinister Motives", difficulty: 9, mechanics: "Activation-based", description: "⚠️ 2nd HARDEST with Goblin Gear", key: "venomgoblin", campaignOrder: 2 },
    { name: "Mysterio", source: "Sinister Motives", difficulty: 6, mechanics: "Illusion", description: "Misdirection illusions", key: "mysterio", campaignOrder: 3 },
    { name: "Sinister Six", source: "Sinister Motives", difficulty: 7, mechanics: "Multi-villain", description: "Six villains at once", key: "sinistersix", campaignOrder: 4 },
    { name: "Magneto", source: "Mutant Genesis", difficulty: 8, mechanics: "Counter Management", description: "Magnetic counters + Sentinels", key: "magneto_villain", campaignOrder: 1 },
    { name: "Sabretooth", source: "Mutant Genesis", difficulty: 5, mechanics: "Aggression", description: "Feral combat", key: "sabretooth", campaignOrder: 2 },
    { name: "Mister Sinister", source: "Mutant Genesis", difficulty: 6, mechanics: "Cloning", description: "Genetic manipulation", key: "sinister", campaignOrder: 3 },
    { name: "Stryfe", source: "Mutant Genesis", difficulty: 7, mechanics: "Telepathy", description: "Psychic assault", key: "stryfe", campaignOrder: 4 },
    { name: "Mojo", source: "NeXt Evolution", difficulty: 5, mechanics: "Reality TV", description: "Show mechanics", key: "mojo", campaignOrder: 1 },
    { name: "Juggernaut", source: "NeXt Evolution", difficulty: 6, mechanics: "Momentum", description: "Unstoppable in motion", key: "juggernaut", campaignOrder: 2 },
    { name: "Sentinel Mark IV", source: "NeXt Evolution", difficulty: 6, mechanics: "Minion Swarm", description: "Mutant hunters", key: "sentinelmk", campaignOrder: 3 },
    { name: "Onslaught", source: "NeXt Evolution", difficulty: 7, mechanics: "Psychic", description: "Psychic fusion", key: "onslaught", campaignOrder: 4 },
    { name: "Apocalypse I", source: "Age of Apocalypse", difficulty: 7, mechanics: "Horsemen", description: "Age of Apocalypse phase 1", key: "apocalypse1", campaignOrder: 1 },
    { name: "Apocalypse II", source: "Age of Apocalypse", difficulty: 8, mechanics: "Horsemen", description: "Age of Apocalypse phase 2", key: "apocalypse2", campaignOrder: 2 },
    { name: "Apocalypse III", source: "Age of Apocalypse", difficulty: 8, mechanics: "Horsemen", description: "Age of Apocalypse phase 3", key: "apocalypse3", campaignOrder: 3 },
    { name: "Apocalypse IV", source: "Age of Apocalypse", difficulty: 9, mechanics: "Horsemen", description: "Age of Apocalypse final phase", key: "apocalypse4", campaignOrder: 4 },
    { name: "HYDRA Infiltration", source: "Agents of S.H.I.E.L.D.", difficulty: 5, mechanics: "Infiltration", description: "SHIELD compromised", key: "shield1", campaignOrder: 1 },
    { name: "Agent Ward", source: "Agents of S.H.I.E.L.D.", difficulty: 6, mechanics: "Betrayal", description: "Double agent", key: "shield2", campaignOrder: 2 },
    { name: "Graviton", source: "Agents of S.H.I.E.L.D.", difficulty: 7, mechanics: "Gravity Control", description: "Gravitational control", key: "shield3", campaignOrder: 3 },
    { name: "Hive", source: "Agents of S.H.I.E.L.D.", difficulty: 8, mechanics: "Infestation", description: "Inhuman parasite entity", key: "shield4", campaignOrder: 4 },
    { name: "Civil War Clash I", source: "Civil War", difficulty: 6, mechanics: "Hero vs Hero", description: "PvP phase 1", key: "civilwar1", campaignOrder: 1 },
    { name: "Civil War Clash II", source: "Civil War", difficulty: 7, mechanics: "Hero vs Hero", description: "PvP phase 2", key: "civilwar2", campaignOrder: 2 },
    { name: "Civil War Clash III", source: "Civil War", difficulty: 7, mechanics: "Hero vs Hero", description: "PvP phase 3", key: "civilwar3", campaignOrder: 3 },
    { name: "Civil War Final", source: "Civil War", difficulty: 8, mechanics: "Hero vs Hero", description: "PvP final confrontation", key: "civilwar4", campaignOrder: 4 },
    { name: "Green Goblin", source: "Green Goblin", difficulty: 7, mechanics: "Transformation", description: "#3 FAVORITE — transformation", key: "greengoblin" },
    { name: "Wrecking Crew", source: "Wrecking Crew", difficulty: 4, mechanics: "Team Fight", description: "No modulars — not recommended", key: "wreckingcrew" },
    { name: "Kang", source: "The Once and Future Kang", difficulty: 7, mechanics: "Multi-Stage + Time", description: "#1 FAVORITE — multiple variants", key: "kang" },
    { name: "The Hood", source: "The Hood", difficulty: 6, mechanics: "Crime Syndicate", description: "#6 favorite — high variance", key: "hood" },
    { name: "MojoMania", source: "MojoMania", difficulty: 6, mechanics: "Reality Show", description: "Unique entertainment scenario", key: "mojomania_villain" },
    { name: "Loki (Trickster)", source: "Trickster Takeover", difficulty: 7, mechanics: "Illusion + Trickery", description: "Master of deception", key: "trickster_villain" },
    { name: "Ultron (Synthezoid)", source: "Synthezoid Smackdown", difficulty: 8, mechanics: "Advanced AI", description: "Upgraded Ultron", key: "synthezoid_villain" }
  ];

  const modularSets = [
    { name: "Bomb Scare", difficulty: 1, source: "Core Set", key: "bombscare" },
    { name: "Masters of Evil", difficulty: 2, source: "Core Set", key: "mastersofevil" },
    { name: "Under Attack", difficulty: 3, source: "Core Set", key: "underattack" },
    { name: "Legions of Hydra", difficulty: 4, source: "Core Set", key: "hydra" },
    { name: "Doomsday Chair", difficulty: 5, source: "Core Set", key: "doomsdaychair" },
    { name: "Hydra Assault", difficulty: 3, source: "Rise of Red Skull", key: "hydraassault" },
    { name: "Hydra Patrol", difficulty: 4, source: "Rise of Red Skull", key: "hydrapatrol" },
    { name: "Weapon Master", difficulty: 3, source: "Rise of Red Skull", key: "weaponmaster" },
    { name: "Experimental Weapons", difficulty: 3, source: "Rise of Red Skull", key: "expweapons" },
    { name: "Kree Fanatic", difficulty: 5, source: "Galaxy's Most Wanted", key: "kreefanatic" },
    { name: "Space Pirates", difficulty: 3, source: "Galaxy's Most Wanted", key: "spacepirates" },
    { name: "Galactic Artifacts", difficulty: 4, source: "Galaxy's Most Wanted", key: "artifacts" },
    { name: "Band of Badoon", difficulty: 4, source: "Galaxy's Most Wanted", key: "badoon" },
    { name: "Black Order", difficulty: 4, source: "Mad Titan's Shadow", key: "blackorder" },
    { name: "Children of Thanos", difficulty: 4, source: "Mad Titan's Shadow", key: "childrenofthanos" },
    { name: "Infinity Gauntlet", difficulty: 5, source: "Mad Titan's Shadow", key: "gauntlet" },
    { name: "Legions of Hel", difficulty: 4, source: "Mad Titan's Shadow", key: "hel" },
    { name: "A Mess of Things", difficulty: 4, source: "Sinister Motives", key: "messofthings" },
    { name: "Power Drain", difficulty: 3, source: "Sinister Motives", key: "powerdrain" },
    { name: "Running Interference", difficulty: 3, source: "Sinister Motives", key: "interference" },
    { name: "Goblin Gear", difficulty: 5, source: "Sinister Motives", key: "goblingear" },
    { name: "Sinister Assault", difficulty: 4, source: "Sinister Motives", key: "sinisterassault" },
    { name: "Acolytes", difficulty: 4, source: "Mutant Genesis", key: "acolytes" },
    { name: "Brotherhood", difficulty: 4, source: "Mutant Genesis", key: "brotherhood" },
    { name: "Mutant Slayers", difficulty: 4, source: "Mutant Genesis", key: "slayers" },
    { name: "Sentinels", difficulty: 5, source: "Mutant Genesis", key: "sentinels" },
    { name: "X-Force", difficulty: 4, source: "NeXt Evolution", key: "xforce" },
    { name: "Mojoverse", difficulty: 3, source: "NeXt Evolution", key: "mojoverse" },
    { name: "Mutant Hunters", difficulty: 4, source: "NeXt Evolution", key: "mutanthunters" },
    { name: "Horsemen", difficulty: 5, source: "Age of Apocalypse", key: "horsemen" },
    { name: "Apocalypse's Forces", difficulty: 4, source: "Age of Apocalypse", key: "apocalypseforces" },
    { name: "Mission Schemes", difficulty: 3, source: "Age of Apocalypse", key: "missionschemes" },
    { name: "HYDRA Infiltrators", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "hydrainfiltrators" },
    { name: "Secret Warriors", difficulty: 3, source: "Agents of S.H.I.E.L.D.", key: "secretwarriors" },
    { name: "Inhumans", difficulty: 4, source: "Agents of S.H.I.E.L.D.", key: "inhumans" },
    { name: "Registration Act", difficulty: 4, source: "Civil War", key: "registration" },
    { name: "Divided Heroes", difficulty: 5, source: "Civil War", key: "dividedheroes" },
    { name: "Hero Conflicts", difficulty: 4, source: "Civil War", key: "heroconflicts" },
    { name: "Osborn Tech", difficulty: 3, source: "Green Goblin", key: "osborntech" },
    { name: "Goblin Gimmicks", difficulty: 4, source: "Green Goblin", key: "gimmicks" },
    { name: "Streets of New York", difficulty: 2, source: "Green Goblin", key: "streets" },
    { name: "Anachronauts", difficulty: 5, source: "The Once and Future Kang", key: "anachronauts" },
    { name: "Master of Time", difficulty: 5, source: "The Once and Future Kang", key: "mastertime" },
    { name: "Temporal", difficulty: 4, source: "The Once and Future Kang", key: "temporal" },
    { name: "Bystanders", difficulty: 2, source: "The Hood", key: "bystanders" },
    { name: "City in Chaos", difficulty: 3, source: "The Hood", key: "chaos" },
    { name: "Crime Syndicate", difficulty: 4, source: "The Hood", key: "syndicate" },
    { name: "Crossfire's Crew", difficulty: 4, source: "The Hood", key: "crossfire" },
    { name: "Wrecking Crew Modular", difficulty: 3, source: "The Hood", key: "wreckingmod" },
    { name: "Standard II", difficulty: 3, source: "The Hood", key: "standard2" },
    { name: "Expert II", difficulty: 4, source: "The Hood", key: "expert2" },
    { name: "Mojo's Arena", difficulty: 4, source: "MojoMania", key: "mojoarena" },
    { name: "Ratings Battle", difficulty: 3, source: "MojoMania", key: "ratings" },
    { name: "Loki's Illusions", difficulty: 4, source: "Trickster Takeover", key: "lokiillusions" },
    { name: "Asgardian Schemes", difficulty: 4, source: "Trickster Takeover", key: "asgardianschemes" },
    { name: "Advanced Drones", difficulty: 5, source: "Synthezoid Smackdown", key: "advanceddrones" },
    { name: "AI Protocols", difficulty: 4, source: "Synthezoid Smackdown", key: "aiprotocols" }
  ];

  const progressionGuide = [
    {
      phase: 1,
      nameEs: "Fase 1: Fundamentos",
      nameEn: "Phase 1: Foundation",
      descEs: "Aprender mecánicas básicas y construir card pool inicial",
      descEn: "Learn core mechanics and build initial card pool",
      items: [
        { key: "core", type: "campaign", modeEs: "Estándar: Rhino → Klaw → Ultron", modeEn: "Standard: Rhino → Klaw → Ultron", noteEs: "Aprender el juego", noteEn: "Learn the game" },
        { key: "heropacks_w1", type: "heroes", modeEs: "1 por aspecto (wave 1)", modeEn: "1 per aspect (wave 1)", noteEs: "Empezar card pool", noteEn: "Start building card pool" },
        { key: "riseofredskull", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "✨ Puente perfecto desde Core", noteEn: "✨ Perfect bridge from Core" },
        { key: "greengoblin", type: "scenario", modeEs: "Mutagen Formula", modeEn: "Mutagen Formula", noteEs: "⭐ #3 FAVORITO — 3 modulares excelentes", noteEn: "⭐ #3 FAVORITE — 3 excellent modulars" }
      ]
    },
    {
      phase: 2,
      nameEs: "Fase 2: Desafío Intermedio",
      nameEn: "Phase 2: Intermediate Challenge",
      descEs: "Expandir card pool y enfrentar mecánicas más complejas",
      descEn: "Expand card pool and face more complex mechanics",
      items: [
        { key: "heropacks_w2", type: "heroes", modeEs: "Diversificar aspectos", modeEn: "Diversify aspects", noteEs: "Continuar card pool", noteEn: "Keep building card pool" },
        { key: "sinistermotives", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "⭐ Una de las MEJORES expansiones", noteEn: "⭐ One of the BEST expansions" },
        { key: "hood", type: "scenario", modeEs: "Variedad modular", modeEn: "Modular variety", noteEs: "⭐ 9 modulares + Standard/Expert II", noteEn: "⭐ 9 modulars + Standard/Expert II" },
        { key: "kang", type: "scenario", modeEs: "Multiplayer recomendado", modeEn: "Multiplayer recommended", noteEs: "⭐⭐ #1 FAVORITO — Solo: muy largo", noteEn: "⭐⭐ #1 FAVORITE — Solo: very long" },
        { key: "nextevolution", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "Caja X-Men más fácil", noteEn: "Easier X-Men box" }
      ]
    },
    {
      phase: 3,
      nameEs: "Fase 3: Contenido Avanzado",
      nameEn: "Phase 3: Advanced Content",
      descEs: "Card pool grande, enfrentar desafíos mayores",
      descEn: "Large card pool, face greater challenges",
      items: [
        { key: "mutantgenesis", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "⭐ MEJOR caja X-Men. Magneto es difícil", noteEn: "⭐ BEST X-Men box. Magneto is tough" },
        { key: "mojomania", type: "scenario", modeEs: "Escenario único", modeEn: "Unique scenario", noteEs: "Mecánicas de reality show", noteEn: "Reality show mechanics" },
        { key: "ageofapocalypse", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "⭐ Escenarios excelentes", noteEn: "⭐ Excellent scenarios" },
        { key: "agentsofshield", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "Contenido reciente (Feb 2025)", noteEn: "Recent content (Feb 2025)" }
      ]
    },
    {
      phase: 4,
      nameEs: "Fase 4: Maestría Final",
      nameEn: "Phase 4: Final Mastery",
      descEs: "Los desafíos más duros del juego",
      descEn: "The hardest challenges in the game",
      items: [
        { key: "madtitansshadow", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "⭐ Dificultad aumentada. Thanos y Hela = PEAK", noteEn: "⭐ High difficulty. Thanos & Hela = PEAK" },
        { key: "civilwar", type: "campaign", modeEs: "Expert", modeEn: "Expert", noteEs: "⚔️ PvP único", noteEn: "⚔️ Unique PvP" },
        { key: "trickster", type: "scenario", modeEs: "Escenario Loki", modeEn: "Loki scenario", noteEs: "Mecánicas de engaño", noteEn: "Trickery mechanics" },
        { key: "synthezoid", type: "scenario", modeEs: "Ultron mejorado", modeEn: "Upgraded Ultron", noteEs: "Desafío AI avanzado", noteEn: "Advanced AI challenge" },
        { key: "galaxysmostwanted", type: "campaign", modeEs: "Expert — ¡ÚLTIMO!", modeEn: "Expert — LAST!", noteEs: "⚠️⚠️ PEOR contenido. Ronan 26% win rate", noteEn: "⚠️⚠️ WORST content. Ronan 26% win rate" },
        { key: "wreckingcrew", type: "scenario", modeEs: "Solo completionistas", modeEn: "Completionists only", noteEs: "❌ No recomendado", noteEn: "❌ Not recommended" }
      ]
    }
  ];

  // Utility: get all owned content source names from collection
  function getOwnedSources(collection) {
    const sources = new Set();
    collection.campaigns.forEach(key => {
      const c = campaigns.find(c => c.key === key);
      if (c) sources.add(c.name);
    });
    collection.scenarioPacks.forEach(key => {
      const p = scenarioPacks.find(p => p.key === key);
      if (p) sources.add(p.name);
    });
    return sources;
  }

  function getAvailableHeroes(collection) {
    const sources = getOwnedSources(collection);
    return heroes.filter(h => {
      if (h.source === "Hero Pack") return collection.heroPacks.includes(h.key);
      return sources.has(h.source);
    });
  }

  function getAvailableVillains(collection) {
    const sources = getOwnedSources(collection);
    return villains.filter(v => sources.has(v.source));
  }

  function getAvailableModulars(collection) {
    const sources = getOwnedSources(collection);
    return modularSets.filter(m => sources.has(m.source));
  }

  return {
    campaigns, scenarioPacks, heroPacks, heroes, villains, modularSets, progressionGuide,
    getOwnedSources, getAvailableHeroes, getAvailableVillains, getAvailableModulars
  };
})();
