/**
 * Spotify Study Music Integration for Civora
 * 
 * This module provides curated study music playlists to help Nepali students
 * focus during IELTS preparation and general study sessions.
 */

class SpotifyStudyMusic {
  constructor() {
    this.playlists = [
      {
        id: 'focus',
        name: 'Focus & Concentration',
        embedId: '37i9dQZF1DWXLeA8Omikj7',
        description: 'Deep focus music for concentration'
      },
      {
        id: 'instrumental',
        name: 'Instrumental Study',
        embedId: '37i9dQZF1DX0XUsuxWHRQd',
        description: 'Instrumental tracks perfect for studying'
      },
      {
        id: 'ambient',
        name: 'Ambient Sounds',
        embedId: '37i9dQZF1DWZd79rJ6a7lp',
        description: 'Ambient sounds for relaxed study sessions'
      }
    ];
    
    this.init();
  }

  init() {
    // Initialize only if we're on a page with Spotify integration
    if (document.querySelector('.spotify-playlists')) {
      this.setupPlaylistTracking();
      this.addAccessibilityFeatures();
    }
  }

  setupPlaylistTracking() {
    // Track which playlists are being used (for analytics if needed)
    const playlistCards = document.querySelectorAll('.playlist-card');
    playlistCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        console.log(`Playlist "${this.playlists[index].name}" accessed`);
      });
    });
  }

  addAccessibilityFeatures() {
    // Add keyboard navigation support
    const iframes = document.querySelectorAll('.spotify-player iframe');
    iframes.forEach(iframe => {
      iframe.setAttribute('tabindex', '0');
      iframe.setAttribute('aria-label', 'Spotify music player');
    });

    // Add visual focus indicators
    const playlistCards = document.querySelectorAll('.playlist-card');
    playlistCards.forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Play ${card.querySelector('h3').textContent} playlist`);
    });
  }

  // Method to create playlist embed URL
  static createEmbedUrl(playlistId, theme = '0') {
    return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${theme}`;
  }

  // Method to open playlist in Spotify app/web
  static openPlaylist(playlistId) {
    window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.study-music')) {
    new SpotifyStudyMusic();
  }
});

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpotifyStudyMusic;
}