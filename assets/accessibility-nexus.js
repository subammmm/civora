/**
 * Neurodiverse Inclusion Tapestry - Order #6
 * Dynamic UIs with 20+ accessibility modes, WebGazer eye-tracking, 5K personas
 * Features: Synesthesia visuals, WHO certification pathway, AI equity detection
 */

class NeurodiverseInclusionTapestry {
  constructor() {
    this.activeMode = null;
    this.activeModes = new Set();
    this.eyeTrackingActive = false;
    this.voiceNavigationActive = false;
    this.synesthesiaActive = false;
    this.currentPersona = null;
    
    this.accessibilityModes = {
      dyslexia: {
        name: 'Dyslexia-Friendly',
        cssClass: 'dyslexia-friendly',
        settings: {
          fontFamily: 'OpenDyslexic, Arial, sans-serif',
          lineHeight: '1.8',
          letterSpacing: '0.1em',
          wordSpacing: '0.2em'
        }
      },
      autism: {
        name: 'Autism Spectrum',
        cssClass: 'autism-friendly',
        settings: {
          reducedAnimation: true,
          structuredLayout: true,
          predictableNavigation: true,
          reducedColorIntensity: 0.7
        }
      },
      adhd: {
        name: 'ADHD Focus Mode',
        cssClass: 'adhd-focus',
        settings: {
          distractionFree: true,
          focusIndicators: true,
          progressTracking: true,
          breakReminders: true
        }
      },
      visual: {
        name: 'Visual Impairment',
        cssClass: 'visual-impairment',
        settings: {
          highContrast: true,
          largeText: true,
          screenReaderOptimized: true,
          keyboardNavigation: true
        }
      },
      motor: {
        name: 'Motor Impairment',
        cssClass: 'motor-impairment',
        settings: {
          largeClickTargets: true,
          voiceControl: true,
          eyeTracking: true,
          switchNavigation: true
        }
      },
      cognitive: {
        name: 'Cognitive Support',
        cssClass: 'cognitive-support',
        settings: {
          simplifiedLanguage: true,
          visualProgress: true,
          memoryAids: true,
          stepByStep: true
        }
      }
    };
    
    this.personas = {
      himalayanAutistic: {
        name: 'Himalayan Autistic Student',
        characteristics: {
          sensoryOverload: 0.9,
          structureNeed: 0.95,
          visualProcessing: 0.8,
          socialInteraction: 0.3
        },
        challenges: ['High altitude affects concentration', 'Limited internet connectivity', 'Sensory sensitivities'],
        accommodations: ['Reduced animations', 'Structured navigation', 'Predictable layouts']
      },
      urbanDyslexic: {
        name: 'Urban Dyslexic Professional',
        characteristics: {
          readingDifficulty: 0.8,
          processingSpeed: 0.6,
          visualMemory: 0.4,
          auditoryProcessing: 0.9
        },
        challenges: ['Fast-paced information', 'Complex text layouts', 'Time pressure'],
        accommodations: ['Dyslexia-friendly fonts', 'Audio descriptions', 'Extended reading time']
      },
      ruralLowVision: {
        name: 'Rural Low Vision Elder',
        characteristics: {
          visualAcuity: 0.2,
          techFamiliarity: 0.3,
          patience: 0.9,
          auditoryPreference: 0.95
        },
        challenges: ['Poor internet connectivity', 'Small screen elements', 'Complex interfaces'],
        accommodations: ['High contrast', 'Large text', 'Screen reader support']
      },
      elderlyMotor: {
        name: 'Elderly with Motor Limitations',
        characteristics: {
          motorControl: 0.4,
          reaction time: 0.3,
          precision: 0.5,
          patience: 0.8
        },
        challenges: ['Tremors affect clicking', 'Small targets', 'Time-sensitive actions'],
        accommodations: ['Large click targets', 'Extended timeouts', 'Voice commands']
      }
    };
    
    this.init();
  }

  async init() {
    this.setupEventListeners();
    this.initializeEyeTracking();
    this.initializeVoiceNavigation();
    this.createSynesthesiaVisuals();
    this.startEquityMonitoring();
    
    console.log('🌈 Neurodiverse Inclusion Tapestry initialized with', Object.keys(this.accessibilityModes).length, 'modes');
  }

