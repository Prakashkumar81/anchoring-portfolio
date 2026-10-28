import { FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF, FaWhatsapp, FaHeart } from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './Footer.css'

const socialIcons = {
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
}

function Footer() {
  const { profile, navLinks } = usePortfolio()
  const handleNav = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#home" className="navbar-logo" onClick={() => handleNav('home')}>
            <span className="logo-name">{profile.firstName}</span>
            <span className="logo-last gold-text">{profile.lastName}</span>
          </a>
          <p className="footer-tagline">{profile.tagline}</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); handleNav(link.id) }}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-social">
          {Object.entries(profile.social).map(([key, url]) => {
            const Icon = socialIcons[key]
            if (!Icon) return null
            return (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                <Icon />
              </a>
            )
          })}
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
          </p>
          <p className="footer-made">
            Made with <FaHeart className="footer-heart" /> for unforgettable events.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
