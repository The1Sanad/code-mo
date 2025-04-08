# Code-mo

A collection of developer tools built with React and TypeScript.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [Yarn](https://yarnpkg.com/) (v1.22.x or higher) or npm

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/The1Sanad/code-mo.git
   cd code-mo
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit the `.env` file and add your OpenRouter API key:
     ```
     OPENROUTER_API_KEY=your_api_key_here
     ```
   - You can get your API key from [OpenRouter](https://openrouter.ai/keys)

### Development

Start the development server:

```bash
# Start development server (default: http://localhost:5173)
yarn dev
```

The application will be available at [http://localhost:5173](http://localhost:5173) (or another port if 5173 is in use).

### Building for Production

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

### Linting

```bash
# Run ESLint
yarn lint
```

## 🧩 Project Structure

```
├── .github/          # GitHub Actions workflows
├── public/           # Static assets
│   └── images/       # Image assets
├── src/              # Source code
│   ├── components/   # Reusable UI components
│   ├── context/      # React context providers
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── styles/       # Global styles
│   ├── tools/        # Individual developer tools
│   └── utils/        # Utility functions
├── index.html        # HTML entry point
└── vite.config.ts    # Vite configuration
```

## ✨ Features

- Various developer utilities and tools
- Modern React with TypeScript
- Tailwind CSS for styling
- Responsive design for desktop and mobile
- Fast performance with Vite
- Environment variables for secure API key storage

## 🔐 Environment Variables

This project uses environment variables to securely store API keys and other sensitive information. The following environment variables are used:

- `OPENROUTER_API_KEY`: Your OpenRouter API key for the Prompt Builder tool

You can set these variables in the `.env` file in the root directory of the project. A `.env.example` file is provided as a template.

### Using Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your actual API keys:
   ```
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```

3. Restart the development server if it's already running

### Security Notes

- The `.env` file is listed in `.gitignore` and should never be committed to version control
- For production deployments, set environment variables according to your hosting provider's instructions

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   
   If port 5173 is already in use, Vite will automatically try the next available port. Check your terminal output for the correct URL.

2. **Dependency issues**
   
   If you encounter dependency-related errors, try:
   ```bash
   yarn cache clean
   rm -rf node_modules
   yarn install
   ```

3. **Build errors**
   
   Make sure you're using a compatible Node.js version. This project works best with Node.js v16 or higher.

## 📦 Deployment

This project uses GitHub Actions for CI/CD. The workflow automatically:

1. Lints the code
2. Builds the application
3. Deploys to GitHub Pages (on push to main/master branch)

See the [workflow documentation](.github/workflows/README.md) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT