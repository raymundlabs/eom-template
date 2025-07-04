# Call Center Operations Dashboard

## Overview

This is a modern call center operations dashboard built with React, TypeScript, and Express.js. The application allows users to input performance data through forms or file uploads and visualizes key performance indicators (KPIs) for call center brands. The system is designed to help call center managers monitor brand performance, track metrics, and analyze operational efficiency.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (@tanstack/react-query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints
- **Data Storage**: In-memory storage (MemStorage class) with PostgreSQL schema definition
- **Validation**: Zod schemas for type-safe data validation
- **Development**: Vite for development server and hot module replacement

### Build System
- **Build Tool**: Vite for frontend bundling
- **Backend Build**: esbuild for server compilation
- **TypeScript**: Strict mode enabled with path mapping
- **Development**: tsx for TypeScript execution in development

## Key Components

### Data Models
- **KPI Data Schema**: Comprehensive call center metrics including:
  - Time metrics (handle time, hold time)
  - Experience scores (ACX, CSAT, CES, FCR)
  - Agent attributes (friendliness, communication, knowledge)
  - Operational metrics (calls presented/accepted, attendance, shrinkage)
  - Weekly performance tracking

### Frontend Components
- **Dashboard**: Main view with data input form and visualization tabs
- **KPI Form**: Comprehensive form for manual data entry
- **Metrics Grid**: Visual display of key performance indicators
- **Weekly Table**: Tabular view of weekly performance trends
- **Performance Chart**: Line chart showing performance over time
- **Circular Progress**: Custom progress indicators for scores

### Backend Services
- **Storage Interface**: Abstract storage layer with in-memory implementation
- **API Routes**: RESTful endpoints for KPI data CRUD operations
- **Validation**: Server-side data validation using Zod schemas

## Data Flow

1. **Data Input**: Users can input data through the KPI form interface
2. **Validation**: Client-side validation using React Hook Form and Zod
3. **API Communication**: Data sent to Express.js backend via REST API
4. **Server Validation**: Additional server-side validation and storage
5. **State Management**: React Query manages client-side data state and caching
6. **Visualization**: Data rendered through various dashboard components

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity (Neon)
- **drizzle-orm**: Type-safe SQL ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@hookform/resolvers**: Form validation integration
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **class-variance-authority**: Utility for creating component variants
- **clsx & tailwind-merge**: Conditional CSS class utilities
- **cmdk**: Command menu component
- **embla-carousel-react**: Carousel functionality

### Development Dependencies
- **Vite**: Development server and build tool
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Static Assets**: Served from build output directory

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Development**: Hot reload with Vite middleware integration
- **Production**: Static file serving with Express.js

### Database Setup
- **Schema**: Drizzle ORM with PostgreSQL-compatible schema
- **Migrations**: Generated in `./migrations` directory
- **Configuration**: Database credentials managed via environment variables

## Changelog
- July 04, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.