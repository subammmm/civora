// Issue #30 FIXED: Form Validation Patterns
// client-side validation utilities

export const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[\d\s()-]{10,}$/,
    url: /^https?:\/\/.+\..+/,
    alphanumeric: /^[a-zA-Z0-9]+$/,
    noSpecialChars: /^[a-zA-Z0-9\s-]+$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
};

export const ERROR_MESSAGES = {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_URL: 'Please enter a valid URL',
    INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, and number',
    NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
    NOT_FOUND: 'The requested resource was not found.',
    UNAUTHORIZED: 'Please log in to access this content.',
    SERVER_ERROR: 'Something went wrong. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
};

export function validateField(value, type, required = true) {
    // Check required
    if (required && (!value || value.trim() === '')) {
        return { valid: false, error: ERROR_MESSAGES.REQUIRED };
    }

    if (!value && !required) {
        return { valid: true, error: '' };
    }

    // Check pattern
    const pattern = VALIDATION_PATTERNS[type];
    if (!pattern) {
        return { valid: true, error: '' };
    }

    const valid = pattern.test(value);
    const errorKey = `INVALID_${type.toUpperCase()}`;

    return {
        valid,
        error: valid ? '' : (ERROR_MESSAGES[errorKey] || `Invalid ${type} format`)
    };
}

export function validateForm(fields) {
    const errors = {};
    let isValid = true;

    Object.entries(fields).forEach(([name, config]) => {
        const { value, type, required } = config;
        const result = validateField(value, type, required);

        if (!result.valid) {
            errors[name] = result.error;
            isValid = false;
        }
    });

    return { isValid, errors };
}

// Usage example:
/*
import { validateForm, ERROR_MESSAGES } from './lib/validation';

function ContactForm() {
  const [formData, setFormData] = useState({ email: '', name: '', message: '' });
  const [errors, setErrors] = useState({});
  
  function handleSubmit(e) {
    e.preventDefault();
    
    const validation = validateForm({
      email: { value: formData.email, type: 'email', required: true },
      name: { value: formData.name, type: 'noSpecialChars', required: true },
      message: { value: formData.message, required: true }
    });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // Submit form
  }
}
*/
