import Header from '../components/Header'
import QRGenerator from '../components/QRGenerator'
import Footer from '../components/Footer'
import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.page}>
      <Header />
      <QRGenerator />
      <Footer />
    </div>
  )
}

export default Home

