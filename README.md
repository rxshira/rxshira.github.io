# Shira Rubin - Personal Website

A modern, interactive personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Bold, playful design with vibrant colors and organic shapes
- 🎵 Music player integration
- 🌓 Theme toggle support
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- ♿ Accessibility features

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design System

The website uses a bold color palette inspired by playful, creative aesthetics:
- Hot Pink/Magenta (#C2185B, #D81B60)
- Bright Red/Orange-Red (#E84A3F, #FF5252)
- Yellow (#FFD93D, #FFF176)
- Orange (#FF8C42, #FFA726)
- Cream/Off-White (#F5F5F0, #FAFAFA)

## Sections

- Hero
- What I'm Up To
- Current Research
- Projects
- Future Projects
- Volunteering & Teaching
- About Me
- Awards
- Contact

## Setup Notes

1. **Resume**: Add your resume PDF file at `public/Shira_Rubin_Resume.pdf` for the resume link in the footer to work.

2. **Images**: Add project images and photos to `public/images/` directory and update the image paths in components as needed.

3. **Music Player**: The music player component is set up but needs actual audio files and integration with a music library. You can add music files to `public/music/` and integrate with react-howler if desired.

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment using GitHub Actions.

### Setup

1. **Base path is already configured** for `rxshira.github.io` (set to `/`)

2. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy when you push to `main`

3. **First deployment**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The GitHub Actions workflow will automatically build and deploy your site to GitHub Pages. After deployment, your site will be available at `https://rxshira.github.io/`.

