import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import './Experience.css'

function Experience() {
  const { experience } = usePortfolio()
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">My Journey</p>
          <h2 className="section-title">
            Experience <span className="gold-text">Timeline</span>
          </h2>
          <div className="gold-divider"></div>
        </motion.div>

        <div className="timeline">
          {experience.map((item, i) => (
            <motion.div
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
              key={item.event}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-card glass-card">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-event">{item.event}</h3>
                <p className="timeline-org">{item.org}</p>
                <p className="timeline-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
