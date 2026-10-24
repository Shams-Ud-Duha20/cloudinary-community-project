# 🌟 Cloudinary MediaForge | Creator Studio

> **Official Showcase Project for the Cloudinary Creators Community & Ambassadors Program**  
> Powered by Cloud Name: `egpyibpx` • Built with React, Vite, Node.js, Express, and Tailwind CSS.

---

## 🎯 Project Mission

**MediaForge Creator Studio** is a full-stack media optimization and Generative AI transformation hub designed specifically for content creators, marketers, and modern frontend developers. 

It demonstrates mastery across Cloudinary's dynamic URL transformation engine, Generative AI APIs, and official Node.js / React SDKs by solving the primary bottleneck creators face: **effortlessly preparing, optimizing, and distributing high-fidelity visuals and videos across all social media and e-commerce platforms with maximum performance and minimal egress cost.**

---

## 🚀 Live Cloud Configuration

This application connects to your live Cloudinary instance:

| Variable | Configured Value |
| :--- | :--- |
| **Cloud Name** | `egpyibpx` |
| **API Key** | `349858131535254` |
| **API Secret** | `igbTB1wwivsrBA_NT6whN36mces` |
| **CLOUDINARY_URL** | `cloudinary://349858131535254:igbTB1wwivsrBA_NT6whN36mces@egpyibpx` |

---

## ✨ Flagship Features

### 1. 🎨 AI Image Studio & Creator Presets
- **Interactive Before/After Split Slider**: Compare raw assets against Cloudinary AI transformations in real time with smooth drag interaction.
- **1-Click Creator Presets**:
  - **Instagram Portrait (4:5)**: Subject-aware smart crop with `c_fill,g_auto`.
  - **Story / Reels / TikTok (9:16)**: Canvas extension using **AI Generative Fill** (`b_gen_fill`).
  - **YouTube 16:9 Thumbnail**: Face detection centering (`g_face`) + AI clarity enhancement (`e_enhance,e_improve`).
  - **E-Commerce Clean Studio**: Instant automated background removal (`e_background_removal`).
  - **Neon Cyberpunk Backdrop**: AI background synthesis (`e_gen_background_replace:prompt_...`).
  - **Vintage Film Aesthetic**: Warm sepia and grain grading.
- **Custom Generative AI Workbench**:
  - Generative Fill (`b_gen_fill`)
  - Generative Background Replacement (`e_gen_background_replace`)
  - AI Background Removal (`e_background_removal`)
  - Generative Recolor (`e_gen_recolor`)
  - Generative Object Replace (`e_gen_replace`)
  - AI Photo Enhance & Restore (`e_enhance,e_restore`)
  - Dynamic Watermark Layer Overlay (`l_text:Arial_28_bold:...`)

### 2. 🎬 AI Video Studio
- **Smart 9:16 Vertical Video Re-framing**: Dynamic content tracking (`c_fill,g_auto,ar_9:16`) automatically converts 16:9 widescreen video into mobile vertical video for TikTok, Shorts, and Reels.
- **5-Second Dynamic Teasers**: Extracts opening highlights (`so_0,du_5`) for hero banners and social teasers.
- **Video to Animated WebP**: Transcodes heavy MP4s into lightweight animated WebP (`fl_awebp,f_webp`), cutting payload by up to 85% compared to legacy GIFs.
- **Speed Multiplier**: Smooth 0.5x slow-motion or 1.5x fast-forward transcode.

### 3. 📁 Cloudinary Asset Library
- Direct connection to the Cloudinary Admin API.
- Live search, filtering by resource type (Images vs Videos), format badges, dimension inspection, and byte size.
- 1-click **Open in Studio** from any cloud asset.
- Secure deletion and URL sharing.

### 4. ⚡ Speed & Bandwidth Savings Engine
- Interactive calculator proving the real-world ROI of Cloudinary's `f_auto,q_auto`.
- Compares raw PNG/JPEG against modern AVIF/WebP negotiation.
- Calculates bandwidth reduction in GB/TB, CDN egress cost savings, mobile LCP (Largest Contentful Paint) speedups, and CO2 emissions averted.

