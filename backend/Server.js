require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// app.options("*", cors());
app.use(express.json());
app.get("/ping", (req, res) => {
  res.json({ ok: true });
});


app.post("/chat", async (req, res) => {
  console.log("CHAT HIT:", req.body);

  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/responses",
      {
        model: "gpt-4.1-mini",
        input: message
      },
      {
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({ reply: response.data.output_text });
  } catch (err) {
    console.error("OPENAI ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "API failed" });
  }
});

app.listen(5000, () => console.log("Backend running on 5000"));
