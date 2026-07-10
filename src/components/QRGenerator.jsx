import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import InputSection     from './InputSection'
import CustomizeSection from './CustomizeSection'
import DownloadButtons  from './DownloadButton'
import styles from './QRGenerator.module.css'

const DEFAULT_CONFIG = {
  size:    256,
  fgColor: '#000000',
  bgColor: '#ffffff',
  margin:  16,
  level:   'M',
}

const QRGenerator = () => {
  const [qrValue,   setQrValue]  = useState('')
  const [config,    setConfig]   = useState(DEFAULT_CONFIG)
  const [generated, setGenerated] = useState(false)
  const [animKey,   setAnimKey]  = useState(0)
  const qrRef = useRef(null)

  const handleConfigChange = (patch) =>
    setConfig(prev => ({ ...prev, ...patch }))

  const handleGenerate = (value) => {
    if (!value.trim()) return
    setQrValue(value)
    setGenerated(true)
    setAnimKey(k => k + 1)   // re-triggers the CSS animation every generate
  }

  // Clamp display size so the card doesn't overflow on smaller screens
  const displaySize = Math.min(config.size, 420)

  return (
    <div className={styles.layout}>

      {/* ══ Left column ══════════════════════════════════ */}
      <div className={styles.leftCol}>

        <section className={styles.section}>
          <SectionLabel>Content</SectionLabel>
          <InputSection onChange={() => {}} onGenerate={handleGenerate} />
        </section>

        <section className={styles.section}>
          <SectionLabel>Customize</SectionLabel>
          <CustomizeSection config={config} onChange={handleConfigChange} />
        </section>

      </div>

      {/* ══ Right column (sticky preview) ════════════════ */}
      <div className={styles.rightCol}>
        <SectionLabel>Preview</SectionLabel>

        {/* Preview card */}
        <div
          className={`${styles.previewCard} ${generated ? styles.previewActive : ''}`}
          ref={qrRef}
        >
          {generated && qrValue ? (
            <div
              key={animKey}
              className={styles.qrWrap}
              style={{
                background: config.bgColor,
                padding:    config.margin + 'px',
                borderRadius: 10,
              }}
            >
              <QRCodeSVG
                value={qrValue}
                size={displaySize}
                fgColor={config.fgColor}
                bgColor={config.bgColor === 'transparent' ? 'transparent' : config.bgColor}
                level={config.level}
                style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
              />
            </div>
          ) : (
            <Placeholder />
          )}
        </div>

        {/* Downloads */}
        {generated && qrValue && (
          <DownloadButtons qrRef={qrRef} config={config} fileName="qrcode" />
        )}
      </div>

    </div>
  )
}

/* ── Small helpers ─────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className={styles.sectionLabel}>{children}</p>
)

const Placeholder = () => (
  <div className={styles.placeholder}>
    <div className={styles.placeholderIcon}>
      <svg width="60" height="60" viewBox="0 0 28 28" fill="none">
        <rect x="2"  y="2"  width="10" height="10" rx="2.5" fill="currentColor" opacity="0.22"/>
        <rect x="16" y="2"  width="10" height="10" rx="2.5" fill="currentColor" opacity="0.22"/>
        <rect x="2"  y="16" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.22"/>
        <rect x="16" y="16" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.1"/>
        <rect x="19" y="19" width="4"  height="4"  rx="1"   fill="currentColor" opacity="0.22"/>
      </svg>
    </div>
    <p className={styles.placeholderTitle}>Your QR code appears here</p>
    <p className={styles.placeholderSub}>
      Fill in the form and press <strong>Generate QR Code</strong>
    </p>
  </div>
)

export default QRGenerator
