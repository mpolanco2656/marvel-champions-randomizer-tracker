import type { ProgressionPhase } from '../types';

export const progressionGuideEn: ProgressionPhase[] = [
  {
    name: "Phase 1: Fundamentals",
    description: "Learn basic mechanics and build initial card pool",
    items: [
      { name: "Core Set", type: "campaign", mode: "Standard: Rhino → Klaw → Ultron", note: "Learn the game", key: "core" },
      { name: "Core Set", type: "campaign", mode: "Expert for practice", note: "Master Expert mode", key: "core" },
      { name: "4 Hero Packs", type: "heroes", mode: "1 per aspect", note: "Start building card pool", key: "heropacks1" },
      { name: "Rise of Red Skull", type: "campaign", mode: "Expert", note: "✨ Perfect bridge from Core. Must play #1 expansion", key: "riseofredskull" },
      { name: "Green Goblin", type: "scenario", mode: "Mutagen Formula", note: "⭐ #3 FAVORITE. 3 excellent Spider-Man modulars", key: "greengoblin" }
    ]
  },
  {
    name: "Phase 2: Intermediate Challenge",
    description: "Expand card pool and face more complex mechanics",
    items: [
      { name: "4-6 Hero Packs", type: "heroes", mode: "Diversify aspects", note: "Continue building card pool", key: "heropacks2" },
      { name: "Sinister Motives", type: "campaign", mode: "Expert", note: "⭐ One of the BEST expansions. Venom Goblin is brutal", key: "sinistermotives" },
      { name: "The Hood", type: "scenario", mode: "Modular variety", note: "⭐ 9 modulars + Standard/Expert II. Makes everything more interesting", key: "hood" },
      { name: "The Once and Future Kang", type: "scenario", mode: "If playing multiplayer", note: "⭐⭐ #1 FAVORITE. For solo: optional (very long)", key: "kang" },
      { name: "NeXt Evolution", type: "campaign", mode: "Expert", note: "Easier X-Men box. Interesting Juggernaut", key: "nextevolution" }
    ]
  },
  {
    name: "Phase 3: Advanced Content",
    description: "Large card pool, face greater challenges",
    items: [
      { name: "4-6 Hero Packs", type: "heroes", mode: "Complete aspects", note: "Robust card pool for Expert", key: "heropacks3" },
      { name: "Mutant Genesis", type: "campaign", mode: "Expert", note: "⭐ BEST X-Men box. Magneto is difficult", key: "mutantgenesis" },
      { name: "MojoMania", type: "scenario", mode: "Unique scenario", note: "Reality show mechanics", key: "mojomania" },
      { name: "Age of Apocalypse", type: "campaign", mode: "Expert", note: "⭐ Excellent scenarios. Bishop/Magik top-tier", key: "ageofapocalypse" },
      { name: "Agents of S.H.I.E.L.D.", type: "campaign", mode: "Expert", note: "Recent content (Feb 2025)", key: "agentsofshield" }
    ]
  },
  {
    name: "Phase 4: Final Mastery",
    description: "The hardest challenges in the game",
    items: [
      { name: "Remaining Hero Packs", type: "heroes", mode: "Complete collection", note: "Complete card pool for maximum flexibility", key: "heropacks4" },
      { name: "Trickster Takeover", type: "scenario", mode: "Loki scenario", note: "Deception mechanics", key: "trickster" },
      { name: "Mad Titan's Shadow", type: "campaign", mode: "Expert", note: "⭐ Increased difficulty. Thanos and Hela = PEAK", key: "madtitansshadow" },
      { name: "Civil War", type: "campaign", mode: "Expert", note: "⚔️ Unique PvP (October 2025)", key: "civilwar" },
      { name: "Synthezoid Smackdown", type: "scenario", mode: "Enhanced Ultron", note: "Advanced AI challenge (Dec 2025)", key: "synthezoid" },
      { name: "Galaxy's Most Wanted", type: "campaign", mode: "Expert - LAST!", note: "⚠️⚠️ WORST content. Ronan 26% win. Save for last", key: "galaxysmostwanted" },
      { name: "Wrecking Crew", type: "scenario", mode: "Completionists only", note: "❌ Not recommended - always plays the same without modulars", key: "wreckingcrew" }
    ]
  }
];
