import { motion } from 'framer-motion'
import { FaCheckCircle, FaAward, FaLanguage, FaStar } from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function About() {
  const { profile } = usePortfolio()
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="section-heading"
          variants={fadeUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="section-eyebrow">About Me</p>
          <h2 className="section-title">
            The Voice Behind <span className="gold-text">Unforgettable Events</span>
          </h2>
          <div className="gold-divider"></div>
        </motion.div>

        <div className="about-grid">
          {/* Left - biography */}
          <motion.div
            className="about-bio glass-card"
            variants={fadeUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="about-text">{profile.bio}</p>

            <div className="about-details">
              <div className="detail-item">
                <FaLanguage className="detail-icon" />
                <div>
                  <h4>Languages</h4>
                  <p>{profile.languages.join(' · ')}</p>
                </div>
              </div>
              <div className="detail-item">
                <FaStar className="detail-icon" />
                <div>
                  <h4>Hosting Style</h4>
                  <p>{profile.hostingStyle}</p>
                </div>
              </div>
            </div>

            <div className="about-col">
              <h4 className="about-subhead">Strengths</h4>
              <ul className="about-list">
                {profile.strengths.map((s) => (
                  <li key={s}>
                    <FaCheckCircle className="check" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-col">
              <h4 className="about-subhead">Event Types</h4>
              <div className="event-tags">
                {profile.eventTypes.map((e) => (
                  <span className="event-tag" key={e}>{e}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - achievements/quick info */}
          <motion.div
            className="about-side"
            variants={fadeUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="about-achievements glass-card">
              <h3 className="side-title">
                <FaAward className="side-icon" /> Achievements
              </h3>
              <ul className="achievement-list">
                {profile.achievements.map((a, i) => (
                  <li key={i} className="achievement-item">
                    <span className="achievement-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-quote glass-card">
              <blockquote>
                "Every event is a story. My job is to narrate it with passion, precision and a touch of magic."
              </blockquote>
              <p className="quote-author">— {profile.name}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
