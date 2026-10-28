/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react'
import {
  profile as defaultProfile,
  stats as defaultStats,
  services as defaultServices,
  whyHireMe as defaultWhyHireMe,
  gallery as defaultGallery,
  videos as defaultVideos,
  showreel as defaultShowreel,
  experience as defaultExperience,
  testimonials as defaultTestimonials,
  navLinks,
} from '../data/portfolioData'
import useLocalStorage from '../hooks/useLocalStorage'

// LocalStorage key for saved wizard data
export const PORTFOLIO_STORAGE_KEY = 'anchoring_portfolio_data_v6'

const PortfolioContext = createContext(null)

// Merge user-saved data with defaults.
// Only override defaults with non-empty values so empty fields don't wipe good content.
function mergeData(saved, defaults) {
  if (!saved) return defaults
  // For arrays/objects, use saved if it has content, else default
  if (Array.isArray(saved)) return saved.length ? saved : defaults
  if (typeof saved === 'object' && saved !== null) {
    const result = { ...defaults }
    for (const key of Object.keys(saved)) {
      const val = saved[key]
      // Skip empty strings so defaults remain
      if (val === '' || val === null || val === undefined) continue
      // Recurse for nested objects (e.g. social)
      if (defaults && defaults[key] && typeof defaults[key] === 'object' && !Array.isArray(defaults[key]) && typeof val === 'object' && !Array.isArray(val)) {
        result[key] = mergeData(val, defaults[key])
      } else if (Array.isArray(val)) {
        result[key] = val.length ? val : defaults[key]
      } else {
        result[key] = val
      }
    }
    return result
  }
  return saved
}

export function PortfolioProvider({ children }) {
  // Load saved portfolio data (from wizard) or empty object → falls back to defaults
  const [savedData, setSavedData] = useLocalStorage(PORTFOLIO_STORAGE_KEY, null)

  const data = useMemo(() => {
    // Merge each section with defaults
    const base = savedData || {}
    return {
      profile: mergeData(base.profile, defaultProfile),
      stats: Array.isArray(base.stats) && base.stats.length ? base.stats : defaultStats,
      services: Array.isArray(base.services) && base.services.length ? base.services : defaultServices,
      whyHireMe: Array.isArray(base.whyHireMe) && base.whyHireMe.length ? base.whyHireMe : defaultWhyHireMe,
      gallery: Array.isArray(base.gallery) && base.gallery.length ? base.gallery : defaultGallery,
      videos: Array.isArray(base.videos) && base.videos.length ? base.videos : defaultVideos,
      showreel: mergeData(base.showreel, defaultShowreel),
      experience: Array.isArray(base.experience) && base.experience.length ? base.experience : defaultExperience,
      testimonials: Array.isArray(base.testimonials) && base.testimonials.length ? base.testimonials : defaultTestimonials,
      navLinks,
    }
  }, [savedData])

  // Save full portfolio data from the wizard
  const savePortfolioData = (newData) => {
    setSavedData(newData)
  }

  // Reset all data back to defaults
  const resetPortfolioData = () => {
    setSavedData(null)
  }

  const value = {
    ...data,
    hasCustomData: Boolean(savedData),
    savePortfolioData,
    resetPortfolioData,
  }

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

// Hook to consume portfolio data
export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return ctx
}

export default PortfolioContext
