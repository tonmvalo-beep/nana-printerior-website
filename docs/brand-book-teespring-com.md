# Spring Brand Book

## 1. BRAND OVERVIEW

**1.1 Brand Story & Mission**  
Spring (formerly Teespring) originated in 2011 as a crowdfunding platform for custom apparel, evolving into a creator-focused marketplace for merchandise. It empowers individuals to design, launch, and sell unique products without upfront costs.  
**Mission:** Democratize merchandise creation, enabling anyone to turn ideas into profitable, custom goods.  
**Vision:** Build a global community where creativity drives commerce, fostering endless possibilities for self-expression.

**1.2 Core Values**  
- **Creativity:** Fuel innovation through intuitive tools for custom designs.  
- **Community:** Connect creators and buyers via shared passions and collaborations.  
- **Accessibility:** Remove barriers with free tools, low-risk selling, and global reach.  
- **Fun & Playfulness:** Infuse joy into every interaction, from design to purchase.  
- **Empowerment:** Provide analytics, promotions, and resources for sustainable success.

**1.3 Brand Positioning**  
**Target Audience:** Creative individuals, small business owners, influencers, and hobbyists aged 18-45 seeking to monetize designs in niches like pop culture, holidays, and personal expression.  
**Unique Value Proposition:** Effortless print-on-demand platform with integrated design tools, marketing support, and diverse product catalogs for hassle-free creation and sales.  
**Brand Personality Traits:** Playful, energetic, approachable, innovative, empowering.

## 2. VISUAL IDENTITY

**2.1 Logo Usage**  
**Primary Logo:** Horizontal wordmark "Spring" in custom sans-serif (Mr Eaves XL Modern), paired with marketplace icon (t-shirt silhouette). SVG: Optimized for scalability, export at 200x50px base.  
**Variations:** Full color (primary pink on white); monochrome (grayscale on dark); reversed (white on primary); favicon (icon-only, 32x32px).  
**Minimum Size:** Desktop: 150px width; Mobile: 120px width.  
**Clear Space:** 1x logo height around all sides.  
**Placement:** Top-left header (desktop/mobile); centered hero/footers; avoid distortion or color inversion.  
**Incorrect Usage:** Stretching, recoloring outside palette, overcrowding with text.

