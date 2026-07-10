# 🧠 Memory — Pixel Vision Studios Portfolio 

> **Repository**: `jaswant-sir-deploy-`  
> **GitHub**: `https://github.com/Arbab1308/jaswant-sir-deploy-.git`  
> **Last Updated**: July 2026  
> **Template Origin**: RealMehedi (customized by Web Pro Solutions)

---

## 📌 Project Overview

This is a **static portfolio website** for **Pixel Vision Studios**, a video production company founded by **Jaswant Kumar**, based in **Raipur, Chhattisgarh, India**. The studio specializes in cinematography, corporate films, music videos, social media content, podcast production, and event coverage. Established in 2015, they claim 15+ years of experience, 200+ repeated clients, 3K+ completed projects, and 99% client satisfaction.

### Key Contacts
- **Email**: pixelvisionproduction@gmail.com
- **Phone**: 9993694939 / 9340539898
- **Address**: House E6, Street G03, MVN, Gulmohar Vatika, Mahaveer Nagar, Raipur, Chhattisgarh, 492001

---

## 🛠️ Technology Stack

| Layer         | Technology                                                      |
|---------------|-----------------------------------------------------------------|
| **Markup**    | Static HTML (multi-page, no framework, no build tools)          |
| **Styling**   | Vanilla CSS (single `style.css` → minified `style.min.css`)     |
| **JavaScript**| Vanilla JS (single `script.js` → minified `script.min.js`)     |
| **Fonts**     | Google Fonts — **Inter** (body), **Syne** (headings)            |
| **Animations**| GSAP 3.12.5 + ScrollTrigger (CDN)                               |
| **Smooth Scroll** | Lenis (@studio-freight/lenis 1.0.42, CDN/unpkg)            |
| **Video**     | YouTube IFrame API (lazy-loaded), Vimeo Player API (CDN)        |
| **Hosting**   | Likely GitHub Pages or similar static host                      |

### CSS Design Tokens (`:root`)
```css
--color-bg: #000;
--color-text: #ffffff;
--color-text-muted: #a0a0a0;
--color-primary: #ff5722;
--font-heading: "Syne", sans-serif;
--font-body: "Inter", sans-serif;
--nav-height: 90px;
```

---

## 📁 File Structure

```
jaswant-sir-deploy-/
├── index.html              # Homepage (570 lines, 38KB)
├── about.html              # About Founder page (416 lines, 24KB)
├── about-agency.html       # About Agency page (510 lines, 32KB)
├── corporate-films.html    # Corporate Films service (258 lines, 13KB) ✅ FULLY BUILT
├── music-videos.html       # Music Videos service (59 lines, 3.4KB) ⚠️ STUB — hero only
├── fashion-commercial.html # Fashion & Commercial (59 lines, 3.4KB) ⚠️ STUB — hero only
├── social-media-content.html # Social Media Content (59 lines, 3.4KB) ⚠️ STUB — hero only
├── podcast-production.html # Podcast Production (59 lines, 3.4KB) ⚠️ STUB — hero only
├── event-coverage.html     # Event Coverage (59 lines, 3.4KB) ⚠️ STUB — hero only
├── visiting-card.html      # Digital Visiting Card (484 lines, 16KB) — standalone page
├── style.css               # Full styles (4640 lines, 92KB)
├── style.min.css           # Minified CSS (63KB)
├── script.js               # Full JavaScript (946 lines, 29KB)
├── script.min.js           # Minified JS (19KB)
├── README.md               # Bare minimum ("# jaswant-portfolio")
└── assets/
    ├── logo.png            # Favicon / footer logo (26KB)
    ├── jaswant.jpg         # Founder photo (67KB)
    ├── jaswant.png         # Founder photo — upscaled, grain-free (646KB)
    ├── about.jpg           # Portfolio/reels background (101KB)
    ├── about-agency.jpg    # Agency hero background (1.2MB)
    ├── how-we-work.png     # Work process diagram (663KB)
    ├── pomelli-image.png   # Client/portfolio image (1.8MB)
    ├── testimonials.jpg    # Testimonials section bg (357KB)
    ├── horizontal.mp4      # Hero background video loop (369KB, optimized from 4.3MB)
    ├── team-1.png          # Team member 1 photo (566KB)
    ├── team-2.png          # Team member 2 photo (596KB)
    ├── team-3.png          # Team member 3 photo (590KB)
    ├── ember-launchpad.zip # Unknown archive (1.2KB)
    ├── services/
    │   ├── corporate.jpg   # Corporate films hero (4.8MB)
    │   ├── events.jpg      # Events hero (5.0MB)
    │   ├── fashion.jpg     # Fashion hero (4.4MB)
    │   ├── music-videos.jpg# Music videos hero (7.1MB)
    │   ├── podcast.jpg     # Podcast hero (4.2MB)
    │   └── social media.jpg# Social media hero (1.2MB)
    ├── reels/              # 7 local MP4 reel videos (~15MB total)
    │   ├── Video-110.mp4
    │   ├── Video-292.mp4
    │   ├── Video-41.mp4
    │   ├── Video-626.mp4
    │   ├── Video-686.mp4
    │   ├── Video-729.mp4
    │   └── Video-910.mp4
    └── showreel/
        └── t3oWwHTiHPdqvISgXglF9dJecA.mp4  # Main showreel (3.4MB)
```

