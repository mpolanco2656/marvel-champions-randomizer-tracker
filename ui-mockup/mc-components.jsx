// Marvel Champions — Shared UI Components
const { useState, useEffect, useContext, createContext, useRef } = React;

// ── Context ──────────────────────────────────────────────────────────────────
const MCContext = createContext();

// ── Design tokens ─────────────────────────────────────────────────────────────
const ASPECT_COLORS = {
  Leadership:  { bg: 'rgba(41,128,185,0.18)', border: '#2980b9', glow: '#2980b9', text: '#5dade2', label: 'Leadership' },
  Justice:     { bg: 'rgba(212,162,10,0.18)',  border: '#d4a20a', glow: '#d4a20a', text: '#f4d03f', label: 'Justice' },
  Aggression:  { bg: 'rgba(192,57,43,0.18)',   border: '#c0392b', glow: '#c0392b', text: '#e74c3c', label: 'Aggression' },
  Protection:  { bg: 'rgba(39,174,96,0.18)',   border: '#27ae60', glow: '#27ae60', text: '#2ecc71', label: 'Protection' },
  Pool:        { bg: 'rgba(142,68,173,0.18)',  border: '#8e44ad', glow: '#8e44ad', text: '#a569bd', label: 'Pool' },
};

const TIER_COLORS = {
  'S+': { bg: 'rgba(255,215,0,0.2)',   text: '#ffd700', border: '#ffd700' },
  'S':  { bg: 'rgba(192,192,192,0.2)', text: '#e8e8e8', border: '#c0c0c0' },
  'A':  { bg: 'rgba(79,195,247,0.2)',  text: '#4fc3f7', border: '#4fc3f7' },
  'B':  { bg: 'rgba(102,187,106,0.2)', text: '#66bb6a', border: '#66bb6a' },
  'C':  { bg: 'rgba(120,144,156,0.2)', text: '#90a4ae', border: '#78909c' },
};

const COMPLEXITY_MAP = { Beginner: 1, Intermediate: 2, Advanced: 3 };

// ── Small reusable badges ──────────────────────────────────────────────────────
function AspectBadge({ aspect, small }) {
  const c = ASPECT_COLORS[aspect] || ASPECT_COLORS.Leadership;
  const size = small ? { fontSize: '10px', padding: '2px 6px' } : { fontSize: '11px', padding: '3px 8px' };
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      borderRadius: '4px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
      whiteSpace: 'nowrap', display: 'inline-block', ...size
    }}>{aspect}</span>
  );
}

function TierBadge({ tier }) {
  const c = TIER_COLORS[tier] || TIER_COLORS['C'];
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      borderRadius: '4px', fontSize: '11px', fontWeight: 800, padding: '2px 7px',
      letterSpacing: '0.05em', display: 'inline-block'
    }}>{tier}</span>
  );
}

function ComplexityDots({ level }) {
  const n = COMPLEXITY_MAP[level] || 1;
  const labels = ['', 'Beginner', 'Intermediate', 'Advanced'];
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      {[1,2,3].map(i => (
        <span key={i} style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: i <= n ? '#d4a20a' : 'rgba(255,255,255,0.1)',
          display: 'inline-block', flexShrink: 0
        }}></span>
      ))}
      <span style={{ fontSize: '10px', color: '#7b82a8', marginLeft: '3px' }}>{labels[n]}</span>
    </span>
  );
}

function DifficultyBar({ value, max = 10, color }) {
  const pct = (value / max) * 100;
  const barColor = color || (value <= 3 ? '#27ae60' : value <= 6 ? '#d4a20a' : value <= 8 ? '#e67e22' : '#c0392b');
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
      </div>
      <span style={{ fontSize: '12px', fontWeight: 700, color: barColor, minWidth: '22px', textAlign: 'right' }}>{value}/{max}</span>
    </div>
  );
}

function PlaystyleTag({ tag }) {
  return (
    <span style={{
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      color: '#8892b0', borderRadius: '3px', fontSize: '10px', padding: '2px 5px',
      display: 'inline-block'
    }}>{tag}</span>
  );
}

