import { motion } from 'framer-motion'
import { usePortfolio } from '../../context/PortfolioContext'
import './VideoGallery.css'

function VideoGallery() {
  const { videos } = usePortfolio()

  return (
    <section id="videos" className="section videos">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Video Gallery</p>
          <h2 className="section-title">
            Highlights in <span className="gold-text">Motion</span>
          </h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            Watch standout moments from the events I&apos;ve hosted — in action.
          </p>
        </motion.div>

        <div className="videos-grid">
          {videos.map((video, i) => {
            const embedSrc = video.embedUrl || video.url
            return (
              <motion.div
                className="video-card glass-card"
                key={video.title || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="video-thumb video-embed-container">
                  <iframe
                    src={embedSrc}
                    title={video.videoTitle || video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="video-embed-iframe"
                  />
                </div>
                <div className="video-info">
                  {video.category && (
                    <span className="video-category">{video.category}</span>
                  )}
                  <h3 className="video-title">{video.title}</h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default VideoGallery
