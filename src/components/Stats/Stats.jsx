import { motion } from 'framer-motion'
import useCounter from '../../hooks/useCounter'
import { usePortfolio } from '../../context/PortfolioContext'
import './Stats.css'

// Single stat with animated counter
function StatItem({ stat, index }) {
  const [count, ref] = useCounter(stat.value)

  return (
    <motion.div
      className="stat-item"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <span className="stat-number gold-text">
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="stat-label">{stat.label}</span>
    </motion.div>
  )
}

function Stats() {
  const { stats } = usePortfolio()
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </section>
  )
}

export default Stats