// ── HERO CARD ──────────────────────────────────────────────────────────────────
// Aspect SVG symbols as React elements
function AspectSymbolSVG({ aspect, color }) {
  const props = { stroke: color, fill: 'none', strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (aspect === 'Leadership') return (
    <svg viewBox="0 0 80 76" width="54" height="52">
      <circle cx="40" cy="28" r="14" {...props} />
      <path d="M40 18 L44 26 L53 27 L46 34 L48 43 L40 39 L32 43 L34 34 L27 27 L36 26 Z" fill={color} opacity="0.6" stroke="none" />
    </svg>
  );
  if (aspect === 'Justice') return (
    <svg viewBox="0 0 80 76" width="54" height="52">
      <line x1="40" y1="14" x2="40" y2="62" {...props} />
      <line x1="28" y1="22" x2="52" y2="22" {...props} />
      <line x1="24" y1="46" x2="56" y2="46" {...props} />
      <line x1="28" y1="46" x2="24" y2="54" {...props} />
      <line x1="52" y1="46" x2="56" y2="54" {...props} />
      <circle cx="40" cy="20" r="4" fill={color} stroke="none" />
    </svg>
  );
  if (aspect === 'Aggression') return (
    <svg viewBox="0 0 80 76" width="54" height="52">
      <polyline points="25,55 40,15 55,55" {...props} strokeWidth="3.5" />
      <line x1="30" y1="42" x2="50" y2="42" {...props} strokeWidth="3.5" />
    </svg>
  );
  if (aspect === 'Protection') return (
    <svg viewBox="0 0 80 76" width="54" height="52">
      <path d="M40 14 L56 22 L56 38 C56 50 40 62 40 62 C40 62 24 50 24 38 L24 22 Z" {...props} />
    </svg>
  );
  if (aspect === 'Pool') return (
    <svg viewBox="0 0 80 76" width="54" height="52">
      <circle cx="40" cy="38" r="18" {...props} />
      <line x1="40" y1="20" x2="40" y2="14" {...props} strokeWidth="2.5" />
      <line x1="40" y1="62" x2="40" y2="56" {...props} strokeWidth="2.5" />
      <line x1="22" y1="38" x2="16" y2="38" {...props} strokeWidth="2.5" />
      <line x1="64" y1="38" x2="58" y2="38" {...props} strokeWidth="2.5" />
      <circle cx="40" cy="38" r="6" fill={color} opacity="0.5" stroke="none" />
    </svg>
  );
  // default
  return (
    <svg viewBox="0 0 80 76" width="54" height="52">
      <circle cx="40" cy="38" r="20" stroke={color} fill="none" strokeWidth="3" />
    </svg>
  );
}

function HeroImageSlot({ hero, ac }) {
  const storageKey = `mc_hero_img_${hero.key}`;
  const [imgSrc, setImgSrc] = useState(() => {
    try { return localStorage.getItem(storageKey) || null; } catch { return null; }
  });
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) loadImage(file);
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) loadImage(file);
  }

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target.result;
      setImgSrc(src);
      try { localStorage.setItem(storageKey, src); } catch {}
    };
    reader.readAsDataURL(file);
  }

  function clearImage(e) {
    e.stopPropagation();
    setImgSrc(null);
    try { localStorage.removeItem(storageKey); } catch {}
  }

  const initials = hero.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  return (
    <div
      onClick={() => !imgSrc && inputRef.current && inputRef.current.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        position:'relative', width:'100%', height:'120px', overflow:'hidden',
        background: imgSrc ? 'transparent' : `linear-gradient(145deg, ${ac.bg.replace('0.18','0.4')}, rgba(7,9,15,0.95))`,
        cursor: imgSrc ? 'default' : 'pointer',
        outline: dragging ? `2px dashed ${ac.border}` : 'none',
        transition: 'outline 0.15s ease',
        display:'flex', alignItems:'center', justifyContent:'center'
      }}
    >
      {imgSrc ? (
        <>
          <img src={imgSrc} alt={hero.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block' }} />
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(to bottom, transparent 40%, #0a0d1a 100%)'
          }}></div>
          <button onClick={clearImage} style={{
            position:'absolute', top:'5px', right:'5px',
            background:'rgba(0,0,0,0.75)', border:'1px solid rgba(255,255,255,0.2)',
            color:'#fff', borderRadius:'50%', width:'20px', height:'20px',
            fontSize:'10px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            lineHeight:1, padding:0
          }}>✕</button>
        </>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', opacity:0.55, pointerEvents:'none' }}>
          <AspectSymbolSVG aspect={hero.aspect} color={ac.text} />
          <span style={{ fontFamily:'"Bebas Neue",cursive', fontSize:'20px', color:ac.text, letterSpacing:'0.1em', lineHeight:1 }}>{initials}</span>
          <span style={{ fontSize:'9px', color:ac.text, opacity:0.7, letterSpacing:'0.08em', textTransform:'uppercase' }}>Drop image</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display:'none' }} />
    </div>
  );
}

