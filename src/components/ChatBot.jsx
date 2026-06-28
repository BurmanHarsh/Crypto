import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./styles/chatbot.css";

export default function ChatBot({ open, onClose }) {
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi! Ask me anything about crypto." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [msgs, open, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMsgs((prev) => [...prev, { from: "user", text: userText }]);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      console.log("API_BASE:", API_BASE);

      const res = await axios.post(`${API_BASE}/chat`, {
        message: userText,
      });

      setMsgs((prev) => [...prev, { from: "bot", text: res.data.reply }]);
    } catch (e) {
      console.error(e);
      // Double check failover to local fallback if production URL failed
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
      if (API_BASE !== "http://localhost:5000") {
        try {
          const res = await axios.post("http://localhost:5000/chat", {
            message: userText,
          });
          setMsgs((prev) => [...prev, { from: "bot", text: res.data.reply }]);
          setLoading(false);
          return;
        } catch (localErr) {
          console.error(localErr);
        }
      }
      setMsgs((prev) => [
        ...prev,
        { from: "bot", text: "Assistant connection offline. Please ensure the local backend server is running on port 5000." },
      ]);
    } finally {
      setLoading(false);
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
          {loading && (
            <div className="bot typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Ask about crypto..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
}
