import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { usePortfolio } from '../../context/PortfolioContext'
import './Testimonials.css'

function Testimonials() {
  const { testimonials } = usePortfolio()
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Client Love</p>
          <h2 className="section-title">
            What Clients <span className="gold-text">Say</span>
          </h2>
          <div className="gold-divider"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            loop
            className="testimonial-swiper"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-card glass-card">
                  <FaQuoteLeft className="testimonial-quote" />
                  <div className="testimonial-stars">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <FaStar key={s} className="star-icon" />
                    ))}
                  </div>
                  <p className="testimonial-review">"{t.review}"</p>
                  <div className="testimonial-author">
                    <img src={t.image} alt={t.name} loading="lazy" />
                    <div>
                      <h4 className="testimonial-name">{t.name}</h4>
                      <p className="testimonial-role">{t.designation}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
