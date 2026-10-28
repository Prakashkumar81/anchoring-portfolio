# Onboarding Wizard & Real Data Integration — Task List

## Setup & Data Layer
- [x] Create `src/assets/images/`, `src/assets/videos/`, `src/assets/documents/` folders
- [x] Create `src/context/PortfolioContext.js` (loads from localStorage, falls back to defaults)
- [x] Create `src/hooks/useLocalStorage.js` (persist wizard data)

## Onboarding Wizard
- [x] Create `src/components/OnboardingWizard/OnboardingWizard.jsx` (9-step wizard UI)
- [x] Create `src/components/OnboardingWizard/OnboardingWizard.css` (premium wizard styling)
- [x] Add drag-and-drop file upload with preview (images + videos)
- [x] Add per-step form fields (Personal, Hero, About, Stats, Gallery, Videos, Social, Contact, SEO)
- [x] Add "Save & Update Portfolio" → writes to localStorage
- [x] Add "Export portfolioData.js" download feature
- [x] Add "Customize" floating button + Setup route

## Refactor Components to Use Context (no design changes)
- [x] Refactor Hero.jsx
- [x] Refactor About.jsx
- [x] Refactor Stats.jsx
- [x] Refactor Services.jsx
- [x] Refactor Gallery.jsx
- [x] Refactor VideoGallery.jsx
- [x] Refactor Showreel.jsx
- [x] Refactor Experience.jsx
- [x] Refactor WhyHireMe.jsx
- [x] Refactor Testimonials.jsx
- [x] Refactor Contact.jsx
- [x] Refactor Footer.jsx
- [x] Refactor Navbar.jsx
- [x] Refactor App.jsx (wrap with PortfolioProvider, add setup route)

## README & Docs
- [x] Update README.md with customization instructions
- [x] Create `src/assets/README.md` with media storage instructions

## Verification
- [x] Run production build successfully
- [x] Verify wizard saves + portfolio updates
