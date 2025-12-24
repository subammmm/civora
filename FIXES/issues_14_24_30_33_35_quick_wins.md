# Issue #14, #24, #30, #33-35: Quick Wins Batch

## Issue #14: Toast Implementation Decision
**Current Status:** Unused CSS for toast notifications in `interaction-polish.css`

**Options:**
1. **Implement Toast:** Use existing CSS + add JavaScript
```javascript
// Simple toast implementation
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  
  document.body.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Usage
showToast('Scholarship saved!', 'success');
showToast('Error loading data', 'error');
```

2. **Remove Unused CSS:**  Delete toast styles from interaction-polish.css if not using

**Recommendation:** Implement - toasts are valuable for user feedback

---

## Issue #24: Internationalization (i18n)
**Extract hardcoded strings to `i18n.json`**

```javascript
// Current (hardcoded):
<h1>Welcome to Civora</h1>
<p>Discover scholarship opportunities</p>

// After (i18n):
import { useTranslation } from './hooks/useTranslation';

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('home.welcome')}</h1>
      <p>{t('home.discover')}</p>
    </>
  );
}
```

Update `assets/data/i18n.json`:
```json
{
  "en": {
    "home": {
      "welcome": "Welcome to Civora",
      "discover": "Discover scholarship opportunities"
    }
  },
  "ne": {
    "home": {
      "welcome": "सिभोरामा स्वागत छ",
      "discover": "छात्रवृत्ति अवसरहरू पत्ता लगाउनुहोस्"
    }
  }
}
```

---

## Issue #30: Form Validation with Regex
**Add validation patterns:**

```javascript
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s()-]{10,}$/,
  url: /^https?:\/\/.+\..+/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  noSpecialChars: /^[a-zA-Z0-9\s-]+$/,
};

function validateField(value, type) {
  const pattern = VALIDATION_PATTERNS[type];
  if (!pattern) return { valid: true };
  
  const valid = pattern.test(value);
  return {
    valid,
    error: valid ? '' : `Invalid ${type} format`
  };
}

// Usage in forms:
const emailValidation = validateField(email, 'email');
if (!emailValidation.valid) {
  setError(emailValidation.error);
}
```

---

## Issue #33: Replace Font Awesome with SVG Subset
**Step 1:** Audit icon usage
```bash
grep -roh "fa-[a-z-]*" app/ | sort | uniq > used-icons.txt
```

**Step 2:** Create icon components
```javascript
// components/icons/UserIcon.js
export function UserIcon({ className, ...props }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...props}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  );
}
```

**Step 3:** Replace usage
```javascript
// Before:
<i className="fas fa-user"></i>

// After:
import { UserIcon } from './components/icons';
<UserIcon className="icon" aria-hidden="true" />
```

**Expected Savings:** ~850KB (Font Awesome CDN eliminated)

---

## Issue #34: Code Split AI Chat
**Lazy load heavy component:**

```javascript
import dynamic from 'next/dynamic';

const AIChatInterface = dynamic(
  () => import('./components/AIChatInterface'),
  {
    loading: () => <div className="skeleton-chat">Loading chat...</div>,
    ssr: false // Don't render on server
  }
);

export default function Page() {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowChat(true)}>
        Open AI Assistant
      </button>
      {showChat && <AIChatInterface />}
    </>
  );
}
```

**Expected Impact:** ~200KB saved from initial bundle

---

## Issue #35: Debounce Filter Inputs
**Prevent excessive API calls:**

```javascript
import { useState, useCallback } from 'react';
import { debounce } from 'lodash'; // or implement custom

function ScholarshipFilter() {
  const [filters, setFilters] = useState({});
  
  // Debounced API call
  const debouncedSearch = useCallback(
    debounce((searchFilters) => {
      fetch('/api/scholarships', {
        method: 'POST',
        body: JSON.stringify(searchFilters)
      });
    }, 300),
    []
  );
  
  function handleFilterChange(key, value) {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    debouncedSearch(newFilters);
  }
  
  return (
    <input 
      type="text"
      onChange={(e) => handleFilterChange('search', e.target.value)}
      placeholder="Search scholarships..."
    />
  );
}
```

**Impact:** Reduces API calls by ~70% during typing

---

## Implementation Priority
1. **#30** - Validation (5 min)
2. **#14** - Toast (10 min)
3. **#35** - Debounce (10 min)
4. **#34** - Code split (15 min)
5. **#24** - i18n (30 min)
6. **#33** - Font Awesome (60 min)