**2.2 Color System**  
**Primary Colors:**  
- Brand Pink: hsl(343, 85%, 54%) (buttons, accents; HEX #E6195F)  
- Dark Navy: hsl(244, 45%, 6%) (text, links; HEX #0C0E2B)  
**Secondary/Accent Colors:**  
- Success: hsl(120, 70%, 45%) (inferred for confirmations)  
- Warning: hsl(40, 90%, 55%) (promos)  
- Error: hsl(0, 85%, 55%) (validation)  
- Info: hsl(203, 4%, 43%) (secondary text)  
**Neutral/Grayscale Palette:**  
- White: hsl(0, 0%, 100%) (backgrounds)  
- Light Gray: hsl(0, 0%, 80%) (borders; HEX #CCCCCC)  
- Medium Gray: hsl(203, 4%, 43%) (body text)  
- Dark Gray: hsl(244, 45%, 6%) (headings/links)  
**Background Colors:** Light mode default (white); no dark mode.  
**Usage Hierarchy:** 60% neutrals, 30% primary, 10% accents; primary for CTAs.  
**Accessibility:** All contrasts meet WCAG AA (4.5:1 min); e.g., pink on white 4.8:1, dark navy on white 14.5:1.

**2.3 Typography**  
**Primary Typeface:** Mr Eaves XL Modern (sans-serif, via CDN: Google Fonts fallback to Lato/Poppins from HTML).  
**Secondary Typeface:** Lato (UI elements, from HTML preload).  
**Font Hierarchy (CSS):**  
- H1: 32px, bold (700), 1.2 line-height, 0 letter-spacing  
- H2: 24px, semibold (600), 1.3 line-height, 0  
- H3-H6: 16-20px, regular (400), 1.4-1.5 line-height  
- Body: 16px, regular (400), 1.5 line-height, 0  
- UI Labels: 14px, medium (500), 1.4  
- Captions: 12px, regular, 1.4  
**Responsive Scale:** Desktop (>1024px): Base 16px; Tablet (768-1024px): 15px; Mobile (<768px): 14px fluid scale.  
**Web Loading:** Preload primary; fallbacks: "Mr Eaves XL Modern", Helvetica Neue, Arial, sans-serif.

**2.4 Iconography**  
**Style:** Outline (line icons like ts-icon-tshirt, cart); simple, 2px stroke.  
**Sizes:** 16px (nav/actions), 24px (status), 32px (hero).  
**Library:** Custom ts-icon set (SVG sprites); supplement with Feather Icons for consistency.  
**Usage:** Navigation (cart, user menu); actions (close, arrows); indicators (notifications, badges). Align to 4px grid; color with primary/accent.

**2.5 Imagery & Media**  
**Photography Style:** Vibrant, lifestyle shots of diverse creators/products; playful, high-energy themes (e.g., holidays, fandoms). Crop to 16:9 hero, square products.  
**Aspect Ratios:** Hero: 16:9; Cards: 1:1; Banners: 3:1.  
**Formats/Compression:** WebP (preferred, 80% quality); fallback JPG/PNG; <100KB images.  
**Video Guidelines:** 16:9, auto-play muted (hero promos); max 15s loops.  
**Placeholders/Loading:** Skeleton loaders (gray rectangles); low-res previews.

**2.6 Spacing & Grid System**  
**Base Unit:** 4px.  
**Spacing Scale:** 4px, 8px, 16px, 24px, 32px, 48px, 64px (multiples for margins/padding).  
**Grid:** 12-column (Webflow standard); container max-width 1200px, gutters 24px.  
**Breakpoints:** Mobile: <768px (stacked); Tablet: 768-1024px (hybrid); Desktop: >1024px (full grid).

## 3. UI COMPONENTS

**3.1 Navigation Components**  
**Header/Navbar:** Fixed top, white bg; logo left, CTAs right (Start Designing pink button), cart icon. Mobile: Hamburger dropdown with categories.  
**Menu Styles:** Primary (desktop horizontal: Best Sellers, Fall, etc.); Secondary (mega-menu flyouts with subcats).  
**Breadcrumbs:** Text links (Home > Category > Product).  
**Footer:** Grid layout (Sell/Buy/About columns); small text links.

**3.2 Buttons & CTAs**  
**Styles:** Primary (pink bg hsl(343,85%,54%), white text, 2px radius, no shadow); Secondary (white/outlined navy); Tertiary (text links).  
**States:** Default; Hover (darken 10%, scale 1.05); Active (depress 1px); Disabled (gray 50% opacity); Loading (spinner).  
**Sizes:** Small (32px height, 14px text); Medium (40px, 16px); Large (48px, 18px).  
**Icon Buttons:** Cart/close (16px icons); Groups (nav clusters).  
**Links:** Underlined navy on hover. **Borders:** 1px light gray, 2px radius.

**3.3 Form Elements**  
**Inputs/Textareas:** 2px radius, light gray border hsl(0,0%,80%); focus: primary outline.  
**Selects:** Dropdowns with chevron; same styling.  
**Checkboxes/Radios:** Custom squares/circles, primary fill on check.  
**Toggles:** Slider switches (off: gray, on: pink).  
**Validation:** Error (red border/text), Success (green check), Warning (yellow).  
**Labels/Placeholders:** 14px gray above; helper text below.  
**File Upload:** Drag-drop zones with dashed borders.

**3.4 Feedback Components**  
**Alerts/Notifications:** Top banner (e.g., 15% off pink); types: success (green), error (red), warning (yellow), info (blue).  
**Toasts:** Bottom-right, auto-dismiss 3s; slide-in animation.  
**Modals:** Centered overlay, 2px radius, close X.  
**Loading:** Spinners (16px pink), progress bars (indeterminate), skeletons (product grids).  
**Tooltips/Popovers:** Hover triggers, 200ms fade; max 300px width.  
**Empty States:** Illustrated (e.g., "No items" with CTA); centered text.

**3.5 Content Components**  
**Cards:** Product tiles (1:1 image, title/price below; 2px radius, hover lift).  
**Tables:** Striped rows (analytics); sorting arrows, pagination (1-10).  
**Lists:** Unordered (bullets 8px); ordered (numbers); definition (bold terms).  
**Badges/Tags:** Pill shapes (e.g., "Best Seller" pink, 2px radius).  
**Avatars:** Circular 40px user images; initials fallback.  
**Accordions:** Collapsible FAQs (chevron toggle).  
**Tabs:** Horizontal (categories: Religious, Anime); underline active.

## 4. INTERACTION & BEHAVIOR

**4.1 Interactive States**  
**Hover:** 200ms ease, color shift (e.g., pink +10% brightness), subtle scale (1.02).  
**Focus:** Outline 2px primary (keyboard nav); visible for accessibility.  
**Active:** 100ms press (shadow inset 1px).  
**Disabled:** Opacity 50%, no pointer.  
**Loading:** Overlay spinner, disable interactions.

**4.2 Animations & Transitions**  
**Timing:** 200-300ms duration for hovers/transitions; 500ms page loads.  
**Easing:** ease-in-out (cubic-bezier(0.4, 0, 0.2, 1)).  
**Micro-Interactions:** Button click (scale + bounce); form submit (fade success).  
**Page/Scroll:** Smooth scroll-behavior; hero parallax subtle (20px shift).  
**Principles:** Use for delight (e.g., cart add fly-in); avoid excess (reduce motion query); prioritize performance (<60fps).
