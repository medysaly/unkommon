# Design Guidelines for Business Automated Platform

## Design Approach
**Reference-Based Approach**: This is a recreation of an existing site. Follow the established design patterns exactly as they appear in the original implementation.

## Core Design Elements

### A. Color Palette

**Dark Theme Foundation**
- Primary background: slate-900 (210 24% 10%)
- Secondary background: slate-800 (217 19% 15%)
- Text primary: white
- Text secondary: gray-300 (214 14% 83%)

**Accent Colors**
- Primary gradient: blue-400 to cyan-400 for headings
- Feature card gradients:
  - AI Receptionist: blue-500 to indigo-500
  - Speed-to-Lead: purple-500 to pink-500
  - AI Booking System: green-500 to emerald-500
  - Social Media Bot: orange-500 to red-500
- Interactive elements: blue-600 to indigo-600
- Status badges: green-500/20 background with green-300 text

### B. Typography
- Headings: Bold, large scale (4xl to 7xl on hero)
- Hero text: White with text-shadow for readability over video
- Body text: gray-300 for good contrast on dark backgrounds
- Use gradient text-fill for key brand statements

### C. Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 16, 20, 32
- Section padding: py-20 (desktop), responsive reduction on mobile
- Container: max-w-7xl mx-auto
- Card padding: p-6
- Gap between elements: gap-4 to gap-6

**Grid Patterns**
- Feature cards: 2-column grid on md+ breakpoints
- Benefits: 4-column grid on lg, 2-column on md, single column on mobile

### D. Component Library

**Hero Section**
- Full-height section (min-h-screen) with flex layout
- Background: Cloudinary video embed (autoplay, muted, no controls)
- Content: Layered with z-10 over video
- Badge component: Rounded-full with icon, semi-transparent background
- Dual CTA buttons at bottom of viewport

**Cards**
- Slate-800 background with slate-700 borders
- Hover states: border-blue-500, shadow-xl
- Icon containers: 12x12 with gradient backgrounds, rounded-xl
- Status badges in top-right corner

**Buttons**
- Primary: Gradient background (blue-600 to indigo-600)
- Outline: Border-2 white with white/10 background, backdrop-blur
- Size lg for primary CTAs
- Include arrow icons for directional actions

**Navigation**
- Fixed header with backdrop-blur
- Mobile-responsive hamburger menu
- Footer with multiple columns of links

### E. Animations
**Framer Motion Implementation**
- Page load: Stagger children with 0.2s delay
- Card hover: Subtle y-axis lift (-10px)
- Icon hover: 360° rotation with scale 1.1
- Scroll reveals: Opacity + y-axis fade-in
- Use viewport={{ once: true, margin: "-100px" }} for scroll triggers

**Animation Timing**
- Duration: 0.6-0.8s for most transitions
- Ease: "easeOut" for natural feel
- Stagger: 0.2s between sequential items

## Images

**Hero Background**
- Cloudinary video embed (AI CPU visualization)
- Full viewport coverage with iframe
- Autoplay, muted, looping
- Dark overlay (black/60) for text readability

**CTA Section Background**
- Fixed background image (team collaboration photo)
- 65% background size, centered at 60% vertical
- Dark overlay (black/60) for contrast

**Feature Pages**
- Each AI solution page has demo interfaces
- Use placeholder images where needed for demonstrations

## Special Considerations

**Text Readability**
- All text over video/images requires text-shadow: '2px 2px 8px rgba(0,0,0,0.8)'
- Gradient text removes text-shadow to prevent artifacts

**Responsive Behavior**
- Mobile-first approach
- Stack columns on mobile (flex-col)
- Reduce text sizes: 4xl mobile → 7xl desktop
- Adjust spacing: py-12 mobile → py-20 desktop

**Interactive States**
- Cards: Group hover effects with smooth transitions
- Buttons: Built-in Shadcn variants (no custom hover needed for outline buttons over images)
- Links: Blue-400 with arrow icon, translate-x on hover

This design creates a professional, modern AI automation platform with strong visual hierarchy, engaging animations, and clear calls-to-action while maintaining excellent readability and user experience across all devices.