# Hopewin Hospital Website

This repository contains the source code for the Hopewin Hospital static website. It is a modern, fast, and responsive frontend web application built with React and Vite.

## 🚀 Tech Stack
- **Framework:** [React 19](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🛠️ Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/alexkatta123/hopewin-hospital-static.git
   ```
2. Navigate to the project directory:
   ```bash
   cd hopewin-hospital-static
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

*(Note: If the project uses any environment variables, please ensure you securely obtain the `.env` or `.env.production` file from the previous developers and place it in the root folder).*

### Running the Development Server
To start the local development server:
```bash
npm run dev
```
Open your browser and visit `http://localhost:5173` to view the website. The server supports Hot Module Replacement (HMR), meaning any code changes will instantly reflect in the browser.

---

## 🏗️ Building for Production

To create an optimized production build of the website:
```bash
npm run build
```
This will generate a `dist` folder containing the compiled, minified, and production-ready static files. 

If you want to preview the production build locally before deploying:
```bash
npm run preview
```

---

## 🌐 Deployment & Hosting

Because this is a completely static React application (Single Page Application), the contents of the `dist` folder can be hosted on almost any modern web hosting service. 

**Recommended Hosting Providers:**
- **Vercel** (A `vercel.json` file is already included in the root to handle client-side routing automatically).
- **Netlify**
- **GitHub Pages**
- **AWS S3 / CloudFront**

If deploying manually to a standard web server (like Apache or Nginx), ensure that all traffic is redirected to `index.html` to support React Router.

---

## 📝 Scripts Reference
- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the application into static files for production.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to find and fix code quality issues.
