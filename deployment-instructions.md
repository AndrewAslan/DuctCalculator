# Vercel Deployment Instructions for HVAC Calculator

## Step 1: Create New GitHub Repository
1. Go to GitHub and create a new repository called `hvac-calculator`
2. Clone it locally or use GitHub's web interface

## Step 2: Copy These Files
Copy only these essential files from your current project:

### Root Files:
- `index.html` (from current root)
- `vite.config.js` (from current root) 
- `postcss.config.js`
- `tailwind.config.ts`
- `tsconfig.json`

### Source Directory:
Copy the entire `src/` folder with all components and calculations

### Assets:
Copy the `attached_assets/` folder

### Dependencies:
Use this package.json content:

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

## Step 3: Vercel Configuration
In Vercel, use these exact settings:
- Framework Preset: **Vite**
- Root Directory: **.**
- Build Command: **npm run build**
- Output Directory: **dist**
- Install Command: **npm install**

## Step 4: Required File Modifications

### Update src/lib/queryClient.ts
Remove all server-related imports and simplify to:
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
    mutations: {
      retry: false,
    },
  },
});
```

This approach eliminates all server dependencies and Replit-specific configurations that are causing deployment issues.