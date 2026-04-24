# Interval Engine Pro - [![Interval Engine Website](https://img.shields.io/badge/Interval_Engine-%23000000.svg?style=for-the-badge&logo=firefox&logoColor=#FF7139)](https://interval-app.vercel.app/)

![React Version](https://img.shields.io/badge/React-19.2.5-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0.0-06B6D4.svg)
![Lucide React](https://img.shields.io/badge/Lucide_React-0.474.0-FF0055.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A modern, lightning-fast **Interval Calculator** built with React 19 that transforms time inputs into precise, 24-hour sequence generation instantly. This project showcases **best-in-class UI/UX patterns**, **functional programming logic**, and **accessible design** principles ✨.

---

## 📚 Table of Contents

- [📌 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture & Implementation](#️-architecture--implementation)
  - [🎨 Design System](#-design-system)
  - [⚡ Performance Optimizations](#-performance-optimizations)
  - [🧩 Component Architecture](#-component-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [🔗 Installation](#-installation)
  - [▶️ Running the Application](#️-running-the-application)
- [📂 Project Structure](#-project-structure)
- [🎯 Usage Guide](#-usage-guide)
- [🤝 Contributing](#-contributing)
- [📧 Contact](#-contact)

---

## 📌 Project Overview

This single-page application (SPA) empowers users to perform complex time calculations—from adding/subtracting intervals to generating 5-step sequential projections. It is designed for developers, project managers, and time-critical planning with a focus on precision and speed.

🔍 **Objective**: Deliver a seamless, precision-focused time calculation experience with instant visual feedback and modular extensibility.

### 💎 Highlights

- 🌑 **Premium Dark Theme** with slate-950 background and emerald accents
- ⚡ **Precision Math** handling 24-hour rollovers and complex time arithmetic
- 🎨 **Sequence Projections** automatically generates the next 5 intervals in a sequence
- 📱 **Mobile-First Design** with a responsive layout optimized for all viewports
- 🧩 **Strategy Pattern** implementation for easily adding new time operations
- 🔒 **Type-Safe Inputs** preventing invalid time data entry
- ♿ **Accessible** with semantic HTML and keyboard navigation support

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Arithmetic Engine** | Add, subtract, or find the difference between two time intervals |
| **Sequence Projection**| Automatically projects the next 5 intervals based on your calculation |
| **24-Hour Normalization** | Intelligently handles time rollovers (e.g., 23:00 + 2:00 = 01:00) |
| **Interval Comparison**| Instantly determine which interval is larger with text-based feedback |
| **Real-time Updates** | Calculations update instantly as you select different operations |
| **Premium UI** | Built with Tailwind CSS v4 and Lucide React icons for a high-end feel |
| **Responsive Grid** | Optimized layout that shifts from 2-column to 1-column on mobile |

---

## 🏗️ Architecture & Implementation

A production-ready React 19 application designed with modularity, performance, and user experience at its core.

### 🎨 Design System

**Implementation**: Tailwind CSS v4 + Lucide React

- ✅ **Color Palette**: `slate-900` for cards, `slate-950` for page background, and `emerald-500` for primary actions.
- ✅ **Typography**: Monospaced fonts for time displays to ensure alignment and readability.
- ✅ **Interactivity**: Scale transforms and ring-based focus states for a tactile feedback loop.

### ⚡ Performance Optimizations

| Technique | Implementation | Impact |
|-----------|----------------|--------|
| **React 19 Rendering**| Leverages the latest concurrent features | Smother UI transitions |
| **DRY Components** | `TimeInputGroup` reusable abstraction | Reduces code duplication and bundle size |
| **Normalized Logic** | Modular `toSeconds` and `toTimeString` helpers | Centralized and testable math logic |
| **Vite 6** | Modern ESM-based build tooling | Instant HMR and fast build times |

### 🧩 Component Architecture

**Separation of Concerns**: Each section is isolated into defined logical blocks.

```bash
App.jsx
├── CORE DOMAIN LOGIC (Math Helpers)
├── FUNCTION REGISTRY (Strategy Pattern for Ops)
├── UI COMPONENTS (TimeInputGroup)
└── MAIN APP COMPONENT (State & Orchestration)
```

#### 🎯 Component Highlights

- **`TimeInputGroup`**: Encapsulates 3-part time input (H/M/S) with automatic parsing.
- **`Operation Strategy`**: A registry of operations that can be extended without modifying the main UI loop.
- **`Interval Engine Pro`**: The main container handling state for intervals and results.

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.5 | Modern UI framework with Hooks and Context |
| **Tailwind CSS** | 4.0.0 | Next-gen utility-first CSS framework |
| **Vite** | 6.0.0 | High-performance frontend tooling |
| **Lucide React** | 0.474.0 | Modern, tree-shakable icon library |

---

## 🚀 Getting Started

Clone and run this project locally in under 2 minutes.

### 📋 Prerequisites

- **Node.js** 18.0+
- **npm** 9+

### 🔗 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Vamsiindugu/Interval-app.git
cd Interval-app

# 2. Install dependencies
npm install
```

### ▶️ Running the Application

```bash
# Start the development server
npm run dev

# The app will open at http://localhost:5173
```

**Available Scripts**:

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs the app in development mode with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run lint` | Runs ESLint to check for code quality issues |
| `npm run preview` | Previews the production build locally |

---

## 📂 Project Structure

```bash
interval-app/
├── public/
│   ├── favicon.svg         # App icon
│   └── icons.svg           # Scalable graphics
├── src/
│   ├── App.jsx             # Main logic, components, and state
│   ├── main.jsx            # React root render
│   ├── index.css           # Tailwind v4 directives
│   └── assets/             # Images and static files
├── vite.config.js          # Vite + React + Tailwind config
├── tailwind.config.js      # Tailwind customization
└── package.json            # Dependencies and scripts
```

---

## 🎯 Usage Guide

### 1️⃣ Input Your Intervals

1. Enter **Hours**, **Minutes**, and **Seconds** for Interval A and Interval B.
2. The inputs automatically parse strings to integers for safety.

### 2️⃣ Select an Operation

- **Add (+)**: Calculates the sum of both intervals.
- **Subtract (-)**: Subtracts Interval B from Interval A.
- **Difference (⇄)**: Calculates the absolute difference.
- **Compare (=)**: Returns a textual comparison of the two sizes.

### 3️⃣ View Projections

- For time-based operations, the engine projects the **next 5 steps** in the sequence (Current Result + Interval B increments).

---

## 🤝 Contributing

Contributions are **welcome** and **appreciated**! 🙌

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📧 Contact

### Vamsi Indugu

- 💌 Email: [vamsiindugu@gmail.com](mailto:vamsiindugu@gmail.com)
- 👩🏻‍💻 Portfolio: [vamsiindugu.vercel.app](https://vamsiindugu.vercel.app/)
- 🐱 GitHub: [@Vamsiindugu](https://github.com/Vamsiindugu/)
- 💼 LinkedIn: [vamsi-indugu](https://www.linkedin.com/in/vamsi-indugu/)

---

© 2026 Vamsi Indugu. All rights reserved.
Made with ❤️ and React 19