---

## 📄 Page-by-Page Breakdown

### 1. `index.html` — Homepage
**Sections (in order):**
1. **Top Navigation** — Fixed nav with SVG camera mascot logo (eyes track cursor), links: Home, Projects, Albums, About, Services, Blogs, Contact. Hamburger menu for mobile.
2. **Hero Section** — Full-width background video (`horizontal.mp4`), gradient overlay, tagline "Turning Video into Vibrant Conversations", CTA button.
3. **Brand Marquee** — Infinite horizontal scroll of placeholder brand logos (SVG-based "LOGOIPSUM" style).
4. **About Section** — Agency intro text, established 2015. Stats: 15+ years, 200+ clients, 3K+ projects, 99% happy clients. CTA → `about-agency.html`.
5. **Founder Section** — Parallax image of Jaswant Kumar with name, title "FOUNDER", and short bio. CTA → `about.html`.
6. **Portfolio Intro** — Background image with "PORTFOLIO" heading.
7. **Portfolio Grid** — 8 portfolio video cards in a grid:
   - 7 YouTube embeds (Zomato Legends, Haisha Paints, Nutra Box, Falling, Nimbu Shinkanji, Jaljeera, Jatin Sapru Podcast)
   - 1 Vimeo embed (Zomato Live BTS ft. Rahul Dua)
   - Categories: TVC Commercial, VFX, Music Video, BTS, Podcast
8. **Social Media Reels** — Banner + 5-column grid of 15 Vimeo-embedded reels with click-to-expand lightbox.
9. **Services Section** — 6 service items with parallax background images:
   - Corporate Films → `corporate-films.html`
   - Music Videos → `music-videos.html`
   - Fashion & Commercial → `fashion-commercial.html`
   - Social Media Content → `social-media-content.html`
   - Podcast Production → `podcast-production.html`
   - Event Coverage → `event-coverage.html`
10. **Footer** — Logo, "Bringing your Vision to life", contact info, quick links, legal links, Instagram social pill, copyright.

### 2. `about.html` — About Founder
**Body class**: `about-page`, **Lenis profile**: `buttery` (ultra-smooth scroll)