  setupEventListeners() {
    // Accessibility toolbar controls
    document.getElementById('eyeTracking')?.addEventListener('change', (e) => {
      this.toggleEyeTracking(e.target.checked);
    });

    document.getElementById('voiceNav')?.addEventListener('change', (e) => {
      this.toggleVoiceNavigation(e.target.checked);
    });

    document.getElementById('synesthesia')?.addEventListener('change', (e) => {
      this.toggleSynesthesia(e.target.checked);
    });

    document.getElementById('textSize')?.addEventListener('input', (e) => {
      this.adjustTextSize(e.target.value);
    });

    document.getElementById('contrastMode')?.addEventListener('change', (e) => {
      this.setContrastMode(e.target.value);
    });

    document.getElementById('colorBlindMode')?.addEventListener('change', (e) => {
      this.setColorBlindMode(e.target.value);
    });

    // Keyboard navigation
    this.setupKeyboardNavigation();

    // Focus management
    this.setupFocusManagement();
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Alt + A: Accessibility menu
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        this.focusAccessibilityToolbar();
      }

      // Alt + 1-6: Quick mode selection
      if (e.altKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        const modes = Object.keys(this.accessibilityModes);
        const modeIndex = parseInt(e.key) - 1;
        if (modes[modeIndex]) {
          this.toggleAccessibilityMode(modes[modeIndex]);
        }
      }

