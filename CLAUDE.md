# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Codebase Overview

This is a monorepo project using Turborepo. It uses Bun as the package manager and manages multiple applications and shared packages.

### Application Structure

- **apps/api**: Hono API running on Cloudflare Workers
- **apps/desktop**: Next.js app for desktop (React 19, Tailwind CSS v4)
- **apps/mobile**: Next.js app for mobile (React 19, Tailwind CSS v4)

### Shared Packages

- **packages/ui**: Shared React component library (button, card, code components)
- **packages/typescript-config**: Shared TypeScript configuration

## Development Commands

```bash
# Start development environment
bun dev                    # Start all apps simultaneously
bun dev --filter=desktop   # Desktop app only
bun dev --filter=mobile    # Mobile app only
bun dev --filter=api       # API only

# Build
bun build                  # Build all
bun build --filter=<app>   # Build specific app

# Code quality checks
bun lint                   # Lint with Biome
bun check                  # Lint + format (auto-fix)
bun check-types            # TypeScript type checking
bun format                 # Code formatting

# API-specific commands (run in apps/api directory)
bun run deploy             # Deploy to Cloudflare Workers
bun run cf-typegen         # Generate types for Cloudflare bindings
```

## Architecture and Key Design Principles

### Monorepo Structure

- Turborepo for parallel task execution and dependency management
- Shared packages use `@repo/*` namespace
- Each app can be built and deployed independently

### Code Quality Management

- **Biome** as the main linter/formatter (tab indentation, double quotes)
- **Prettier** for files not supported by Biome
- **Lefthook** for Git hooks (auto-format on pre-commit, check on pre-push)

### Next.js Applications (desktop/mobile)

- Latest stack with Next.js 15.3.5 + React 19
- Tailwind CSS v4 (new approach without config files)
- Import shared components from `@repo/ui`
- Fast development environment with Turbopack

### Cloudflare Workers API

- Edge API using Hono framework
- Development and deployment managed with Wrangler
- Type-safe development with TypeScript

### Dependency Resolution Order

1. Shared packages (ui, typescript-config) are built first
2. Applications are built using shared packages
3. Turborepo automatically resolves dependencies

## Development Guidelines

1. **Package Manager**: Always use `bun` (do not use `npm`, `yarn`, or `pnpm`)
2. **Code Style**: Follow Biome configuration (tab indentation, double quotes)
3. **Type Safety**: Avoid using `any` type and ensure proper type definitions
4. **VS Code Diagnostics**: Verify no type errors with `mcp__ide__getDiagnostics`
5. **Git Commits**: Auto-formatting is applied by Lefthook

## Documentation

- **docs/turborepo-vitest-guide.md**: Comprehensive guide for integrating Vitest with Turborepo, including three different strategies and their tradeoffs

## Testing Strategy (Planned)

This project is planning to implement testing with Vitest. Based on the analysis of integration strategies:

1. **Hybrid Approach** (Recommended): Combines the benefits of both per-package and Vitest Projects approaches
   - Local development uses Vitest Projects for better DX
   - CI uses per-package configuration for caching benefits
   - Manual coverage report merging required

2. **Alternative Approaches**:
   - Per-package configuration: Best caching but manual coverage merging
   - Vitest Projects: Simple setup but loses Turborepo caching benefits
