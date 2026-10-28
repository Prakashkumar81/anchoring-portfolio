import { motion } from 'framer-motion'
import {
  FaBriefcase, FaHeart, FaGraduationCap, FaMusic, FaTrophy,
  FaRocket, FaStar, FaBullhorn, FaGlassCheers,
} from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './Services.css'

// Map icon key to component
const iconMap = {
  briefcase: FaBriefcase,
  heart: FaHeart,
  graduation: FaGraduationCap,
  music: FaMusic,
  trophy: FaTrophy,
  rocket: FaRocket,
  star: FaStar,
  megaphone: FaBullhorn,
  cocktail: FaGlassCheers,
}

function Services() {
  const { services } = usePortfolio()
  return (
    <section id="services" className="section services">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">What I Do</p>
          <h2 className="section-title">
            Premium <span className="gold-text">Services</span>
          </h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            From intimate private gatherings to grand celebrity shows — I bring world-class energy to every platform.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || FaStar
            return (
              <motion.div
                className="service-card glass-card"
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <div className="service-icon">
                  <Icon />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <span className="service-number">0{i + 1}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
