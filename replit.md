# HVAC Duct Calculator

## Overview

This is a professional HVAC ductwork calculator web application that provides precise diameter, CFM, and velocity calculations for engineering professionals. The application is built as a React-based single-page application with comprehensive calculation features, interactive charts, and PDF report generation capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library for professional UI
- **Charts**: Recharts library for interactive data visualization
- **PDF Generation**: jsPDF with autoTable plugin for client-side report generation
- **State Management**: React hooks for local state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM configured for PostgreSQL (though currently using in-memory storage)
- **Authentication**: Session-based authentication setup (placeholder implementation)
- **API Structure**: RESTful API endpoints with Express routing

### Build Configuration
- **Development**: Vite dev server with HMR and runtime error overlay
- **Production**: Static site generation optimized for Vercel deployment
- **TypeScript**: Strict type checking with path aliases for clean imports

## Key Components

### HVAC Calculator Engine
- **Core Calculations**: Implements ASHRAE standard formulas for CFM, velocity, and friction loss
- **Real-time Updates**: Instant recalculation as users modify input parameters
- **Validation**: Input validation with engineering guidelines and constraints
- **Data Generation**: Automatic generation of calculation tables for various duct diameters

### Interactive Visualization
- **Charts**: Recharts-powered line charts showing CFM vs diameter relationships
- **Intersection Analysis**: Automatic identification of optimal duct sizing points
- **Responsive Design**: Charts adapt to different screen sizes and orientations

### PDF Report Generation
- **Client-side Processing**: jsPDF generates reports entirely in the browser
- **Professional Layout**: Structured reports with project information, calculations, and charts
- **Data Tables**: Comprehensive calculation tables with proper formatting

### UI Components
- **Design System**: shadcn/ui components with consistent styling
- **Responsive Layout**: Mobile-first design that works on all devices
- **Input Controls**: Professional form controls with validation feedback
- **Data Tables**: Sortable and searchable calculation results

## Data Flow

### Calculation Pipeline
1. User enters velocity and friction limits in input controls
2. Application generates array of duct diameters (4" to 60" in 2" increments)
3. For each diameter, calculates CFM using velocity and friction formulas
4. Results are processed for chart visualization and table display
5. Intersection points between velocity and friction curves are identified

### Report Generation Flow
1. User fills project information (name, engineer, date, job number)
2. Current calculation results are captured along with input parameters
3. PDF document is generated client-side with formatted tables and metadata
4. File is automatically downloaded to user's device

### State Management
- Local component state for input values and calculation results
- Memoized calculations to prevent unnecessary recalculations
- Real-time updates without external state management library

## External Dependencies

### Core Libraries
- **React Ecosystem**: react, react-dom, @tanstack/react-query
- **UI Framework**: @radix-ui components, tailwindcss, shadcn/ui
- **Charts**: recharts for data visualization
- **PDF Generation**: jspdf, jspdf-autotable
- **Form Handling**: react-hook-form, @hookform/resolvers
- **Utilities**: clsx, class-variance-authority, date-fns

### Development Tools
- **Build**: vite, @vitejs/plugin-react
- **TypeScript**: Full TypeScript support with strict configuration
- **Database**: drizzle-orm, @neondatabase/serverless (configured but not actively used)
- **Development**: tsx for server development, various Replit integration plugins

## Deployment Strategy

### Static Site Generation
- Vite builds the application into static files in `dist/public` directory
- All calculations happen client-side, no server dependencies for core functionality
- Optimized bundle with code splitting and tree shaking

### Vercel Configuration
- `vercel.json` configured for SPA deployment with proper rewrites
- Build command: `vite build`
- Output directory: `dist/public`
- Framework detection disabled for custom configuration

### Environment Setup
- Node.js 20+ support with ES modules
- PostgreSQL module included in Replit for potential database features
- Port configuration for both development (5000) and production

### Embedding Options
- iframe embedding for easy integration into existing websites
- Standalone widget files for direct integration
- WordPress plugin structure provided for CMS integration

## Changelog

```
Changelog:
- June 13, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```