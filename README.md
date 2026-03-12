# SPARCMATDH Application

## ✅ Overview
SPARCMATDH is a cross‑platform mobile/​web questionnaire application built with React, Vite, Capacitor, and a TailwindCSS-based UI library.
The app guides users through a multi‑section survey, collects profile information, and displays personalized results and feedback.
It runs as a web project and is packaged for Android using Capacitor for native device access.

Key features include:
- Dynamic question flow with progress tracking
- User authentication and profile management
- Feedback dashboard and history of previous responses
- File upload capability (e.g. images) for profile data
- Responsive design for desktop and mobile browsers

## 🛠 Tech Stack
- **Frontend:** React (JSX/TSX) with Vite for fast development
- **Styling:** Tailwind CSS & custom component library under `src/components/ui`
- **Mobile:** Capacitor (Android project under `android/`)
- **State & Data:** React context (`hooks/`, `lib/`) and `react-query`
- **API:** Base44 backend configured via environment variables

## 🚀 Getting Started (Development)
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd SPARCMATDH
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   Create a file named `.env.local` in the project root and add the following variables:
   ```env
   VITE_BASE44_APP_ID=your_app_id
   VITE_BASE44_APP_BASE_URL=https://your-backend-url
   ```
   These values connect the frontend to the Base44 backend service.
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) (or the URL shown) to view the app.

### 🧪 Running on Android Emulator or Device
```bash
npx cap sync android
npx cap open android
```
Build and run the project from Android Studio as usual.

## 📁 Project Structure
```
src/                  # React source code
  components/         # UI components and layout
  pages/              # Top-level route components
  hooks/              # Custom React hooks
  lib/                # Helpers, contexts, clients
  api/                # API wrappers
  utils/              # TypeScript utility functions
android/              # Capacitor Android project
...
```

## 📦 Building for Production
- **Web:** `npm run build` generates a `dist/` folder.
- **Android:** After syncing with Capacitor, open the Android project and run a release build.

## 📘 Documentation & Support
- Base44 GitHub integration docs: https://docs.base44.com/Integrations/Using-GitHub
- Base44 Support: https://app.base44.com/support

> 📝 This README is intended to help new contributors understand the application and get it running locally. Feel free to add any project‑specific notes or diagrams as needed.
