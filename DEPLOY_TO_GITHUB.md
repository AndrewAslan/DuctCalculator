# Complete Deployment Instructions

## Step 1: Create New GitHub Repository
1. Go to GitHub.com and create new repository: `hvac-calculator-frontend`
2. Make it public
3. Don't initialize with README

## Step 2: Upload These Files to GitHub

### Essential Files to Upload:
```
package.json (use content below)
vite.config.js (use content below)
index.html (copy from current project)
postcss.config.js (copy from current)
tailwind.config.ts (copy from current)
tsconfig.json (copy from current)
src/ (entire folder)
attached_assets/ (entire folder)
```

### package.json Content:
```json
{
  "name": "pragmaticpe-duct-calculator",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-label": "^2.1.3",
    "@radix-ui/react-separator": "^1.1.3",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-tabs": "^1.1.4",
    "@radix-ui/react-toast": "^1.2.7",
    "@radix-ui/react-tooltip": "^1.2.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "jspdf": "^2.5.1",
    "jspdf-autotable": "^3.5.31",
    "lucide-react": "^0.453.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.55.0",
    "recharts": "^2.15.3",
    "tailwind-merge": "^2.6.0",
    "wouter": "^3.3.5",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "5.6.3",
    "vite": "^5.4.14"
  }
}
```

### vite.config.js Content:
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
```

## Step 3: Modify src/App.tsx
Remove react-query references:
```typescript
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
```

## Step 4: Remove src/lib/queryClient.ts
Delete this file entirely as it's not needed.

## Step 5: Vercel Configuration
After uploading to GitHub, connect to Vercel with these settings:
- Framework: **Vite**
- Root Directory: **.**
- Build Command: **npm run build**
- Output Directory: **dist**
- Install Command: **npm install**

## Ready to Deploy!
This configuration will work perfectly on Vercel with your complete HVAC calculator functionality.