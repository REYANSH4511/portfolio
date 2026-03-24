# Reyansh Joshi — Portfolio

A stunning Next.js 14 portfolio with Three.js 3D effects, Framer Motion animations, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router)
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — 3D particle field, floating geometry, wave grid
- **Tailwind CSS** — utility-first styling with custom tokens
- **TypeScript**
- **Custom CSS** — noise texture, glowing gradients, scan-line, reveal animations

## Features

- 🌌 **3D Particle Field** — 3000 particles reacting to mouse movement
- 💎 **Floating Icosahedron** — distorted 3D geometry with orbiting rings
- 🌊 **Animated Grid Wave** — sine-wave deforming mesh behind hero
- ✍️ **Typewriter Effect** — cycling skill phrases
- 🃏 **3D Tilt Cards** — mouse-reactive perspective tilt on project cards
- 📊 **Circular Progress Rings** — animated skill level indicators
- 🖱️ **Custom Cursor** — dot + ring with hover expansion
- 📜 **Scroll Reveal** — staggered IntersectionObserver animations
- ⌨️ **Live Terminal** — typewriter-animated contact terminal window
- 📱 **Fully Responsive** — mobile nav, stacked layouts

## Getting Started

```bash
# Navigate to the project
cd /Users/reyanshjoshi/Desktop/iamthebest/projects/reyansh-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles, animations, cursor, noise
│   ├── layout.tsx        # Root layout with fonts & cursor
│   └── page.tsx          # Main page
└── components/
    ├── three/
    │   ├── ParticleField.tsx   # 3D particle galaxy
    │   ├── FloatingGeometry.tsx # Icosahedron with rings
    │   └── GridWave.tsx        # Animated wave mesh
    ├── CustomCursor.tsx
    ├── Navbar.tsx
    ├── Hero.tsx
    ├── Skills.tsx
    ├── Experience.tsx
    ├── Projects.tsx
    ├── Contact.tsx
    └── Footer.tsx
```

## Customization

- Update personal data directly inside each component file
- Colors are controlled via CSS variables in `globals.css`
- Tailwind tokens extended in `tailwind.config.js`
