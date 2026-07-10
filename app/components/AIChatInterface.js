/**
 * AI Chat Interface Component
 * 
 * This component provides an AI-powered chat assistant for Civora.
 * It is conditionally rendered based on the NEXT_PUBLIC_CIVORA_AI_ENABLED environment variable.
 * 
 * - On Vercel (with NEXT_PUBLIC_CIVORA_AI_ENABLED=true): This component is available
 * - On civora.me (with NEXT_PUBLIC_CIVORA_AI_ENABLED=false): This component is hidden
 * 
 * The AI chat code is preserved in the codebase but conditionally disabled for civora.me deployment.
 * 
 * BACKEND INTEGRATION:
 * - Uses ONLY Gemini and LangSearch APIs (OpenAI permanently removed as of v54)
 * - API endpoint: POST /api/ai-assistant/
 * - Expected payload: { input: string, history: array, file?: object }
 * - Supports both streaming (text/event-stream) and JSON responses
 * - Comprehensive error handling with user-friendly messages
 * 
 * ERROR HANDLING:
 * - 400: Invalid request format or validation errors
 * - 429: Rate limit exceeded (1 request per second)
 * - 500: Configuration errors or unexpected server errors
 * - 502: AI service temporarily unavailable
 * - 504: Request timeout (network or service delays)
 * 
 * OPENAI STATUS: ❌ PERMANENTLY REMOVED
 * - OpenAI API support has been completely removed from the backend
 * - Do not attempt to integrate OpenAI - only Gemini and LangSearch are supported
 * - All chat queries are processed through Gemini with LangSearch for web context
 */

