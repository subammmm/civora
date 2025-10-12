"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./globals.css";

function CivoraAIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("civoraHistory");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState(""); // For streaming
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("civoraHistory", JSON.stringify(messages));
    }
  }, [messages]);

  function handleInputKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage({ preventDefault: () => {}, target: { file: fileInputRef.current } });
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (loading) return;
    const fileInput = fileInputRef.current;
    let fileUploadObject = null;
    let newMessages = [...messages];
    const userText = input.trim();

    // File upload logic: only images, pdf, max 2MB
    if (fileInput && fileInput.files.length) {
      const file = fileInput.files[0];
      if (!file.type.match(/(image|pdf)/)) {
        alert("Only images or PDF files are supported.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large (max 2MB).");
        return;
      }
      // Convert to base64 for backend OCR/PDF
      const base64 = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = ev => resolve(ev.target.result.split(',')[1] || "");
        reader.readAsDataURL(file);
      });
      fileUploadObject = {
        name: file.name,
        content: base64,
      };
      newMessages.push({ role: "user", content: `Uploaded file: ${file.name}` });
      fileInput.value = "";
    } else if (input.trim()) {
      newMessages.push({ role: "user", content: input });
    } else {
      return;
    }

    setMessages(newMessages);
    setLoading(true);
    setStreamBuffer("");

    // Prepare last 5 turns as transcript context
    const historyPayload = newMessages.slice(-5).map(m => ({
      user: m.role === "user" ? m.content : undefined,
      assistant: m.role === "assistant" ? m.content : undefined
    }));

    try {
      // Use SSE streaming if no file, else fallback to JSON POST
      if (!fileUploadObject) {
        // Streaming for text-only
        const eventSource = new EventSourcePolyfill("/api/ai-assistant/", {
          headers: { "Content-Type": "application/json" },
          payload: JSON.stringify({ input, history: historyPayload }),
        });
        let streamed = "";
        eventSource.onmessage = (event) => {
          streamed += event.data;
          setStreamBuffer(streamed);
        };
        eventSource.onerror = () => {
          eventSource.close();
          setLoading(false);
          setMessages(prev => [...prev, { role: "assistant", content: streamed || "⚠️ Sorry, streaming failed." }]);
          setStreamBuffer("");
        };
        eventSource.addEventListener("end", () => {
          setMessages(prev => [...prev, { role: "assistant", content: streamed }]);
          setLoading(false);
          setStreamBuffer("");
        });
      } else {
        // Fallback for file uploads (no SSE)
        const res = await fetch("/api/ai-assistant/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input, history: historyPayload, file: fileUploadObject }),
        });
        const data = await res.json();
        let reply = data.reply || "";
        if (data.error) {
          newMessages.push({ role: "assistant", content: `⚠️ ${data.error}` });
        } else {
          newMessages.push({ role: "assistant", content: reply });
        }
        setMessages(newMessages);
        setLoading(false);
        setStreamBuffer("");
        setInput("");
        return;
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Sorry, something went wrong. Please try again." }]);
      setLoading(false);
      setStreamBuffer("");
    }
    setInput("");
  }

  function handleClearHistory() {
    setMessages([]);
    if (typeof window !== "undefined") window.localStorage.removeItem("civoraHistory");
  }

  return (
    <div className="ai-chat-main">
      <div className="ai-chat-header"></div>
      <div className="ai-chat-area">
        {messages.length === 0 && (
          <div className="ai-welcome">
            <span>Welcome! Ask anything about scholarships, citizenship, global student life, or exams.</span>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`ai-chat-bubble ${m.role}`}>
            <div className="ai-bubble-content">
              {m.content.startsWith("<img") ? (
                <span dangerouslySetInnerHTML={{ __html: m.content }} />
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  allowedElements={[
                    "h2", "h3", "strong", "em", "ul", "ol", "li", "a", "code", "pre", "blockquote", "br", "p"
                  ]}
                  components={{
                    h2: props => <div style={{margin:"22px 0 6px 0",borderBottom:"1px solid #333",fontWeight:"700",fontSize:"1.09rem",color:"#5e6ad2"}}>{props.children}</div>,
                    h3: props => <div style={{marginTop:"16px",fontWeight:"600",fontSize:"1.02rem",color:"#7c83e4"}}>{props.children}</div>,
                    li: props => <li style={{marginBottom:"8px"}}>{props.children}</li>,
                    p: props => <p style={{margin:"7px 0"}}>{props.children}</p>
                  }}
                >{m.content}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {/* Streaming buffer UI */}
        {loading && streamBuffer && (
          <div className="ai-chat-bubble assistant">
            <div className="ai-bubble-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamBuffer}</ReactMarkdown>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>
      <form onSubmit={sendMessage} className="ai-chat-input-row">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question…"
          className="ai-chat-input"
          disabled={loading}
          aria-label="Type your question"
          rows={1}
          onKeyDown={handleInputKeyDown}
        />
        <input
          type="file"
          name="file"
          accept="image/*,application/pdf"
          ref={fileInputRef}
          className="ai-file-input"
          disabled={loading}
          aria-label="Upload image or PDF"
        />
        <button
          type="submit"
          className="btn"
          disabled={loading}
          aria-label="Send message"
        >
          {loading ? "..." : "Send"}
        </button>
        <button type="button" className="btn" onClick={handleClearHistory}>
          Clear
        </button>
      </form>
      <style>{`
        .ai-chat-main {
          background: #0d0d0d;
          color: #f5f5f5;
          border-radius: 12px;
          padding: 20px;
          max-width: 800px;
          margin: auto;
          font-family: 'Inter', sans-serif;
        }
        .ai-chat-header {
          border-bottom: 1px solid #222;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .ai-chat-bubble.user {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 10px 14px;
          margin: 8px 0;
          align-self: flex-end;
        }
        .ai-chat-bubble.assistant {
          background: #111;
          border-radius: 12px;
          padding: 10px 14px;
          margin: 8px 0;
          align-self: flex-start;
        }
        .ai-chat-area {
          min-height: 380px;
          margin-bottom: 20px;
        }
        .ai-chat-input-row {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }
        .ai-chat-input {
          flex: 1;
          border-radius: 8px;
          border: 1px solid #333;
          background: #1a1a1a;
          color: #f5f5f5;
          padding: 10px;
        }
        .ai-file-input {
          background: #23232d;
          color: #aaa;
          border-radius: 8px;
          border: none;
          font-size: 0.9rem;
          padding: 6px 0;
          width: 110px;
        }
        .btn {
          background: #333;
          color: #f5f5f5;
          border-radius: 8px;
          padding: 8px 14px;
          border: none;
          cursor: pointer;
        }
        .btn:hover {
          background: #444;
        }
        .ai-bubble-content {
          word-break: break-word;
        }
        .ai-welcome {
          font-size: 1.1rem;
          color: #aaa;
          text-align: center;
          margin-bottom: 32px;
        }
        @media (max-width: 540px) {
          .ai-chat-main {
            max-width: 100vw;
            border-radius: 0;
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
}

// Polyfill for EventSource with POST support (for SSE streaming, if needed)
class EventSourcePolyfill {
  constructor(url, { headers, payload }) {
    this.events = {};
    this.closed = false;
    fetch(url, {
      method: "POST",
      headers,
      body: payload,
    }).then(res => {
      if (!res.body) return;
      const reader = res.body.getReader();
      let buffer = "";
      const decoder = new TextDecoder();
      const pump = async () => {
        while (!this.closed) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value);
          const events = buffer.split("\n\n");
          buffer = events.pop();
          for (let event of events) {
            if (event.startsWith("data:")) {
              const data = event.slice(5).trim();
              if (this.events["message"]) this.events["message"]({ data });
            }
            if (event.startsWith("event: end")) {
              if (this.events["end"]) this.events["end"]();
              this.close();
            }
          }
        }
      };
      pump();
    });
  }
  onmessage = fn => { this.events["message"] = fn; };
  addEventListener(type, fn) { this.events[type] = fn; }
  close() { this.closed = true; }
}

export default function Home() {
  return <CivoraAIChat />;
}