// Issue #27 Fix: Add timeout to AI chat fetch
// Replace in app/components/AIChatInterface.js

async handleSubmit(e) {
    e.preventDefault();
    // ... existing code ...

    try {
        // Issue #27 FIXED: 30 second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        const response = await fetch("/api/ai-assistant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // ... rest of handler
    } catch (error) {
        if (error.name === 'AbortError') {
            toast.error("Request timed out. Please try again.");
        } else {
            toast.error(error.message || "An error occurred");
        }
    }
}
