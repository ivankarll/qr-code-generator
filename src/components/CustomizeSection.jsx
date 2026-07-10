import styles from './CustomizeSection.module.css'

const FG_PRESETS = [
  { label: 'Black',      value: '#000000' },
  { label: 'Navy Blue',  value: '#1e3a8a' },
  { label: 'Deep Green', value: '#14532d' },
]

const BG_PRESETS = [
  { label: 'White',       value: '#ffffff' },
  { label: 'Transparent', value: 'transparent' },
]

const ERROR_LEVELS = [
  { value: 'L', hint: '7%'  },
  { value: 'M', hint: '15%' },
  { value: 'Q', hint: '25%' },
  { value: 'H', hint: '30%' },
]

/* ── Color picker group ───────────────────── */
const ColorGroup = ({ label, presets, value, onChange }) => {
  const isCustom = !presets.some(p => p.value === value)

  return (
    <div className={styles.group}>
      <span className={styles.label}>{label}</span>
      <div className={styles.colorRow}>
        {presets.map(p => (
          <button
            key={p.value}
            title={p.label}
            className={`${styles.chip} ${value === p.value ? styles.chipActive : ''}`}
            onClick={() => onChange(p.value)}
            style={p.value === 'transparent'
              ? { background: 'repeating-conic-gradient(#555 0% 25%, #333 0% 50%) 0 0 / 10px 10px' }
              : { background: p.value }}
          />
        ))}

        {/* Custom swatch — clicking opens the hidden color input */}
        <label
          title="Custom color"
          className={`${styles.chip} ${styles.customChip} ${isCustom ? styles.chipActive : ''}`}
          style={isCustom ? { background: value } : undefined}
        >
          {!isCustom && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          )}
          <input
            type="color"
            className={styles.hiddenColor}
            value={isCustom ? value : '#8b5cf6'}
            onChange={e => onChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────── */
const CustomizeSection = ({ config, onChange }) => {
  const sizePct   = `${((config.size   - 100) / (500 - 100)) * 100}%`
  const marginPct = `${((config.margin -   0) / (40  -   0)) * 100}%`

  return (
    <div className={styles.container}>

      {/* Size */}
      <div className={styles.group}>
        <div className={styles.labelRow}>
          <span className={styles.label}>Size</span>
          <span className={styles.badge}>{config.size}px</span>
        </div>
        <input
          type="range" min={100} max={500} step={4}
          value={config.size}
          className={styles.slider}
          style={{ '--pct': sizePct }}
          onChange={e => onChange({ size: Number(e.target.value) })}
        />
        <div className={styles.rangeHints}><span>100px</span><span>500px</span></div>
      </div>

      {/* Foreground */}
      <ColorGroup
        label="Foreground"
        presets={FG_PRESETS}
        value={config.fgColor}
        onChange={v => onChange({ fgColor: v })}
      />

      {/* Background */}
      <ColorGroup
        label="Background"
        presets={BG_PRESETS}
        value={config.bgColor}
        onChange={v => onChange({ bgColor: v })}
      />

      {/* Margin */}
      <div className={styles.group}>
        <div className={styles.labelRow}>
          <span className={styles.label}>Margin</span>
          <span className={styles.badge}>{config.margin}px</span>
        </div>
        <input
          type="range" min={0} max={40} step={4}
          value={config.margin}
          className={styles.slider}
          style={{ '--pct': marginPct }}
          onChange={e => onChange({ margin: Number(e.target.value) })}
        />
      </div>

      {/* Error Correction */}
      <div className={styles.group}>
        <span className={styles.label}>Error Correction</span>
        <div className={styles.segmented}>
          {ERROR_LEVELS.map(l => (
            <button
              key={l.value}
              className={`${styles.seg} ${config.level === l.value ? styles.segActive : ''}`}
              onClick={() => onChange({ level: l.value })}
            >
              <span className={styles.segLetter}>{l.value}</span>
              <span className={styles.segHint}>{l.hint}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default CustomizeSection
