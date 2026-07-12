import { useState, useEffect } from 'react'
import Header from '../components/Header'
import QRGenerator from '../components/QRGenerator'
import Footer from '../components/Footer'
import styles from './Home.module.css'

const Home = () => {
  // Initialise from localStorage; default to dark (night) mode
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('qr-theme')
    return saved ? saved === 'dark' : true
  })

  // Apply / remove the data-theme attribute on <html> whenever isDark changes
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('qr-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const handleToggle = () => setIsDark(prev => !prev)

  return (
    <div className={styles.page}>
      <Header isDark={isDark} onToggle={handleToggle} />
      <main className={styles.main}>
        <QRGenerator />
      </main>
      <Footer />
    </div>
  )
}

export default Home
