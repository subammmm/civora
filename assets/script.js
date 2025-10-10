// Viewport Height Scaling Check
(function () {
  // Verify scaling is applied after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('wrapper');
    if (!wrapper) {
      console.error('Wrapper element not found - 75% scaling may not be applied');
    }
  });
})();

// Footer year and last updated date
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const lastUpdated = document.getElementById('last-updated');
if (lastUpdated) {
  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  lastUpdated.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// Animated Counter for Stats using IntersectionObserver
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps

  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Initialize counter animation on scroll
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  if (statNumbers.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
          const target = parseInt(entry.target.getAttribute('data-count'));
          animateCounter(entry.target, target);
        }
      });
    }, observerOptions);

    statNumbers.forEach((stat) => observer.observe(stat));
  }
});

// Interactive World Map functionality
function initializeWorldMap() {
  const mapPins = document.querySelectorAll('.map-pin');
  const mapCountries = document.querySelectorAll('.map-country');

  // Add click interactions to pins
  mapPins.forEach((pin) => {
    pin.addEventListener('click', (e) => {
      const country = pin.getAttribute('data-country');
      // Scroll to the corresponding country card
      const countryCards = document.querySelectorAll('.card h3');
      countryCards.forEach((card) => {
        if (
          card.textContent.includes(country) ||
          (country === 'United States' && card.textContent.includes('United States')) ||
          (country === 'United Kingdom' && card.textContent.includes('United Kingdom')) ||
          (country === 'South Korea' && card.textContent.includes('South Korea'))
        ) {
          card.closest('.card').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          // Add a brief highlight effect
          const cardElement = card.closest('.card');
          cardElement.style.transform = 'scale(1.02)';
          cardElement.style.boxShadow = '0 12px 40px rgba(29, 185, 84, 0.3)';
          setTimeout(() => {
            cardElement.style.transform = '';
            cardElement.style.boxShadow = '';
          }, 2000);
        }
      });
    });

    // Add accessible keyboard navigation
    pin.setAttribute('tabindex', '0');
    pin.setAttribute('role', 'button');
    pin.setAttribute('aria-label', `View information about ${pin.getAttribute('data-country')}`);

    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pin.click();
      }
    });
  });

  // Enhanced hover effects for map countries
  mapCountries.forEach((country) => {
    country.addEventListener('mouseenter', () => {
      if (country.classList.contains('supported')) {
        country.style.fill = 'var(--brand-2)';
        country.style.opacity = '1';
        country.style.filter = 'drop-shadow(0 0 12px rgba(29, 185, 84, 0.6))';

        // Find and highlight corresponding pin
        const countryId = country.id;
        const correspondingPin = findPinByCountryId(countryId);
        if (correspondingPin) {
          correspondingPin.style.transform = 'translate(-50%, -50%) scale(1.3)';
          correspondingPin.style.boxShadow = '0 8px 32px rgba(29, 185, 84, 0.8)';
        }
      }
    });

    country.addEventListener('mouseleave', () => {
      if (country.classList.contains('supported')) {
        country.style.fill = '';
        country.style.opacity = '';
        country.style.filter = '';

        // Reset corresponding pin
        const countryId = country.id;
        const correspondingPin = findPinByCountryId(countryId);
        if (correspondingPin) {
          correspondingPin.style.transform = '';
          correspondingPin.style.boxShadow = '';
        }
      }
    });

    // Add click functionality to countries
    country.addEventListener('click', () => {
      if (country.classList.contains('supported')) {
        const countryId = country.id;
        const correspondingPin = findPinByCountryId(countryId);
        if (correspondingPin) {
          correspondingPin.click();
        }
      }
    });
  });
}

// Helper function to find pin by country ID
function findPinByCountryId(countryId) {
  const countryMapping = {
    'united-states': 'United States',
    'united-kingdom': 'United Kingdom',
    france: 'France',
    belgium: 'Belgium',
    'south-korea': 'South Korea',
    australia: 'Australia',
  };

  const countryName = countryMapping[countryId];
  if (countryName) {
    return document.querySelector(`[data-country="${countryName}"]`);
  }
  return null;
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWorldMap);

