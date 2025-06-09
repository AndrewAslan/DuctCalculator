# Vercel Deployment Guide for PragmaticPE Duct CFM Calculator

## Quick Deployment Steps

1. **Copy these files to your Vercel project root:**
   - `deploy-package.json` → rename to `package.json`
   - `deploy-vite.config.js` → rename to `vite.config.js`
   - Copy entire `src/` folder
   - Copy `index.html`
   - Copy `tailwind.config.ts`
   - Copy `tsconfig.json`
   - Copy `postcss.config.js`
   - Copy `components.json`

2. **Deploy Command for Vercel:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables (none required)**
   - This is a frontend-only application with no external API dependencies

## Key Features Included:
- ✅ Professional HVAC ductwork calculator
- ✅ Real-time CFM calculations for all duct diameters (4" to 60")
- ✅ Interactive chart with velocity and friction CFM lines
- ✅ Intersection point detection and marking
- ✅ PDF report generation with project information
- ✅ Responsive design with proper styling
- ✅ Complete "PragmaticPE Duct CFM Calculator" branding

## File Structure:
```
/
├── package.json (from deploy-package.json)
├── vite.config.js (from deploy-vite.config.js)
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── components.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── hvac-calculator.tsx
    │   └── ui/ (all UI components)
    ├── lib/
    │   ├── hvac-calculations.ts
    │   └── utils.ts
    └── hooks/
        └── use-toast.ts
```

The updated deployment files include all necessary dependencies and proper configuration for Vercel hosting.