**Sections:**
1. **Founder Hero** — Full-screen parallax image of Jaswant Kumar.
2. **About Me Text Reveal** — Scroll-triggered character-by-character color reveal (dark → white). Bio text about his background. Stats row.
3. **Hello Section** — Stacking panel with slideshow (3 images), detailed bio about work with Indian Army, T-Series workshops, industries served. "Book a Session" CTA.
4. **Albums Section** — 2 rows of 3 album cards each (Corporate Events, Fashion & Glamour, Urban Chronicles, Cinematic Films, Music Videos, Portrait Stories). Mix of local and Unsplash images.
5. **Testimonials** — Slider with prev/next buttons, client review cards.
6. **Footer** — Same structure as homepage.

### 3. `about-agency.html` — About the Agency
**Body class**: `about-page`, **Lenis profile**: `buttery`

**Sections:**
1. **Agency Hero** — Full background image with "About Us" heading.
2. **Agency Textual** — Description of Pixel Vision services (photography, videography, drone, VFX, editing). Stats grid.
3. **Creative Capsule Section** — Auto-scrolling carousel of images with alternating shrink/expand animation. Text: "Your vision is our mission."
4. **Visions Section** — 4 core values: Creativity, Quality, Collaboration, Integrity — numbered 01–04.
5. **Team Section** — 3 team cards: John Davis (Creative Director), Sarah Chen (Lead Cinematographer), Michael Torres (Post-Production Lead). Each with LinkedIn + Instagram pills.
6. **Brands We've Worked With** — Vertical logo carousel with 4 columns scrolling in alternating directions.
7. **How We Work** — Process section with inverse parallax image and numbered steps.
8. **Values Section** — Stacking card animation with scroll-triggered rotation.
9. **Footer** — Same structure.

### 4. `corporate-films.html` — Corporate Films Service ✅
**Body class**: `service-page`

The **only fully-built service page**. Includes:
1. **Service Hero** — Full-screen image with "Corporate" title.
2. **Top Notch Works** — 2 featured YouTube video cards.
3. **All Creations** — 4 additional YouTube video cards (Tech Conference Highlights, Annual Report Video, Product Launch Event, Executive Interview Series).
4. **Footer** — Same structure with Pixel Vision branding.

### 5. Service Stub Pages (5 pages) ⚠️
`music-videos.html`, `fashion-commercial.html`, `social-media-content.html`, `podcast-production.html`, `event-coverage.html`

All are **near-identical stubs** (~59 lines each) with:
- Service hero section with relevant background image
- Title word (e.g., "Music", "Fashion", "Social", "Podcast", "Events")
- **No portfolio content, no footer** — just hero + empty `<main>`

