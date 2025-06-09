# 🌱 ArcFlow – Your Habit Transformation Companion

> Transform discipline into a lifestyle with ArcFlow's powerful habit tracking and personal growth system.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0+-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.0+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://mongodb.com/)

ArcFlow is a minimalist yet powerful **habit tracking web application** designed to help users build sustainable routines, achieve long-term goals, and visualize their personal growth journey. Built with modern web technologies and a focus on user experience, ArcFlow turns the challenge of habit formation into an engaging and rewarding process.

---

## ✨ Why ArcFlow?

In a world full of distractions, building consistent habits is the foundation of personal success. ArcFlow addresses common challenges in habit formation by providing:

- **Visual Motivation**: See your progress at a glance with streak calendars and progress dashboards
- **Simplicity First**: Clean, intuitive interface that doesn't overwhelm
- **Flexible Tracking**: Adapt to your unique goals and lifestyle
- **Growth Mindset**: Focus on progress, not perfection

---

## 🚀 Key Features

### 📈 **Habit Management**
- Create and customize unlimited habits
- Set frequency goals (daily, weekly, or custom intervals)
- Track completion with simple one-click interactions

### 📅 **Visual Progress Tracking**
- Interactive calendar view showing your habit streaks
- Color-coded completion status for quick overview
- Historical data visualization to identify patterns

### 🎯 **Goal Setting & Motivation**
- Daily goal checklists for focused productivity
- Inspirational quotes to maintain momentum
- Personal milestone celebrations

### 🎨 **User Experience**
- **Dark mode** support for comfortable viewing
- **Responsive design** optimized for all devices
- **Smooth animations** and intuitive interactions
- **Accessibility-first** approach

---

## 🔗 Live Demo

