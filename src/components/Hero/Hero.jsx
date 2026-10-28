import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaDownload, FaInstagram, FaYoutube, FaLinkedinIn, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './Hero.css'

// Social icon mapping
const socialIcons = {
  instagram: FaInstagram,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
}

function Hero() {
  const { profile } = usePortfolio()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [profile.roles.length])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  }

  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        {/* Left content */}
        <div className="hero-content">
          <motion.p
            className="hero-greeting"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            className="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {profile.firstName} <span className="gold-text">{profile.lastName}</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <span className="role-static">{profile.role} |</span>
            <span className="role-rotating gold-text">{profile.roles[roleIndex]}</span>
            <span className="role-cursor">|</span>
          </motion.div>

          <motion.p
            className="hero-tagline"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {profile.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero-cta"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <a
              href="https://wa.me/919142462306?text=Hello%20Anchor%20Delhi%2C%20I%20would%20like%20to%20inquire%20about%20booking%20you%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Book Now
            </a>
            <a href="#showreel" className="btn btn-outline">
              <FaPlay /> Watch Showreel
            </a>
            <a href={profile.downloadProfile} className="btn btn-white" download>
              <FaDownload /> Download Profile
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="hero-social"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            {Object.entries(profile.social).map(([key, url]) => {
              const Icon = socialIcons[key]
              if (!Icon) return null
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={key}
                >
                  <Icon />
                </a>
              )
            })}
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero-image-frame">
            <div className="hero-image-glow"></div>
            <img src={profile.image} alt={`${profile.name}`} className="hero-image" />
            <div className="hero-image-badge">
              <span className="badge-number">{profile.yearsExperience}+</span>
              <span className="badge-label">Years on Stage</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="hero-scroll"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        aria-label="Scroll down"
      >
        <span className="mouse">
          <span className="wheel"></span>
        </span>
      </motion.a>
    </section>
  )
}

export default Hero
