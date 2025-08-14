# 🌱 ArcFlow – Your Habit Transformation Companion

> Transform discipline into a lifestyle with ArcFlow’s powerful habit tracking and personal growth system.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Postgres](https://img.shields.io/badge/Postgres-Neon-blue.svg)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet.svg)](https://prisma.io)

ArcFlow is a minimalist yet powerful **habit tracking web application** built with modern full-stack tools.
It’s designed to help you build sustainable routines, track your growth, and actually enjoy the habit-building process.

---

## ✨ Why ArcFlow?

In a distraction-heavy world, building consistent habits is the foundation for success. ArcFlow helps by:

* **Visual Motivation** – See progress instantly via streak calendars and stats
* **Simplicity First** – A clean, frictionless interface
* **Flexibility** – Daily, weekly, or custom tracking
* **Focus on Growth** – Progress over perfection

---

## 🚀 Key Features

### 📈 Habit Management

* Unlimited habits with custom frequencies
* One-click completion tracking

### 📅 Visual Progress Tracking

* Interactive streak calendar
* Color-coded completion states
* Historical analytics to find patterns

### 🎯 Goal Setting & Motivation

* Daily checklist system
* Motivational quotes and milestones

### 🎨 User Experience

* Dark mode
* Fully responsive
* Smooth animations
* Accessibility-first

---

## 🛠️ Tech Stack

**Full Stack**

* **Next.js 15** – App Router + React 19
* **Tailwind CSS 4** – Utility-first styling
* **Radix UI** – Accessible UI primitives
* **Lucide React** – Icon set
* **Auth.js (NextAuth v5)** – Authentication (GitHub, Google, Spotify, etc.)
* **Prisma ORM** – Database toolkit
* **Neon Postgres** – Serverless PostgreSQL

**State & Utils**

* **Zustand** – Lightweight state management
* **React Hook Form** – Form handling
* **Axios** – HTTP client

---

## 🚀 Quick Start

### Prerequisites

* Node.js 20+
* Git
* A Neon Postgres database (free tier works)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/arthursensai/ArcFlow.git
cd ArcFlow
npm install
```

### 2️⃣ Environment Variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require"

AUTH_SECRET="your-generated-secret"

# Example OAuth configs
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

GOOGLE_ID="your-google-id"
GOOGLE_SECRET="your-google-secret"

SPOTIFY_CLIENT_ID="your-spotify-id"
SPOTIFY_CLIENT_SECRET="your-spotify-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3️⃣ Setup Database

```bash
npx prisma generate
npx prisma db push
```

### 4️⃣ Run Dev Server

```bash
npm run dev
```

Visit → `http://localhost:3000`

---

## 📂 Project Structure

```
ArcFlow/
├── prisma/                # Prisma schema & migrations
├── src/
│   ├── app/               # Next.js App Router pages
│   ├── components/        # UI components
│   ├── lib/               # Utilities (auth, db, etc.)
│   ├── hooks/             # Custom React hooks
│   └── styles/            # Tailwind CSS styles
├── package.json
└── README.md
```

---

## 🗺️ Roadmap

**Phase 1 – Core Foundation (Now)**

* [x] Habit creation & tracking
* [x] Calendar streaks
* [x] OAuth authentication
* [ ] Habit categories

**Phase 2 – Enhanced UX (Q3 2025)**

* [ ] Fitness & study modules
* [ ] Notifications & reminders

**Phase 3 – Intelligence (Q4 2025)**

* [ ] AI habit suggestions
* [ ] Advanced analytics

**Phase 4 – Gamification (2026)**

* [ ] Achievements, XP, leaderboards

---

## 📄 License

MIT License – see [LICENSE](LICENSE).

---

**Made with ❤️ by Mohamed (arthursensai)**