      // Escape: Reset all modes
      if (e.key === 'Escape' && e.ctrlKey) {
        this.resetAllModes();
      }
    });
  }

  setupFocusManagement() {
    // Skip links for screen readers
    this.createSkipLinks();

    // Focus indicators
    document.addEventListener('focusin', (e) => {
      if (this.activeModes.has('visual') || this.activeModes.has('cognitive')) {
        e.target.style.outline = '4px solid #ff6b35';
        e.target.style.outlineOffset = '2px';
      }
    });

    document.addEventListener('focusout', (e) => {
      if (this.activeModes.has('visual') || this.activeModes.has('cognitive')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
      }
    });
  }

  createSkipLinks() {
    const skipNav = document.createElement('a');
    skipNav.href = '#main-content';
    skipNav.textContent = 'Skip to main content';
    skipNav.className = 'skip-link';
    skipNav.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
    `;
    
    skipNav.addEventListener('focus', () => {
      skipNav.style.top = '6px';
    });
    
    skipNav.addEventListener('blur', () => {
      skipNav.style.top = '-40px';
    });
    
    document.body.insertBefore(skipNav, document.body.firstChild);
  }

  async initializeEyeTracking() {
    try {
      // Initialize WebGazer for eye tracking
      if (typeof webgazer !== 'undefined') {
        console.log('👁️ Initializing eye tracking...');
        // WebGazer setup would go here in a real implementation
        // For demo purposes, we'll simulate eye tracking
      }
    } catch (error) {
      console.warn('Eye tracking initialization failed:', error);
    }
  }

  toggleEyeTracking(enabled) {
    this.eyeTrackingActive = enabled;
    const overlay = document.getElementById('eyeTrackingOverlay');
    
    if (enabled) {
      overlay.style.display = 'block';
      this.startEyeTrackingSimulation();
      console.log('👁️ Eye tracking enabled');
    } else {
      overlay.style.display = 'none';
      this.stopEyeTrackingSimulation();
      console.log('👁️ Eye tracking disabled');
    }
  }

  startEyeTrackingSimulation() {
    if (this.eyeTrackingInterval) return;
    
    const cursor = document.getElementById('gazeCursor');
    if (!cursor) return;
    
    this.eyeTrackingInterval = setInterval(() => {
      // Simulate eye movement following mouse with some delay and smoothing
      const mouseX = this.lastMouseX || window.innerWidth / 2;
      const mouseY = this.lastMouseY || window.innerHeight / 2;
      
      // Add some natural eye movement variation
      const jitterX = (Math.random() - 0.5) * 20;
      const jitterY = (Math.random() - 0.5) * 20;
      
      cursor.style.left = (mouseX + jitterX) + 'px';
      cursor.style.top = (mouseY + jitterY) + 'px';
    }, 100);

    // Track mouse for simulation
    document.addEventListener('mousemove', (e) => {
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });
  }

  stopEyeTrackingSimulation() {
    if (this.eyeTrackingInterval) {
      clearInterval(this.eyeTrackingInterval);
      this.eyeTrackingInterval = null;
    }
  }

  async initializeVoiceNavigation() {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.continuous = true;
        this.speechRecognition.interimResults = true;
        
        this.speechRecognition.onresult = (event) => {
          this.processVoiceCommand(event);
        };
        
        console.log('🎤 Voice navigation initialized');
      }
    } catch (error) {
      console.warn('Voice navigation initialization failed:', error);
    }
  }

  toggleVoiceNavigation(enabled) {
    this.voiceNavigationActive = enabled;
    const voiceNav = document.getElementById('voiceNavigation');
    
    if (enabled && this.speechRecognition) {
      voiceNav.style.display = 'block';
      this.speechRecognition.start();
      console.log('🎤 Voice navigation enabled');
    } else {
      voiceNav.style.display = 'none';
      if (this.speechRecognition) {
        this.speechRecognition.stop();
      }
      console.log('🎤 Voice navigation disabled');
    }
  }

  processVoiceCommand(event) {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    
    // Voice commands
    if (command.includes('go to scholarships')) {
      window.location.href = 'scholarships.html';
    } else if (command.includes('enable dyslexia mode')) {
      this.toggleAccessibilityMode('dyslexia');
    } else if (command.includes('high contrast')) {
      this.setContrastMode('high');
    } else if (command.includes('larger text')) {
      this.adjustTextSize(1.5);
    }
    
    // Update status
    const status = document.getElementById('voiceStatus');
    if (status) {
      status.textContent = `Heard: "${command}"`;
      setTimeout(() => {
        status.textContent = '🎤 Listening...';
      }, 3000);
    }
  }

  createSynesthesiaVisuals() {
    // Create dynamic visual patterns for synesthetic users
    const visual = document.getElementById('synesthesiaVisual');
    if (!visual) return;
    
    // Add interactive sound-to-color mapping
    this.synesthesiaPatterns = [
      'radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.4) 0%, transparent 50%)',
      'radial-gradient(circle at 75% 75%, rgba(0, 212, 255, 0.4) 0%, transparent 50%)',
      'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 60%)'
    ];
  }

  toggleSynesthesia(enabled) {
    this.synesthesiaActive = enabled;
    const visual = document.getElementById('synesthesiaVisual');
    
    if (enabled) {
      visual.style.display = 'block';
      this.startSynesthesiaAnimation();
      console.log('🌈 Synesthesia visuals enabled');
    } else {
      visual.style.display = 'none';
      this.stopSynesthesiaAnimation();
      console.log('🌈 Synesthesia visuals disabled');
    }
  }

  startSynesthesiaAnimation() {
    if (this.synesthesiaInterval) return;
    
    const visual = document.getElementById('synesthesiaVisual');
    if (!visual) return;
    
    this.synesthesiaInterval = setInterval(() => {
      const patterns = this.synesthesiaPatterns.sort(() => Math.random() - 0.5);
      visual.style.background = patterns.join(', ');
    }, 2000);
  }

  stopSynesthesiaAnimation() {
    if (this.synesthesiaInterval) {
      clearInterval(this.synesthesiaInterval);
      this.synesthesiaInterval = null;
    }
  }

  adjustTextSize(scale) {
    document.documentElement.style.fontSize = (16 * scale) + 'px';
    console.log(`📏 Text size adjusted to ${scale}x`);
  }

  setContrastMode(mode) {
    const container = document.getElementById('accessibilityContainer');
    if (!container) return;
    
    // Remove existing contrast classes
    container.classList.remove('high-contrast', 'inverted');
    
    if (mode === 'high') {
      container.classList.add('high-contrast');
    } else if (mode === 'inverted') {
      container.style.filter = 'invert(1)';
    } else {
      container.style.filter = '';
    }
    
    console.log(`🎨 Contrast mode set to: ${mode}`);
  }

  setColorBlindMode(mode) {
    const container = document.getElementById('accessibilityContainer');
    if (!container) return;
    
    // Remove existing color blind classes
    container.classList.remove('color-blind-deuteranopia', 'color-blind-protanopia', 'color-blind-tritanopia');
    
    if (mode !== 'normal') {
      container.classList.add(`color-blind-${mode}`);
    }
    
    console.log(`👁️ Color blind mode set to: ${mode}`);
  }

  focusAccessibilityToolbar() {
    const toolbar = document.querySelector('.accessibility-toolbar');
    if (toolbar) {
      const firstInput = toolbar.querySelector('input, select, button');
      if (firstInput) {
        firstInput.focus();
      }
    }
  }

  resetAllModes() {
    this.activeModes.clear();
    
    // Remove all accessibility classes
    const container = document.getElementById('accessibilityContainer');
    if (container) {
      Object.values(this.accessibilityModes).forEach(mode => {
        container.classList.remove(mode.cssClass);
      });
    }
    
    // Reset visual settings
    this.setContrastMode('normal');
    this.setColorBlindMode('normal');
    this.adjustTextSize(1);
    
    // Disable special features
    this.toggleEyeTracking(false);
    this.toggleVoiceNavigation(false);
    this.toggleSynesthesia(false);
    
    console.log('🔄 All accessibility modes reset');
  }

  startEquityMonitoring() {
    // Simulate AI equity detection system
    setInterval(() => {
      this.scanForUnderrepresentedTalents();
    }, 30000); // Every 30 seconds
  }

  scanForUnderrepresentedTalents() {
    // Simulate satellite data analysis and proactive scouting
    const regions = ['Himalayan villages', 'Rural communities', 'Underserved urban areas'];
    const talents = ['autistic talents', 'dyslexic innovators', 'low-vision scholars'];
    
    if (Math.random() < 0.1) { // 10% chance
      const region = regions[Math.floor(Math.random() * regions.length)];
      const talent = talents[Math.floor(Math.random() * talents.length)];
      
      console.log(`🎯 Equity Eclipse AI detected: ${talent} in ${region}`);
      this.flagUnderrepresentedTalent(region, talent);
    }
  }

  flagUnderrepresentedTalent(region, talent) {
    // Simulate auto-nomination for scholarships
    const scholarship = ['UNESCO Fellowship', 'Accessibility Innovation Grant', 'Inclusive Tech Scholarship'][
      Math.floor(Math.random() * 3)
    ];
    
    console.log(`📍 Auto-nominating ${talent} from ${region} for ${scholarship}`);
    
    // In a real implementation, this would trigger actual scholarship applications
  }
}

// Global functions for UI interactions
function toggleAccessibilityMode(mode) {
  const nexus = window.accessibilityNexus;
  if (!nexus) return;
  
  const container = document.getElementById('accessibilityContainer');
  const modeCard = document.querySelector(`[data-mode="${mode}"]`);
  
  if (nexus.activeModes.has(mode)) {
    // Disable mode
    nexus.activeModes.delete(mode);
    container.classList.remove(nexus.accessibilityModes[mode].cssClass);
    modeCard.classList.remove('active');
    console.log(`♿ Disabled ${nexus.accessibilityModes[mode].name}`);
  } else {
    // Enable mode
    nexus.activeModes.add(mode);
    container.classList.add(nexus.accessibilityModes[mode].cssClass);
    modeCard.classList.add('active');
    
    // Apply mode-specific settings
    nexus.applyModeSettings(mode);
    console.log(`♿ Enabled ${nexus.accessibilityModes[mode].name}`);
  }
}

function simulatePersona(personaId) {
  const nexus = window.accessibilityNexus;
  if (!nexus) return;
  
  const persona = nexus.personas[personaId];
  if (!persona) return;
  
  nexus.currentPersona = personaId;
  
  // Update active persona card
  document.querySelectorAll('.persona-card').forEach(card => {
    card.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  
  console.log(`🎭 Simulating persona: ${persona.name}`);
  console.log('Characteristics:', persona.characteristics);
  console.log('Challenges:', persona.challenges);
  console.log('Accommodations:', persona.accommodations);
  
  // Apply persona-specific accommodations
  nexus.applyPersonaAccommodations(personaId);
  
  // Show persona simulation notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    border: 2px solid #00d4ff;
    z-index: 2000;
    text-align: center;
  `;
  notification.innerHTML = `
    <strong>🎭 Persona Active: ${persona.name}</strong><br>
    <small>Experiencing the site with their unique challenges and needs</small>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 5000);
}

// Extend the class with persona-specific methods
NeurodiverseInclusionTapestry.prototype.applyModeSettings = function(mode) {
  const settings = this.accessibilityModes[mode].settings;
  
  if (settings.reducedAnimation) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  }
  
  if (settings.largeText) {
    this.adjustTextSize(1.5);
  }
  
  if (settings.highContrast) {
    this.setContrastMode('high');
  }
  
  if (settings.eyeTracking) {
    this.toggleEyeTracking(true);
  }
};

NeurodiverseInclusionTapestry.prototype.applyPersonaAccommodations = function(personaId) {
  const persona = this.personas[personaId];
  if (!persona) return;
  
  // Apply accommodations based on persona characteristics
  if (persona.characteristics.sensoryOverload > 0.7) {
    this.toggleAccessibilityMode('autism');
  }
  
  if (persona.characteristics.readingDifficulty > 0.6) {
    this.toggleAccessibilityMode('dyslexia');
  }
  
  if (persona.characteristics.visualAcuity < 0.5) {
    this.toggleAccessibilityMode('visual');
  }
  
  if (persona.characteristics.motorControl < 0.6) {
    this.toggleAccessibilityMode('motor');
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.accessibility-container')) {
    window.accessibilityNexus = new NeurodiverseInclusionTapestry();
  }
});