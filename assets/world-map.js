// Interactive World Map with tooltips for Students Supported page
class InteractiveWorldMap {
  constructor(container) {
    this.container = container;
    this.supportedCountries = [
      { id: 'united-states', name: 'United States', pin: { x: 25, y: 36 } },
      { id: 'united-kingdom', name: 'United Kingdom', pin: { x: 43, y: 26 } },
      { id: 'france', name: 'France', pin: { x: 46, y: 34 } },
      { id: 'belgium', name: 'Belgium', pin: { x: 46, y: 30 } },
      { id: 'south-korea', name: 'South Korea', pin: { x: 85, y: 43 } },
      { id: 'australia', name: 'Australia', pin: { x: 87, y: 76 } }
    ];
    this.init();
  }

  init() {
    this.createTooltip();
    this.addInteractivity();
    this.enhancePinStyling();
  }

  createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 0.75rem;
      font-size: 0.9rem;
      color: var(--text);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      max-width: 250px;
    `;
    document.body.appendChild(tooltip);
    this.tooltip = tooltip;
  }

  enhancePinStyling() {
    const style = document.createElement('style');
    style.textContent = `
      .map-pin {
        position: absolute;
        width: 12px;
        height: 12px;
        background: var(--brand);
        border: 2px solid var(--bg);
        border-radius: 50%;
        cursor: pointer;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
        z-index: 10;
      }
      
      .map-pin:hover {
        background: var(--brand-2);
        transform: translate(-50%, -50%) scale(1.2);
        box-shadow: 0 4px 16px rgba(251, 191, 36, 0.6);
      }
      
      .map-pin::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 24px;
        height: 24px;
        border: 2px solid var(--brand);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      
      @keyframes ping {
        75%, 100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }
      
      .map-country.supported {
        fill: var(--brand);
        opacity: 0.3;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .map-country.supported:hover {
        opacity: 0.5;
        filter: brightness(1.1);
      }
      
      .world-map-svg {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        background: var(--panel);
      }
      
      .interactive-world-map {
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  addInteractivity() {
    this.supportedCountries.forEach(country => {
      const pin = this.container.querySelector(`[data-country="${country.name}"]`);
      const svgCountry = this.container.querySelector(`#${country.id}`);
      
      if (pin) {
        this.addPinListeners(pin, country);
      }
      
      if (svgCountry) {
        this.addCountryListeners(svgCountry, country);
      }
    });
  }

  addPinListeners(pin, country) {
    pin.addEventListener('mouseenter', (e) => {
      this.showTooltip(e, country);
    });

    pin.addEventListener('mouseleave', () => {
      this.hideTooltip();
    });

    pin.addEventListener('mousemove', (e) => {
      this.updateTooltipPosition(e);
    });
  }

  addCountryListeners(svgCountry, country) {
    svgCountry.addEventListener('mouseenter', (e) => {
      this.showTooltip(e, country);
      svgCountry.style.opacity = '0.5';
    });

    svgCountry.addEventListener('mouseleave', () => {
      this.hideTooltip();
      svgCountry.style.opacity = '0.3';
    });

    svgCountry.addEventListener('mousemove', (e) => {
      this.updateTooltipPosition(e);
    });
  }

  showTooltip(event, country) {
    this.tooltip.innerHTML = `
      <div style="text-align: center;">
        <strong>🎓 ${country.name}</strong><br>
        <em>Student supported → admission secured in ${country.name}</em>
      </div>
    `;
    this.tooltip.style.opacity = '1';
    this.tooltip.style.transform = 'translateY(0)';
    this.updateTooltipPosition(event);
  }

  hideTooltip() {
    this.tooltip.style.opacity = '0';
    this.tooltip.style.transform = 'translateY(10px)';
  }

  updateTooltipPosition(event) {
    const rect = this.tooltip.getBoundingClientRect();
    let x = event.pageX + 10;
    let y = event.pageY - rect.height - 10;

    // Adjust if tooltip would go off screen
    if (x + rect.width > window.innerWidth - 20) {
      x = event.pageX - rect.width - 10;
    }
    if (y < 20) {
      y = event.pageY + 10;
    }

    this.tooltip.style.left = x + 'px';
    this.tooltip.style.top = y + 'px';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.querySelector('.interactive-world-map');
  if (mapContainer) {
    new InteractiveWorldMap(mapContainer);
  }
});