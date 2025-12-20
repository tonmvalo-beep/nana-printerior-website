# Brand Book: R-Print

## 1. BRAND OVERVIEW

**1.1 Brand Story & Mission**  
R-Print, based in Celje, Slovenia, is a family-owned printing company with years of experience offering comprehensive services from design to production. Founded to support local businesses and individuals with high-quality prints.  
Mission: Deliver reliable, fast, and quality printing solutions to enhance customer branding.  
Vision: Become the go-to partner for innovative printing in Slovenia, emphasizing sustainability and customer satisfaction.

**1.2 Core Values**  
- Reliability: Consistent delivery and honest service build long-term trust.  
- Quality: Use premium materials and precise techniques for superior results.  
- Customer Focus: Personalized support from inquiry to delivery.  
- Speed: Efficient processes ensure quick turnaround without compromising standards.  
- Innovation: Wide range of services, including custom digital and XXL prints.

**1.3 Brand Positioning**  
Target Audience: Businesses (e.g., promotional needs) and individuals (e.g., custom stickers, textiles) in Slovenia seeking affordable, professional printing.  
Unique Value Proposition: Full-service printing with local expertise, fast delivery, and diverse materials like textiles and XXL formats.  
Brand Personality: Professional, reliable, approachable, efficient, creative.

## 2. VISUAL IDENTITY

**2.1 Logo Usage**  
Primary Logo: SVG icon (rprint_ikone-34.svg, 150x150px); simple, modern wordmark with geometric elements.  
Variations: Full color (primary blue), monochrome (black/white), reversed (white on dark), favicon (cropped icon).  
Minimum Size: Desktop 150px, mobile 100px.  
Clear Space: 1x logo height around all sides.  
Placement: Top-left header, footer; centered on loading screens.  
Incorrect Usage: Stretching, recoloring outside palette, overlapping text.

**2.2 Color System**  
Primary: hsl(225, 100%, 45%) (vibrant blue for CTAs).  
Secondary/Accent: hsl(216, 98%, 52%) (lighter blue for links/hovers).  
Semantic: Success hsl(120, 100%, 40%); Warning hsl(45, 100%, 55%); Error hsl(0, 100%, 50%); Info hsl(210, 100%, 50%).  
Neutral/Grayscale: hsl(0, 0%, 100%) (bg), hsl(0, 0%, 14%) (text primary), hsl(0, 0%, 80%) (borders), hsl(0, 0%, 51%) (secondary text).  
Background: Light mode hsl(0, 0%, 100%); no dark mode.  
Hierarchy: 60% neutral, 30% primary, 10% accent. Proportions: Primary for buttons (full), accents for icons.  
Accessibility: WCAG AA compliant (contrast 4.5:1 min, e.g., primary text on white: 7.2:1).

**2.3 Typography**  
Primary Typeface: Exo (headings, via Google Fonts: font-family: 'Exo', sans-serif).  
Secondary: Roboto (body/UI, font-family: 'Roboto', sans-serif).  
Font Hierarchy:  
- H1: 70px, weight 700, lh 1.2, ls 0 (Exo).  
- H2: 54.6px, weight 600, lh 1.3, ls -0.02em (Exo).  
- Body: 18px, weight 400, lh 1.6, ls 0 (Roboto).  
- UI Labels: 14px, weight 500, lh 1.4 (Roboto). Captions: 12px, weight 400, lh 1.5.  
Responsive Scale: Desktop (>1024px) full sizes; Tablet (768-1024px) 80%; Mobile (<768px) 70%.  
Web Loading: Preload Exo/Roboto; fallback sans-serif.

**2.4 Iconography**  
Style: Outline (Feather icons, Font Awesome).  
Sizes: 16px (UI), 24px (nav/actions), 32px (status).  
Library: Custom Feather set for phone/mail/clock/map; FA for social.  
Usage: Navigation (menu icons), actions (search/zoom), status (success check). Align with 4px grid; color primary on hover.

