# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 🧪 End-to-end testing with Playwright
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

## Testing

This project includes end-to-end testing with [Playwright](https://playwright.dev/).

### Running Tests

Run all e2e tests:

```bash
npm run test:e2e
```

Run tests in UI mode (interactive):

```bash
npm run test:e2e:ui
```

Run tests in debug mode:

```bash
npm run test:e2e:debug
```

View test report:

```bash
npm run test:e2e:report
```

### Test Configuration

Tests are configured in `playwright.config.ts` and located in the `tests/e2e/` directory. The configuration includes:

- **Multi-browser testing**: Chromium, Firefox, and WebKit
- **Mobile testing**: Tests run on mobile viewports (Pixel 5, iPhone 12)
- **Automatic dev server**: Starts the development server before running tests
- **Screenshots and videos**: Captured on test failures
- **Trace collection**: Available for debugging failed tests

### Writing Tests

Tests are written using Playwright's test framework. Example:

```typescript
import { test, expect } from '@playwright/test';

test('should load the homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Car Tracker');
  await expect(page.getByText("What's next?")).toBeVisible();
});
```

### CI/CD Integration

E2E tests run automatically in the CI/CD pipeline:
- Tests run in parallel with the build job
- Both test and e2e-tests jobs must pass before deployment
- Test artifacts (reports, screenshots, videos) are uploaded for debugging

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
