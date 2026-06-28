# CryptoTrack ₿

A premium, real-time cryptocurrency market dashboard providing live pricing analysis, global market sentiment indexes, and an interactive AI crypto assistant. 

<img width="1913" height="867" alt="image" src="https://github.com/user-attachments/assets/ccbf1a7c-25b5-43aa-8e47-f0ebafb93041" />


---

## ✨ Features

*   **Live Market Data**: Displays prices, 24h percentage swings, total volume, and market capitalization for the top 50 cryptocurrencies. Powered directly by the **CoinGecko API**.
*   **Global Market Sentiment**: Calculates and renders real-time market sentiment indicators (*Strongly Bullish*, *Bullish*, *Neutral*, *Bearish*) dynamically using 24h price action statistics.
*   **Smart Query Caching**: Features a unified query sync layer powered by **TanStack React Query**, preventing redundant network requests and enabling background auto-polling every 60 seconds.
*   **AI Assistant (Chatbot)**: An interactive sidebar assistant powered by **Google Gemini AI** (`gemini-2.5-flash`) capable of explaining coins, trends, and crypto basics.
*   **News Portal & Analysis**: Keeps you updated with recent blockchain events and featured analyses (e.g. Spot Bitcoin ETFs impact review).
*   **Premium Visual Aesthetics**: Responsive Glassmorphism design optimized for mobile, tablet, and desktop viewports, styled with **Tailwind CSS** and **Shadcn UI** primitives.

---

## 🛠️ Technology Stack

### Frontend Client
*   **Core**: React (Vite SPA bundler)
*   **Routing**: React Router DOM (v6)
*   **State Management**: TanStack React Query (v5) + Local State hooks
*   **Styling**: Tailwind CSS + Shadcn UI (Radix UI)
*   **Icons & Notifications**: Lucide React + Sonner

### Proxy Backend Server
*   **Core**: Node.js + Express
*   **AI SDK**: `@google/generative-ai` (Gemini API)
*   **Cross-Origin Security**: CORS middleware integration

---

## 📂 Repository Directory Map

```text
Crypto/
├── backend/                # Express proxy server
│   ├── Server.js           # Server routes & Gemini integration
│   ├── package.json        # Backend dependencies
│   └── .env                # Gemini API Key configuration
├── src/                    # React frontend application
│   ├── components/         # Reusable UI widgets & Shadcn primitives
│   │   ├── ChatBot.jsx     # AI Assistant interface
│   │   └── Navbar.jsx      # Header navigation bar
│   ├── hooks/              # Custom React hooks (useCoins, use-toast)
│   ├── pages/              # Routed pages (Home, Prices, News, ETF Blog)
│   ├── App.jsx             # Routes declaration & providers layout
│   └── index.css           # Custom glassmorphism and animation layers
├── tailwind.config.js      # Custom theme & animation keyframes
├── components.json         # Shadcn config mappings
└── package.json            # Frontend script tasks & dependencies
```

---

## 🚀 Getting Started

To run the application locally, you will need to start both the frontend client and the backend server.

### Prerequisites
*   Node.js (v18.x or higher)
*   npm or yarn

### 1. Setup Backend Server
1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file inside the `backend` directory:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key_here
    ```
4.  Start the Express server:
    ```bash
    node Server.js
    ```
    The server will run on `http://localhost:5000`.

### 2. Setup Frontend Client
1.  Return to the root directory:
    ```bash
    cd ..
    ```
2.  Install client-side dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory:
    ```env
    VITE_API_BASE_URL=http://localhost:5000
    ```
4.  Start the Vite dev server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

---

## ⚙️ Build and Testing Command Reference

*   **Run Development Server**: `npm run dev`
*   **Compile Production Build**: `npm run build`
*   **Run Linter**: `npm run lint`
*   **Run Test Runner**: `npm run test`