### 5. 💻 Multi-Language Code Exporter
Generate production-ready code with a single click:
- **React SDK** (`@cloudinary/react` + `@cloudinary/url-gen`)
- **Node.js SDK** (`cloudinary.v2`)
- **Python SDK** (`cloudinary.CloudinaryImage`)
- **Direct Transformation URL**
- **cURL command**

### 6. 🏆 Cloudinary Creators Submission Dossier
- Built-in dedicated section with pre-formatted questions and answers ready to paste directly into the Cloudinary Creator Community / Ambassador application form.

---

## 🛠️ Project Architecture

```
cloudinary-creator-studio/
├── .env                       # Cloudinary credentials & Port configuration
├── package.json               # Root scripts (start, dev, build)
├── server/                    # Node.js + Express Backend
│   ├── index.js               # Cloudinary v2 SDK config & API endpoints
│   └── package.json           # Backend dependencies (cloudinary, multer, cors, express)
└── client/                    # Vite + React Frontend
    ├── index.html             # HTML5 template with custom branding
    ├── vite.config.js         # Vite configuration with /api proxy
    ├── tailwind.config.js     # Tailwind CSS theme
    ├── src/
    │   ├── main.jsx           # React DOM entry
    │   ├── App.jsx            # Tab routing & state manager
    │   ├── index.css          # Glassmorphism & custom slider CSS
    │   ├── lib/
    │   │   ├── cloudinary.js  # Dynamic URL builder & Preset engine
    │   │   └── api.js         # Client API functions
    │   └── components/
    │       ├── Navbar.jsx              # Status badge & navigation
    │       ├── BeforeAfterSlider.jsx   # Interactive comparison slider
    │       ├── ImageStudio.jsx         # Flagship AI Image workbench
    │       ├── VideoStudio.jsx         # Smart 9:16 vertical video & teaser studio
    │       ├── AssetGallery.jsx        # Cloudinary Admin API asset explorer
    │       ├── BandwidthCalculator.jsx # ROI & Core Web Vitals calculator
    │       ├── CreatorDossier.jsx      # Creator Community submission guide
    │       ├── UploaderModal.jsx       # Drag & drop upload to cloud
    │       └── CodeModal.jsx           # Multi-language SDK code generator
```

---

## 🚦 Quickstart Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node v24)
- **npm** v9+

### 2. Run the Full Application (Single Command)
From the project root:

```bash
npm start
```
The server will start on **`http://localhost:5000`** and serve both the API and the compiled React studio!

### 3. Development Mode (Hot Reloading)
To run frontend and backend with hot-reload during development:

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev:client
```
The Vite development server runs at **`http://localhost:5173`** and proxies `/api` requests to Express on port 5000.

---

## 📝 Cloudinary Creators Application Answers (Cheat-Sheet)

When filling out your **Cloudinary Creator Community** application form, you can use these answers based directly on this project:

### Q1: Describe your project and how it showcases Cloudinary.
> *"I built **Cloudinary MediaForge Creator Studio**, a full-stack media optimization and Generative AI transformation hub using Node.js, Express, React, and Tailwind CSS on cloud `egpyibpx`. It demonstrates the full power of Cloudinary by enabling creators to test generative fill, background replacement, subject-aware cropping, 9:16 vertical video reframing for TikTok/Reels, and instant multi-language SDK code export in a sleek before/after split slider interface."*

### Q2: Which Cloudinary APIs and transformations did you implement?
> *"1. Generative AI: `b_gen_fill`, `e_gen_background_replace`, `e_background_removal`, `e_gen_recolor`, and `e_enhance`.  
> 2. Video Intelligence: `c_fill,g_auto,ar_9:16` smart vertical tracking, `so_0,du_5` dynamic teaser clips, and `fl_awebp,f_webp` video-to-animated WebP transcoding.  
> 3. Cloudinary Admin & Upload API: Secure streaming file upload, signature generation, and quota analytics.  
> 4. Delivery Optimization: Automatic format (`f_auto`) and quality (`q_auto`) delivery achieving over 80% payload reduction."*

### Q3: How do you plan to contribute to the Cloudinary Community?
> *"As a member of the Cloudinary Creators community, I will produce hands-on developer tutorials, open-source templates, and video guides demonstrating how developers and creators can incorporate Cloudinary's Generative AI tools and responsive media pipelines into their projects."*

---

## 📜 License
MIT License. Built with ❤️ for the **Cloudinary Creators Community**.
