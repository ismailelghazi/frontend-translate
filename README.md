# The Developer's Journey - Cinematic Translation App

A Next.js frontend that tells the story of a developer's journey through immersive animations and a functional translation tool.

## 🌟 Features

- **Cinematic Landing Page**: 4-scene scroll-based storytelling experience.
- **Immersive Animations**: Powered by Framer Motion and React Scroll Parallax.
- **Seamless Transitions**: Smooth page transitions between Story, Auth, and App modes.
- **Interactive UI**: Glowing effects, staggered text reveals, and micro-interactions.
- **Functional Translation Dashboard**: Mocked translation API with language switching and copy functionality.
- **Authentication Flow**: Animated login/register forms with JWT storage (simulated).

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Outfit (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd story-translation-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build -d
   ```

2. Access the app at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```
src/
├── app/
│   ├── translate/      # Translation dashboard
│   ├── globals.css     # Global styles & Tailwind
│   ├── layout.tsx      # Root layout with fonts
│   └── page.tsx        # Main landing page (Story)
├── components/
│   ├── Scene1.tsx      # "The Arrival" scene
│   ├── Scene2.tsx      # "The Challenge" scene
│   ├── Scene3.tsx      # "The Discovery" scene
│   ├── Scene4.tsx      # "The Key" scene
│   ├── AuthForm.tsx    # Login/Register form
│   └── TranslationDashboard.tsx # Main app interface
```

## 🎨 Animation Details

- **Scroll-triggered Reveals**: Text and elements fade in as you scroll.
- **Parallax**: Background elements move at different speeds in Scene 2.
- **Typewriter Effect**: Used in Scene 3 for dramatic text presentation.
- **Glow Effects**: CSS drop-shadows and Framer Motion layout animations.

## 📝 License

MIT
