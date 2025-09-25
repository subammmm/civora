# Copilot Coding Agent: Capabilities and Limitations

This document outlines what the Copilot Coding Agent can and cannot do when working on GitHub repositories and projects.

## ✅ What Copilot Coding Agent CAN Do

### Repository Operations
- **Work within existing repositories**: Full access to read, modify, and commit changes to the current repository
- **Create and modify files**: Add, edit, or delete files within the current repository structure
- **Git operations**: Commit changes, create branches, and push to the current repository
- **Pull Request management**: Update PR descriptions, commit changes to existing PRs

### Development Tasks
- **Full-stack development**: Can scaffold complete applications using various tech stacks
- **Code generation**: Write production-ready code in multiple languages and frameworks
- **Testing and validation**: Create tests, run builds, and validate implementations
- **Documentation**: Generate comprehensive README files, API docs, and guides

### Technology Stacks
- **Frontend**: React, Next.js, Vue, Angular, static HTML/CSS/JS
- **Backend**: Node.js, Python, Go, PHP, and more
- **Databases**: SQL, NoSQL, ORM configurations (Prisma, etc.)
- **Deployment**: Vercel-ready configurations, Docker setups

## ❌ What Copilot Coding Agent CANNOT Do

### GitHub Repository Management
- **Create new GitHub repositories**: Cannot initialize new repos on GitHub
- **Repository settings**: Cannot configure repo settings, webhooks, or permissions
- **Cross-repository operations**: Cannot work across multiple repositories simultaneously

### External Service Integration
- **API keys and secrets**: Cannot provision accounts or generate API keys for external services
- **Payment provider setup**: Cannot create accounts with services like eSewa, Khalti, Stripe
- **Domain and hosting**: Cannot register domains or configure external hosting

### Infrastructure and DevOps
- **Server provisioning**: Cannot set up servers or cloud infrastructure
- **Database hosting**: Cannot provision hosted database instances
- **SSL certificates**: Cannot generate or configure SSL certificates

## 📋 Recommended Workflow for New Projects

When you need a new project (like the "Guitar Pasal" e-commerce example):

### Step 1: Repository Creation (User Action Required)
```bash
# You need to manually create the repository on GitHub
# Repository name: guitar-pasal (no spaces)
# Can be public or private
```

### Step 2: External Service Setup (User Action Required)
- **eSewa**: Create sandbox/live merchant accounts
- **Khalti**: Register for API keys (public/secret)
- **Bank details**: Gather account information for bank transfer option
- **Email services**: Set up email providers if needed

### Step 3: Copilot Agent Implementation
Once the repository exists, provide detailed instructions like:

```
Title: Build "Guitar Pasal" MVP with eSewa, Khalti, and bank transfer

Tech stack: Next.js 14 (App Router, TypeScript), Tailwind CSS
Database: Prisma + SQLite
Payment methods: eSewa, Khalti, Bank transfer
Features: Product catalog, cart, checkout, order management, admin panel
```

## 🎯 Example: Guitar Pasal E-commerce Project

The following would be the complete scope for Copilot Coding Agent once the repository is created:

### Technical Implementation
- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Zustand** for cart state management
- **Prisma + SQLite** for database (migration-ready for PostgreSQL)
- **Vercel deployment** configuration

### Core Features
1. **Product Catalog**: Guitar picks with variations (thickness, pack size)
2. **Shopping Cart**: Add/remove/update with localStorage persistence
3. **Checkout Flow**: Customer details collection and payment processing
4. **Payment Integration**: 
   - eSewa redirect flow with server-side verification
   - Khalti widget with token verification
   - Bank transfer with manual processing
5. **Order Management**: Complete order lifecycle tracking
6. **Admin Panel**: Basic authentication and order management

### Deliverables
- Complete codebase with all features implemented
- Environment configuration (`.env.example`)
- Database schema and migrations
- Comprehensive documentation
- Production-ready deployment configuration

## 🚀 Getting Started

To work with Copilot Coding Agent on a new project:

1. **Create the GitHub repository** manually
2. **Gather all API keys** and external service credentials
3. **Provide comprehensive requirements** in a single, detailed prompt
4. **Let Copilot Agent** handle the complete implementation

This workflow ensures efficient development while respecting the limitations of what can be automated versus what requires manual setup.