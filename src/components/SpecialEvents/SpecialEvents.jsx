import { motion } from 'framer-motion'
import {
  FaGem, FaBirthdayCake, FaRing, FaCrown,
  FaLeaf, FaMusic,
} from 'react-icons/fa'
import './SpecialEvents.css'

// Signature events data (kept local as this is a self-contained section)
const specialEvents = [
  {
    icon: FaGem,
    title: 'Anniversary Celebration',
    desc: 'Elegant hosting for memorable anniversary celebrations with engaging audience interaction and heartfelt moments.',
  },
  {
    icon: FaBirthdayCake,
    title: 'Birthday Celebration',
    desc: 'High-energy birthday hosting featuring games, entertainment, audience engagement, and memorable stage moments.',
  },
  {
    icon: FaRing,
    title: 'Engagement Ceremony',
    desc: 'Sophisticated hosting for engagement ceremonies with graceful stage management and joyful family interaction.',
  },
  {
    icon: FaCrown,
    title: 'Reception Party',
    desc: 'Professional reception hosting with smooth event flow, guest engagement, and premium stage presence.',
  },
{
    icon: FaLeaf,
    title: 'Haldi Ceremony',
    desc: 'Vibrant and fun-filled Haldi hosting with traditional games, music, laughter, and family participation.',
  },
  {
    icon: FaMusic,
    title: 'Sangeet Night',
    desc: 'Energetic Sangeet hosting with dance performances, celebrity-style stage presence, audience interaction, and nonstop entertainment.',
  },
]

// 3D tilt handler
function handleTilt(e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  card.style.setProperty('--tiltX', `${y * 8}deg`)
  card.style.setProperty('--tiltY', `${x * 8}deg`)
  // Spotlight position
  card.style.setProperty('--spotX', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  card.style.setProperty('--spotY', `${((e.clientY - rect.top) / rect.height) * 100}%`)
}

function resetTilt(e) {
  const card = e.currentTarget
  card.style.setProperty('--tiltX', '0deg')
  card.style.setProperty('--tiltY', '0deg')
}

// Generate floating golden particles
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  bottom: `${Math.random() * 20}%`,
  size: `${Math.random() * 6 + 3}px`,
  duration: `${Math.random() * 8 + 8}s`,
  delay: `${Math.random() * 8}s`,
}))

function SpecialEvents() {
  return (
    <section id="special-events" className="section special-events">
      {/* Subtle animated golden particles background */}
      <div className="special-particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="special-particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          ></span>
        ))}
      </div>

      {/* Gold divider above */}
      <div className="special-divider" aria-hidden="true"></div>

      <div className="container">
        {/* Section heading */}
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">My Specialities</p>
          <h2 className="section-title">
            Signature Events I <span className="gold-text">Host</span>
          </h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            Creating unforgettable moments with energy, elegance, and seamless stage hosting for every celebration.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="special-grid">
          {specialEvents.map((event, i) => {
            const Icon = event.icon
            return (
              <motion.div
                className="special-card"
                key={event.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="special-inner">
                  {/* Shine sweep */}
                  <div className="special-shine" aria-hidden="true"></div>
                  {/* Spotlight */}
                  <div className="special-spotlight" aria-hidden="true"></div>

                  <div className="special-icon">
                    <Icon />
                  </div>
                  <h3 className="special-title">{event.title}</h3>
                  <p className="special-desc">{event.desc}</p>
                  <a href="#contact" className="special-btn">
                    Learn More
                    <span className="special-btn-arrow">→</span>
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Gold divider below */}
      <div className="special-divider" aria-hidden="true"></div>
    </section>
  )
}

export default SpecialEvents