**2.5 Imagery & Media**  
Photography: High-res product shots (printing presses, materials); professional, clean, Slovenian business context. Treatment: Subtle shadows, 80% opacity overlays.  
Aspect Ratios: Hero 16:9; Cards 4:3; Mobile 1:1.  
Formats: WebP (preferred), JPG (photos), PNG (logos); compress <100KB.  
Video: Short clips of printing process (aspect 16:9, no autoplay).  
Placeholders: Gray skeletons (hsl(0,0%,90%)); loading spinners (primary color).

**2.6 Spacing & Grid System**  
Base Unit: 4px.  
Scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px (multiples for margins/padding).  
Grid: 12-column, max-width 1200px container, 20px gutters.  
Breakpoints: Mobile <768px (stacked), Tablet 768-1024px (2-3 cols), Desktop >1024px (full grid).

## 3. UI COMPONENTS

**3.1 Navigation Components**  
Header: Fixed top with mini-header (social/contact); logo left, menu right. Mobile: Hamburger slide-out.  
Menu: Horizontal nav (all caps, primary links); breadcrumbs for subpages.  
Footer: 3-col (logo/contact, links, privacy); black bg.

**3.2 Buttons & CTAs**  
Primary: Black bg hsl(0,0%,0%), white text, 2px radius, no shadow; hover: darken 10%.  
Secondary: White bg, hsl(0,0%,51%) text, 0px radius; hover: border primary.  
Tertiary: Text link (primary color).  
States: Default solid; Hover scale 1.05 (200ms ease); Active pressed; Disabled gray; Loading spinner.  
Sizes: Small 32x40px, Medium 48x56px, Large 56x64px.  
Icons: Left-aligned; groups horizontal. Links: Underline on hover, primary color.

**3.3 Form Elements**  
Inputs/Textareas: 4px radius, hsl(0,0%,80%) border; focus primary outline.  
Selects: Dropdown with arrow icon.  
Checkboxes/Radios: Custom squares/circles, primary fill on check.  
Toggles: Slider with primary thumb.  
Validation: Error red border/text; Success green check; Warning yellow.  
Labels: Above, bold; Placeholders gray; Helper: Small below.

**3.4 Feedback Components**  
Alerts: Top banner (cookie consent: white bg, black buttons). Types: Success green, Error red, Warning orange, Info blue.  
Toasts: Bottom-right, auto-dismiss 3s.  
Modals: Centered, overlay 80% black; close X.  
Loading: Spinners (primary, 200ms spin); Progress bars; Skeletons gray.  
Tooltips: Hover primary bg, black text. Empty States: Icon + "No results" text.

**3.5 Content Components**  
Cards: White bg, 4px radius, shadow subtle; hover lift 4px.  
Tables: Striped rows, sortable headers (primary arrow).  
Lists: Unordered bullets; Definition bold keys.  
Badges: Primary bg, white text, rounded.  
Avatars: Circular 40px, grayscale filter.  
Accordions: Chevron toggle, expand on click. Tabs: Underline active.

## 4. INTERACTION & BEHAVIOR

**4.1 Interactive States**  
Hover: Scale 1.02, primary color shift (200ms ease-in-out).  
Focus: Outline 2px primary (keyboard nav).  
Active: Depress 1px, darken 5%.  
Disabled: Opacity 0.5, no pointer.  
Loading: Overlay spinner, cursor wait.

**4.2 Animations & Transitions**  
Timing: 200-300ms for interactions (e.g., button hover).  
Easing: ease-in-out; cubic-bezier(0.4, 0, 0.2, 1) for smooth.  
Micro-Interactions: Button click ripple; Form submit fade.  
Page: Fade-in on load (500ms); Scroll smooth.  
Principles: Use for feedback (e.g., menu slide); Avoid excess (no parallax); Reduce motion for accessibility.
