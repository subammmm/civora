(function () {
  // Removed 75% scaling - using normal 1:1 scale
  const wrapper = document.getElementById('wrapper');
  if (!wrapper) return;

  function adjustWrapperHeight() {
    // Normal height without scaling
    const vh = window.visualViewport?.height || window.innerHeight;
    wrapper.style.minHeight = vh + 'px';
    document.documentElement.style.height = 'auto';
    document.body.style.minHeight = '100%';
    document.body.style.overflowY = 'auto';
    wrapper.getBoundingClientRect();
  }

  window.addEventListener('load', adjustWrapperHeight);
  window.addEventListener('resize', adjustWrapperHeight);
  window.addEventListener('orientationchange', adjustWrapperHeight);
  window.visualViewport?.addEventListener('resize', adjustWrapperHeight);
  window.visualViewport?.addEventListener('scroll', adjustWrapperHeight);
  adjustWrapperHeight();
})();
