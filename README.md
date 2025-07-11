# Turborepo Playground

A modern monorepo setup using Turborepo, Bun, and TypeScript. This project includes multiple Next.js applications and a Cloudflare Workers API, all sharing common packages.

## 📋 What's inside?

This Turborepo includes the following packages and apps:

### Apps

- `apps/api` - Hono API running on Cloudflare Workers
- `apps/desktop` - Next.js app optimized for desktop
- `apps/mobile` - Next.js app optimized for mobile

### Packages

- `packages/ui` - Shared React component library
- `packages/typescript-config` - Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- [Bun](https://bun.sh/) >= 1.2.18

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd my-turborepo-playground

# Install dependencies
bun install
```

### Development

To develop all apps and packages simultaneously:

```bash
bun dev
```

To develop a specific app:

```bash
bun dev --filter=desktop
bun dev --filter=mobile
bun dev --filter=api
```

### Build

To build all apps and packages:

```bash
bun build
```

To build a specific app:

```bash
bun build --filter=<app-name>
```

## 🛠 Available Scripts

- `bun dev` - Start development servers for all apps
- `bun build` - Build all apps for production
- `bun lint` - Run Biome linter
- `bun check` - Run linter and auto-fix issues
- `bun check-types` - Run TypeScript type checking
- `bun format` - Format code with Biome and Prettier

## 🏗 Tech Stack

- **Package Manager**: [Bun](https://bun.sh/)
- **Build System**: [Turborepo](https://turbo.build/repo)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linter/Formatter**: [Biome](https://biomejs.dev/) + [Prettier](https://prettier.io/)
- **Git Hooks**: [Lefthook](https://github.com/evilmartians/lefthook)

### Frontend Apps (Desktop/Mobile)

- **Framework**: [Next.js](https://nextjs.org/) 15.3.5
- **UI Library**: [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4

### API

- **Framework**: [Hono](https://hono.dev/)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Development Tool**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## 📁 Project Structure

```
my-turborepo-playground/
├── apps/
│   ├── api/          # Cloudflare Workers API
│   ├── desktop/      # Next.js desktop app
│   └── mobile/       # Next.js mobile app
├── packages/
│   ├── ui/           # Shared React components
│   └── typescript-config/  # Shared TS configs
├── docs/             # Documentation
│   └── turborepo-vitest-guide.md  # Vitest integration guide
├── .github/          # GitHub Actions workflows
├── biome.json        # Biome configuration
├── lefthook.yml      # Git hooks configuration
├── turbo.json        # Turborepo configuration
└── package.json      # Root package.json
```

## 🔧 Configuration

### Code Style

This project uses Biome for linting and formatting with the following preferences:

- Tab indentation
- Double quotes
- Automatic formatting on git commit (via Lefthook)

### TypeScript

Shared TypeScript configurations are available in `packages/typescript-config`:

- `base.json` - Base configuration
- `nextjs.json` - Next.js specific configuration
- `react-library.json` - React library configuration

## 📚 Documentation

- [Turborepo Vitest Integration Guide](docs/turborepo-vitest-guide.md) - Comprehensive guide for integrating Vitest with Turborepo

## 🧪 Testing (Planned)

This project is planning to adopt Vitest for testing. We recommend the hybrid approach that combines the benefits of both per-package configuration and Vitest Projects:

- Local development: Better DX with Vitest Projects
- CI: Leverage Turborepo's caching with per-package configuration

For detailed information, see the [Vitest integration guide](docs/turborepo-vitest-guide.md).

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `bun check` to ensure code quality
4. Commit your changes (auto-formatting will be applied)
5. Push and create a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
