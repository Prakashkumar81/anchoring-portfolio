import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaTimes } from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import VideoPlayer from '../VideoPlayer/VideoPlayer'
import './Showreel.css'

function Showreel() {
  const { showreel } = usePortfolio()
  const [playing, setPlaying] = useState(false)

  return (
    <section id="showreel" className="showreel">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Featured</p>
          <h2 className="section-title">
            The <span className="gold-text">Showreel</span>
          </h2>
          <div className="gold-divider"></div>
        </motion.div>

        <motion.div
          className="showreel-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="showreel-video" onClick={() => setPlaying(true)}>
            <img src={showreel.thumbnail} alt={showreel.title} loading="lazy" />
            <div className="showreel-overlay">
              <motion.div
                className="showreel-play-btn"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaPlay />
              </motion.div>
              <h3 className="showreel-title">{showreel.title}</h3>
            </div>
          </div>

          <p className="showreel-description">{showreel.description}</p>
        </motion.div>
      </div>

      {/* Showreel modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            className="showreel-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(false)}
          >
            <motion.div
              className="showreel-modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="showreel-modal-close"
                onClick={() => setPlaying(false)}
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <VideoPlayer url={showreel.url} controls playing />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Showreel
