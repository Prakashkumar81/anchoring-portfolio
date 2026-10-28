# 🎤 Professional Event Anchor Portfolio

A **premium, luxury, fully responsive** personal portfolio website for a **Professional Event Anchor (Master of Ceremonies)**, built with **React.js, HTML5, CSS3, and JavaScript (ES6+)**.

## ✨ Features

- **Luxury design** — black background, gold accents, glassmorphism cards, animated gradients, floating particles
- **Framer Motion** animations (fade, zoom, parallax, scroll reveal, animated counters)
- **React Router** + smooth scrolling navigation with active-link highlighting
- **Swiper.js** testimonial slider
- **LightGallery** masonry photo gallery with lightbox & zoom
- **React Player** video gallery + cinematic showreel (lazy-loaded)
- **EmailJS** contact form
- **Onboarding Wizard** — customize your entire portfolio from a 9-step form (no coding needed!)
- **SEO-optimized** (react-helmet-async meta tags)
- **Fully responsive** & mobile-first

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (or the port Vite shows).

## 🛠️ Tech Stack

| Library | Purpose |
|---------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| React Router DOM | Routing |
| Framer Motion | Animations |
| React Icons | Icons |
| Swiper | Testimonial slider |
| React Player | Video playback |
| LightGallery | Photo lightbox |
| EmailJS | Contact form email |
| react-helmet-async | SEO meta tags |

## 🎨 How to Customize Your Portfolio

### Recommended: Use the Onboarding Wizard (no coding)

1. Click the **gold gear icon** (bottom-left floating button).
2. Fill in each of the 9 steps:
   - **Personal** — name, bio, phone, WhatsApp, email, city, experience, languages
   - **Hero** — upload your hero photo, tagline, alternating roles
   - **About** — hosting style, strengths, event types, achievements
   - **Stats** — animated counter numbers
   - **Gallery** — upload your 3+ professional photos (drag & drop)
   - **Videos** — upload 3 highlight videos / paste YouTube links + showreel
   - **Social** — Instagram, YouTube, LinkedIn, website
   - **Contact** — phone, booking email, office address
   - **SEO** — website title, description, keywords
3. Click **"Save & Update Portfolio"** — your changes appear instantly.
4. Use **"Export data"** to download a `.js` file you can keep as a backup.

> Your data is stored in your browser's `localStorage`. To make it permanent across devices, place your real files in `src/assets/` and update `src/data/portfolioData.js` (see below).

### Manual: Edit `src/data/portfolioData.js`

All portfolio content is centralized in **`src/data/portfolioData.js`**. Edit this file directly to change text, images, videos, stats, testimonials, etc.

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/        ← Place your photos here
│   ├── videos/        ← Place your videos here
│   └── documents/     ← Place your profile PDF here
├── components/
│   ├── Navbar/        → sticky transparent navbar
│   ├── Hero/          → full-screen hero
│   ├── About/         → bio, skills, achievements
│   ├── Stats/         → animated counters
│   ├── Services/      → premium service cards
│   ├── SpecialEvents/ → signature events
│   ├── Gallery/       → masonry photo gallery
│   ├── VideoGallery/  → video cards + modal player
│   ├── Showreel/      → cinematic featured video
│   ├── Experience/    → vertical timeline
│   ├── WhyHireMe/     → feature cards
│   ├── Testimonials/  → client slider
│   ├── Contact/       → glassmorphism form + info
│   ├── Footer/        → luxury footer
│   ├── BackToTop/     → scroll-to-top button
│   ├── CustomizeButton/ → opens the wizard
│   └── OnboardingWizard/ → 9-step customization form
├── context/
│   └── PortfolioContext.jsx  → data layer (localStorage + defaults)
├── data/
│   └── portfolioData.js      → ALL editable content
├── hooks/
│   └── useLocalStorage.js    → localStorage persistence
├── App.jsx
└── main.jsx
```

## 📷 Adding Your Photos & Videos

Place files in these folders:

- **`src/assets/images/`** — hero photo + gallery images
- **`src/assets/videos/`** — highlight videos & showreel
- **`src/assets/documents/`** — profile PDF

Then update the paths in `src/data/portfolioData.js` (or upload via the wizard).

**Recommended sizes**
- Hero image: 800×1000 (portrait)
- Gallery images: 1200px wide minimum
- Videos: MP4 (H.264) or host on YouTube/Vimeo and paste the URL

## 📧 Setting Up EmailJS (Contact Form)

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account.
2. Create a Service, a Template, and copy your IDs.
3. Open `src/components/Contact/Contact.jsx` and replace:
   ```js
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
   const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
   ```

## 🧹 Build for Production

```bash
npm run build
npm run preview
```

## 📄 License

© Your Name. All rights reserved.
