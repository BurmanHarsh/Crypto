import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./styles/chatbot.css";

export default function ChatBot({ open, onClose }) {
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi! Ask me anything about crypto." },
  ]);
  const [input, setInput] = useState("");
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [msgs, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMsgs((prev) => [...prev, { from: "user", text: userText }]);

    try {
      // const res = await axios.post("https://crypto-bxby.onrender.com/chat", {
      //   message: userText,
      // });
      const API_BASE = import.meta.env.VITE_API_BASE_URL;

      const res = await axios.post(`${API_BASE}/chat`, {
        message: userText,
      });

  

      setMsgs((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    } catch (e) {
      setMsgs((prev) => [
        ...prev,
        { from: "bot", text: "Server error. Check backend terminal." },
      ]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="chat-overlay" onClick={onClose}></div>

      {/* Popup */}
      <div className="chat-popup">
        <div className="chat-header">
          <div>
            <p className="chat-title">Crypto Assistant</p>
            <p className="chat-subtitle">Ask about coins, trends, basics</p>
          </div>

          <button className="chat-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="messages" ref={messagesRef}>
          {msgs.map((m, i) => (
            <div key={i} className={m.from}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Ask about crypto..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}
