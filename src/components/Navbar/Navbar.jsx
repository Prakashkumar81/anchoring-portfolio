import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './Navbar.css'

function Navbar() {
  const { navLinks, profile } = usePortfolio()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Active section highlighting
      const sections = navLinks.map((l) => l.id)
      const current = sections.find((id) => {
        const el = document.getElementById(id)
        return el && el.getBoundingClientRect().top <= 120
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [navLinks])

  const handleNav = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo" onClick={() => handleNav('home')}>
          <span className="logo-name">{profile.firstName}</span>
          <span className="logo-last gold-text">{profile.lastName}</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar-links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link ${active === link.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleNav(link.id)
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/919142462306?text=Hello%20Anchor%20Delhi%2C%20I%20would%20like%20to%20inquire%20about%20booking%20you%20for%20an%20event."
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold navbar-cta"
        >
          Book Now
        </a>

        {/* Mobile toggle */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`mobile-link ${active === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNav(link.id)
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
