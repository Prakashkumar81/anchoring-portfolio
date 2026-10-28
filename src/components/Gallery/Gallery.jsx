import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import LightGallery from 'lightgallery/react'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import { usePortfolio } from '../../context/PortfolioContext'
import './Gallery.css'

function Gallery() {
  const galleryRef = useRef(null)
  const { gallery } = usePortfolio()

  useEffect(() => {
    // Preload images for smoother lightbox
    gallery.forEach((img) => {
      const preload = new Image()
      preload.src = img.src
    })
  }, [gallery])

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">My Gallery</p>
          <h2 className="section-title">
            Moments I've <span className="gold-text">Owned</span>
          </h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            A glimpse into the stages, ceremonies and festivals I've had the honour to host.
          </p>
        </motion.div>

        <LightGallery
          ref={galleryRef}
          speed={500}
          plugins={[lgZoom, lgThumbnail]}
          elementClassNames="gallery-grid"
        >
          {gallery.map((item, i) => (
            <motion.a
              key={item.src}
              href={item.src}
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                onLoad={(e) => e.target.classList.add('loaded')}
              />
              <div className="gallery-overlay">
                <span className="gallery-category">{item.category}</span>
                <span className="gallery-zoom">+</span>
              </div>
            </motion.a>
          ))}
        </LightGallery>
      </div>
    </section>
  )
}

export default Gallery
