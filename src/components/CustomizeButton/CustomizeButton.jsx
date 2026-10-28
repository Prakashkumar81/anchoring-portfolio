import { useState } from 'react'
import { FaCog, FaTimes } from 'react-icons/fa'
import OnboardingWizard from '../OnboardingWizard/OnboardingWizard'
import './CustomizeButton.css'

function CustomizeButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="customize-btn"
        onClick={() => setOpen(true)}
        aria-label="Customize portfolio"
        title="Customize your portfolio"
      >
        {open ? <FaTimes /> : <FaCog />}
      </button>

      {open && <OnboardingWizard onClose={() => setOpen(false)} />}
    </>
  )
}

export default CustomizeButton
