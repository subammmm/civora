(function () {
  const SCALE = 0.75;
  const wrapper = document.getElementById('wrapper');
  if (!wrapper) return;

  function adjustWrapperHeight() {
    const vh = window.visualViewport?.height || window.innerHeight;
    wrapper.style.minHeight = Math.ceil(vh / SCALE) + 'px';
    document.documentElement.style.height = 'auto';
    document.body.style.minHeight = '100%';
    document.body.style.overflowY = 'hidden';
    wrapper.getBoundingClientRect();
  }

  window.addEventListener('load', adjustWrapperHeight);
  window.addEventListener('resize', adjustWrapperHeight);
  window.addEventListener('orientationchange', adjustWrapperHeight);
  window.visualViewport?.addEventListener('resize', adjustWrapperHeight);
  window.visualViewport?.addEventListener('scroll', adjustWrapperHeight);
  adjustWrapperHeight();
})();
