# MathSolver CI - Application Guide

## Overview

MathSolver CI is a full-stack web application built for solving mathematical exercises specific to the Terminale D curriculum in Côte d'Ivoire. The application uses AI to analyze and solve math problems, providing step-by-step solutions following the official UEMOA methodology.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, built using Vite
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom Ivorian theme colors (orange and green)
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **PWA Support**: Service worker integration for offline capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth with OpenID Connect
- **AI Integration**: OpenAI API via OpenRouter for mathematical problem solving

## Key Components

### Database Layer (Drizzle ORM)
- **Users table**: Stores user profiles with Replit Auth integration
- **Sessions table**: Manages user sessions (required for Replit Auth)
- **Lessons table**: Stores the 12 mathematical topics for Terminale D
- **Schema location**: `shared/schema.ts`
- **Configuration**: `drizzle.config.ts` for PostgreSQL dialect

### AI Service Layer
- **Mathematical Problem Solver**: Implements curriculum-specific constraints
- **Lesson Detection**: Automatically identifies which of the 12 lessons applies
- **Solution Generation**: Provides structured solutions with introduction, development, and conclusion
- **Curriculum Compliance**: Restricts responses to authorized Terminale D content only

### Authentication System
- **Provider**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Automatic user creation and profile management

## Data Flow

### Problem Solving Workflow
1. User submits math problem (text or image)
2. AI analyzes problem to detect relevant lesson
3. System validates problem is within Terminale D curriculum
4. AI generates structured solution following UEMOA methodology
5. Solution is stored in local history for offline access
6. User receives formatted response with steps and explanations

### Client-Server Communication
- **API Endpoints**: RESTful API with `/api` prefix
- **Data Format**: JSON with TypeScript interfaces
- **Error Handling**: Centralized error handling with user-friendly messages
- **Offline Support**: Local storage for problem history

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **Authentication**: passport, openid-client for Replit Auth
- **AI Service**: OpenAI SDK configured for OpenRouter API
- **UI Components**: @radix-ui/* components for accessible UI elements
- **Form Handling**: react-hook-form with @hookform/resolvers

### Development Tools
- **Build Tool**: Vite for fast development and building
- **Type Checking**: TypeScript with strict configuration
- **Database Tools**: drizzle-kit for schema management
- **Code Quality**: ESLint and Prettier (implied by project structure)

## Deployment Strategy

### Environment Configuration
- **Development**: `npm run dev` - runs with tsx for TypeScript execution
- **Production Build**: `npm run build` - builds client with Vite, server with esbuild
- **Production Start**: `npm run start` - runs compiled JavaScript

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment**: Autoscale deployment target
- **Port Configuration**: Internal port 5000, external port 80
- **Database**: PostgreSQL provisioned automatically

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenRouter API key for AI services
- `SESSION_SECRET`: Secret for session encryption
- `REPLIT_DOMAINS`: Allowed domains for Replit Auth

## Changelog

Changelog:
- June 23, 2025. Initial setup and configuration completed
- Application PWA MathSolver CI successfully deployed and running
- OpenRouter API integration configured with user's API key
- All dependencies installed and server operational on port 5000
- Added comprehensive information pages: "En savoir plus", "Aide", and "Contact"
- Updated navigation with developer information and user guide
- Enhanced API error handling with proper validation
- Fixed TypeScript errors in navigation components
- Streamlined menu by removing "Mes Progrès" and "Toutes les Leçons" sections
- Created functional Settings page with practical user preferences
- Added hamburger menu integration to home page with dark mode support
- Initiated deployment to Replit Deployments for public access
- Application ready for production use with all features functional

## User Preferences

Preferred communication style: Simple, everyday language.
User prefers to code independently first, then request assistance for deployment and configuration.