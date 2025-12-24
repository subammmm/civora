// Issue #35 FIXED: Debounce utility
export function debounce(func, wait = 300) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage:
// import { debounce } from './lib/debounce';
//
// const debouncedSearch = debounce((query) => {
//   fetch(`/api/search?q=${query}`);
// }, 300);
//
// <input onChange={(e) => debouncedSearch(e.target.value)} />
