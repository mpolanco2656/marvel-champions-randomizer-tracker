// Marvel Champions — Collection, Campaign, History, Progression Tabs
const { useState, useContext } = React;

// ══════════════════════════════════════════════════════════════
// COLLECTION TAB
// ══════════════════════════════════════════════════════════════
function CollectionTab() {
  const { collection, setCollection, t } = useContext(MCContext);
  const { campaigns, scenarioPacks, heroPacks, getAvailableHeroes, getAvailableVillains, getAvailableModulars } = MCData;
  const [section, setSection] = useState('campaigns');

  function toggleCampaign(key) {
    const has = collection.campaigns.includes(key);
    if (key === 'core') return; // Core always owned
    setCollection({ ...collection, campaigns: has ? collection.campaigns.filter(k=>k!==key) : [...collection.campaigns, key] });
  }
  function toggleScenario(key) {
    const has = collection.scenarioPacks.includes(key);
    setCollection({ ...collection, scenarioPacks: has ? collection.scenarioPacks.filter(k=>k!==key) : [...collection.scenarioPacks, key] });
  }
  function toggleHeroPack(key) {
    const has = collection.heroPacks.includes(key);
    setCollection({ ...collection, heroPacks: has ? collection.heroPacks.filter(k=>k!==key) : [...collection.heroPacks, key] });
  }
  function selectAll() {
    setCollection({
      campaigns: campaigns.map(c=>c.key),
      scenarioPacks: scenarioPacks.map(p=>p.key),
      heroPacks: heroPacks.map(p=>p.key)
    });
  }
  function resetToCore() {
    setCollection({ campaigns:['core'], scenarioPacks:[], heroPacks:[] });
  }

  const availHeroes = getAvailableHeroes(collection).length;
  const availVillains = getAvailableVillains(collection).length;
  const availModulars = getAvailableModulars(collection).length;

  const tabs = ['campaigns','scenarios','heroPacks'];
  const tabLabels = { campaigns: t('campaigns'), scenarios: t('scenarioPacks'), heroPacks: t('heroPacks') };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
      {/* Stats overview */}
      <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
        {[
          { label:t('heroes'), val:availHeroes, total: MCData.heroes.length, color:'#5dade2' },
          { label:t('villains'), val:availVillains, total: MCData.villains.length, color:'#e74c3c' },
          { label:t('modulars'), val:availModulars, total: MCData.modularSets.length, color:'#d4a20a' },
        ].map(s => (
          <div key={s.label} style={{
            background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:'10px', padding:'12px 18px', minWidth:'120px', flex:1
          }}>
            <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'28px', color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:'11px', color:'#5a6080', marginTop:'2px', textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
            <div style={{ marginTop:'8px', height:'3px', background:'rgba(255,255,255,0.06)', borderRadius:'2px', overflow:'hidden' }}>
              <div style={{ width:`${(s.val/s.total)*100}%`, height:'100%', background:s.color, borderRadius:'2px' }}></div>
            </div>
            <div style={{ fontSize:'10px', color:'#353d5c', marginTop:'3px' }}>{s.val} / {s.total}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
        <button onClick={selectAll} style={{ background:'rgba(212,162,10,0.15)', border:'1px solid rgba(212,162,10,0.3)', color:'#d4a20a', borderRadius:'6px', padding:'8px 16px', fontSize:'12px', fontWeight:700, cursor:'pointer' }}>{t('selectAll')}</button>
        <button onClick={resetToCore} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', color:'#7b82a8', borderRadius:'6px', padding:'8px 16px', fontSize:'12px', cursor:'pointer' }}>{t('coreOnly')}</button>
      </div>

      {/* Section tabs */}
      <div style={{ display:'flex', gap:'0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        {tabs.map(tab => (
          <button key={tab} onClick={()=>setSection(tab)} style={{
            background:'none', border:'none', borderBottom: section===tab ? '2px solid #d4a20a' : '2px solid transparent',
            color: section===tab ? '#d4a20a' : '#5a6080', padding:'10px 16px', fontSize:'13px',
            cursor:'pointer', fontWeight: section===tab ? 700 : 400, transition:'all 0.15s ease',
            marginBottom:'-1px'
          }}>{tabLabels[tab]}</button>
        ))}
      </div>

      {/* Campaign grid */}
      {section === 'campaigns' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'10px' }}>
          {campaigns.map(c => {
            const owned = collection.campaigns.includes(c.key);
            const isCore = c.key === 'core';
            return (
              <div key={c.key} onClick={()=>toggleCampaign(c.key)} style={{
                background: owned ? 'rgba(212,162,10,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${owned ? 'rgba(212,162,10,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius:'10px', padding:'14px 16px', cursor: isCore ? 'not-allowed' : 'pointer',
                transition:'all 0.2s ease', opacity: isCore ? 0.8 : 1,
                display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'10px'
              }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'16px', color: owned ? '#d4a20a' : '#c0c8e8', letterSpacing:'0.03em', lineHeight:1.2, wordBreak:'break-word' }}>{c.name}</div>
                  <div style={{ fontSize:'11px', color:'#5a6080', marginTop:'4px' }}>{t('wave')} {c.wave} · {c.villains.length} {t('villains').toLowerCase()}</div>
                </div>
                <div style={{
                  width:'22px', height:'22px', borderRadius:'50%', flexShrink:0, marginTop:'2px',
                  background: owned ? '#d4a20a' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${owned ? '#d4a20a' : 'rgba(255,255,255,0.15)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px'
                }}>{owned ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scenario packs grid */}
      {section === 'scenarios' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'10px' }}>
          {scenarioPacks.map(p => {
            const owned = collection.scenarioPacks.includes(p.key);
            return (
              <div key={p.key} onClick={()=>toggleScenario(p.key)} style={{
                background: owned ? 'rgba(41,128,185,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${owned ? 'rgba(41,128,185,0.4)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius:'10px', padding:'14px 16px', cursor:'pointer',
                transition:'all 0.2s ease',
                display:'flex', justifyContent:'space-between', alignItems:'center', gap:'10px'
              }}>
                <div>
                  <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'16px', color: owned ? '#5dade2' : '#c0c8e8', letterSpacing:'0.03em' }}>{p.name}</div>
                  <div style={{ fontSize:'11px', color:'#5a6080', marginTop:'3px' }}>{t('wave')} {p.wave}</div>
                </div>
                <div style={{
                  width:'22px', height:'22px', borderRadius:'50%', flexShrink:0,
                  background: owned ? '#2980b9' : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${owned ? '#2980b9' : 'rgba(255,255,255,0.15)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color:'#fff'
                }}>{owned ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hero packs grid */}
      {section === 'heroPacks' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(170px, 1fr))', gap:'10px' }}>
          {heroPacks.map(p => {
            const owned = collection.heroPacks.includes(p.key);
            const hero = MCData.heroes.find(h => h.key === p.key);
            const ac = hero ? ASPECT_COLORS[hero.aspect] : null;
            return (
              <div key={p.key} onClick={()=>toggleHeroPack(p.key)} style={{
                background: owned && ac ? ac.bg : 'rgba(255,255,255,0.02)',
                border: `1px solid ${owned && ac ? ac.border + '66' : 'rgba(255,255,255,0.07)'}`,
                borderRadius:'10px', padding:'12px 14px', cursor:'pointer', transition:'all 0.2s ease',
                display:'flex', justifyContent:'space-between', alignItems:'center', gap:'8px'
              }}>
                <div>
                  <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'15px', color: owned && ac ? ac.text : '#c0c8e8', letterSpacing:'0.03em', lineHeight:1.2 }}>{p.name}</div>
                  {hero && <div style={{ marginTop:'4px' }}><AspectBadge aspect={hero.aspect} small /></div>}
                  <div style={{ fontSize:'10px', color:'#5a6080', marginTop:'4px' }}>{t('wave')} {p.wave}</div>
                </div>
                <div style={{
                  width:'20px', height:'20px', borderRadius:'50%', flexShrink:0,
                  background: owned && ac ? ac.border : 'rgba(255,255,255,0.06)',
                  border: `2px solid ${owned && ac ? ac.border : 'rgba(255,255,255,0.15)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', color:'#fff'
                }}>{owned ? '✓' : ''}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// CAMPAIGN TAB
// ══════════════════════════════════════════════════════════════
function CampaignTab() {
  const { collection, t } = useContext(MCContext);
  const { campaigns, villains, getAvailableModulars, getAvailableVillains } = MCData;
  const [mode, setMode] = useState('A');
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [modularCount, setModularCount] = useState(2);
  const [thematic, setThematic] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [completed, setCompleted] = useState({});
  const [generated, setGenerated] = useState(false);

  const ownedCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));
  const availModulars = getAvailableModulars(collection);
  const availVillains = getAvailableVillains(collection);

  function pickModulars(count) {
    return [...availModulars].sort(() => Math.random() - 0.5).slice(0, count);
  }

  function generateCampaign() {
    if (!selectedCampaign) return;
    const campaign = campaigns.find(c => c.key === selectedCampaign);
    if (!campaign) return;
    const built = campaign.villains.map((vKey, i) => {
      const villain = villains.find(v => v.key === vKey);
      return { villain, modulars: pickModulars(modularCount), index: i };
    });
    setScenarios(built);
    setCompleted({});
    setGenerated(true);
  }

  function generateMix() {
    if (availVillains.length === 0) return;
    const shuffled = [...availVillains].sort(() => Math.random() - 0.5).slice(0, 5);
    const built = shuffled.map((villain, i) => ({ villain, modulars: pickModulars(modularCount), index: i }));
    setScenarios(built);
    setCompleted({});
    setGenerated(true);
  }

  function rerollModulars(idx) {
    setScenarios(prev => prev.map((s, i) => i === idx ? { ...s, modulars: pickModulars(modularCount) } : s));
  }

  function toggleComplete(idx) {
    setCompleted(prev => ({ ...prev, [idx]: !prev[idx] }));
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
      {/* Mode toggle */}
      <div style={{ display:'flex', gap:'0', background:'rgba(255,255,255,0.03)', borderRadius:'10px', padding:'4px', width:'fit-content', border:'1px solid rgba(255,255,255,0.06)' }}>
        {[['A', '📘 ' + t('campaignMode')], ['B', '🎲 ' + t('mixMode')]].map(([key, label]) => (
          <button key={key} onClick={() => { setMode(key); setGenerated(false); setScenarios([]); }} style={{
            background: mode===key ? 'rgba(212,162,10,0.2)' : 'none',
            border: mode===key ? '1px solid rgba(212,162,10,0.4)' : '1px solid transparent',
            borderRadius:'7px', padding:'8px 20px', color: mode===key ? '#d4a20a' : '#5a6080',
            fontWeight: mode===key ? 700 : 400, fontSize:'13px', cursor:'pointer', transition:'all 0.15s ease'
          }}>{label}</button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'12px', padding:'18px 20px' }}>
        <SectionHeading>{t('settings')}</SectionHeading>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'16px', alignItems:'flex-end' }}>
          {mode === 'A' && (
            <FilterSelect
              label={t('campaign')}
              value={selectedCampaign}
              onChange={setSelectedCampaign}
              options={[
                { value:'', label:t('selectCampaign') },
                ...ownedCampaigns.map(c => ({ value: c.key, label: c.name }))
              ]}
            />
          )}
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            <label style={{ fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.08em', color:'#424866' }}>{t('modularSets')}</label>
            <div style={{ display:'flex', gap:'5px' }}>
              {[1,2,3,4].map(n => (
                <button key={n} onClick={()=>setModularCount(n)} style={{
                  width:'36px',height:'36px',borderRadius:'6px',border:`1px solid ${modularCount===n?'#d4a20a':'rgba(255,255,255,0.1)'}`,
                  background:modularCount===n?'rgba(212,162,10,0.2)':'#0d1020',
                  color:modularCount===n?'#d4a20a':'#7b82a8',fontWeight:700,fontSize:'14px',cursor:'pointer'
                }}>{n}</button>
              ))}
            </div>
          </div>
          <Toggle checked={thematic} onChange={setThematic} label={t('thematicPairing')} />
        </div>
        <div style={{ marginTop:'14px' }}>
          <button onClick={mode==='A' ? generateCampaign : generateMix}
            disabled={mode==='A' && !selectedCampaign}
            style={{
              background: 'linear-gradient(135deg, #c0392b 0%, #d4a20a 100%)',
              border:'none', borderRadius:'8px', padding:'12px 32px',
              color:'#fff', fontFamily:'"Bebas Neue",cursive', fontSize:'18px', letterSpacing:'0.1em',
              cursor: (mode==='A' && !selectedCampaign) ? 'not-allowed' : 'pointer',
              opacity: (mode==='A' && !selectedCampaign) ? 0.5 : 1, boxShadow:'0 4px 16px rgba(212,162,10,0.25)',
              whiteSpace:'nowrap'
            }}>
            {mode==='A' ? '📘 ' + t('generateCampaign') : '🎲 ' + t('generateMix')}
          </button>
        </div>
      </div>

      {/* Scenario list */}
      {generated && scenarios.length > 0 && (
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <SectionHeading>{mode==='A' ? t('campaignScenarios') : t('mixScenarios')} ({scenarios.length})</SectionHeading>
          {scenarios.map((s, idx) => s.villain && (
            <div key={idx} style={{
              background: completed[idx] ? 'rgba(39,174,96,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${completed[idx] ? 'rgba(39,174,96,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius:'12px', padding:'16px 20px', transition:'all 0.2s ease'
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px', flexWrap:'wrap' }}>
                <div style={{ flex:1, minWidth:'200px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
                    <span style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'13px', color:'#424866', letterSpacing:'0.1em' }}>
                      {t('scenario')} {idx + 1}
                    </span>
                    {completed[idx] && <span style={{ fontSize:'12px', color:'#2ecc71', fontWeight:700 }}>✓ {t('completed')}</span>}
                  </div>
                  <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'22px', color:'#f0f2ff', letterSpacing:'0.03em', marginBottom:'4px' }}>
                    {s.villain.name}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', flexWrap:'wrap' }}>
                    <DifficultyBar value={s.villain.difficulty} />
                    <span style={{ fontSize:'11px', color:'#5a6080' }}>{s.villain.source}</span>
                  </div>
                </div>
                <div style={{ display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap' }}>
                  <button onClick={() => rerollModulars(idx)} style={{
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)',
                    color:'#7b82a8', borderRadius:'6px', padding:'7px 12px', fontSize:'12px', cursor:'pointer'
                  }}>↺ {t('rerollModulars')}</button>
                  <button onClick={() => toggleComplete(idx)} style={{
                    background: completed[idx] ? 'rgba(39,174,96,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${completed[idx] ? 'rgba(39,174,96,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    color: completed[idx] ? '#2ecc71' : '#7b82a8',
                    borderRadius:'6px', padding:'7px 14px', fontSize:'12px', cursor:'pointer', fontWeight:700
                  }}>{completed[idx] ? '✓ ' + t('done') : t('markComplete')}</button>
                </div>
              </div>
              <div style={{ marginTop:'12px' }}>
                <div style={{ fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.08em', color:'#424866', marginBottom:'8px' }}>{t('modularSets')}</div>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {s.modulars.map((m,i) => <ModularCard key={m.key+i} modular={m} index={i} revealed={true} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!generated && <EmptyState message={t('configureAndGenerate')} sub={mode==='A' ? t('selectCampaignHint') : t('mixHint')} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// HISTORY TAB
// ══════════════════════════════════════════════════════════════
function HistoryTab() {
  const { history, setHistory, t } = useContext(MCContext);
  const { heroes, villains } = MCData;

  function getHeroName(key) { return heroes.find(h=>h.key===key)?.name || key; }
  function getVillainName(key) { return villains.find(v=>v.key===key)?.name || key; }
  function clearHistory() { if (window.confirm(t('confirmClear'))) setHistory([]); }
  function exportHistory() {
    const text = history.map(g =>
      `${new Date(g.date).toLocaleDateString()} | ${g.heroes.map(getHeroName).join(', ')} vs ${getVillainName(g.villain)} | ${g.result || '—'}`
    ).join('\n');
    navigator.clipboard.writeText(text);
    alert(t('copied'));
  }

  const wins = history.filter(g => g.result === 'win').length;
  const losses = history.filter(g => g.result === 'loss').length;
  const winRate = history.length ? Math.round((wins / history.length) * 100) : 0;
  const uniqueHeroes = new Set(history.flatMap(g=>g.heroes)).size;
  const uniqueVillains = new Set(history.map(g=>g.villain)).size;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
      {/* Stats */}
      {history.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(110px,1fr))', gap:'10px' }}>
          {[
            { label:t('totalGames'), value:history.length, color:'#c0c8e8' },
            { label:t('wins'), value:wins, color:'#2ecc71' },
            { label:t('losses'), value:losses, color:'#e74c3c' },
            { label:t('winRate'), value:winRate+'%', color:winRate>=50?'#2ecc71':'#e74c3c' },
            { label:t('uniqueHeroes'), value:uniqueHeroes, color:'#5dade2' },
            { label:t('uniqueVillains'), value:uniqueVillains, color:'#d4a20a' },
          ].map(s => (
            <div key={s.label} style={{
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'10px', padding:'12px 14px', textAlign:'center'
            }}>
              <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'26px', color:s.color, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:'10px', color:'#5a6080', marginTop:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {history.length > 0 && (
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
          <button onClick={exportHistory} style={{ background:'rgba(41,128,185,0.15)', border:'1px solid rgba(41,128,185,0.3)', color:'#5dade2', borderRadius:'6px', padding:'8px 16px', fontSize:'12px', cursor:'pointer' }}>📋 {t('export')}</button>
          <button onClick={clearHistory} style={{ background:'rgba(192,57,43,0.1)', border:'1px solid rgba(192,57,43,0.25)', color:'#e74c3c', borderRadius:'6px', padding:'8px 16px', fontSize:'12px', cursor:'pointer' }}>🗑 {t('clear')}</button>
        </div>
      )}

      {/* Game list */}
      {history.length > 0 ? (
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          <SectionHeading>{t('recentGames')}</SectionHeading>
          {history.map((game, i) => (
            <div key={game.id} style={{
              background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:'10px', padding:'14px 16px',
              borderLeft: game.result === 'win' ? '3px solid #27ae60' : game.result === 'loss' ? '3px solid #c0392b' : '3px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'10px', flexWrap:'wrap' }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px', flexWrap:'wrap' }}>
                    {game.result === 'win' && <span style={{ fontSize:'12px', color:'#2ecc71', fontWeight:700 }}>✓ {t('win')}</span>}
                    {game.result === 'loss' && <span style={{ fontSize:'12px', color:'#e74c3c', fontWeight:700 }}>✗ {t('loss')}</span>}
                    {!game.result && <span style={{ fontSize:'12px', color:'#5a6080' }}>— {t('noResult')}</span>}
                    <span style={{ fontSize:'11px', color:'#424866' }}>{new Date(game.date).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'4px', marginBottom:'5px' }}>
                    {game.heroes.map(k => <span key={k} style={{ background:'rgba(93,173,226,0.1)', border:'1px solid rgba(93,173,226,0.2)', color:'#5dade2', borderRadius:'4px', fontSize:'11px', padding:'2px 6px' }}>{getHeroName(k)}</span>)}
                    <span style={{ background:'rgba(231,76,60,0.1)', border:'1px solid rgba(231,76,60,0.2)', color:'#e74c3c', borderRadius:'4px', fontSize:'11px', padding:'2px 6px' }}>vs {getVillainName(game.villain)}</span>
                  </div>
                  {game.modulars.length > 0 && (
                    <div style={{ fontSize:'11px', color:'#424866' }}>{t('modularSets')}: {game.modulars.length}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message={t('noHistory')} sub={t('noHistoryHint')} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// PROGRESSION TAB
// ══════════════════════════════════════════════════════════════
function ProgressionTab() {
  const { collection, t, lang } = useContext(MCContext);
  const { progressionGuide, campaigns, scenarioPacks } = MCData;
  const [openPhase, setOpenPhase] = useState(1);

  function isOwned(key) {
    return collection.campaigns.includes(key) || collection.scenarioPacks.includes(key);
  }

  const phaseColors = ['#2ecc71','#d4a20a','#e67e22','#c0392b'];

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
      <div style={{ fontSize:'13px', color:'#5a6080', marginBottom:'4px' }}>{t('progressionDesc')}</div>
      {progressionGuide.map((phase, pi) => {
        const phaseColor = phaseColors[pi];
        const isOpen = openPhase === phase.phase;
        const allOwned = phase.items.filter(i=>i.type!=='heroes').every(i => isOwned(i.key));
        return (
          <div key={phase.phase} style={{
            background:'rgba(255,255,255,0.02)', border:`1px solid ${isOpen ? phaseColor + '44' : 'rgba(255,255,255,0.06)'}`,
            borderRadius:'12px', overflow:'hidden', transition:'all 0.2s ease'
          }}>
              <div onClick={() => setOpenPhase(isOpen ? 0 : phase.phase)} style={{
              padding:'16px 20px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px',
              background: isOpen ? `rgba(${pi===0?'46,204,113':pi===1?'212,162,10':pi===2?'230,126,34':'192,57,43'},0.06)` : 'none'
            }}>
              <div style={{ flex:1, minWidth:0, overflow:'hidden' }}>
                <div style={{ display:'block', marginBottom:'3px' }}>
                  <span style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'16px', color:phaseColor, letterSpacing:'0.08em', lineHeight:'1.2', display:'inline' }}>
                    {lang === 'en' ? phase.nameEn : phase.nameEs}
                  </span>
                  {allOwned && <span style={{ fontSize:'11px', color:'#2ecc71', fontWeight:700, marginLeft:'8px', verticalAlign:'middle' }}>✓ {t('owned')}</span>}
                </div>
                <div style={{ fontSize:'12px', color:'#5a6080', lineHeight:'1.4', display:'block' }}>{lang === 'en' ? phase.descEn : phase.descEs}</div>
              </div>
              <span style={{ color:phaseColor, fontSize:'18px', flexShrink:0 }}>{isOpen ? '▲' : '▼'}</span>
            </div>

            {isOpen && (
              <div style={{ padding:'0 20px 16px', display:'flex', flexDirection:'column', gap:'8px' }}>
                <div style={{ height:'1px', background:'rgba(255,255,255,0.05)', margin:'0 0 8px' }}></div>
                {phase.items.map((item, i) => {
                  const owned = isOwned(item.key);
                  const isHeroItem = item.type === 'heroes';
                  return (
                      <div key={i} style={{
                      background: owned ? 'rgba(39,174,96,0.07)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${owned ? 'rgba(39,174,96,0.25)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius:'8px', padding:'12px 14px',
                      display:'flex', gap:'12px', alignItems:'flex-start', opacity: isHeroItem ? 0.85 : 1
                    }}>
                      <div style={{
                        width:'22px', height:'22px', borderRadius:'50%', flexShrink:0, marginTop:'2px',
                        background: owned ? '#27ae60' : isHeroItem ? 'rgba(212,162,10,0.2)' : 'rgba(255,255,255,0.06)',
                        border: `2px solid ${owned ? '#27ae60' : isHeroItem ? '#d4a20a55' : 'rgba(255,255,255,0.12)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px'
                      }}>{owned ? '✓' : isHeroItem ? '★' : ''}</div>
                      <div style={{ flex:1, minWidth:0, overflow:'hidden' }}>
                        <div style={{ marginBottom:'5px' }}>
                          <span style={{
                            display:'inline-block',
                            background: item.type==='campaign' ? 'rgba(212,162,10,0.15)' : item.type==='scenario' ? 'rgba(41,128,185,0.15)' : 'rgba(142,68,173,0.15)',
                            color: item.type==='campaign' ? '#d4a20a' : item.type==='scenario' ? '#5dade2' : '#a569bd',
                            border: `1px solid ${item.type==='campaign'?'rgba(212,162,10,0.3)':item.type==='scenario'?'rgba(41,128,185,0.3)':'rgba(142,68,173,0.3)'}`,
                            borderRadius:'3px', fontSize:'9px', padding:'1px 5px', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700,
                            verticalAlign:'middle', marginRight:'6px'
                          }}>{item.type}</span>
                          {owned && !isHeroItem && <span style={{ fontSize:'11px', color:'#2ecc71', fontWeight:700, verticalAlign:'middle' }}>✓ {t('owned')}</span>}
                        </div>
                        <div style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'15px', color: owned ? '#c0c8e8' : '#e8eaf6', letterSpacing:'0.03em', lineHeight:'1.2', marginBottom:'4px', display:'block' }}>
                          {campaigns.find(c=>c.key===item.key)?.name || scenarioPacks.find(p=>p.key===item.key)?.name || (lang==='en' ? item.modeEn : item.modeEs)}
                        </div>
                        <div style={{ fontSize:'11px', color:'#7b82a8', marginBottom:'2px', lineHeight:'1.4' }}>{lang==='en' ? item.modeEn : item.modeEs}</div>
                        <div style={{ fontSize:'11px', color:'#5a6080', lineHeight:'1.4' }}>{lang==='en' ? item.noteEn : item.noteEs}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { CollectionTab, CampaignTab, HistoryTab, ProgressionTab });
