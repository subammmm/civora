// Custom Interactive World Map inspired by Leaflet.js (without external dependencies)
// Provides zoom, pan, and marker functionality using Canvas and DOM APIs

class CustomWorldMap {
  constructor() {
    this.container = document.getElementById('world-map');
    this.canvas = null;
    this.ctx = null;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.markers = [];
    
    this.supportedCountries = [
      { name: 'United States', lat: 37.0902, lng: -95.7129 },
      { name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
      { name: 'France', lat: 46.6034, lng: 1.8883 },
      { name: 'Belgium', lat: 50.8476, lng: 4.3572 },
      { name: 'South Korea', lat: 37.5665, lng: 126.9780 },
      { name: 'Australia', lat: -25.2744, lng: 133.7751 },
      { name: 'Canada', lat: 60.0000, lng: -95.0000 },
      { name: 'Japan', lat: 36.2048, lng: 138.2529 }
    ];
    
    this.init();
  }

  init() {
    this.createCanvas();
    this.createControls();
    this.addEventListeners();
    this.createMarkers();
    this.draw();
    this.addCustomStyles();
  }

  createCanvas() {
    // Create canvas for the map background
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    this.canvas.style.cssText = `
      width: 100%;
      height: 100%;
      background: #1a2b47;
      border-radius: 8px;
      cursor: grab;
    `;
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // Center the map initially to show all continents
    this.offsetX = this.canvas.width / 2;
    this.offsetY = this.canvas.height / 2;
    this.scale = 1;
  }

  createControls() {
    // Add zoom controls
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'map-controls';
    controlsDiv.innerHTML = `
      <button class="zoom-in" title="Zoom in">+</button>
      <button class="zoom-out" title="Zoom out">−</button>
    `;
    this.container.appendChild(controlsDiv);
  }

  addEventListeners() {
    // Zoom controls
    this.container.querySelector('.zoom-in').addEventListener('click', () => this.zoomIn());
    this.container.querySelector('.zoom-out').addEventListener('click', () => this.zoomOut());
    
    // Mouse events for panning
    this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
    this.canvas.addEventListener('mousemove', (e) => this.drag(e));
    this.canvas.addEventListener('mouseup', () => this.endDrag());
    this.canvas.addEventListener('mouseleave', () => this.endDrag());
    
    // Touch events for mobile
    this.canvas.addEventListener('touchstart', (e) => this.startDrag(e));
    this.canvas.addEventListener('touchmove', (e) => this.drag(e));
    this.canvas.addEventListener('touchend', () => this.endDrag());
    
    // Wheel zoom
    this.canvas.addEventListener('wheel', (e) => this.handleWheel(e));
    
    // Resize handling
    window.addEventListener('resize', () => this.handleResize());
  }

  startDrag(e) {
    this.isDragging = true;
    this.canvas.style.cursor = 'grabbing';
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    this.dragStart = {
      x: clientX - rect.left - this.offsetX,
      y: clientY - rect.top - this.offsetY
    };
    e.preventDefault();
  }

  drag(e) {
    if (!this.isDragging) return;
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    this.offsetX = clientX - rect.left - this.dragStart.x;
    this.offsetY = clientY - rect.top - this.dragStart.y;
    this.draw();
    e.preventDefault();
  }

  endDrag() {
    this.isDragging = false;
    this.canvas.style.cursor = 'grab';
  }

  handleWheel(e) {
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    this.scale *= delta;
    this.scale = Math.max(0.5, Math.min(5, this.scale));
    this.draw();
    e.preventDefault();
  }

  zoomIn() {
    this.scale *= 1.2;
    this.scale = Math.min(5, this.scale);
    this.draw();
  }

  zoomOut() {
    this.scale *= 0.8;
    this.scale = Math.max(0.5, this.scale);
    this.draw();
  }

  handleResize() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    this.draw();
  }

  // Convert lat/lng to canvas coordinates
  latLngToCanvas(lat, lng) {
    // Simple equirectangular projection with better scaling
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    
    // Map coordinates to fit better in view
    const x = ((lng + 180) / 360) * canvasWidth * 0.8 + canvasWidth * 0.1;
    const y = ((90 - lat) / 180) * canvasHeight * 0.6 + canvasHeight * 0.2;
    
    return {
      x: x * this.scale + this.offsetX - canvasWidth * this.scale / 2,
      y: y * this.scale + this.offsetY - canvasHeight * this.scale / 2
    };
  }

  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw world map background (simplified continents)
    this.drawWorldMap();
    
