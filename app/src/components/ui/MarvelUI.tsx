import { ImageOff, X } from 'lucide-react';
import type React from 'react';
import { useMemo, useRef, useState } from 'react';
import type { Aspect, Complexity, Hero, ModularSet, Tier, Villain } from '../../types';

export const ASPECT_COLORS: Record<Aspect, { bg: string; border: string; glow: string; text: string }> = {
  Leadership: { bg: 'rgba(41,128,185,0.18)', border: '#2980b9', glow: '#2980b9', text: '#5dade2' },
  Justice: { bg: 'rgba(212,162,10,0.18)', border: '#d4a20a', glow: '#d4a20a', text: '#f4d03f' },
  Aggression: { bg: 'rgba(192,57,43,0.18)', border: '#c0392b', glow: '#c0392b', text: '#e74c3c' },
  Protection: { bg: 'rgba(39,174,96,0.18)', border: '#27ae60', glow: '#27ae60', text: '#2ecc71' },
  Pool: { bg: 'rgba(142,68,173,0.18)', border: '#8e44ad', glow: '#8e44ad', text: '#a569bd' },
};

const TIER_COLORS: Record<Tier, { bg: string; border: string; text: string }> = {
  'S+': { bg: 'rgba(255,215,0,0.2)', border: '#ffd700', text: '#ffd700' },
  S: { bg: 'rgba(192,192,192,0.2)', border: '#c0c0c0', text: '#e8e8e8' },
  A: { bg: 'rgba(79,195,247,0.2)', border: '#4fc3f7', text: '#4fc3f7' },
  B: { bg: 'rgba(102,187,106,0.2)', border: '#66bb6a', text: '#66bb6a' },
  C: { bg: 'rgba(120,144,156,0.2)', border: '#78909c', text: '#90a4ae' },
};

const COMPLEXITY_DOTS: Record<Complexity, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function SectionHeading({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <div className="mc-section-heading">
      <span style={{ color: accent }}>{children}</span>
      <i />
    </div>
  );
}

export function EmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mc-empty-state">
      <ImageOff size={38} />
      <div>{title}</div>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}

export function AspectBadge({ aspect, small = false }: { aspect: Aspect; small?: boolean }) {
  const color = ASPECT_COLORS[aspect];
  return (
    <span
      className={small ? 'mc-aspect-badge mc-aspect-badge--small' : 'mc-aspect-badge'}
      style={{ background: color.bg, borderColor: color.border, color: color.text }}
    >
      {aspect}
    </span>
  );
}

export function TierBadge({ tier }: { tier: Tier }) {
  const color = TIER_COLORS[tier];
  return (
    <span className="mc-tier-badge" style={{ background: color.bg, borderColor: color.border, color: color.text }}>
      {tier}
    </span>
  );
}

export function ComplexityDots({ level }: { level: Complexity }) {
  const filled = COMPLEXITY_DOTS[level];
  return (
    <span className="mc-complexity">
      {[1, 2, 3].map((dot) => (
        <i key={dot} data-on={dot <= filled ? '1' : '0'} />
      ))}
      <span>{level}</span>
    </span>
  );
}

export function DifficultyBar({ value, max = 10, color }: { value: number; max?: number; color?: string }) {
  const activeColor = color || (value <= 3 ? '#27ae60' : value <= 6 ? '#d4a20a' : value <= 8 ? '#e67e22' : '#c0392b');
  return (
    <div className="mc-difficulty">
      <div>
        <i style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: activeColor }} />
      </div>
      <span style={{ color: activeColor }}>
        {value}/{max}
      </span>
    </div>
  );
}

export function PlaystyleTag({ tag }: { tag: string }) {
  return <span className="mc-playstyle-tag">{tag}</span>;
}

