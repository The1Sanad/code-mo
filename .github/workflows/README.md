# GitHub Actions Workflows

This directory contains GitHub Actions workflow configurations for automating CI/CD processes.

## CI/CD Pipeline (ci.yml)

This workflow handles continuous integration and deployment for the project.

### Workflow Triggers
- Runs on push to `main` or `master` branches
- Runs on pull requests to `main` or `master` branches

### Jobs

#### build-and-deploy
Runs on Ubuntu latest and performs the following steps:

1. **Checkout repository** - Checks out the code using actions/checkout@v3
2. **Setup Node.js** - Sets up Node.js environment with caching for Yarn dependencies
3. **Install dependencies** - Installs Yarn globally and project dependencies
4. **Lint** - Runs ESLint to check code quality
5. **Build** - Builds the application using Vite
6. **Deploy to GitHub Pages** - Deploys the built application to GitHub Pages (only on push to main/master)

### Deployment

The workflow uses JamesIves/github-pages-deploy-action@v4 to deploy the built application to GitHub Pages. The deployment:
- Uses the `dist` directory as the source
- Deploys to the `gh-pages` branch
- Cleans the target branch before deployment

## Adding New Workflows

To add a new workflow:
1. Create a new YAML file in this directory
2. Define the workflow triggers, jobs, and steps
3. Commit and push the file to the repository

## Troubleshooting

If the workflow fails, check:
- The workflow logs in the GitHub Actions tab
- That all required secrets are set in the repository settings
- That the build process completes successfully