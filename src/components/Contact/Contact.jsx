import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaCheckCircle,
} from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './Contact.css'

function Contact() {
  const { profile } = usePortfolio()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    eventType: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')

  const rawNumber = profile.whatsapp || profile.phone || '9142462306'
  const cleanNumber = rawNumber.replace(/\D/g, '')
  const whatsappNumber = cleanNumber.startsWith('91') && cleanNumber.length > 10
    ? cleanNumber
    : `91${cleanNumber.slice(-10)}`

  const defaultAutoMessage = encodeURIComponent(
    'Hello Anchor Delhi, I would like to inquire about booking you for an event.'
  )
  const directWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${defaultAutoMessage}`

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const autoMessage = [
      'Hello Anchor Delhi! I would like to inquire about booking you for an event:',
      form.name ? `• Name: ${form.name}` : '',
      form.phone ? `• Phone: ${form.phone}` : '',
      form.eventType ? `• Event Type: ${form.eventType}` : '',
      form.message ? `• Message: ${form.message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(autoMessage)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('success')
  }

  const contactItems = [
    {
      icon: FaPhoneAlt,
      label: 'Call Directly',
      value: '+91 9142462306',
      href: 'tel:9142462306',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp Chat',
      value: '+91 9142462306',
      href: directWhatsAppUrl,
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: profile.location || 'Delhi NCR, India',
    },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">
            Let's Create Something <span className="gold-text">Extraordinary</span>
          </h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">
            Have an event coming up? Connect with me directly on WhatsApp for quick responses.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-items">
              {contactItems.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <div className="contact-icon"><Icon /></div>
                    <div>
                      <h4>{item.label}</h4>
                      <p>{item.value}</p>
                    </div>
                  </>
                )
                return item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item glass-card"
                    key={item.label}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="contact-item glass-card" key={item.label}>
                    {content}
                  </div>
                )
              })}
            </div>

            {/* Social links */}
            <div className="contact-social">
              {profile.social?.instagram && (
                <a href={profile.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              )}
              {profile.social?.youtube && (
                <a href={profile.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
              )}
              {profile.social?.linkedin && (
                <a href={profile.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn />
                </a>
              )}
              <a href={directWhatsAppUrl} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            className="contact-form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone / WhatsApp"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <select name="eventType" value={form.eventType} onChange={handleChange} required>
                  <option value="" disabled>Select Event Type</option>
                  <option>Engagement Ceremony</option>
                  <option>Marriage Anniversary</option>
                  <option>Wedding Hosting</option>
                  <option>Haldi / Mehandi / Sangeet</option>
                  <option>Corporate Event</option>
                  <option>College Fest</option>
                  <option>Award Ceremony</option>
                  <option>Other Special Event</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell me about your event date, venue, and vision..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-gold form-submit"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FaWhatsapp style={{ fontSize: '1.25rem' }} /> Send Message via WhatsApp
            </button>

            {status === 'success' && (
              <p className="form-status success">
                <FaCheckCircle /> Opening WhatsApp with your message!
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
