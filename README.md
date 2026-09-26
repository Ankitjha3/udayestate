# Uday Estate (udayestate) - Luxury Real Estate & Advisory Portal

A premier, high-converting architectural real estate web application built for **Uday Estate** (`udayestate`). Inspired by the market presence of `proppillar.in`, this project completely reinvents the design, typography, layout, and user experience into an ultra-modern luxury real estate portal while preserving all 25 reference projects, pricing, and configurations.

Built as a high-performance, serverless client-side application deployable directly to **Netlify** or **Vercel** with zero backend server overhead.

---

## 🌟 Key Features & Architectural Highlights

1. **Brand Reinvention ("Uday Estate")**
   - Elegant Obsidian Navy (`#070C18`, `#0C1527`) & Warm Champagne Gold (`#D4AF37`) luxury visual identity.
   - Editorial typography pairing (Playfair Display & Plus Jakarta Sans).
   - Prominent **Zero Brokerage Guarantee** & **MAHARERA Registered** credentials (`MAHARERA Reg. No: A51900038491`).

2. **All 25 Verified Projects Preserved from Reference Data**
   - Complete catalog featuring **Evershine Amavi 303, Agarwal Sky Heights, Ditya Luxuria, Kalpataru Advay, Inspira Aura, Cosmos Serenity, Sheth Edmont, Shripal Shanti**, and more.
   - Exact starting prices, BHK configurations (1, 2, 3, 4 BHK), carpet areas, and locations across Virar, Vasai, Kandivali, Borivali, Khar, and Mumbai suburbs.
   - High-resolution photography with graceful fallback handling.

3. **Multi-Criteria Instant Search & Filtering**
   - Live search by project name, developer, or location.
   - Filter by Property Status: *All Projects, New Launches, Ready Possession, Under Construction, Hot Deals*.
   - Filter by Locality: *Virar West, Vasai East, Kandivali West, Borivali West, Khar West, etc.*
   - Filter by Configurations: *1 BHK, 2 BHK, 3 BHK, 4 BHK*.
   - Filter by Budget: *Under ₹45L, ₹45L-₹75L, ₹75L-₹1.5Cr, Above ₹1.5Cr*.
   - Sort by *Featured, Price Low-to-High, Price High-to-Low, Alphabetical*.
   - Toggle view mode between **Grid View** and **List View**.

4. **Deep-Dive Interactive Property Modal**
   - Detailed specifications, verified amenities (pool, clubhouse, EV charging, 24/7 security), connectivity highlights, and MahaRERA verification.
   - Instant "Book VIP Site Visit" form & 1-click WhatsApp brochure inquiry.

5. **Prime Hotspots & Micro-Markets Explorer**
   - Dedicated regional spotlights for Vasai-Virar, Kandivali & Borivali West, Khar & Western Suburbs, and Vasai East with quick-filter triggers.

6. **Interactive EMI Loan Calculator**
   - Live reactive sliders for Loan Amount, Interest Rate, and Tenure.
   - Real-time monthly EMI computation, total interest breakdown, and visual principal vs. interest amortization ratio.

7. **The Uday Estate Distinction (Why Choose Us)**
   - 6 core pillars: Zero Brokerage Guarantee, 100% RERA Verified, Complimentary Door-to-Door Cab for Site Visits, 15+ Years Industry Experience, Home Loan & Legal Assistance, and Dedicated Property Concierge.

8. **Developer Associates & Verified Buyer Reviews**
   - Grade-A partners: Kalpataru, Evershine, Tata Housing, Wadhwa Group, Agarwal Group, Sheth Creators, Cosmos Group, Shripal Group.
   - Verified buyer testimonials with star ratings.

9. **Lead Capture & VIP Visit Scheduling**
   - Doorstep AC cab pickup booking option with interactive form validation, instant celebratory confetti, and direct WhatsApp redirect.

10. **Floating Action Triggers**
    - Floating WhatsApp expert chat, VIP visit trigger, and smooth back-to-top scroll button.

---

## 🚀 Instant Deployment (Netlify & Vercel)

This application is bundled as a static Single Page Application (SPA) requiring **no backend server**.

### Deploy to Vercel
1. Push this repository to GitHub/GitLab.
2. Import project into [Vercel](https://vercel.com).
3. Vercel automatically detects `vercel.json` and Vite framework.
4. Click **Deploy**.

### Deploy to Netlify
1. Drag and drop the `dist/` folder directly to [Netlify Drop](https://app.netlify.com/drop), or connect your Git repository.
2. Build settings are pre-configured in `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Click **Deploy Site**.

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates production-ready, minified HTML, CSS, and JS in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📂 Project Directory Structure

```
Udayestate/
├── dist/                      # Static production distribution
├── index.html                 # HTML template with Google Fonts
├── netlify.toml               # Netlify SPA routing and build configuration
├── vercel.json                # Vercel framework configuration
├── package.json               # Node packages and scripts
├── vite.config.js             # Vite + React + Tailwind v4 config
├── src/
│   ├── main.jsx               # React entry point
│   ├── index.css              # Tailwind v4 theme & luxury styles
│   ├── App.jsx                # Main application state and layout
│   ├── data/
│   │   └── projectsData.js    # All 25 projects & reference datasets
│   └── components/
│       ├── Navbar.jsx         # Sticky glassmorphism header & navigation
│       ├── Hero.jsx           # Luxury hero section with Zero Brokerage guarantee
│       ├── SearchFilter.jsx   # Multi-facet search console with grid/list toggles
│       ├── ProjectCatalog.jsx # Project showcase grid & sort controls
│       ├── ProjectCard.jsx    # Architectural card with hover zoom and specs
│       ├── ProjectDetailModal.jsx # Comprehensive project details modal
│       ├── PrimeHotspots.jsx  # Locality spotlight explorer
│       ├── EmiCalculator.jsx  # Interactive loan and amortization calculator
│       ├── WhyChooseUs.jsx    # 6 core advisory pillars
│       ├── DeveloperPartners.jsx # Associate builder showcase
│       ├── Testimonials.jsx   # Verified client feedback
│       ├── LeadCaptureModal.jsx # VIP site visit booking modal with confetti
│       ├── FloatingActions.jsx # Floating WhatsApp and visit triggers
│       └── Footer.jsx         # Comprehensive footer with RERA compliance
```
