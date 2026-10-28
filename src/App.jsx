import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Stats from './components/Stats/Stats'
import Services from './components/Services/Services'
import SpecialEvents from './components/SpecialEvents/SpecialEvents'
import Gallery from './components/Gallery/Gallery'
import VideoGallery from './components/VideoGallery/VideoGallery'
import Showreel from './components/Showreel/Showreel'
import Experience from './components/Experience/Experience'
import WhyHireMe from './components/WhyHireMe/WhyHireMe'
import Testimonials from './components/Testimonials/Testimonials'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import WhatsAppBubble from './components/WhatsAppBubble/WhatsAppBubble'
import Particles from './components/Particles/Particles'
import CustomizeButton from './components/CustomizeButton/CustomizeButton'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'

function AppContent() {
  const { profile } = usePortfolio()
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        const id = target.getAttribute('href').slice(1)
        const el = document.getElementById(id)
        if (el) {
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Helmet>
        <title>{`${profile.name} | ${profile.role}`}</title>
        <meta name="description" content={profile.tagline} />
        <meta name="keywords" content="event anchor, master of ceremonies, stage host, mc, wedding anchor, corporate event host" />
        <meta property="og:title" content={`${profile.name} | ${profile.role}`} />
        <meta property="og:description" content={profile.tagline} />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#0a0a0a" />
      </Helmet>

      <Particles />
      <Navbar />

      <main role="main">
        <Hero />
        <About />
        <Stats />
        <Services />
        <SpecialEvents />
        <Gallery />
        <VideoGallery />
        <Showreel />
        <Experience />
        <WhyHireMe />
        <Testimonials />
      </main>

      <Footer />
      <WhatsAppBubble />
      <BackToTop />
      <CustomizeButton />
    </motion.div>
  )
}

function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  )
}

export default App
