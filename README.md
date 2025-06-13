# Image Compressor Application

A simple image compressor built with React, Vite, and Express.

## Prerequisites
- Node.js v18 or higher
- npm (comes with Node.js)

## Getting Started

1. **Clone the repository** (if you haven't already)
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
   This will:
   - Start the Express API server
   - Start the Vite development server for the React frontend
   - Watch for changes and automatically reload

4. **Access the application**:
   Open your browser and visit: [http://localhost:3000](http://localhost:3000)

## Building for Production

To create a production build:
```bash
npm run build
```

This will:
1. Build the React frontend using Vite
2. Compile the TypeScript server code
3. Output production-ready files in:
   - `dist/` for client assets
   - `dist/server/` for server code

## Project Structure

```
├── client/              # React frontend
│   ├── public/          # Static assets
│   └── src/             # Source code
├── server/              # Express API server
├── scripts/             # Development scripts
├── package.json         # Project dependencies and scripts
└── README.md            # This file
```

## Troubleshooting

- If you encounter dependency issues, try deleting `node_modules` and `package-lock.json` then run `npm install` again
- Ensure you're using Node.js v18 or higher (`node -v`)
