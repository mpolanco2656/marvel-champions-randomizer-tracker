// Marvel Champions — Randomizer Tab
const { useState, useContext } = React;

function RandomizerTab() {
  const { collection, history, setHistory, t, lang } = useContext(MCContext);
  const { getAvailableHeroes, getAvailableVillains, getAvailableModulars } = MCData;

  // Filters
  const [playerCount, setPlayerCount] = useState(2);
  const [difficulty, setDifficulty] = useState('Any');
  const [complexity, setComplexity] = useState('Any');
  const [playstyle, setPlaystyle] = useState('Any');
  const [tier, setTier] = useState('Any');
  const [optimization, setOptimization] = useState('Any');
  const [aspect, setAspect] = useState('Any');
  const [modularCount, setModularCount] = useState(2);
  const [thematic, setThematic] = useState(false);
  const [onlyUnplayed, setOnlyUnplayed] = useState(false);

  // Results
  const [heroes, setHeroes] = useState([]);
  const [villain, setVillain] = useState(null);
  const [modulars, setModulars] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  const playedHeroKeys = new Set(history.flatMap(g => g.heroes));

  function filterHeroes() {
    let pool = getAvailableHeroes(collection);
    if (onlyUnplayed) pool = pool.filter(h => !playedHeroKeys.has(h.key));
    if (complexity !== 'Any') pool = pool.filter(h => h.complexity === complexity);
    if (playstyle !== 'Any') pool = pool.filter(h => h.playstyle.includes(playstyle));
    if (tier !== 'Any') pool = pool.filter(h => h.tier === tier);
    if (optimization !== 'Any') pool = pool.filter(h => h.optimization === optimization || h.optimization === 'Both');
    if (aspect !== 'Any') pool = pool.filter(h => h.aspect === aspect);
    return pool;
  }

  function filterVillains() {
    let pool = getAvailableVillains(collection);
    if (difficulty === 'Easy') pool = pool.filter(v => v.difficulty <= 3);
    else if (difficulty === 'Medium') pool = pool.filter(v => v.difficulty >= 4 && v.difficulty <= 6);
    else if (difficulty === 'Hard') pool = pool.filter(v => v.difficulty >= 7 && v.difficulty <= 8);
    else if (difficulty === 'Expert') pool = pool.filter(v => v.difficulty >= 9);
    return pool;
  }

  function pickModulars(availableModulars, pickedVillain, count) {
    if (!availableModulars.length) return [];
    if (thematic && pickedVillain) {
      const spiderKeys = ['messofthings','powerdrain','interference','osborntech','gimmicks','streets','goblingear'];
      const spiderVillains = ['greengoblin','venomgoblin','mysterio','sinistersix'];
      if (pickedVillain.key === 'venomgoblin') {
        const gg = availableModulars.find(m => m.key === 'goblingear');
        if (gg) {
          const rest = availableModulars.filter(m => m.key !== 'goblingear').sort(() => Math.random() - 0.5);
          return [gg, ...rest].slice(0, count);
        }
      }
      if (spiderVillains.includes(pickedVillain.key)) {
        const themed = availableModulars.filter(m => spiderKeys.includes(m.key));
        const others = availableModulars.filter(m => !spiderKeys.includes(m.key));
        return [...themed, ...others].sort(() => Math.random() - 0.5).slice(0, count);
      }
    }
    return [...availableModulars].sort(() => Math.random() - 0.5).slice(0, count);
  }

  function computeWarnings(pickedHeroes, pickedVillain) {
    const w = [], s = [];
    if (playerCount === 2 && pickedHeroes.length === 2) {
      const aspects = pickedHeroes.map(h => h.aspect);
      if (aspects.includes('Aggression') && aspects.includes('Protection') && !aspects.includes('Justice'))
        w.push(t('warnThreat'));
    }
    if (playerCount > 1 && pickedHeroes.some(h => h.key === 'deadpool'))
      w.push(t('warnDeadpool'));
    const setupHeroes = pickedHeroes.filter(h => h.playstyle.includes('Setup'));
    if (setupHeroes.length > 1) w.push(t('warnSetup').replace('{heroes}', setupHeroes.map(h => h.name).join(', ')));
    if (pickedVillain) {
      if (pickedVillain.key === 'ronan') w.push(t('warnRonan'));
      else if (pickedVillain.key === 'venomgoblin') s.push(t('suggestVenomGoblin'));
      else if (pickedVillain.key === 'magneto_villain') s.push(t('suggestMagneto'));
      else if (pickedVillain.key === 'nebula_gmw') w.push(t('warnNebula'));
      if (pickedVillain.difficulty >= 8) {
        const tierVals = { 'S+':5,'S':4,'A':3,'B':2,'C':1 };
        const avg = pickedHeroes.reduce((sum,h) => sum + (tierVals[h.tier]||2),0) / (pickedHeroes.length||1);
        if (avg < 3) s.push(t('suggestDifficulty').replace('{diff}', pickedVillain.difficulty));
      }
    }
    if (playerCount > 2) {
      const solo = pickedHeroes.filter(h => h.optimization === 'Solo');
      if (solo.length > 0) s.push(t('suggestSolo').replace('{heroes}', solo.map(h=>h.name).join(', ')).replace('{n}', playerCount));
    }
    return { w, s };
  }

  function generate() {
    const heroPool = filterHeroes();
    const villainPool = filterVillains();
    const modularPool = getAvailableModulars(collection);
    if (!heroPool.length || !villainPool.length) return;

    setGenerating(true);
    setRevealed(false);

    setTimeout(() => {
      const pickedHeroes = [...heroPool].sort(() => Math.random() - 0.5).slice(0, playerCount);
      const pickedVillain = villainPool[Math.floor(Math.random() * villainPool.length)];
      const pickedModulars = pickModulars(modularPool, pickedVillain, modularCount);
      const { w, s } = computeWarnings(pickedHeroes, pickedVillain);

      setHeroes(pickedHeroes);
      setVillain(pickedVillain);
      setModulars(pickedModulars);
      setWarnings(w);
      setSuggestions(s);
      setSaved(false);
      setGenerating(false);
      setRevealed(true);
    }, 320);
  }

  function saveGame(result) {
    if (!heroes.length || !villain) return;
    const game = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      heroes: heroes.map(h => h.key),
      villain: villain.key,
      modulars: modulars.map(m => m.key),
      result
    };
    setHistory([game, ...history]);
    setSaved(true);
  }

  const hasResult = heroes.length > 0 && villain;
  const noHeroes = !getAvailableHeroes(collection).length;
  const noVillains = !getAvailableVillains(collection).length;

  const diffOpts = [
    { value:'Any', label: t('any') },
    { value:'Easy', label: t('easy') + ' (1-3)' },
    { value:'Medium', label: t('medium') + ' (4-6)' },
    { value:'Hard', label: t('hard') + ' (7-8)' },
    { value:'Expert', label: t('expert') + ' (9-10)' }
  ];
  const complexOpts = [
    { value:'Any', label:t('any') }, { value:'Beginner',label:'Beginner'},
    { value:'Intermediate',label:'Intermediate'},{ value:'Advanced',label:'Advanced'}
  ];
  const tierOpts = [
    {value:'Any',label:t('any')},{value:'S+',label:'S+'},{value:'S',label:'S'},
    {value:'A',label:'A'},{value:'B',label:'B'},{value:'C',label:'C'}
  ];
  const playstyleOpts = [
    {value:'Any',label:t('any')},{value:'Aggro',label:'Aggro'},{value:'Control',label:'Control'},
    {value:'All-rounder',label:'All-rounder'},{value:'Support',label:'Support'},
    {value:'Resource Engine',label:'Resource Engine'},{value:'Setup',label:'Setup'}
  ];
  const optOpts = [
    {value:'Any',label:t('any')},{value:'Solo',label:'Solo'},{value:'Multiplayer',label:'Multiplayer'}
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>

      {/* Warning: empty collection */}
      {(noHeroes || noVillains) && (
        <div style={{ background:'rgba(192,57,43,0.12)', border:'1px solid rgba(192,57,43,0.3)', borderRadius:'8px', padding:'12px 16px', fontSize:'13px', color:'#e88070' }}>
          {t('emptyCollectionMsg')}
        </div>
      )}

      {/* Filter panel */}
      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'12px', padding:'18px 20px' }}>
        <SectionHeading>{t('filters')}</SectionHeading>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'16px', alignItems:'flex-end' }}>
          <PlayerCountPicker value={playerCount} onChange={setPlayerCount} label={t('players')} />
          <FilterSelect label={t('vilDifficulty')} value={difficulty} onChange={setDifficulty} options={diffOpts} />
          <FilterSelect label={t('heroComplexity')} value={complexity} onChange={setComplexity} options={complexOpts} />
          <FilterSelect label={t('playstyle')} value={playstyle} onChange={setPlaystyle} options={playstyleOpts} />
          <FilterSelect label={t('tier')} value={tier} onChange={setTier} options={tierOpts} />
          <FilterSelect label={t('optimization')} value={optimization} onChange={setOptimization} options={optOpts} />
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            <label style={{ fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.08em', color:'#424866' }}>{t('aspect')}</label>
            <div style={{ display:'flex', gap:'5px', flexWrap:'wrap' }}>
              {['Any','Leadership','Justice','Aggression','Protection','Pool'].map(a => {
                const ac = ASPECT_COLORS[a];
                const isActive = aspect === a;
                return (
                  <button key={a} onClick={() => setAspect(a)} style={{
                    padding:'5px 10px', borderRadius:'6px', fontSize:'11px', fontWeight:700,
                    cursor:'pointer', transition:'all 0.15s ease',
                    border: isActive ? `1px solid ${ac ? ac.border : '#d4a20a'}` : '1px solid rgba(255,255,255,0.1)',
                    background: isActive ? (ac ? ac.bg : 'rgba(212,162,10,0.15)') : '#0d1020',
                    color: isActive ? (ac ? ac.text : '#d4a20a') : '#5a6080',
                    letterSpacing:'0.03em'
                  }}>{a === 'Any' ? t('any') : a}</button>
                );
              })}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            <label style={{ fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.08em', color:'#424866' }}>{t('modularSets')}</label>
            <div style={{ display:'flex', gap:'5px' }}>
              {[1,2,3,4].map(n=>(
                <button key={n} onClick={()=>setModularCount(n)} style={{
                  width:'36px',height:'36px',borderRadius:'6px',border:`1px solid ${modularCount===n?'#d4a20a':'rgba(255,255,255,0.1)'}`,
                  background:modularCount===n?'rgba(212,162,10,0.2)':'#0d1020',
                  color:modularCount===n?'#d4a20a':'#7b82a8',fontWeight:700,fontSize:'14px',cursor:'pointer'
                }}>{n}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:'20px', marginTop:'14px', flexWrap:'wrap' }}>
          <Toggle checked={thematic} onChange={setThematic} label={t('thematicPairing')} />
          <Toggle checked={onlyUnplayed} onChange={setOnlyUnplayed} label={t('onlyUnplayed')} />
        </div>
      </div>

      {/* Generate button */}
      <div style={{ display:'flex', justifyContent:'center' }}>
        <button
          onClick={generate}
          disabled={generating || noHeroes || noVillains}
          style={{
            background: generating ? 'rgba(212,162,10,0.3)' : 'linear-gradient(135deg, #c0392b 0%, #d4a20a 100%)',
            border:'none', borderRadius:'10px', padding:'16px 48px',
            color:'#fff', fontFamily:'"Bebas Neue", cursive', fontSize:'22px', letterSpacing:'0.12em',
            cursor: generating ? 'not-allowed' : 'pointer',
            boxShadow: generating ? 'none' : '0 4px 20px rgba(212,162,10,0.3)',
            transition:'all 0.2s ease', opacity: generating ? 0.7 : 1,
            transform: generating ? 'scale(0.98)' : 'scale(1)',
            whiteSpace: 'nowrap'
          }}
        >
          {generating ? '⚡ ' + t('generating') + '...' : '⚡ ' + t('generate')}
        </button>
      </div>

      {/* Results */}
      {hasResult && (
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

          {/* Villain + Modulars row */}
          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            {/* Villain */}
            <div style={{ display:'flex', flexDirection:'column', gap:'6px', minWidth:'220px', flex:'0 0 auto' }}>
              <SectionHeading accent="#e74c3c">{t('villain')}</SectionHeading>
              <VillainCard villain={villain} revealed={revealed} />
            </div>
            {/* Modulars */}
            <div style={{ flex:1, minWidth:'200px' }}>
              <SectionHeading accent="#d4a20a">{t('modularSets')} ({modulars.length})</SectionHeading>
              <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                {modulars.map((m,i) => <ModularCard key={m.key} modular={m} index={i} revealed={revealed} />)}
                {modulars.length === 0 && <div style={{ fontSize:'13px', color:'#424866' }}>{t('noModulars')}</div>}
              </div>
            </div>
          </div>

          {/* Heroes */}
          <div>
            <SectionHeading accent="#5dade2">{t('heroes')} ({heroes.length})</SectionHeading>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              {heroes.map((h,i) => <HeroCard key={h.key} hero={h} index={i} revealed={revealed} />)}
            </div>
          </div>

          {/* Warnings */}
          {(warnings.length > 0 || suggestions.length > 0) && (
            <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              <AlertBanner items={warnings} type="warning" />
              <AlertBanner items={suggestions} type="suggestion" />
            </div>
          )}

          {/* Save controls */}
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center' }}>
            {saved ? (
              <div style={{ fontSize:'13px', color:'#2ecc71', display:'flex', alignItems:'center', gap:'6px' }}>
                <span>✓</span> {t('saved')}
              </div>
            ) : (
              <>
                <span style={{ fontSize:'12px', color:'#5a6080' }}>{t('recordResult')}</span>
                <button onClick={() => saveGame('win')} style={{
                  background:'rgba(39,174,96,0.15)', border:'1px solid rgba(39,174,96,0.4)',
                  color:'#2ecc71', borderRadius:'6px', padding:'7px 18px', fontSize:'13px',
                  fontWeight:700, cursor:'pointer'
                }}>✓ {t('win')}</button>
                <button onClick={() => saveGame('loss')} style={{
                  background:'rgba(192,57,43,0.15)', border:'1px solid rgba(192,57,43,0.4)',
                  color:'#e74c3c', borderRadius:'6px', padding:'7px 18px', fontSize:'13px',
                  fontWeight:700, cursor:'pointer'
                }}>✗ {t('loss')}</button>
                <button onClick={() => saveGame(undefined)} style={{
                  background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
                  color:'#7b82a8', borderRadius:'6px', padding:'7px 18px', fontSize:'13px',
                  cursor:'pointer'
                }}>{t('saveNoResult')}</button>
              </>
            )}
          </div>
        </div>
      )}

      {!hasResult && !generating && (
        <EmptyState message={t('readyToGenerate')} sub={t('configureFilters')} />
      )}
    </div>
  );
}

Object.assign(window, { RandomizerTab });
