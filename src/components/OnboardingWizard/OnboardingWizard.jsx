import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaTimes, FaCheck, FaArrowLeft, FaArrowRight, FaCloudUploadAlt,
  FaUser, FaCamera, FaInfoCircle, FaChartBar, FaImages, FaVideo,
  FaShareAlt, FaPhoneAlt, FaSearch, FaCheckCircle, FaDownload,
} from 'react-icons/fa'
import { usePortfolio } from '../../context/PortfolioContext'
import './OnboardingWizard.css'

// Step definitions
const STEPS = [
  { id: 1, label: 'Personal', icon: FaUser },
  { id: 2, label: 'Hero', icon: FaCamera },
  { id: 3, label: 'About', icon: FaInfoCircle },
  { id: 4, label: 'Stats', icon: FaChartBar },
  { id: 5, label: 'Gallery', icon: FaImages },
  { id: 6, label: 'Videos', icon: FaVideo },
  { id: 7, label: 'Social', icon: FaShareAlt },
  { id: 8, label: 'Contact', icon: FaPhoneAlt },
  { id: 9, label: 'SEO', icon: FaSearch },
]

// Read a file as data URL (base64)
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Reusable drag & drop uploader
function Uploader({ multiple, accept, onFiles, label, hint }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFiles = async (files) => {
    const list = Array.from(files)
    const results = await Promise.all(list.map((f) => readFileAsDataURL(f)))
    onFiles(results)
  }

  return (
    <div
      className={`wizard-upload ${dragging ? 'dragging' : ''}`}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current.click() }}
    >
      <FaCloudUploadAlt className="wizard-upload-icon" />
      <p><strong>Click to upload</strong> or drag &amp; drop{multiple ? ' files' : ' a file'} here</p>
      <p className="wizard-upload-hint">{label}</p>
      {hint && <p className="wizard-upload-hint">{hint}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}

// Chips input for multi-value fields (languages, strengths, etc.)
function ChipsInput({ values, onChange, placeholder }) {
  const [text, setText] = useState('')

  const add = () => {
    const val = text.trim()
    if (val && !values.includes(val)) {
      onChange([...values, val])
    }
    setText('')
  }

  return (
    <div>
      <div className="wizard-chips">
        {values.map((v) => (
          <span className="wizard-chip" key={v}>
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} aria-label={`Remove ${v}`}>
              ×
            </button>
          </span>
        ))}
        <input
          className="wizard-chips-input"
          value={text}
          placeholder={placeholder}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          onBlur={add}
        />
      </div>
    </div>
  )
}

// Field wrapper
function Field({ label, optional, children, full }) {
  return (
    <div className={`wizard-field ${full ? '' : ''}`} style={full ? { gridColumn: '1 / -1' } : {}}>
      <label>
        {label} {optional && <span className="opt">(optional)</span>}
      </label>
      {children}
    </div>
  )
}

