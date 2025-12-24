// Issue #5, #7, #8: Aria Labels + Loading States Implementation
// Apply these patterns across all components

// ARIA LABELS FOR ICON-ONLY BUTTONS (Issue #5)
// ----------------------------------------------
// Before:
// <button onClick={handleClose}><i className="fas fa-times"></i></button>

// After:
<button onClick={handleClose} aria-label="Close dialog">
  <i className="fas fa-times" aria-hidden="true"></i>
</button>

// All social media links:
<a href="https://facebook.com" aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer">
  <i className="fab fa-facebook" aria-hidden="true"></i>
</a>

// Navigation icons:
<button className="menu-toggle" aria-label="Open navigation menu" aria-expanded="false">
  <i className="fas fa-bars" aria-hidden="true"></i>
</button>

// LOADING STATES (Issue #7)
// --------------------------
'use client';
import { useState } from 'react';

function DataComponent() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchData() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/data');
            if (!response.ok) throw new Error('Failed to fetch');
            setData(await response.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            {loading && (
                <div className="loading-state" role="status" aria-live="polite">
                    <div className="spinner"></div>
                    <span>Loading...</span>
                </div>
            )}

            {error && (
                <div className="error-message" role="alert">
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    {error}
                </div>
            )}

            {data && <div>{/* render data */}</div>}
        </div>
    );
}

// CONSISTENT ERROR MESSAGES (Issue #8)
// -------------------------------------
const ERROR_MESSAGES = {
    NETWORK_ERROR: "Unable to connect. Please check your internet connection.",
    NOT_FOUND: "The requested resource was not found.",
    UNAUTHORIZED: "Please log in to access this content.",
    SERVER_ERROR: "Something went wrong. Please try again later.",
    VALIDATION_ERROR: "Please check your input and try again.",
};

function showError(type, customMessage) {
    const message = customMessage || ERROR_MESSAGES[type] || ERROR_MESSAGES.SERVER_ERROR;
    // Display using toast or inline error
    return <div className="error-banner" role="alert">{message}</div>;
}

// Add to globals.css:
/*
.loading-state {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message, .error-banner {
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid var(--error);
  color: var(--error);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-card);
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
*/