// Top navigation toggle for mobile
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.contains('open');

    if (isOpen) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      siteNav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !siteNav.contains(e.target)) {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// i18n strings
// Minimal fallback I18N for critical keys if fetch fails
let I18N = {
  en: {
    'nav.menu': 'Menu',
    'nav.home': 'Home',
    'nav.scholarships': 'Scholarships',
    'nav.citizenship': 'Citizenship',
    'nav.guides': 'Guides',
    'nav.about': 'About',
    'title.index': 'Civora — Opening doors for Nepali students',
  },
  ne: {
    'nav.menu': 'मेनु',
    'nav.home': 'गृहपृष्ठ',
    'nav.scholarships': 'छात्रवृत्ति',
    'nav.citizenship': 'नागरिकता',
    'nav.guides': 'मार्गदर्शिका',
    'nav.about': 'बारेमा',
    'title.index': 'Civora — नेपाली विद्यार्थीहरूका लागि अवसर',
  },
};

// Load full I18N from JSON file
const i18nReady = (async function loadI18N() {
  try {
    const response = await fetch('assets/data/i18n.json');
    if (!response.ok) throw new Error('Failed to load i18n.json');
    I18N = await response.json();
  } catch (error) {
    console.warn('Using fallback i18n translations:', error.message);
  }
})();

const RTL_LANGS = new Set(['ur']);

function t(key, params = {}, lang) {
  const L = lang || localStorage.getItem('lang') || 'en';
  const pack = I18N[L] || I18N.en;
  let s = (pack && pack[key]) || I18N.en[key] || '';
  if (params && typeof s === 'string') {
    Object.keys(params).forEach((k) => {
      s = s.replace(new RegExp(`\\{${k}\}`, 'g'), String(params[k]));
    });
  }
  return s;
}

function applyI18n(lang) {
  const L = lang || localStorage.getItem('lang') || 'en';
  document.documentElement.lang = L;
  document.documentElement.dir = RTL_LANGS.has(L) ? 'rtl' : 'ltr';

  // Update title if it has data-i18n
  const titleEl = document.querySelector('head title[data-i18n]');
  if (titleEl) {
    const key = titleEl.getAttribute('data-i18n');
    if (key) {
      const translation = t(key, {}, L);
      if (translation) document.title = translation;
    }
  }

  // Text nodes - preserve original content if translation is empty
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const translation = t(key, {}, L);
    if (translation) el.textContent = translation;
  });

  // Placeholders - preserve original if translation is empty
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    const translation = t(key, {}, L);
    if (translation) el.setAttribute('placeholder', translation);
  });

  // Re-render page-specific components if needed
  if (typeof window.renderScholarships === 'function') {
    window.renderScholarships();
  }

  // Sync the selector
  const sel = document.getElementById('lang');
  if (sel && sel.value !== L) sel.value = L;
}

// Expose simple translator for inline scripts
window.I18N_T = (key, params) => t(key, params);

// Initialize language control
(async function initLang() {
  // Wait for i18n to load
  await i18nReady;

  const sel = document.getElementById('lang');
  const stored = localStorage.getItem('lang') || 'en';
  if (sel) sel.value = stored;

  if (sel) {
    sel.addEventListener('change', () => {
      const next = sel.value || 'en';
      localStorage.setItem('lang', next);
      applyI18n(next);
    });
  }
  applyI18n(stored);
})();

// Collapsible sections functionality
document.addEventListener('DOMContentLoaded', () => {
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

  collapsibleHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const isExpanded = header.getAttribute('aria-expanded') === 'true';
      const content = header.nextElementSibling;
      const icon = header.querySelector('.collapsible-icon');

      // Toggle this section
      header.setAttribute('aria-expanded', !isExpanded);

      if (isExpanded) {
        content.style.display = 'none';
        icon.textContent = '▼';
      } else {
        content.style.display = 'block';
        icon.textContent = '▲';
      }
    });
  });
});

// Contact form error handling
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');
  const errorMessage = document.getElementById('form-error');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Hide any previous error messages
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }
    });

    // Listen for form submission errors (Formspree will handle most of this)
    // But we can add additional client-side validation if needed
    contactForm.addEventListener(
      'invalid',
      function (e) {
        if (errorMessage) {
          errorMessage.style.display = 'block';
        }
      },
      true,
    );
  }
});

// Load and render scholarship spotlight data
async function loadSpotlightData() {
  try {
    const response = await fetch('/assets/data/spotlight.json');
    if (!response.ok) throw new Error('Failed to load spotlight data');
    const data = await response.json();
    renderSpotlight(data);
  } catch (error) {
    console.warn('Could not load spotlight data:', error);
    // Gracefully degrade - leave existing content or show message
  }
}

