# FINAL Vercel Deployment Instructions - PragmaticPE Duct CFM Calculator

## Files to Deploy to Vercel

Use the `clean-hvac/` folder contents for your Vercel deployment:

### 1. Package Configuration
- `clean-hvac/package.json` → Copy as root `package.json`
- `clean-hvac/vite.config.js` → Copy as root `vite.config.js`

### 2. Project Files
- `clean-hvac/index.html` → Copy as root `index.html`
- `clean-hvac/tailwind.config.ts` → Copy as root `tailwind.config.ts`
- `clean-hvac/tsconfig.json` → Copy as root `tsconfig.json`
- `clean-hvac/postcss.config.js` → Copy as root `postcss.config.js`
- `clean-hvac/components.json` → Copy as root `components.json`

### 3. Source Code
- Copy entire `clean-hvac/src/` folder to root `src/`

## Vercel Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x or higher

## Features Included in This Deployment:
✅ Professional HVAC ductwork calculator interface
✅ Real-time CFM calculations for duct diameters 4" to 60"
✅ Interactive chart with velocity and friction CFM lines
✅ Intersection point detection with green markers
✅ PDF report generation with project information
✅ Complete styling with TailwindCSS
✅ Responsive design for all devices
✅ "PragmaticPE Duct CFM Calculator" branding

This deployment package contains all necessary dependencies and configurations to restore the exact functionality you had in your original preview.