    // Update marker positions
    this.updateMarkers();
  }

  drawWorldMap() {
    this.ctx.save();
    
    // Draw simplified world continents
    this.ctx.fillStyle = '#334155';
    this.ctx.strokeStyle = '#475569';
    this.ctx.lineWidth = 1;
    
    // Draw simplified continent shapes
    this.drawContinents();
    
    this.ctx.restore();
  }

  drawContinents() {
    const continents = [
      // North America (simplified)
      { x: 80, y: 80, width: 120, height: 100 },
      // South America (simplified)
      { x: 100, y: 200, width: 50, height: 120 },
      // Europe (simplified)
      { x: 220, y: 70, width: 50, height: 70 },
      // Africa (simplified)
      { x: 220, y: 150, width: 70, height: 120 },
      // Asia (simplified)
      { x: 300, y: 60, width: 140, height: 120 },
      // Australia (simplified)
      { x: 380, y: 220, width: 70, height: 40 }
    ];

    continents.forEach(continent => {
      const x = continent.x * this.scale + this.offsetX;
      const y = continent.y * this.scale + this.offsetY;
      const width = continent.width * this.scale;
      const height = continent.height * this.scale;
      
      // Only draw if visible
      if (x + width > 0 && x < this.canvas.width && y + height > 0 && y < this.canvas.height) {
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, width, height, 8 * this.scale);
        this.ctx.fill();
        this.ctx.stroke();
      }
    });
  }

  createMarkers() {
    this.supportedCountries.forEach(country => {
      const markerElement = document.createElement('div');
      markerElement.className = 'custom-marker';
      markerElement.innerHTML = `
        <div class="marker-pin">
          <div class="marker-inner"></div>
        </div>
        <div class="marker-tooltip">${country.name}<br><em>Student supported → admission secured in ${country.name}</em></div>
      `;
      
      // Add hover events
      markerElement.addEventListener('mouseenter', () => {
        markerElement.querySelector('.marker-tooltip').style.opacity = '1';
      });
      
      markerElement.addEventListener('mouseleave', () => {
        markerElement.querySelector('.marker-tooltip').style.opacity = '0';
      });
      
      this.container.appendChild(markerElement);
      this.markers.push({ element: markerElement, country });
    });
  }

  updateMarkers() {
    this.markers.forEach(marker => {
      const pos = this.latLngToCanvas(marker.country.lat, marker.country.lng);
      marker.element.style.left = pos.x + 'px';
      marker.element.style.top = pos.y + 'px';
      
      // Hide markers that are outside visible area
      const visible = pos.x >= -50 && pos.x <= this.canvas.width + 50 && 
                     pos.y >= -50 && pos.y <= this.canvas.height + 50;
      marker.element.style.display = visible ? 'block' : 'none';
    });
  }

  addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Custom world map container */
      #world-map {
        position: relative;
        width: 100%;
        height: 500px;
        border-radius: 8px;
        overflow: hidden;
        background: var(--bg);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      /* Map controls */
      .map-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 100;
      }

      .map-controls button {
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
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .map-controls button:hover {
        background: var(--panel);
        color: var(--brand);
        transform: scale(1.05);
      }

      /* Custom markers */
      .custom-marker {
        position: absolute;
        width: 24px;
        height: 24px;
        transform: translate(-50%, -50%);
        z-index: 50;
        cursor: pointer;
      }

      .marker-pin {
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #1a1a1a, #333333);
        border: 3px solid #ffffff;
        border-radius: 50%;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        animation: gentle-pulse 3s ease-in-out infinite;
      }

      .marker-pin:hover {
        transform: scale(1.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
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

      .marker-tooltip {
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
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        border: 1px solid var(--border);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        text-align: center;
        z-index: 1000;
      }

      .marker-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 8px solid transparent;
        border-top-color: var(--card);
      }

      .marker-tooltip em {
        color: var(--muted);
        font-style: normal;
        font-size: 0.85rem;
      }

      /* Pulse animation */
      @keyframes gentle-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        #world-map {
          height: 400px;
        }

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

        .marker-tooltip {
          font-size: 0.8rem;
          padding: 0.5rem;
          max-width: 200px;
          white-space: normal;
        }

        .map-controls button {
          width: 28px;
          height: 28px;
          font-size: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('world-map')) {
    const worldMap = new CustomWorldMap();
    
    // Handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        worldMap.handleResize();
      }, 500);
    });
  }
});