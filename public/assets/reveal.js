/**
 * Reveal.js - Progressive reveal animations on scroll
 * Uses IntersectionObserver for performance and accessibility
 * Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    // Make all reveal elements immediately visible
    document.addEventListener('DOMContentLoaded', function() {
      const revealElements = document.querySelectorAll('.reveal');
      revealElements.forEach(function(el) {
        el.setAttribute('data-visible', 'true');
        el.classList.add('is-visible');
      });
    });
    return;
  }

  /**
   * Initialize reveal animations
   */
  function initReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) {
      return;
    }

    // IntersectionObserver options
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px 0px -50px 0px', // trigger slightly before element enters viewport
      threshold: 0.1 // trigger when 10% of element is visible
    };

    // Create observer
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Element is visible, reveal it
          entry.target.setAttribute('data-visible', 'true');
          entry.target.classList.add('is-visible');
          
          // Optionally unobserve after reveal (one-time animation)
          // Comment out the next line if you want elements to hide when scrolling back up
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(function(el) {
      // Set initial state
      el.setAttribute('data-visible', 'false');
      el.classList.remove('is-visible');
      
      // Start observing
      observer.observe(el);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    // DOM is already loaded
    initReveal();
  }

  // Re-initialize if new content is added dynamically
  window.initReveal = initReveal;

})();