### 6. `visiting-card.html` — Digital Business Card
**Standalone page** with its own embedded CSS (doesn't use `style.min.css`):
- Dark premium design with gold gradient accent (`#c5a880`)
- Uses **Montserrat** + **Playfair Display** fonts (different from main site)
- Features: Flippable business card (front/back), contact details, social links
- Founder: Jaswant Kumar — Founder & Director

---

## ⚡ JavaScript Architecture (`script.js` — 946 lines)

All code runs inside a single `DOMContentLoaded` listener. Major modules:

| Module | Lines | Description |
|--------|-------|-------------|
| **Hamburger Menu** | 1–22 | Toggle `.mobile-open` class on nav |
| **Lenis Smooth Scroll** | 24–77 | Configures smooth scrolling. Two profiles: default and `buttery` (ultra-smooth with `duration: 4.8`, `lerp: 0.035`) |
| **Scroll Animations** | 88–383 | GSAP + ScrollTrigger powered: hero parallax & fold, founder parallax, portfolio parallax, about text reveal (char-by-char), hello section stacking, values card stacking with rotation |
| **Noise Grain Overlay** | 390–430 | Canvas-based animated film grain effect on 3 canvases |
| **YouTube Player** | 432–501 | Lazy-loads YouTube IFrame API via IntersectionObserver, creates players for portfolio cards |
| **Vimeo Player** | 503–524 | Initializes Vimeo embeds with autoplay + mute |
| **Reels Lightbox** | 553–643 | Click-to-expand overlay for social media reels, manages play/pause/unmute |
| **Services Parallax** | 645–667 | Mousemove-based background image shift on service items |
| **Camera Mascot** | 669–703 | SVG pupil tracking — follows cursor position with capped movement |
| **Testimonials Slider** | 705–743 | Carousel with prev/next, circular index wrapping |
| **Capsule Carousel** | 745–790 | Auto-scrolling carousel with toggling shrink/expand every 3s |
| **Brands Carousel** | 792–827 | Vertical scrolling logo columns with GSAP modifiers |
| **Work Parallax** | 829–861 | Inverse parallax on "How We Work" image |
| **Service Transitions** | 863–944 | Page transition: expands service card background to full screen before navigation |

### Key Behaviors
- **Lenis `buttery` profile**: Used on `about.html` and `about-agency.html` for an ultra-smooth, premium scroll feel
- **Lazy Video Loading**: YouTube API only loads when portfolio section enters viewport (IntersectionObserver with 200px rootMargin)
- **Lazy Reel Loading**: Social media reels use `data-src` on iframes and `data-bg` on placeholders. When the reels section enters the viewport (with 300px lookahead), all 15 thumbnails and iframes load sequentially with a 150ms staggered delay to bypass browser parallel connection limits and Vimeo API rate limits, ensuring all 15 reels autoplay simultaneously without errors.
- **Stats Count-Up**: Scroll-triggered GSAP animation counts numbers from 0 to target value when stats section enters viewport
- **All portfolio videos**: autoplay, muted, looped, no controls
- **Page transitions**: Service links trigger a GSAP expand animation before navigating

---

## 🎨 CSS Architecture (`style.css` — 4640 lines)

Single monolithic CSS file covering all pages. Key areas:

| Section | Description |
|---------|-------------|
| **Reset & Lenis** | Box-sizing reset, Lenis smooth scroll overrides |
| **Navigation** | Fixed top nav with gradient background, hamburger for mobile |
| **Hero** | Full-viewport hero with video bg, gradient overlay, centered text |
| **Brand Marquee** | CSS animation for infinite horizontal scroll |
| **About** | Split layout, stat cards |
| **Founder** | Parallax image wrapper, overlay with bio text |
| **Portfolio** | Responsive card grid, video wrapper aspect-ratio |
| **Reels** | 5-column grid, expanded overlay/lightbox, Vimeo embed styling |
| **Services** | Accordion-style items with hover parallax backgrounds |
| **Footer** | CTA box, info grid, social pills, copyright bar |
| **About Pages** | Hero sections, text reveal, hello panel, albums, team cards, capsule carousel, values stacking |
| **Service Pages** | Hero image with title overlay, scroll-line animation |
| **Visiting Card** | Self-contained styles within `visiting-card.html` |
| **Responsive** | Media queries for mobile/tablet breakpoints |

### Design Language
- **Color scheme**: Black background (#000), white text, orange accent (#ff5722)
- **Typography**: Syne for headings (bold, editorial feel), Inter for body (clean, modern)
- **Visual effects**: Noise grain overlays, parallax scrolling, GSAP scroll-triggered animations
- **Card style**: Dark cards with hover reveals, video backgrounds

---

## 🔗 External Dependencies (CDN)

| Library | URL | Purpose |
|---------|-----|---------|
| GSAP 3.12.5 | cdnjs.cloudflare.com | Core animation engine |
| ScrollTrigger 3.12.5 | cdnjs.cloudflare.com | Scroll-based animations |
| Lenis 1.0.42 | unpkg.com | Smooth scroll |
| Vimeo Player | player.vimeo.com/api/player.js | Vimeo embed API |
| YouTube IFrame API | youtube.com/iframe_api | Dynamically loaded |
| Google Fonts | fonts.googleapis.com | Inter + Syne |

---

## 📊 Video Content Inventory

### YouTube Videos (Portfolio)
| Video ID | Title | Category |
|----------|-------|----------|
| `rkWQwSSdyBQ` | Zomato Legends | TVC Commercial |
| `VKGNKnKU5mI` | Haisha Paints | TVC Commercial |
| `0jTBo6aMXW0` | Nutra Box | VFX |
| `kMaKV87JN4s` | Falling | Music Video |
| `9ZmtQy50hoc` | Jatin Sapru & Yash Dayal Podcast | Podcast |
| `LtTUp11V-Ko` | Nimbu Shinkanji | TVC Commercial |
| `jhiEYmNKXC8` | Jaljeera | TVC Commercial |
| `HRT9hZoIwAE` | Brand Identity Film | Corporate |

### Vimeo Videos (Reels + Portfolio)
- 15 Vimeo reel embeds across 5 columns on homepage
- 1 Vimeo embed in portfolio grid (Zomato Live BTS)
- Brands include: Rhomeo Lane, Simba, Goldstring, Tobacco, Chandini, Garnier x Ishita, Shubman Gill x Gshock, Devil's Burger, White Outfit, Panther

---

## ⚠️ Known Issues & Incomplete Areas

1. **5 Service Pages are stubs** — Only `corporate-films.html` has full content. The rest (Music Videos, Fashion & Commercial, Social Media Content, Podcast Production, Event Coverage) only have hero sections.
2. **Placeholder brand logos** — Marquee uses generic SVG "LOGOIPSUM" placeholders, not actual client logos.
3. **Dead links** — Multiple nav links point to `#` (Projects, Albums, Services, Blogs, Privacy Policy, Terms & Conditions, Refund Policy).
4. **Some assets referenced but missing** — `about.html` references `assets/bg2.png` and `assets/bg3.png` which are not in the repo file listing.
5. **Team member names are placeholders** — "John Davis", "Sarah Chen", "Michael Torres" appear to be placeholder names.
6. **Large unoptimized service images** — Service background images are 4–7MB each, not web-optimized.
7. **`visiting-card.html` is isolated** — Has its own CSS, not linked from main navigation.
8. **`ember-launchpad.zip`** — Unknown/unused archive in assets folder.
9. **Reels directory** — Contains 7 local MP4 files but these don't appear to be referenced in the current HTML (replaced by Vimeo embeds).

---

## 📝 Git History Summary (18 commits)

The repo evolved through these key phases:
1. **Initial commit** → Basic setup
2. **Reels restructure** → Vimeo embeds replaced local videos
3. **Footer updates** → Pixel Vision branding, address, visiting card page
4. **Portfolio improvements** → Continuous looping, increased card sizes
5. **Branding updates** → "Mr. Jaswant" → "Jaswant Kumar", added "Developed by Web Pro Solutions"
6. **Hero video** → Replaced static hero image with background loop video
7. **Founder image fixes** → Multiple commits adjusting parallax, zoom, cropping
8. **Lenis smooth scroll** → Added anchor link smooth scrolling
9. **Performance optimization** → Minified JS/CSS, favicon, meta tags, lazy loading, heading hierarchy fixes, color contrast improvements
10. **Latest** → Portfolio category updates, founder image positioning

---

## 🏗️ Development Notes

### To serve locally:
Any static file server works since there's no build step:
```bash
# Python
python -m http.server 8000

# Node
npx serve .

# VS Code
# Use Live Server extension
```

### To modify:
- Edit `style.css` and `script.js` (the non-minified versions)
- After editing, regenerate `style.min.css` and `script.min.js` (minification tool not specified — likely manual or online tool)
- All HTML pages reference the **minified** versions

### Responsive Design:
- Mobile hamburger menu with `.mobile-open` toggle
- CSS media queries handle responsive breakpoints
- `visiting-card.html` has its own responsive styles

---

*This file serves as a complete architectural reference for the Pixel Vision Studios portfolio website.*