"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Limit file size to 10MB
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert("File too large. Please select a file under 10MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && !file) return;

    const userMessage = input.trim() || (file ? `[File: ${file.name}]` : "");
    
    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // FIX: Changed from FormData to JSON to match API expectations
      // API route expects: { input: string, history: array, file?: object }
      // Previously sent: FormData with "message" field (causing 400 Bad Request)
      // NOTE: OpenAI is NOT used - backend uses ONLY Gemini and LangSearch
      const requestBody = {
        input: input.trim(),
        history: messages.map((msg) => ({
          user: msg.role === "user" ? msg.content : undefined,
          assistant: msg.role === "assistant" ? msg.content : undefined,
        })),
      };

      // If file is present, read it and add to request
      // Note: File parsing is not supported on Vercel serverless, but we send it anyway
      if (file) {
        requestBody.file = {
          name: file.name,
          content: "File parsing not supported on Vercel serverless",
        };
      }

      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        // Enhanced error handling: Show specific error messages from API
        // Different status codes indicate different types of errors:
        // - 400: Invalid request format or validation error
        // - 429: Rate limit exceeded
        // - 500: Configuration or unexpected server error
        // - 502: AI service temporarily unavailable
        // - 504: Request timeout
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `API error (${response.status})`;
        
        // Add context based on status code
        let userFriendlyError = errorMessage;
        if (response.status === 429) {
          userFriendlyError = `${errorMessage} (Rate limit: 1 message per second)`;
        } else if (response.status === 504) {
          userFriendlyError = `${errorMessage} (Timeout)`;
        } else if (response.status === 502) {
          userFriendlyError = `${errorMessage} (Service issue)`;
        }
        
        throw new Error(userFriendlyError);
      }

      // Check if response is streaming (text/event-stream) or JSON
      const contentType = response.headers.get("content-type");
      
      if (contentType?.includes("text/event-stream")) {
        // Handle streaming response from API
        let fullResponse = "";
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        // Add an empty assistant message that we'll update as we stream
        const assistantMessageIndex = messages.length + 1;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "" },
        ]);
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            fullResponse += chunk;
            
            // Update the assistant message in real-time
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[assistantMessageIndex] = {
                role: "assistant",
                content: fullResponse,
              };
              return newMessages;
            });
          }
        } catch (streamError) {
          console.error("Stream reading error:", streamError);
          // If streaming fails, show error but keep partial response
          if (!fullResponse) {
            throw new Error("Failed to read response stream");
          }
        }
      } else {
        // Handle regular JSON response
        const data = await response.json();
        
        if (data.error) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: `Error: ${data.error}` },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply || "No response received." },
          ]);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      
      // Display user-friendly error messages based on error type
      let displayMessage = error.message;
      
      // Add helpful context for common errors
      if (error.message.includes('Rate limit')) {
        displayMessage += '\n\n💡 Tip: Please wait a moment before sending another message.';
      } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
        displayMessage += '\n\n💡 Tip: Try asking a simpler question or check your internet connection.';
      } else if (error.message.includes('temporarily unavailable') || error.message.includes('Service issue')) {
        displayMessage += '\n\n💡 Tip: The AI service may be experiencing high demand. Please try again in a few moments.';
      } else if (error.message.includes('Invalid request format') || error.message.includes('validation')) {
        displayMessage += '\n\n💡 Tip: Make sure your message is not empty and try again.';
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ **Error:** ${displayMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
      removeFile();
    }
  };

  const clearHistory = () => {
    setMessages([]);
    removeFile();
  };

  return (
    <div className="ai-chat-container">
      <div className="chat-header">
        <h1>
          <i className="fas fa-robot icon-left" aria-hidden="true"></i>
          Civora AI Assistant
        </h1>
        <p className="subtext">Ask me anything about scholarships and study abroad opportunities</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-welcome">
            <i className="fas fa-comments" style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1rem" }}></i>
            <h3>Welcome to Civora AI</h3>
            <p>I can help you with:</p>
            <ul>
              <li>Finding scholarships for your profile</li>
              <li>University application timelines</li>
              <li>Study abroad guidance</li>
              <li>Application tips and resources</li>
            </ul>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Start by asking a question below!
            </p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            <div className="message-icon">
              {msg.role === "user" ? (
                <i className="fas fa-user"></i>
              ) : (
                <i className="fas fa-robot"></i>
              )}
            </div>
            <div className="message-content">
              {msg.role === "assistant" ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content}
                </ReactMarkdown>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="chat-message assistant">
            <div className="message-icon">
              <i className="fas fa-robot"></i>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        {file && (
          <div className="file-preview">
            <i className="fas fa-file"></i>
            <span>{file.name}</span>
            <button type="button" onClick={removeFile} className="remove-file">
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pdf"
            style={{ display: "none" }}
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="attach-button"
            title="Attach file"
          >
            <i className="fas fa-paperclip"></i>
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="chat-input"
            disabled={loading}
          />
          
          <button
            type="submit"
            disabled={loading || (!input.trim() && !file)}
            className="send-button"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
        
        {messages.length > 0 && (
          <button onClick={clearHistory} className="clear-history-button">
            <i className="fas fa-trash"></i> Clear History
          </button>
        )}
      </div>

      <style jsx>{`
        .ai-chat-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 200px);
          min-height: 600px;
        }

        .chat-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .chat-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .chat-welcome {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
        }

        .chat-welcome ul {
          text-align: left;
          display: inline-block;
          margin-top: 1rem;
        }

        .chat-message {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }

        .chat-message.user {
          flex-direction: row-reverse;
        }

        .message-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chat-message.user .message-icon {
          background: var(--accent);
          color: white;
        }

        .chat-message.assistant .message-icon {
          background: var(--bg-tertiary);
          color: var(--accent);
        }

        .message-content {
          flex: 1;
          padding: 1rem;
          border-radius: 12px;
          background: var(--bg-primary);
        }

        .chat-message.user .message-content {
          background: var(--accent);
          color: white;
        }

        .typing-indicator {
          display: flex;
          gap: 0.25rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-secondary);
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }

        .chat-input-container {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 12px;
        }

        .file-preview {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background: var(--bg-primary);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .remove-file {
          margin-left: auto;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
        }

        .chat-input-form {
          display: flex;
          gap: 0.5rem;
        }

        .attach-button, .send-button {
          padding: 0.75rem 1rem;
          border: none;
          background: var(--accent);
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .attach-button {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .attach-button:hover, .send-button:hover {
          opacity: 0.8;
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chat-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-size: 1rem;
        }

        .clear-history-button {
          margin-top: 0.5rem;
          padding: 0.5rem 1rem;
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          width: 100%;
        }

        .clear-history-button:hover {
          background: var(--bg-primary);
        }
      `}</style>
    </div>
  );
}
