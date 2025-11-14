import type { ProgressionPhase } from '../types';

export const progressionGuide: ProgressionPhase[] = [
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
