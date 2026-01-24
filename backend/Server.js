
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://crypto-zeta-seven.vercel.app"
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  console.log("CHAT HIT:", req.body);

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("GEMINI ERROR:", err.message || err);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

app.get("/health", (req, res) => res.send("OK"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on", PORT));



