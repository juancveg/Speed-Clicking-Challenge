# ⚡ Speed Clicking Challenge

A fast-paced browser game built with **React**, **Vite**, and **Tailwind CSS**. Click as fast as you can in 5 seconds and try to beat your high score!

![Speed Clicking Challenge](public/icon-page.svg)

## 🎮 How to Play

1. Press **Start Game** to begin the countdown.
2. Click the **CLICK ME!** button as many times as you can in 5 seconds.
3. When time runs out, see your total clicks, clicks-per-second speed, and whether you beat your **High Score**.
4. Press **Play Again** to go for a new record.

## ✨ Features

- 5-second countdown timer
- Live click counter
- Clicks-per-second calculation at the end of each round
- Session high score tracking
- Smooth animations and gradient UI

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| [React](https://react.dev/) | ^19 |
| [Vite](https://vitejs.dev/) | ^6 |
| [Tailwind CSS](https://tailwindcss.com/) | ^4 |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/Speed-Clicking-Challenge.git
cd Speed-Clicking-Challenge

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
Speed-Clicking-Challenge/
├── public/
│   └── icon-page.svg       # Favicon
├── src/
│   ├── assets/
│   │   └── click-icon.svg  # Main click icon
│   ├── App.jsx             # Main game component
│   ├── App.css             # Component styles
│   ├── index.css           # Global styles
│   └── main.jsx            # React entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
