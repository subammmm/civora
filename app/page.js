"use client";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./globals.css";

function CivoraAIChat() {
  // ... [rest of your code unchanged above] ...

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
        const eventSource = new EventSourcePolyfill("/api/ai-assistant", {  // <-- FIXED
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
        const res = await fetch("/api/ai-assistant", {  // <-- FIXED
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

  // ... [rest of your code unchanged below] ...
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