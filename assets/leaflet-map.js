// Simple Leaflet-style map implementation for Students Supported page
// Uses OpenStreetMap-style tile pattern but with simple static background

class LeafletStyleMap {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.markers = [];
    this.init();
  }

  init() {
    if (!this.container) return;
    
    // Create map container with OpenStreetMap-style appearance
    this.container.style.cssText = `
      height: 600px;
      width: 100%;
      background: #aad3df;
      background-image: 
        radial-gradient(circle at 20% 50%, #8db8c7 0%, transparent 50%),
        radial-gradient(circle at 80% 50%, #8db8c7 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, #9ac2d0 0%, transparent 50%),
        radial-gradient(circle at 60% 80%, #9ac2d0 0%, transparent 50%);
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      cursor: grab;
    `;

    // Add land masses (simplified world map)
    this.createLandMasses();
    
    // Add zoom controls
    this.createControls();
    
    // Add attribution
    this.createAttribution();
  }

  createLandMasses() {
    const landMasses = document.createElement('div');
    landMasses.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    `;

    // Create simplified continent shapes
    const continents = [
      // North America
      { left: '15%', top: '25%', width: '25%', height: '30%', borderRadius: '40% 60% 30% 50%' },
      // South America  
      { left: '22%', top: '45%', width: '12%', height: '25%', borderRadius: '30% 20% 50% 40%' },
      // Europe
      { left: '45%', top: '20%', width: '10%', height: '15%', borderRadius: '50% 40% 60% 30%' },
      // Africa
      { left: '48%', top: '30%', width: '12%', height: '25%', borderRadius: '40% 30% 20% 60%' },
      // Asia
      { left: '55%', top: '15%', width: '30%', height: '35%', borderRadius: '30% 50% 40% 20%' },
      // Australia
      { left: '75%', top: '55%', width: '15%', height: '12%', borderRadius: '50% 60% 40% 30%' }
    ];

    continents.forEach(continent => {
      const land = document.createElement('div');
      land.style.cssText = `
        position: absolute;
        left: ${continent.left};
        top: ${continent.top};
        width: ${continent.width};
        height: ${continent.height};
        background: #e8f4e6;
        border: 1px solid #c3d9c0;
        border-radius: ${continent.borderRadius};
        opacity: 0.9;
      `;
      landMasses.appendChild(land);
    });

    this.container.appendChild(landMasses);
  }

  createControls() {
    const controls = document.createElement('div');
    controls.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      z-index: 100;
    `;

    const zoomIn = document.createElement('button');
    zoomIn.innerHTML = '+';
    zoomIn.style.cssText = `
      width: 32px;
      height: 32px;
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--text);
      font-size: 18px;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
    `;

    const zoomOut = document.createElement('button');
    zoomOut.innerHTML = '−';
    zoomOut.style.cssText = zoomIn.style.cssText;

    controls.appendChild(zoomIn);
    controls.appendChild(zoomOut);
    this.container.appendChild(controls);
  }

  createAttribution() {
    const attribution = document.createElement('div');
    attribution.innerHTML = '&copy; <a href="https://www.openstreetmap.org/" style="color: var(--link);">OpenStreetMap</a> contributors';
    attribution.style.cssText = `
      position: absolute;
      bottom: 5px;
      right: 5px;
      background: rgba(255, 255, 255, 0.8);
      padding: 2px 4px;
      font-size: 10px;
      border-radius: 3px;
      z-index: 100;
    `;
    this.container.appendChild(attribution);
  }

  addMarker(lat, lng, options = {}) {
    const marker = document.createElement('div');
    marker.className = 'leaflet-marker';
    
    // Convert lat/lng to pixel position (simplified projection)
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    
    marker.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      transform: translate(-50%, -50%);
      z-index: 50;
      cursor: pointer;
    `;

    if (options.icon && options.icon.html) {
      marker.innerHTML = options.icon.html;
    } else {
      marker.innerHTML = `
        <div class="marker-pin">
          <div class="marker-inner"></div>
        </div>
      `;
    }

    this.container.appendChild(marker);
    
    // Store marker for tooltip binding
    const markerObj = {
      element: marker,
      lat: lat,
      lng: lng,
      tooltip: null,
      map: this
    };
    
    this.markers.push(markerObj);
    return markerObj;
  }

  bindTooltip(marker, text, options = {}) {
    marker.tooltip = {
      text: text,
      options: options
    };

    marker.element.addEventListener('mouseenter', () => {
      this.showTooltip(marker);
    });

    marker.element.addEventListener('mouseleave', () => {
      this.hideTooltip(marker);
    });
  }

  showTooltip(marker) {
    if (!marker.tooltip) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'leaflet-tooltip';
    tooltip.innerHTML = marker.tooltip.text;
    tooltip.style.cssText = `
      position: absolute;
      bottom: 35px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--card);
      color: var(--text);
      padding: 0.75rem;
      border-radius: 8px;
      font-size: 0.9rem;
      white-space: nowrap;
      border: 1px solid var(--border);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      z-index: 1000;
      pointer-events: none;
    `;

    // Add arrow
    const arrow = document.createElement('div');
    arrow.style.cssText = `
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-top-color: var(--card);
    `;
    tooltip.appendChild(arrow);

    marker.element.appendChild(tooltip);
    marker.tooltipElement = tooltip;
  }

  hideTooltip(marker) {
    if (marker.tooltipElement) {
      marker.tooltipElement.remove();
      marker.tooltipElement = null;
    }
  }
}

// Simple API to mimic Leaflet.js
const L = {
  map: function(containerId) {
    const mapInstance = new LeafletStyleMap(containerId);
    return {
      mapInstance: mapInstance,
      setView: function(center, zoom) {
        return this;
      }
    };
  },
  
  tileLayer: function(url, options) {
    return {
      addTo: function(map) {
        return this;
      }
    };
  },
  
  marker: function(coords, options = {}) {
    return {
      coords: coords,
      options: options,
      markerObj: null,
      mapObj: null,
      addTo: function(mapObj) {
        this.mapObj = mapObj;
        this.markerObj = mapObj.mapInstance.addMarker(coords[0], coords[1], options);
        return this;
      },
      bindTooltip: function(text, options = {}) {
        if (this.markerObj && this.mapObj) {
          this.mapObj.mapInstance.bindTooltip(this.markerObj, text, options);
        }
        return this;
      }
    };
  },
  
  divIcon: function(options) {
    return {
      html: options.html,
      iconSize: options.iconSize,
      iconAnchor: options.iconAnchor
    };
  }
};

// Export for global use
window.L = L;