**[Try ArcFlow Now →](https://arcflow-demo.netlify.app)** *(Coming Soon)*

---

## 📊 Screenshots

*Screenshots will be added once the application is deployed*

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Vite 6** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **React Hook Form** - Form management
- **React Calendar** - Calendar components
- **Radix UI** - Accessible UI primitives

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16.0 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arthursensai/ArcFlow.git
   cd ArcFlow
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies (if using backend)
   cd ../backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   For backend, create `.env` in `backend/` directory:
   ```env
   PORT=5000
   MONGODB_STRING=mongodb://localhost:27017/arcflow
   FRONTEND_URL=http://localhost:5173
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the development servers**
   ```bash
   # Backend (from backend/ directory)
   npm run dev
   
   # Frontend (from frontend/ directory - in a new terminal)
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see ArcFlow in action!

---

## 📁 Project Architecture

```
ArcFlow/
├── 📂 frontend/                    # React application
│   ├── 📂 src/
│   │   ├── 📂 components/          # Reusable UI components
│   │   │   ├── HabitTracker.jsx    # Main habit tracking interface
│   │   │   ├── ProgressCalendar.jsx # Calendar visualization
│   │   │   ├── DashboardStats.jsx  # Statistics dashboard
│   │   │   └── QuoteDisplay.jsx    # Motivational quotes
│   │   ├── 📂 pages/               # Application pages
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Dashboard.jsx       # Main app interface
│   │   │   └── Profile.jsx         # User profile
│   │   ├── 📂 hooks/               # Custom React hooks
│   │   │   ├── useAuth.js          # Authentication logic
│   │   │   ├── useHabits.js        # Habit management
│   │   │   └── useTheme.js         # Theme switching
│   │   ├── 📂 utils/               # Utility functions
│   │   │   ├── dateUtils.js        # Date manipulation
│   │   │   ├── streakCalculator.js # Streak calculations
│   │   │   └── storage.js          # Local storage helpers
│   │   └── App.jsx                 # Root component
│   ├── 📂 public/                  # Static assets
│   └── package.json
│
├── 📂 backend/                     # Express.js API (optional)
│   ├── 📂 controllers/             # Request handlers
│   ├── 📂 models/                  # Data models
│   ├── 📂 routes/                  # API routes
│   ├── 📂 middleware/              # Custom middleware
│   └── index.js                    # Server entry point
│
├── 📄 README.md                    # You are here!
├── 📄 LICENSE                      # MIT License
└── 📄 .gitignore                   # Git ignore rules
```

---

## 🎯 Vision & Philosophy

ArcFlow isn't just another habit tracker—it's a **personal transformation system** built on these core principles:

### 🧠 **Psychology-First Design**
- Based on behavioral science and habit formation research
- Focuses on progress visualization to maintain motivation
- Celebrates small wins to build momentum

### 🎨 **Minimalist Approach**
- Clean, distraction-free interface
- Essential features without bloat
- Intuitive user experience

### 🚀 **Growth-Oriented**
- Designed to evolve with your needs
- Extensible architecture for future features
- Community-driven development

---

## 🗺️ Roadmap

### 📅 **Phase 1: Core Foundation** *(Current)*
- [x] Basic habit tracking
- [x] Calendar visualization
- [x] User authentication
- [x] Responsive design
- [ ] Habit categories and tags

### 📅 **Phase 2: Enhanced Experience** *(Q3 2025)*
- [ ] **StudyFlow** - Academic productivity system
- [ ] **BodyFlow** - Fitness and wellness tracking
- [ ] Habit reminders and notifications
- [ ] Data export and backup

### 📅 **Phase 3: Intelligence** *(Q4 2025)*
- [ ] AI-powered habit suggestions
- [ ] Personalized insights and recommendations
- [ ] Advanced analytics and reporting
- [ ] Social features and accountability partners

### 📅 **Phase 4: Gamification** *(2026)*
- [ ] Achievement system and badges
- [ ] XP and leveling mechanics
- [ ] Habit challenges and competitions
- [ ] Community leaderboards

---

## 🤝 Contributing

ArcFlow is primarily solo-developed, but community contributions are welcome! Here's how you can help:

### 🐛 **Bug Reports**
Found a bug? Please [open an issue](https://github.com/arthursensai/ArcFlow/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 **Feature Requests**
Have an idea? [Start a discussion](https://github.com/arthursensai/ArcFlow/discussions) or open an issue with:
- Detailed description of the feature
- Use case and benefits
- Mockups or examples if possible

### 🔧 **Code Contributions**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📋 **Development Guidelines**
- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed

---

## 📱 Browser Support

ArcFlow supports all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## 🔒 Privacy & Security

Your privacy matters. ArcFlow:
- Stores data securely using MongoDB
- Implements JWT-based authentication
- Doesn't track or sell personal information
- Provides data export functionality

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About the Developer

**Mohamed (arthursensai)**  
🇲🇦 17-year-old Moroccan full-stack developer

Passionate about building tools that empower discipline, creativity, and personal growth. Currently focused on creating applications that help people achieve their goals and build better habits.

**Connect with me:**
- GitHub: [@arthursensai](https://github.com/arthursensai)
- Instagram: [@arthur_sensai](https://instagram.com/arthur_sensai)
- Email: [mohamedaytsidibah@gmail.com](mailto:mohamedaytsidibah@gmail.com)

---

## 💬 Support

Need help or have questions?

- 📖 **Documentation**: Check the [Wiki](https://github.com/arthursensai/ArcFlow/wiki)
- 💬 **Discussions**: Join [GitHub Discussions](https://github.com/arthursensai/ArcFlow/discussions)
- 🐛 **Issues**: Report bugs via [GitHub Issues](https://github.com/arthursensai/ArcFlow/issues)

---

<div align="center">

**⭐ Star this repository if ArcFlow helps you build better habits!**

*"Discipline is the bridge between goals and achievement." – Jim Rohn*

Made with ❤️ by [Mohamed](https://github.com/arthursensai)

</div>