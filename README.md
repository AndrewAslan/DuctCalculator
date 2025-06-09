# HVAC Duct CFM Calculator

A professional HVAC ductwork calculator web application providing precise diameter, CFM, and velocity calculations for engineering professionals.

## Features

- **Comprehensive CFM Calculations**: Calculate CFM based on velocity and friction limits
- **Interactive Charts**: Visual representation of CFM vs duct diameter relationships
- **Professional PDF Reports**: Export detailed calculation reports with project information
- **Real-time Validation**: Input validation with engineering guidelines
- **Intersection Analysis**: Automatically identifies optimal duct sizing points
- **Responsive Design**: Works on desktop and mobile devices

## Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Charts**: Recharts for data visualization
- **PDF Generation**: jsPDF with autoTable
- **UI Components**: Radix UI with shadcn/ui
- **Build Tool**: Vite
- **Deployment**: Vercel-ready configuration

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hvac-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5000`

## Deployment to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and deploy**
   ```bash
   vercel login
   vercel --prod
   ```

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run check` - TypeScript type checking

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utility functions and calculations
│   │   ├── pages/         # Page components
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server (for development)
├── vercel.json           # Vercel deployment configuration
└── README.md
```

## HVAC Engineering Guidelines

### Velocity Limits
- Supply ducts: 500-1500 ft/min
- Return ducts: 500-1000 ft/min  
- Main ducts: 1000-2000 ft/min
- High-velocity: 2000-4000 ft/min

### Friction Guidelines
- Low-pressure: 0.05-0.08 in./100ft
- Medium-pressure: 0.08-0.12 in./100ft
- High-pressure: 0.12-0.15 in./100ft
- Maximum recommended: 0.15 in./100ft

### Formulas Used
- CFM = Area × Velocity
- Area = π × (D/2)²
- Friction calculations per ASHRAE standards

## License

MIT License - See LICENSE file for details

## Support

For technical support or feature requests, please create an issue in the GitHub repository.