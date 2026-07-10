import styles from './Header.module.css'

const Header = ({ isDark, onToggle }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="2" width="10" height="10" rx="2" fill="#8b5cf6"/>
          <rect x="16" y="2" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.6"/>
          <rect x="2" y="16" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.6"/>
          <rect x="16" y="16" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.3"/>
          <rect x="19" y="19" width="4" height="4" rx="1" fill="#8b5cf6"/>
        </svg>
        <span className={styles.logoText}>QR Generator</span>
      </div>

      <p className={styles.tagline}>Create QR codes for URLs, contacts, WiFi &amp; more</p>

      {/* Theme toggle */}
      <button
        className={styles.themeBtn}
        onClick={onToggle}
        aria-label={isDark ? 'Switch to day mode' : 'Switch to night mode'}
        title={isDark ? 'Day mode' : 'Night mode'}
      >
        <span className={styles.themeBtnTrack}>
          <span className={`${styles.themeBtnThumb} ${isDark ? '' : styles.thumbDay}`} />
        </span>
        <span className={styles.themeIcon}>{isDark ? '🌙' : '☀️'}</span>
      </button>
    </header>
  )
}

export default Header
