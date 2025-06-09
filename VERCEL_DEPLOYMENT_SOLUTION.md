# Working Vercel Deployment Solution

## The Problem
Your current project has server dependencies and Replit-specific configurations that conflict with Vercel's build process.

## The Solution
Create a new GitHub repository with only the frontend HVAC calculator:

### 1. Create New Repository
- Name: `hvac-duct-calculator-frontend`
- Initialize with README

### 2. Upload These Files Only

**Root Directory:**
```
package.json (see content below)
vite.config.js (see content below)
index.html (copy from your current project)
postcss.config.js (copy from current)
tailwind.config.ts (copy from current)
tsconfig.json (copy from current)
```

**Directories:**
```
src/ (entire folder from your current project)
attached_assets/ (for images/assets)
```

### 3. package.json Content
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
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "typescript": "5.6.3",
    "vite": "^5.4.14"
  }
}
```

### 4. vite.config.js Content
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

### 5. Remove Query Client Dependencies
Edit `src/lib/queryClient.ts` to remove server imports:
```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
  },
});
```

### 6. Vercel Settings
- Framework: **Vite**
- Root Directory: **.**
- Build Command: **npm run build**
- Output Directory: **dist**
- Install Command: **npm install**

## Why This Works
- No server dependencies
- No Replit-specific plugins
- Clean Vite configuration
- Only essential frontend packages
- Standard React + TypeScript setup

This approach will deploy successfully on Vercel with your complete HVAC calculator functionality.