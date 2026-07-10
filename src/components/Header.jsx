import styles from './Header.module.css'

const Header = () => {
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
    </header>
  )
}

export default Header