function OnboardingWizard({ onClose }) {
  const { savePortfolioData, profile: currentProfile, stats: currentStats, gallery: currentGallery, videos: currentVideos, showreel: currentShowreel } = usePortfolio()
  const [step, setStep] = useState(1)
  const [saved, setSaved] = useState(false)

// ---- Form state (pre-filled with current portfolio data) ----
  const [profile, setProfile] = useState({
    name: currentProfile.name || '',
    firstName: '',
    lastName: '',
    role: currentProfile.role || 'Professional Event Anchor',
    roles: currentProfile.roles || ['Stage Host', 'Master of Ceremonies'],
    tagline: currentProfile.tagline || '',
    bio: currentProfile.bio || '',
    image: currentProfile.image && !String(currentProfile.image).includes('placeholder') ? currentProfile.image : '',
    email: currentProfile.email || '',
    phone: currentProfile.phone || '',
    whatsapp: currentProfile.whatsapp || '',
    bookingContact: currentProfile.bookingContact || '',
    alternateContact: currentProfile.alternateContact || '',
    location: currentProfile.location || '',
    city: currentProfile.city || '',
    state: currentProfile.state || '',
    country: currentProfile.country || '',
    yearsExperience: currentProfile.yearsExperience || 0,
    languages: currentProfile.languages || [],
    hostingStyle: currentProfile.hostingStyle || '',
    personalityTraits: currentProfile.personalityTraits || [],
    strengths: currentProfile.strengths || [],
    eventTypes: currentProfile.eventTypes || [],
    achievements: currentProfile.achievements || [],
    social: {
      instagram: (currentProfile.social && currentProfile.social.instagram) || '',
      youtube: (currentProfile.social && currentProfile.social.youtube) || '',
      linkedin: (currentProfile.social && currentProfile.social.linkedin) || '',
      facebook: (currentProfile.social && currentProfile.social.facebook) || '',
      website: (currentProfile.social && currentProfile.social.website) || '',
    },
    downloadProfile: currentProfile.downloadProfile || '',
  })

// Pre-fill stats from current stats array
  const statArr = currentStats && currentStats.length ? currentStats : []
  const statVal = (idx) => (statArr[idx] ? statArr[idx].value : 0)
  const [stats, setStats] = useState({
    eventsHosted: statVal(0),
    happyClients: statVal(1),
    audienceReached: statVal(2),
    yearsExperience: statVal(3),
    citiesCovered: 0,
    awardsWon: 0,
  })

  const [gallery, setGallery] = useState(currentGallery && currentGallery.length ? currentGallery : [])
  const [videos, setVideos] = useState(currentVideos && currentVideos.length ? currentVideos : [])
  const [showreel, setShowreel] = useState({ url: (currentShowreel && currentShowreel.url) || '', thumbnail: (currentShowreel && currentShowreel.thumbnail) || '' })
  const [seo, setSeo] = useState({ title: '', description: '', keywords: '' })

  const [contact, setContact] = useState({
    phone: currentProfile.phone || '',
    bookingEmail: currentProfile.email || '',
    whatsapp: currentProfile.whatsapp || '',
    officeAddress: '',
    instagram: (currentProfile.social && currentProfile.social.instagram) || '',
    youtube: (currentProfile.social && currentProfile.social.youtube) || '',
    linkedin: (currentProfile.social && currentProfile.social.linkedin) || '',
    website: (currentProfile.social && currentProfile.social.website) || '',
  })

  const updateProfile = (field, value) => setProfile((p) => ({ ...p, [field]: value }))

  const handleGalleryFiles = (files) => {
    setGallery((g) => [...g, ...files.map((f, i) => ({ src: f, alt: `Gallery photo ${g.length + i + 1}`, category: 'Event' }))])
  }

  const handleVideoFiles = (files) => {
    setVideos((v) => [...v, ...files.map((f, i) => ({ title: `Highlight Video ${v.length + i + 1}`, url: f, thumbnail: '', category: 'Event' }))])
  }

  const removeGallery = (idx) => setGallery((g) => g.filter((_, i) => i !== idx))
  const removeVideo = (idx) => setVideos((v) => v.filter((_, i) => i !== idx))

  // Build the final data object from all form state
  const buildData = () => {
    const locationParts = [profile.city, profile.state, profile.country].filter(Boolean).join(', ')

    const finalProfile = {
      name: profile.name,
      firstName: profile.firstName || profile.name.split(' ')[0] || '',
      lastName: profile.lastName || profile.name.split(' ').slice(1).join(' ') || '',
      role: profile.role,
      roles: profile.roles.length ? profile.roles : ['Stage Host', 'Master of Ceremonies'],
      tagline: profile.tagline,
      bio: profile.bio,
      image: profile.image || '/assets/hero-placeholder.svg',
      email: profile.email || contact.bookingEmail,
      phone: profile.phone || contact.phone,
      whatsapp: profile.whatsapp || contact.whatsapp,
      bookingContact: profile.bookingContact || contact.phone,
      alternateContact: profile.alternateContact,
      location: locationParts || profile.location,
      city: profile.city || locationParts,
      state: profile.state,
      country: profile.country,
      yearsExperience: Number(profile.yearsExperience) || 0,
      languages: profile.languages,
      hostingStyle: profile.hostingStyle,
      personalityTraits: profile.personalityTraits,
      strengths: profile.strengths.length ? profile.strengths : profile.personalityTraits,
      eventTypes: profile.eventTypes,
      achievements: profile.achievements,
      social: {
        instagram: profile.social.instagram || contact.instagram,
        youtube: profile.social.youtube || contact.youtube,
        linkedin: profile.social.linkedin || contact.linkedin,
        facebook: profile.social.facebook || '',
        website: profile.social.website || contact.website || '',
      },
      downloadProfile: profile.downloadProfile || '/assets/profile.pdf',
    }

    const finalStats = [
      { label: 'Events Hosted', value: Number(stats.eventsHosted) || 0, suffix: '+' },
      { label: 'Happy Clients', value: Number(stats.happyClients) || 0, suffix: '+' },
      { label: 'Audience Reached', value: Number(stats.audienceReached) || 0, suffix: 'M+' },
      { label: 'Years Experience', value: Number(stats.yearsExperience) || Number(profile.yearsExperience) || 0, suffix: '+' },
    ]

    return {
      profile: finalProfile,
      stats: finalStats,
      gallery: gallery.length ? gallery : undefined,
      videos: videos.length ? videos : undefined,
      showreel: {
        title: 'The Showreel',
        description: 'A cinematic glimpse into the energy, elegance and emotion I bring to every stage.',
        url: showreel.url || '/assets/video-placeholder.svg',
        thumbnail: showreel.thumbnail || '/assets/video-placeholder.svg',
      },
      seo: {
        title: seo.title || `${finalProfile.name} | ${finalProfile.role}`,
        description: seo.description || finalProfile.tagline,
        keywords: seo.keywords || 'event anchor, master of ceremonies, stage host, mc',
      },
      contact: {
        phone: contact.phone || finalProfile.phone,
        bookingEmail: contact.bookingEmail || finalProfile.email,
        officeAddress: contact.officeAddress || '',
      },
    }
  }

  const handleSave = () => {
    const data = buildData()
    savePortfolioData(data)
    setSaved(true)
    setTimeout(() => {
      if (onClose) onClose()
    }, 1800)
  }

  const handleExport = () => {
    const data = buildData()
    const blob = new Blob([`export const portfolioData = ${JSON.stringify(data, null, 2)}`], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolioData.export.js'
    a.click()
    URL.revokeObjectURL(url)
  }

  const progress = (step / STEPS.length) * 100

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="wizard-row">
              <Field label="Full Name">
                <input type="text" value={profile.name} onChange={(e) => updateProfile('name', e.target.value)} placeholder="e.g. Rohan Sharma" required />
              </Field>
              <Field label="Professional Role">
                <input type="text" value={profile.role} onChange={(e) => updateProfile('role', e.target.value)} placeholder="Professional Event Anchor" />
              </Field>
            </div>
            <Field label="Professional Bio">
              <textarea value={profile.bio} onChange={(e) => updateProfile('bio', e.target.value)} placeholder="Write a short professional bio..." />
            </Field>
            <div className="wizard-row">
              <Field label="Years of Experience">
                <input type="number" min="0" value={profile.yearsExperience} onChange={(e) => updateProfile('yearsExperience', e.target.value)} placeholder="e.g. 10" />
              </Field>
              <Field label="Languages Spoken">
                <ChipsInput values={profile.languages} onChange={(v) => updateProfile('languages', v)} placeholder="Type language + Enter" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="City">
                <input type="text" value={profile.city} onChange={(e) => updateProfile('city', e.target.value)} placeholder="e.g. Mumbai" />
              </Field>
              <Field label="State">
                <input type="text" value={profile.state} onChange={(e) => updateProfile('state', e.target.value)} placeholder="e.g. Maharashtra" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="Country">
                <input type="text" value={profile.country} onChange={(e) => updateProfile('country', e.target.value)} placeholder="e.g. India" />
              </Field>
              <Field label="Email Address">
                <input type="email" value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} placeholder="you@email.com" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="Phone Number">
                <input type="tel" value={profile.phone} onChange={(e) => updateProfile('phone', e.target.value)} placeholder="+91 98765 43210" />
              </Field>
              <Field label="WhatsApp Number">
                <input type="tel" value={profile.whatsapp} onChange={(e) => updateProfile('whatsapp', e.target.value)} placeholder="91 9876543210 (no +)" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="Booking Contact Number">
                <input type="tel" value={profile.bookingContact} onChange={(e) => updateProfile('bookingContact', e.target.value)} placeholder="+91 98765 43210" />
              </Field>
              <Field label="Alternate Contact Number" optional>
                <input type="tel" value={profile.alternateContact} onChange={(e) => updateProfile('alternateContact', e.target.value)} placeholder="+91 98765 43210" />
              </Field>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Field label="Hero Image" full>
              {profile.image ? (
                <div className="wizard-previews">
                  <div className="wizard-preview">
                    <img src={profile.image} alt="Hero preview" />
                    <button className="wizard-preview-remove" onClick={() => updateProfile('image', '')} aria-label="Remove hero image"><FaTimes /></button>
                  </div>
                </div>
              ) : (
                <Uploader
                  accept="image/*"
                  multiple={false}
                  label="Your professional photo (portrait preferred)"
                  onFiles={(f) => updateProfile('image', f[0])}
                />
              )}
            </Field>
            <Field label="Text on Top (Greeting)" full>
              <input type="text" value={profile.tagline} onChange={(e) => updateProfile('tagline', e.target.value)} placeholder="Turning every stage into an unforgettable experience." />
            </Field>
            <Field label="Alternating Roles (comma separated)" full>
              <ChipsInput values={profile.roles} onChange={(v) => updateProfile('roles', v)} placeholder="e.g. Stage Host, MC, Emcee" />
            </Field>
          </motion.div>
        )

      case 3:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Field label="Hosting Style" full>
              <input type="text" value={profile.hostingStyle} onChange={(e) => updateProfile('hostingStyle', e.target.value)} placeholder="e.g. Charismatic, Energetic & Luxurious" />
            </Field>
            <Field label="Personality Traits / Strengths" full>
              <ChipsInput values={profile.personalityTraits} onChange={(v) => updateProfile('personalityTraits', v)} placeholder="e.g. Confident Stage Presence, Witty, Professional" />
            </Field>
            <Field label="Event Types" full>
              <ChipsInput values={profile.eventTypes} onChange={(v) => updateProfile('eventTypes', v)} placeholder="e.g. Corporate, Wedding, College Fest" />
            </Field>
            <Field label="Achievements (one per line)" full>
              <textarea value={profile.achievements.join('\n')} onChange={(e) => updateProfile('achievements', e.target.value.split('\n').filter(Boolean))} placeholder="Best Anchor Award 2024&#10;Hosted 500+ events" />
            </Field>
          </motion.div>
        )

      case 4:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="wizard-row">
              <Field label="Years of Experience">
                <input type="number" value={stats.yearsExperience} onChange={(e) => setStats({ ...stats, yearsExperience: e.target.value })} placeholder="e.g. 10" />
              </Field>
              <Field label="Audience Reached (in lakhs/millions)">
                <input type="number" value={stats.audienceReached} onChange={(e) => setStats({ ...stats, audienceReached: e.target.value })} placeholder="e.g. 2 = 2M+" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="Events Hosted">
                <input type="number" value={stats.eventsHosted} onChange={(e) => setStats({ ...stats, eventsHosted: e.target.value })} placeholder="e.g. 500" />
              </Field>
              <Field label="Happy Clients">
                <input type="number" value={stats.happyClients} onChange={(e) => setStats({ ...stats, happyClients: e.target.value })} placeholder="e.g. 350" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="Cities Covered">
                <input type="number" value={stats.citiesCovered} onChange={(e) => setStats({ ...stats, citiesCovered: e.target.value })} placeholder="e.g. 40" />
              </Field>
              <Field label="Awards Won">
                <input type="number" value={stats.awardsWon} onChange={(e) => setStats({ ...stats, awardsWon: e.target.value })} placeholder="e.g. 12" />
              </Field>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Field label="Upload 3+ Professional Photos" full>
              <Uploader
                accept="image/*"
                multiple
                label="Drag & drop or click to upload gallery photos"
                hint="First photo becomes the large featured image"
                onFiles={handleGalleryFiles}
              />
              {gallery.length > 0 && (
                <div className="wizard-previews">
                  {gallery.map((g, i) => (
                    <div className="wizard-preview" key={i}>
                      <img src={g.src} alt={g.alt} />
                      <button className="wizard-preview-remove" onClick={() => removeGallery(i)} aria-label="Remove photo"><FaTimes /></button>
                      <span className="wizard-preview-label">{i === 0 ? 'Featured' : `Photo ${i + 1}`}</span>
                    </div>
                  ))}
                </div>
              )}
            </Field>
          </motion.div>
        )

      case 6:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Field label="Upload 3 Highlight Videos" full>
              <Uploader
                accept="video/*"
                multiple
                label="Drag & drop or click to upload video files"
                hint="You can also paste YouTube/Vimeo URLs below"
                onFiles={handleVideoFiles}
              />
              {videos.length > 0 && (
                <div className="wizard-previews">
                  {videos.map((v, i) => (
                    <div className="wizard-preview" key={i}>
                      {v.url?.includes('youtube') || v.url?.includes('youtu.be') ? (
                        <iframe src={v.url} title={v.title} style={{ width: '100%', height: '100%', border: 0 }} />
                      ) : (
                        <video src={v.url} muted />
                      )}
                      <button className="wizard-preview-remove" onClick={() => removeVideo(i)} aria-label="Remove video"><FaTimes /></button>
                      <span className="wizard-preview-label">{v.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </Field>
            <Field label="Showreel Video URL" full>
              <input type="text" value={showreel.url} onChange={(e) => setShowreel({ ...showreel, url: e.target.value })} placeholder="YouTube or Vimeo URL for your main showreel" />
            </Field>
          </motion.div>
        )

      case 7:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="wizard-row">
              <Field label="Instagram">
                <input type="url" value={contact.instagram} onChange={(e) => setContact({ ...contact, instagram: e.target.value })} placeholder="https://instagram.com/yourhandle" />
              </Field>
              <Field label="Website">
                <input type="url" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} placeholder="https://yourwebsite.com" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="YouTube">
                <input type="url" value={contact.youtube} onChange={(e) => setContact({ ...contact, youtube: e.target.value })} placeholder="https://youtube.com/@yourchannel" />
              </Field>
              <Field label="LinkedIn">
                <input type="url" value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} placeholder="https://linkedin.com/in/yourname" />
              </Field>
            </div>
            <div className="wizard-row">
              <Field label="WhatsApp Number">
                <input type="tel" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} placeholder="91 9876543210" />
              </Field>
              <Field label="Email (for booking)">
                <input type="email" value={contact.bookingEmail} onChange={(e) => setContact({ ...contact, bookingEmail: e.target.value })} placeholder="bookings@youremail.com" />
              </Field>
            </div>
          </motion.div>
        )

      case 8:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="wizard-row">
              <Field label="Contact Number">
                <input type="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+91 98765 43210" />
              </Field>
              <Field label="Booking Email">
                <input type="email" value={contact.bookingEmail} onChange={(e) => setContact({ ...contact, bookingEmail: e.target.value })} placeholder="bookings@youremail.com" />
              </Field>
            </div>
            <Field label="Office Address" optional full>
              <input type="text" value={contact.officeAddress} onChange={(e) => setContact({ ...contact, officeAddress: e.target.value })} placeholder="Your office / studio address" />
            </Field>
          </motion.div>
        )

      case 9:
        return (
          <motion.div className="wizard-body" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <Field label="Website Title" full>
              <input type="text" value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} placeholder="YourName | Professional Event Anchor" />
            </Field>
            <Field label="Meta Description" full>
              <textarea value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} placeholder="Short SEO description of your services" />
            </Field>
            <Field label="SEO Keywords (comma separated)" full>
              <input type="text" value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} placeholder="event anchor, master of ceremonies, wedding host" />
            </Field>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="wizard-overlay" onClick={onClose}>
      <div className="wizard" onClick={(e) => e.stopPropagation()}>
        {!saved ? (
          <>
            <div className="wizard-header">
              <div>
                <h2 className="wizard-title">
                  <span className="gold-text">Customize</span> Your Portfolio
                </h2>
                <p className="wizard-subtitle">Fill in your real information to replace all sample content.</p>
              </div>
              <button className="wizard-close" onClick={onClose} aria-label="Close wizard"><FaTimes /></button>
            </div>

            <div className="wizard-progress">
              <div className="wizard-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="wizard-steps">
              {STEPS.map((s) => {
                const StepIcon = s.icon
                return (
                  <button
                    key={s.id}
                    className={`wizard-step-dot ${step === s.id ? 'active' : ''} ${step > s.id ? 'done' : ''}`}
                    onClick={() => setStep(s.id)}
                    title={s.label}
                  >
                    {step > s.id ? <FaCheck /> : <StepIcon />}
                  </button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <div key={step}>
                <h3 className="wizard-step-heading">
                  {step}. {STEPS[step - 1].label}
                </h3>
                <p className="wizard-step-desc">
                  {buildStepDesc(step)}
                </p>
                {renderStep()}
              </div>
            </AnimatePresence>

            <div className="wizard-nav">
              <button className="wizard-btn wizard-btn-ghost" onClick={handleExport}>
                <FaDownload /> Export data
              </button>
              <div className="wizard-nav-right">
                {step > 1 && (
                  <button className="wizard-btn wizard-btn-prev" onClick={() => setStep(step - 1)}>
                    <FaArrowLeft /> Back
                  </button>
                )}
                {step < STEPS.length ? (
                  <button className="wizard-btn wizard-btn-next" onClick={() => setStep(step + 1)}>
                    Next <FaArrowRight />
                  </button>
                ) : (
                  <button className="wizard-btn wizard-btn-save" onClick={handleSave}>
                    <FaCheck /> Save &amp; Update Portfolio
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="wizard-success">
            <FaCheckCircle className="wizard-success-icon" />
            <h3>Your Portfolio is Updated!</h3>
            <p>All placeholder content has been replaced with your information.</p>
            <button className="wizard-btn wizard-btn-next" onClick={onClose}>View My Portfolio</button>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper for step descriptions
function buildStepDesc(step) {
  const descs = {
    1: 'Tell me about yourself — your name, bio, contact details and experience.',
    2: 'Upload your hero photo and headline text that appears at the top of your site.',
    3: 'Share your hosting style, strengths, event types and achievements.',
    4: 'Set the numbers shown in your animated statistics counters.',
    5: 'Upload your professional photos (drag & drop supported).',
    6: 'Upload your highlight videos and showreel.',
    7: 'Add your social media profile links.',
    8: 'Set your contact & booking details.',
    9: 'Set your website title and SEO meta tags.',
  }
  return descs[step] || ''
}

export default OnboardingWizard
