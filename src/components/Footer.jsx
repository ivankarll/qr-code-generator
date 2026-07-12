import styles from './Footer.module.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="10" height="10" rx="2" fill="#8b5cf6" />
            <rect x="16" y="2" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.55" />
            <rect x="2" y="16" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.55" />
            <rect x="16" y="16" width="10" height="10" rx="2" fill="#8b5cf6" opacity="0.25" />
            <rect x="19" y="19" width="4" height="4" rx="1" fill="#8b5cf6" />
          </svg>
          <span className={styles.brandName}>QR Generator</span>
        </div>

        <p className={styles.copy}>
          &copy; Ivan Karl Lobaton | {year} &nbsp;·&nbsp; Free to use &nbsp;·&nbsp; No sign-up required &nbsp;·&nbsp;{' '}
          <a
            href="https://ivankarll.github.io/portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.portfolioLink}
          >
            View My Portfolio
          </a>
        </p>

        <div className={styles.links}>
          <span className={styles.badge}>URL</span>
          <span className={styles.badge}>Text</span>
          <span className={styles.badge}>Email</span>
          <span className={styles.badge}>Phone</span>
          <span className={styles.badge}>SMS</span>
          <span className={styles.badge}>WiFi</span>
          <span className={styles.badge}>vCard</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