export function FilterSelect<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <label className="mc-filter">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function NumberPicker({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: number;
  values: number[];
  onChange: (value: number) => void;
}) {
  return (
    <div className="mc-filter">
      <span>{label}</span>
      <div className="mc-number-picker">
        {values.map((item) => (
          <button key={item} type="button" data-active={value === item ? '1' : '0'} onClick={() => onChange(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <label className="mc-toggle">
      <button type="button" role="switch" aria-checked={checked} data-on={checked ? '1' : '0'} onClick={() => onChange(!checked)}>
        <i />
      </button>
      <span>{label}</span>
    </label>
  );
}

export function AspectSymbol({ aspect, color }: { aspect: Aspect; color: string }) {
  const props = { stroke: color, fill: 'none', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (aspect === 'Justice') {
    return (
      <svg viewBox="0 0 80 76" width="54" height="52" aria-hidden="true">
        <line x1="40" y1="14" x2="40" y2="62" {...props} />
        <line x1="28" y1="22" x2="52" y2="22" {...props} />
        <line x1="24" y1="46" x2="56" y2="46" {...props} />
        <circle cx="40" cy="20" r="4" fill={color} stroke="none" />
      </svg>
    );
  }
  if (aspect === 'Aggression') {
    return (
      <svg viewBox="0 0 80 76" width="54" height="52" aria-hidden="true">
        <polyline points="25,55 40,15 55,55" {...props} strokeWidth="3.5" />
        <line x1="30" y1="42" x2="50" y2="42" {...props} strokeWidth="3.5" />
      </svg>
    );
  }
  if (aspect === 'Protection') {
    return (
      <svg viewBox="0 0 80 76" width="54" height="52" aria-hidden="true">
        <path d="M40 14 L56 22 L56 38 C56 50 40 62 40 62 C40 62 24 50 24 38 L24 22 Z" {...props} />
      </svg>
    );
  }
  if (aspect === 'Pool') {
    return (
      <svg viewBox="0 0 80 76" width="54" height="52" aria-hidden="true">
        <circle cx="40" cy="38" r="18" {...props} />
        <circle cx="40" cy="38" r="6" fill={color} opacity="0.5" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 76" width="54" height="52" aria-hidden="true">
      <circle cx="40" cy="28" r="14" {...props} />
      <path d="M40 18 L44 26 L53 27 L46 34 L48 43 L40 39 L32 43 L34 34 L27 27 L36 26 Z" fill={color} opacity="0.6" stroke="none" />
    </svg>
  );
}

function HeroImageSlot({ hero, color }: { hero: Hero; color: (typeof ASPECT_COLORS)[Aspect] }) {
  const storageKey = `mc_hero_img_${hero.key}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [customSrc, setCustomSrc] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || '';
    } catch {
      return '';
    }
  });
  const [staticFailed, setStaticFailed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const staticSrc = `/hero-images/${hero.key}.png`;
  const imageSrc = customSrc || (staticFailed ? '' : staticSrc);
  const initials = useMemo(() => hero.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(), [hero.name]);

  function loadImage(file?: File) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = String(event.target?.result || '');
      setCustomSrc(src);
      try {
        localStorage.setItem(storageKey, src);
      } catch {
        // Local image overrides are best effort.
      }
    };
    reader.readAsDataURL(file);
  }

  function clearImage(event: React.MouseEvent) {
    event.stopPropagation();
    setCustomSrc('');
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Best effort.
    }
  }

  return (
    <div
      className="mc-hero-image"
      data-dragging={dragging ? '1' : '0'}
      onClick={() => !imageSrc && inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        loadImage(event.dataTransfer.files[0]);
      }}
      style={{ ['--aspect-border' as string]: color.border }}
    >
      {imageSrc ? (
        <>
          <img src={imageSrc} alt={hero.name} onError={() => setStaticFailed(true)} />
          <i />
          {customSrc ? (
            <button type="button" aria-label={`Clear ${hero.name} image`} onClick={clearImage}>
              <X size={12} />
            </button>
          ) : null}
        </>
      ) : (
        <div>
          <AspectSymbol aspect={hero.aspect} color={color.text} />
          <strong style={{ color: color.text }}>{initials}</strong>
          <span>Drop image</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={(event) => loadImage(event.target.files?.[0])} />
    </div>
  );
}

export function HeroCard({ hero, index = 0, revealed = true }: { hero: Hero; index?: number; revealed?: boolean }) {
  const color = ASPECT_COLORS[hero.aspect];
  return (
    <article
      className="mc-hero-card"
      data-revealed={revealed ? '1' : '0'}
      style={{ ['--aspect-bg' as string]: color.bg, ['--aspect-border' as string]: color.border, ['--aspect-glow' as string]: color.glow, animationDelay: `${index * 70}ms` }}
    >
      <div className="mc-card-top-band" />
      <HeroImageSlot hero={hero} color={color} />
      <div className="mc-hero-title">
        <div>
          <h3>{hero.name}</h3>
          <AspectBadge aspect={hero.aspect} small />
        </div>
        <TierBadge tier={hero.tier} />
      </div>
      <div className="mc-card-body">
        <div className="mc-card-label">Complexity</div>
        <ComplexityDots level={hero.complexity} />
        <div className="mc-card-label">Playstyle</div>
        <div className="mc-tag-list">
          {hero.playstyle.map((tag) => (
            <PlaystyleTag key={tag} tag={tag} />
          ))}
        </div>
        {hero.optimization !== 'Both' ? <p className="mc-optimization">{hero.optimization}</p> : null}
      </div>
      <p className="mc-card-description">{hero.description}</p>
      <footer>{hero.source}</footer>
    </article>
  );
}

export function VillainCard({ villain, revealed = true }: { villain: Villain; revealed?: boolean }) {
  const color = villain.difficulty <= 3 ? '#27ae60' : villain.difficulty <= 6 ? '#d4a20a' : villain.difficulty <= 8 ? '#e67e22' : '#c0392b';
  return (
    <article className="mc-villain-card" data-revealed={revealed ? '1' : '0'} style={{ ['--danger' as string]: color }}>
      <div className="mc-card-top-band" />
      <header>
        <div>
          <h3>{villain.name}</h3>
          <p>{villain.source}</p>
        </div>
        {villain.difficulty >= 8 ? <strong>Hard</strong> : null}
      </header>
      <div className="mc-card-body">
        <div className="mc-card-label">Difficulty</div>
        <DifficultyBar value={villain.difficulty} />
        <span className="mc-playstyle-tag">{villain.mechanics}</span>
      </div>
      <p className="mc-card-description">{villain.description}</p>
    </article>
  );
}

export function ModularCard({ modular, index = 0, revealed = true }: { modular: ModularSet; index?: number; revealed?: boolean }) {
  const color = modular.difficulty <= 2 ? '#27ae60' : modular.difficulty <= 3 ? '#d4a20a' : modular.difficulty <= 4 ? '#e67e22' : '#c0392b';
  return (
    <article className="mc-modular-card" data-revealed={revealed ? '1' : '0'} style={{ ['--danger' as string]: color, animationDelay: `${index * 60}ms` }}>
      <div className="mc-card-top-band" />
      <h3>{modular.name}</h3>
      <div className="mc-card-label">Difficulty</div>
      <DifficultyBar value={modular.difficulty} max={5} color={color} />
      <footer>{modular.source}</footer>
    </article>
  );
}
