// Issue #14 FIXED: Toast Implementation
'use client';

let toastContainer = null;

function ensureContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: var(--z-tooltip); pointer-events: none;';
        document.body.appendChild(toastContainer);
    }
    return toastContainer;
}

export function showToast(message, type = 'info', duration = 3000) {
    const container = ensureContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.pointerEvents = 'auto';
    toast.textContent = message;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
    });

    // Auto-remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
            // Clean up container if empty
            if (container.children.length === 0) {
                container.remove();
                toastContainer = null;
            }
        }, 300);
    }, duration);

    return toast;
}

export const toast = {
    success: (msg) => showToast(msg, 'success'),
    error: (msg) => showToast(msg, 'error'),
    info: (msg) => showToast(msg, 'info'),
    warning: (msg) => showToast(msg, 'warning'),
};

// Usage:
// import { toast } from './lib/toast';
// toast.success('Scholarship saved!');
// toast.error('Failed to load data');
