# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

This project supports automatic deployment with environment-specific builds using the [Cloudflare wrangler-action](https://github.com/cloudflare/wrangler-action):

### Setup Requirements

To enable automatic deployments, add these secrets to your GitHub repository:
- `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

### Production Deployment

Production deployment happens automatically when changes are pushed to the `main` branch. The app is deployed to the production environment.

To deploy manually to production:

```sh
npm run deploy -- --env production
```

### PR Preview Environments

When you create a pull request, the CI/CD pipeline automatically:

1. **Deploys a preview environment** - Each PR gets its own isolated environment at `https://car-tracker-pr-{number}.{subdomain}.workers.dev`
2. **Comments on the PR** with the preview URL and deployment details
3. **Automatically cleans up** the environment when the PR is closed or merged

#### Environment Features:
- **Isolated environments**: Each PR has its own Worker deployment
- **Automatic cleanup**: Environments are deleted when PRs are closed
- **Real-time updates**: Environments are updated on every push to the PR
- **Environment variables**: PR environments include `PR_NUMBER` and `ENVIRONMENT` variables

#### Manual PR Deployment

To deploy a specific environment manually using the wrangler-action approach:

```sh
# Create a temporary wrangler config for your PR
cat > wrangler.pr.jsonc << EOF
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "car-tracker-pr-123",
  "compatibility_date": "2025-04-04",
  "main": "./workers/app.ts",
  "workers_dev": true,
  "vars": {
    "ENVIRONMENT": "pr-123",
    "PR_NUMBER": "123"
  }
}
EOF

npx wrangler deploy --config wrangler.pr.jsonc
```

### Legacy Deployment Commands

For advanced deployment scenarios:

```sh
# Deploy a preview URL
npx wrangler versions upload

# Promote a version to production
npx wrangler versions deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
