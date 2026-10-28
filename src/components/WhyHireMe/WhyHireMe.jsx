import { motion } from 'framer-motion'
import {
  FaMicrophoneAlt, FaUsers, FaComments, FaGlobeAmericas,
  FaHandshake, FaClock, FaSmile, FaGem,
} from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './WhyHireMe.css'

// Icon map
const iconMap = {
  mic: FaMicrophoneAlt,
  users: FaUsers,
  chat: FaComments,
  globe: FaGlobeAmericas,
  handshake: FaHandshake,
  clock: FaClock,
  smile: FaSmile,
  diamond: FaGem,
}

function WhyHireMe() {
  const { whyHireMe } = usePortfolio()
  return (
    <section className="section whyhire">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">The Difference</p>
          <h2 className="section-title">
            Why <span className="gold-text">Hire Me</span>
          </h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            A blend of talent, polish and professionalism that turns events into experiences.
          </p>
        </motion.div>

        <div className="why-grid">
          {whyHireMe.map((item, i) => {
            const Icon = iconMap[item.icon] || FaMicrophoneAlt
            return (
              <motion.div
                className="why-card glass-card"
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              >
                <div className="why-icon">
                  <Icon />
                </div>
                <h3 className="why-title">{item.title}</h3>
                <p className="why-desc">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyHireMe
