// Leaflet.js implementation for Civora students-supported world map
// Replaces custom canvas implementation with official Leaflet library

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('students-map')) {
    // Check if Leaflet is available
    if (typeof L !== 'undefined') {
      initializeLeafletMap();
    } else {
      // Fallback when Leaflet CDN is not available
      displayMapFallback();
    }
  }
});

function initializeLeafletMap() {
  try {
    // Initialize the map with OpenStreetMap tiles
    var map = L.map('students-map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define locations as specified in the problem statement
    var locations = [
      { name: "South Korea", coords: [36.5, 127.8] },
      { name: "France", coords: [46.6, 2.2] },
      { name: "United Kingdom", coords: [55.3, -3.4] },
      { name: "United States", coords: [37.1, -95.7] },
      { name: "Australia", coords: [-25.3, 133.8] },
      { name: "Belgium", coords: [50.8, 4.4] }
    ];

    // Create custom icon with Civora's navy + gold theme
    var customIcon = L.divIcon({
      className: 'civora-marker',
      html: `
        <div class="marker-pin">
          <div class="marker-inner"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });

    // Add markers for each location with tooltips
    locations.forEach(loc => {
      var marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
      marker.bindTooltip(`Student supported → admission secured in ${loc.name}`, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        className: 'civora-tooltip'
      });
      
      // Add click interaction to scroll to corresponding country card
      marker.on('click', function() {
        scrollToCountryCard(loc.name);
      });
    });

    // Add custom styles for markers and tooltips
    addCustomMapStyles();
    
    console.log('Leaflet map initialized successfully');
  } catch (error) {
    console.error('Error initializing Leaflet map:', error);
    displayMapFallback();
  }
}

function displayMapFallback() {
  const mapContainer = document.getElementById('students-map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 2rem;
        background: var(--bg);
        color: var(--text);
        text-align: center;
        border-radius: 8px;
      ">
        <h3 style="color: var(--brand); margin-bottom: 1rem;">🗺️ Interactive Map</h3>
        <p style="color: var(--muted); margin-bottom: 2rem;">
          Interactive world map with Leaflet.js will load here.<br>
          <small>Note: External CDN access may be limited in this environment.</small>
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; width: 100%; max-width: 600px;">
          <div class="map-location-card" onclick="scrollToCountryCard('South Korea')">🇰🇷 South Korea</div>
          <div class="map-location-card" onclick="scrollToCountryCard('France')">🇫🇷 France</div>
          <div class="map-location-card" onclick="scrollToCountryCard('United Kingdom')">🇬🇧 United Kingdom</div>
          <div class="map-location-card" onclick="scrollToCountryCard('United States')">🇺🇸 United States</div>
          <div class="map-location-card" onclick="scrollToCountryCard('Australia')">🇦🇺 Australia</div>
          <div class="map-location-card" onclick="scrollToCountryCard('Belgium')">🇧🇪 Belgium</div>
        </div>
      </div>
    `;
    
    // Add fallback styles
    addFallbackStyles();
  }
}

function scrollToCountryCard(countryName) {
  // Scroll to the corresponding country card
  const countryCards = document.querySelectorAll('.card h3');
  countryCards.forEach(card => {
    if (card.textContent.includes(countryName) || 
        (countryName === 'United States' && card.textContent.includes('United States')) ||
        (countryName === 'United Kingdom' && card.textContent.includes('United Kingdom')) ||
        (countryName === 'South Korea' && card.textContent.includes('South Korea'))) {
      card.closest('.card').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      // Add a brief highlight effect
      const cardElement = card.closest('.card');
      cardElement.style.transform = 'scale(1.02)';
      cardElement.style.transition = 'transform 0.3s ease';
      setTimeout(() => {
        cardElement.style.transform = '';
      }, 1000);
    }
  });
}

function addFallbackStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .map-location-card {
      background: var(--card);
      border: 1px solid var(--border);
      padding: 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .map-location-card:hover {
      background: var(--panel);
      color: var(--brand);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
  `;
  document.head.appendChild(style);
}

function addCustomMapStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Custom marker styles with Civora navy + gold theme */
    .civora-marker {
      background: transparent !important;
      border: none !important;
    }

    .marker-pin {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      border: 3px solid #ffffff;
      border-radius: 50%;
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 16px rgba(251, 191, 36, 0.5);
      animation: gentle-pulse 3s ease-in-out infinite;
      cursor: pointer;
    }

    .marker-pin:hover {
      transform: scale(1.3);
      box-shadow: 0 8px 32px rgba(251, 191, 36, 0.7);
      border-width: 4px;
    }

    .marker-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 8px;
      height: 8px;
      background: #ffffff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    /* Custom tooltip styles */
    .civora-tooltip {
      background: var(--card) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
      border-radius: 8px !important;
      padding: 0.75rem !important;
      font-size: 0.9rem !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
      text-align: center !important;
    }

    .civora-tooltip::before {
      border-top-color: var(--card) !important;
    }

    /* Pulse animation */
    @keyframes gentle-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .marker-pin {
        width: 18px;
        height: 18px;
      }

      .marker-pin:hover {
        transform: scale(1.2);
      }

      .marker-inner {
        width: 6px;
        height: 6px;
      }

      .civora-tooltip {
        font-size: 0.8rem !important;
        padding: 0.5rem !important;
        max-width: 200px !important;
      }
    }

    /* Leaflet control customization for Civora theme */
    .leaflet-control-zoom a {
      background: var(--card) !important;
      color: var(--text) !important;
      border: 1px solid var(--border) !important;
    }

    .leaflet-control-zoom a:hover {
      background: var(--panel) !important;
      color: var(--brand) !important;
    }

    .leaflet-control-attribution {
      background: var(--card) !important;
      color: var(--muted) !important;
      border: 1px solid var(--border) !important;
    }

    .leaflet-control-attribution a {
      color: var(--link) !important;
    }
  `;
  document.head.appendChild(style);
}