function HeroCard({ hero, index = 0, revealed = true }) {
  const ac = ASPECT_COLORS[hero.aspect] || ASPECT_COLORS.Leadership;
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    width: '190px', minHeight: '330px',
    background: `linear-gradient(160deg, #0f1120 0%, #0a0d1a 100%)`,
    border: `1px solid ${hovered ? ac.border : 'rgba(255,255,255,0.07)'}`,
    borderRadius: '10px', overflow: 'hidden', position: 'relative',
    boxShadow: hovered ? `0 0 20px ${ac.glow}44, 0 8px 32px rgba(0,0,0,0.6)` : '0 4px 16px rgba(0,0,0,0.4)',
    transition: 'all 0.25s ease',
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    flexShrink: 0,
    opacity: revealed ? 1 : 0,
    animation: revealed ? `cardReveal 0.4s ease ${index * 0.08}s both` : 'none',
    cursor: 'default'
  };

  return (
    <div style={cardStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Aspect color top band */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, ${ac.border}, ${ac.glow}88)` }}></div>

      {/* Image area */}
      <HeroImageSlot hero={hero} ac={ac} />

      {/* Name over image bottom */}
      <div style={{ padding: '8px 12px 6px', background: ac.bg }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
          <div style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '18px', lineHeight: 1.1, color: '#f0f2ff', letterSpacing: '0.03em', flex: 1 }}>
            {hero.name}
          </div>
          <TierBadge tier={hero.tier} />
        </div>
        <div style={{ marginTop: '4px' }}>
          <AspectBadge aspect={hero.aspect} small />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 12px' }}></div>

      {/* Stats */}
      <div style={{ padding: '8px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424866', marginBottom: '3px' }}>Complexity</div>
            <ComplexityDots level={hero.complexity} />
          </div>
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424866', marginBottom: '3px' }}>Playstyle</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
              {hero.playstyle.map(p => <PlaystyleTag key={p} tag={p} />)}
            </div>
          </div>
          {hero.optimization !== 'Both' && (
            <div style={{ fontSize: '10px', color: '#5a6080' }}>
              <span style={{ color: hero.optimization === 'Solo' ? '#d4a20a' : '#2980b9' }}>
                {hero.optimization === 'Solo' ? '◆' : '◈'} {hero.optimization}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', margin: '0 12px' }}></div>

      {/* Description */}
      <div style={{ padding: '7px 12px 10px' }}>
        <p style={{ fontSize: '10px', color: '#6b7494', lineHeight: 1.4, margin: 0 }}>{hero.description}</p>
        <div style={{ marginTop: '4px', fontSize: '10px', color: '#353d5c' }}>{hero.source}</div>
      </div>
    </div>
  );
}

// ── VILLAIN CARD ───────────────────────────────────────────────────────────────
function VillainCard({ villain, revealed = true }) {
  const [hovered, setHovered] = useState(false);
  const isHard = villain.difficulty >= 8;
  const accentColor = villain.difficulty <= 4 ? '#27ae60' : villain.difficulty <= 6 ? '#d4a20a' : villain.difficulty <= 8 ? '#e67e22' : '#c0392b';

  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(160deg, #120a0a 0%, #0a0d1a 100%)',
        border: `1px solid ${hovered ? accentColor : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '10px', overflow: 'hidden', position: 'relative',
        boxShadow: hovered ? `0 0 24px ${accentColor}44, 0 8px 32px rgba(0,0,0,0.6)` : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'all 0.25s ease', cursor: 'default',
        opacity: revealed ? 1 : 0,
        animation: revealed ? 'cardReveal 0.4s ease 0s both' : 'none',
        minWidth: '220px', flex: 1
      }}
    >
      <div style={{ height: '4px', background: `linear-gradient(90deg, ${accentColor}, ${accentColor}55)` }}></div>

      <div style={{ padding: '14px 16px 10px', background: `rgba(${villain.difficulty >= 8 ? '192,57,43' : '212,162,10'},0.08)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '24px', lineHeight: 1.1, color: '#f0f2ff', letterSpacing: '0.03em', flex: 1 }}>
            {villain.name}
          </div>
          {isHard && <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '2px' }}>⚠️</span>}
        </div>
        <div style={{ fontSize: '11px', color: '#7b82a8', marginTop: '4px' }}>{villain.source}</div>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 16px' }}></div>

      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424866', marginBottom: '6px' }}>Difficulty</div>
        <DifficultyBar value={villain.difficulty} />
      </div>

      <div style={{ padding: '0 16px 12px' }}>
        <span style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          color: '#8892b0', borderRadius: '4px', fontSize: '11px', padding: '3px 8px', display: 'inline-block'
        }}>{villain.mechanics}</span>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', margin: '0 16px' }}></div>
      <div style={{ padding: '10px 16px 14px' }}>
        <p style={{ fontSize: '11px', color: '#6b7494', lineHeight: 1.4, margin: 0 }}>{villain.description}</p>
      </div>
    </div>
  );
}

// ── MODULAR CARD ───────────────────────────────────────────────────────────────
function ModularCard({ modular, index = 0, revealed = true }) {
  const [hovered, setHovered] = useState(false);
  const diffColor = modular.difficulty <= 2 ? '#27ae60' : modular.difficulty <= 3 ? '#d4a20a' : modular.difficulty <= 4 ? '#e67e22' : '#c0392b';

  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(160deg, #0d1020 0%, #090c18 100%)',
        border: `1px solid ${hovered ? diffColor : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '8px', overflow: 'hidden',
        boxShadow: hovered ? `0 0 14px ${diffColor}33, 0 4px 16px rgba(0,0,0,0.4)` : '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.2s ease', cursor: 'default',
        opacity: revealed ? 1 : 0,
        animation: revealed ? `cardReveal 0.35s ease ${index * 0.07}s both` : 'none',
        minWidth: '150px', flex: 1
      }}
    >
      <div style={{ height: '3px', background: diffColor }}></div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '15px', color: '#e0e4f4', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: '6px' }}>
          {modular.name}
        </div>
        <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424866', marginBottom: '4px' }}>Difficulty</div>
        <DifficultyBar value={modular.difficulty} max={5} color={diffColor} />
        <div style={{ marginTop: '6px', fontSize: '10px', color: '#353d5c' }}>{modular.source}</div>
      </div>
    </div>
  );
}

