# Deploy PragmaticPE Duct CFM Calculator to Vercel

## Quick Deployment Steps

1. **Upload the `clean-hvac` folder contents to your Vercel project**

2. **Vercel Configuration:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Files Structure (from clean-hvac folder):**
   ```
   /
   ├── package.json
   ├── vite.config.js
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
       │   └── ui/ (complete UI components)
       ├── lib/
       │   ├── hvac-calculations.ts
       │   └── utils.ts
       └── hooks/
           └── use-toast.ts
   ```

## What This Restores:
- Complete HVAC calculator interface with proper styling
- Interactive chart with velocity and friction CFM lines
- PDF export functionality with project information
- All calculations working exactly like the original
- Professional PragmaticPE branding
- Responsive design

The clean-hvac folder contains everything needed for a working Vercel deployment that matches your original preview functionality.