function renderSpotlight(scholarships) {
  const grid = document.getElementById('spotlight-grid');
  if (!grid) return;

  const now = new Date();

  // Filter out expired scholarships
  const activeScholarships = scholarships.filter((scholarship) => {
    if (!scholarship.deadline) return true;

    let deadline;
    if (scholarship.deadline.includes('-')) {
      // ISO format (YYYY-MM-DD)
      deadline = new Date(scholarship.deadline);
    } else {
      // Month YYYY format - parse differently
      deadline = new Date(scholarship.deadline);
    }

    return deadline > now;
  });

  if (activeScholarships.length === 0) {
    grid.innerHTML =
      '<p class="spotlight-empty">No active scholarships available at this time. Check back soon!</p>';
    return;
  }

  grid.innerHTML = activeScholarships
    .map((scholarship) => {
      const deadlineText = formatDeadline(scholarship.deadline);

      return `
      <div class="spotlight-card">
        <div class="spotlight-header">
          <h3>${escapeHtml(scholarship.title)}</h3>
          <span class="spotlight-badge">${escapeHtml(scholarship.badge)}</span>
        </div>
        <p class="spotlight-desc">${escapeHtml(scholarship.description)}</p>
        <div class="spotlight-details">
          <span class="spotlight-deadline">⏰ Deadline: ${deadlineText}</span>
          <span class="spotlight-level">${escapeHtml(scholarship.academic_level)}</span>
        </div>
        <div class="spotlight-actions">
          <a href="${escapeHtml(scholarship.cta_url)}" target="_blank" rel="noopener noreferrer" class="button button-secondary">
            ${escapeHtml(scholarship.cta_text)}
          </a>
          ${
            scholarship.source_url
              ? `
            <a href="${escapeHtml(scholarship.source_url)}" target="_blank" rel="noopener noreferrer" class="spotlight-source">
              Official source
            </a>
          `
              : ''
          }
        </div>
      </div>
    `;
    })
    .join('');
}

function formatDeadline(deadline) {
  if (!deadline) return 'See official source';

  try {
    let date;
    if (deadline.includes('-')) {
      // ISO format
      date = new Date(deadline);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } else {
      // Month YYYY format - return as is
      return deadline;
    }
  } catch (error) {
    return deadline; // Return original if parsing fails
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Update last modified dates using document.lastModified
function updateLastModified() {
  const lastUpdatedEl = document.getElementById('last-updated');
  const footerLastUpdatedEl = document.getElementById('footer-last-updated');

  if (lastUpdatedEl || footerLastUpdatedEl) {
    try {
      const lastModified = new Date(document.lastModified);
      const formatted = lastModified.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      if (lastUpdatedEl) lastUpdatedEl.textContent = formatted;
      if (footerLastUpdatedEl) footerLastUpdatedEl.textContent = formatted;
    } catch (error) {
      // Fallback to current date
      const now = new Date();
      const formatted = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });

      if (lastUpdatedEl) lastUpdatedEl.textContent = formatted;
      if (footerLastUpdatedEl) footerLastUpdatedEl.textContent = formatted;
    }
  }
}

function trackScholarshipInteractions() {
  // Track search usage
  const searchInput = document.getElementById('q');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (this.value.length > 2 && typeof gtag !== 'undefined') {
          gtag('event', 'search', {
            search_term: this.value,
            event_category: 'scholarship_search',
          });
        }
      }, 1000);
    });
  }

  // Track filter usage
  const filterSelects = document.querySelectorAll('#country, #level');
  filterSelects.forEach((select) => {
    select.addEventListener('change', function () {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'filter_change', {
          filter_type: this.id,
          filter_value: this.value,
          event_category: 'scholarship_filter',
        });
      }
    });
  });
}

// Intersection Observer for Reveal Animations
function initRevealAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 90); // Stagger by 90ms
      }
    });
  }, observerOptions);

  // Observe all elements with .reveal class
  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });

  // Auto-add reveal class to stat cards and feature cards
  document.querySelectorAll('.stat-card, .feature-card, .timeline-step').forEach((element) => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

// Initialize spotlight and last modified on page load
document.addEventListener('DOMContentLoaded', function () {
  loadSpotlightData();
  updateLastModified();
  initializeAnalytics();
  initRevealAnimations();
});

// Analytics tracking functions
function initializeAnalytics() {
  // Track form submissions
  trackFormSubmissions();
  // Track external link clicks
  trackExternalLinks();
  // Track scholarship searches
  trackScholarshipInteractions();
}

function trackFormSubmissions() {
  // Story submission form
  const storyForm = document.querySelector('.story-form');
  if (storyForm) {
    storyForm.addEventListener('submit', function () {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          form_type: 'success_story',
          event_category: 'engagement',
          event_label: 'Student Story Submission',
        });
      }
    });
  }

  // Contact forms
  const contactForms = document.querySelectorAll('form[action*="formspree.io"]');
  contactForms.forEach((form) => {
    if (!form.classList.contains('story-form')) {
      form.addEventListener('submit', function () {
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            form_type: 'contact',
            event_category: 'engagement',
            event_label: 'Contact Form',
          });
        }
      });
    }
  });
}

