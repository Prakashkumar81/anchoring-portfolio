import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { usePortfolio } from '../../context/PortfolioContext'
import './WhatsAppBubble.css'

function WhatsAppBubble() {
  const { profile } = usePortfolio()

  // WhatsApp setup
  const rawNumber = profile.whatsapp || profile.phone || '9142462306'
  const cleanNumber = rawNumber.replace(/\D/g, '')
  const whatsappNumber = cleanNumber.startsWith('91') && cleanNumber.length > 10
    ? cleanNumber
    : `91${cleanNumber.slice(-10)}`

  const autoMessage = encodeURIComponent(
    'Hello Anchor Delhi, I would like to inquire about booking you for an event.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${autoMessage}`

  // Gmail setup
  const emailAddress = profile.email || 'rathorprakash813@gmail.com'
  const emailSubject = encodeURIComponent('Event Anchor Booking Inquiry - Anchor Delhi')
  const emailBody = encodeURIComponent(
    'Hello Anchor Delhi,\n\nI would like to inquire about booking you for an event.\n\nEvent Type:\nDate & Time:\nVenue / City:\nEstimated Guests:\nMy Phone Number:\n\nThank you!'
  )
  const gmailUrl = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`

  return (
    <motion.aside
      className="floating-bubbles-stack"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      aria-label="Quick contact options"
    >
      {/* Gmail Bubble */}
      <a
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bubble gmail-bubble"
        aria-label="Email on Gmail (rathorprakash813@gmail.com)"
      >
        <div className="contact-bubble-icon">
          <SiGmail />
        </div>
        <span className="contact-bubble-tooltip">
          Email on Gmail
        </span>
      </a>

      {/* WhatsApp Bubble */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="contact-bubble whatsapp-bubble"
        aria-label="Chat on WhatsApp (9142462306)"
      >
        <div className="contact-bubble-icon">
          <FaWhatsapp />
        </div>
        <span className="contact-bubble-tooltip">
          Chat on WhatsApp
        </span>
        <span className="contact-bubble-pulse" aria-hidden="true" />
      </a>
    </motion.aside>
  )
}

export default WhatsAppBubble
