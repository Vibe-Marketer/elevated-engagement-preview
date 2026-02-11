# Elevated Engagement AI — Website V2

Premium marketing site for Elevated Engagement AI. Dark theme, electric blue accent, Apple-level clean.

## Files
- `index.html` — Single-page site
- `styles.css` — All styles (mobile-first, CSS custom properties)
- `script.js` — Scroll reveals, counter animations, FAQ accordion, mobile nav

## Customization
- **CTA link**: Update the `href="https://calendly.com"` in the final CTA and hero buttons to your actual booking link
- **Video**: Replace the `.video-wrapper` placeholder with an actual `<iframe>` or `<video>` element
- **Stats**: Update `data-count` attributes on `.result-number` elements with real numbers
- **Contact email**: Update `hello@elevatedengagement.ai` in the footer
- **Colors**: Edit CSS custom properties in `:root` at the top of `styles.css`
- **Logo**: SVG logo is inline in the nav — edit the `<svg class="logo-mark">` element

## Deployment
Static site — deploy anywhere (Netlify, Vercel, GitHub Pages, any web host). No build step required.

## Font
Uses Inter from Google Fonts (loaded via CSS `@import`). For better performance, self-host the font files.