// Scholarship Table Filtering System
function initScholarshipFilters() {
  // Only run on scholarships page
  if (!document.getElementById('scholarships-table')) return;

  const filters = {
    country: document.getElementById('country-filter'),
    level: document.getElementById('level-filter'),
    field: document.getElementById('field-filter'),
    deadline: document.getElementById('deadline-filter'),
  };

  const table = document.getElementById('scholarships-table');
  const tbody = document.getElementById('scholarships-tbody');
  const noResults = document.getElementById('no-results-message');
  const resetBtn = document.getElementById('reset-filters-btn');

  // Check if all elements exist
  if (
    !filters.country ||
    !filters.level ||
    !filters.field ||
    !filters.deadline ||
    !tbody ||
    !noResults
  ) {
    console.warn('Scholarship filter elements not found');
    return;
  }

  // Populate filter options dynamically from existing scholarships
  function populateFilters() {
    const items = tbody.querySelectorAll('.scholarship-item');
    const countries = new Set();
    const levels = new Set();
    const fields = new Set();
    const deadlines = new Set();

    items.forEach((item) => {
      const country = item.dataset.country;
      const level = item.dataset.level;
      const field = item.dataset.field;
      const deadline = item.dataset.deadline;

      if (country) countries.add(country);
      if (level) levels.add(level);
      if (field && field !== 'all') fields.add(field);
      if (deadline) deadlines.add(deadline);
    });

    // Populate country filter (skip first option which is "All")
    const sortedCountries = Array.from(countries).sort();
    sortedCountries.forEach((country) => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country.charAt(0).toUpperCase() + country.slice(1);
      // Check if option doesn't already exist
      const exists = Array.from(filters.country.options).some((opt) => opt.value === country);
      if (!exists) {
        filters.country.appendChild(option);
      }
    });
  }

  // Apply all filters
  function applyFilters() {
    const selectedCountry = filters.country.value.toLowerCase();
    const selectedLevel = filters.level.value.toLowerCase();
    const selectedField = filters.field.value.toLowerCase();
    const selectedDeadline = filters.deadline.value.toLowerCase();

    const items = tbody.querySelectorAll('.scholarship-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const country = (item.dataset.country || '').toLowerCase();
      const level = (item.dataset.level || '').toLowerCase();
      const field = (item.dataset.field || '').toLowerCase();
      const deadline = (item.dataset.deadline || '').toLowerCase();

      // AND logic: item must match ALL selected filters
      const countryMatch = !selectedCountry || country === selectedCountry;
      const levelMatch = !selectedLevel || level === selectedLevel;
      const fieldMatch = !selectedField || field === selectedField || field === 'all';
      const deadlineMatch = !selectedDeadline || deadline === selectedDeadline;

      const isVisible = countryMatch && levelMatch && fieldMatch && deadlineMatch;

      if (isVisible) {
        item.classList.remove('hidden');
        item.style.display = '';
        visibleCount++;
      } else {
        item.classList.add('hidden');
        item.style.display = 'none';
      }
    });

    // Show/hide table and no results message
    if (visibleCount === 0) {
      if (table) table.style.display = 'none';
      if (noResults) noResults.classList.remove('hidden');
    } else {
      if (table) table.style.display = '';
      if (noResults) noResults.classList.add('hidden');
    }
  }

  // Reset all filters
  function resetFilters() {
    filters.country.value = '';
    filters.level.value = '';
    filters.field.value = '';
    filters.deadline.value = '';
    applyFilters();
  }

  // Add event listeners to all filters
  Object.values(filters).forEach((filter) => {
    filter.addEventListener('change', applyFilters);
  });

  // Add reset button listener
  if (resetBtn) {
    resetBtn.addEventListener('click', resetFilters);
  }

  // Populate filters on page load
  populateFilters();

  // Initial application (show all)
  applyFilters();
}

// Initialize scholarship filters when DOM is loaded
document.addEventListener('DOMContentLoaded', initScholarshipFilters);

function trackExternalLinks() {
  // Track scholarship link clicks
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Track external scholarship links
    if (href.includes('http') && !href.includes(window.location.hostname)) {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'external_link',
          event_label: href,
          transport_type: 'beacon',
        });
      }
    }
  });
}