// ── WARNING / SUGGESTION BANNER ────────────────────────────────────────────────
function AlertBanner({ items, type = 'warning' }) {
  if (!items || items.length === 0) return null;
  const isWarn = type === 'warning';
  const borderColor = isWarn ? '#e67e22' : '#2980b9';
  const bgColor = isWarn ? 'rgba(230,126,34,0.08)' : 'rgba(41,128,185,0.08)';
  const icon = isWarn ? '⚠' : '💡';

  return (
    <div style={{ border: `1px solid ${borderColor}33`, background: bgColor, borderRadius: '8px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {items.map((msg, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
          <p style={{ fontSize: '12px', color: isWarn ? '#e89b60' : '#7aadcc', margin: 0, lineHeight: 1.5 }}>{msg}</p>
        </div>
      ))}
    </div>
  );
}

// ── STATS BAR ──────────────────────────────────────────────────────────────────
function StatsBar() {
  const { collection, t } = useContext(MCContext);
  const { getAvailableHeroes, getAvailableVillains, getAvailableModulars } = MCData;
  const heroes = getAvailableHeroes(collection);
  const villains = getAvailableVillains(collection);
  const modulars = getAvailableModulars(collection);

  const items = [
    { label: t('heroes'), value: heroes.length, color: '#5dade2' },
    { label: t('villains'), value: villains.length, color: '#e74c3c' },
    { label: t('modulars'), value: modulars.length, color: '#d4a20a' },
    { label: t('games'), value: useContext(MCContext).history.length, color: '#2ecc71' }
  ];

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {items.map(item => (
        <div key={item.label} style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '8px', padding: '8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px'
        }}>
          <span style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '22px', color: item.color, lineHeight: 1 }}>{item.value}</span>
          <span style={{ fontSize: '10px', color: '#5a6080', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── FILTER SELECT ──────────────────────────────────────────────────────────────
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424866' }}>{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        background: '#0d1020', border: '1px solid rgba(255,255,255,0.1)',
        color: '#c0c8e8', borderRadius: '6px', padding: '7px 10px', fontSize: '13px',
        outline: 'none', cursor: 'pointer', minWidth: '130px'
      }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function PlayerCountPicker({ value, onChange, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#424866' }}>{label}</label>
      <div style={{ display: 'flex', gap: '6px' }}>
        {[1,2,3,4].map(n => (
          <button key={n} onClick={() => onChange(n)} style={{
            width: '38px', height: '38px', borderRadius: '6px', border: `1px solid ${value === n ? '#d4a20a' : 'rgba(255,255,255,0.1)'}`,
            background: value === n ? 'rgba(212,162,10,0.2)' : '#0d1020',
            color: value === n ? '#d4a20a' : '#7b82a8', fontWeight: 700, fontSize: '15px',
            cursor: 'pointer', transition: 'all 0.15s ease'
          }}>{n}</button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
      <div onClick={() => onChange(!checked)} style={{
        width: '36px', height: '20px', borderRadius: '10px', position: 'relative',
        background: checked ? '#d4a20a' : 'rgba(255,255,255,0.1)', transition: 'background 0.2s ease',
        flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          position: 'absolute', top: '2px', left: checked ? '18px' : '2px',
          width: '14px', height: '14px', borderRadius: '50%', background: '#fff',
          transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
        }}></div>
      </div>
      <span style={{ fontSize: '12px', color: '#7b82a8' }}>{label}</span>
    </label>
  );
}

// ── SECTION HEADING ────────────────────────────────────────────────────────────
function SectionHeading({ children, accent }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <span style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '14px', letterSpacing: '0.12em', color: accent || '#d4a20a', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
    </div>
  );
}

// ── EMPTY STATE ────────────────────────────────────────────────────────────────
function EmptyState({ message, sub }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: '#424866' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.4 }}>🎲</div>
      <div style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '18px', letterSpacing: '0.08em', color: '#4a5168', marginBottom: '8px' }}>{message}</div>
      {sub && <div style={{ fontSize: '13px', color: '#353d5c' }}>{sub}</div>}
    </div>
  );
}

// Export all to window
Object.assign(window, {
  MCContext, ASPECT_COLORS, TIER_COLORS,
  AspectSymbolSVG, HeroImageSlot,
  HeroCard, VillainCard, ModularCard,
  AspectBadge, TierBadge, ComplexityDots, DifficultyBar, PlaystyleTag,
  AlertBanner, StatsBar, FilterSelect, PlayerCountPicker, Toggle,
  SectionHeading, EmptyState
});
