/**
 * Command Palette - Keyboard-driven navigation
 * Triggered with Cmd/Ctrl+K
 * Accessible dialog with ARIA attributes and keyboard navigation
 */

(function() {
  'use strict';

  const COMMAND_PALETTE_ID = 'command-palette';
  const BACKDROP_ID = 'command-palette-backdrop';

  // Navigation entries
  const commands = [
    { name: 'Home', url: 'index.html', icon: '🏠', description: 'Return to homepage' },
    { name: 'Scholarships', url: 'scholarships.html', icon: '🎓', description: 'Browse scholarship database' },
    { name: 'Citizenship', url: 'citizenship.html', icon: '🌍', description: 'Explore citizenship pathways' },
    { name: 'Guides', url: 'guides.html', icon: '📚', description: 'Application guides and templates' },
    { name: 'AI Chat', url: 'ai-chat.html', icon: '🤖', description: '24/7 AI counseling assistant' },
    { name: 'Students & Stories', url: 'students-supported.html', icon: '👥', description: 'Success stories from students' },
    { name: 'IELTS & Prep', url: 'ielts-prep.html', icon: '✍️', description: 'Test preparation resources' },
    { name: 'About', url: 'about.html', icon: 'ℹ️', description: 'Learn about Civora' },
    { name: 'Contact', url: 'contact.html', icon: '📧', description: 'Get in touch with us' }
  ];

  let isOpen = false;
  let selectedIndex = 0;
  let filteredCommands = commands;

  /**
   * Create command palette HTML structure
   */
  function createPaletteHTML() {
    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = BACKDROP_ID;
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      z-index: 9998;
      display: none;
      animation: fadeIn 0.2s ease;
    `;
    backdrop.setAttribute('aria-hidden', 'true');

    // Create palette container
    const palette = document.createElement('div');
    palette.id = COMMAND_PALETTE_ID;
    palette.setAttribute('role', 'dialog');
    palette.setAttribute('aria-modal', 'true');
    palette.setAttribute('aria-labelledby', 'command-palette-label');
    palette.style.cssText = `
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%) translateY(-10px);
      width: 90%;
      max-width: 600px;
      background: var(--surface, #1C1C1F);
      border: 1px solid var(--border, #2A2A2D);
      border-radius: 12px;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
      z-index: 9999;
      display: none;
      animation: slideDown 0.2s ease;
      overflow: hidden;
    `;

    palette.innerHTML = `
      <div style="padding: 16px; border-bottom: 1px solid var(--border, #2A2A2D);">
        <label id="command-palette-label" style="position: absolute; width: 1px; height: 1px; overflow: hidden;">Quick Navigation</label>
        <input 
          type="text" 
          id="command-palette-input"
          placeholder="Type to search..."
          aria-label="Search commands"
          aria-controls="command-palette-results"
          aria-autocomplete="list"
          style="
            width: 100%;
            background: transparent;
            border: none;
            outline: none;
            color: var(--text-primary, #FFFFFF);
            font-size: 16px;
            font-family: inherit;
          "
        />
      </div>
      <div 
        id="command-palette-results" 
        role="listbox"
        aria-label="Available commands"
        style="
          max-height: 400px;
          overflow-y: auto;
          padding: 8px;
        "
      ></div>
      <div style="
        padding: 12px 16px;
        border-top: 1px solid var(--border, #2A2A2D);
        font-size: 12px;
        color: var(--text-secondary, #9CA3AF);
        display: flex;
        justify-content: space-between;
      ">
        <span>↑↓ Navigate</span>
        <span>↵ Select</span>
        <span>Esc Close</span>
      </div>
    `;

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      #command-palette-results::-webkit-scrollbar {
        width: 8px;
      }
      #command-palette-results::-webkit-scrollbar-track {
        background: transparent;
      }
      #command-palette-results::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
      #command-palette-results::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(backdrop);
    document.body.appendChild(palette);
  }

  /**
   * Render command items
   */
  function renderCommands() {
    const resultsContainer = document.getElementById('command-palette-results');
    resultsContainer.innerHTML = '';

    if (filteredCommands.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--text-secondary, #9CA3AF);">
          No results found
        </div>
      `;
      return;
    }

    filteredCommands.forEach(function(command, index) {
      const item = document.createElement('div');
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', index === selectedIndex ? 'true' : 'false');
      item.style.cssText = `
        padding: 12px 16px;
        cursor: pointer;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: background 0.15s ease;
        background: ${index === selectedIndex ? 'var(--accent, #5E6AD2)' : 'transparent'};
        color: ${index === selectedIndex ? '#FFFFFF' : 'var(--text-primary, #FFFFFF)'};
      `;

      item.innerHTML = `
        <span style="font-size: 20px; flex-shrink: 0;">${command.icon}</span>
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 500; font-size: 14px;">${command.name}</div>
          <div style="
            font-size: 12px; 
            opacity: 0.7; 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis;
          ">${command.description}</div>
        </div>
      `;

      item.addEventListener('click', function() {
        navigateToCommand(command);
      });

      item.addEventListener('mouseenter', function() {
        selectedIndex = index;
        renderCommands();
      });

      resultsContainer.appendChild(item);
    });
  }

  /**
   * Filter commands based on search input
   */
  function filterCommands(query) {
    if (!query) {
      filteredCommands = commands;
    } else {
      const lowerQuery = query.toLowerCase();
      filteredCommands = commands.filter(function(command) {
        return command.name.toLowerCase().includes(lowerQuery) ||
               command.description.toLowerCase().includes(lowerQuery);
      });
    }
    selectedIndex = 0;
    renderCommands();
  }

  /**
   * Navigate to selected command
   */
  function navigateToCommand(command) {
    closePalette();
    window.location.href = command.url;
  }

  /**
   * Open command palette
   */
  function openPalette() {
    if (isOpen) return;

    const backdrop = document.getElementById(BACKDROP_ID);
    const palette = document.getElementById(COMMAND_PALETTE_ID);
    const input = document.getElementById('command-palette-input');

    if (!backdrop || !palette || !input) {
      createPaletteHTML();
      openPalette();
      return;
    }

    isOpen = true;
    backdrop.style.display = 'block';
    palette.style.display = 'block';
    
    // Reset state
    selectedIndex = 0;
    filteredCommands = commands;
    input.value = '';
    
    renderCommands();
    
    // Focus input
    setTimeout(function() {
      input.focus();
    }, 100);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close command palette
   */
  function closePalette() {
    if (!isOpen) return;

    const backdrop = document.getElementById(BACKDROP_ID);
    const palette = document.getElementById(COMMAND_PALETTE_ID);

    if (backdrop && palette) {
      backdrop.style.display = 'none';
      palette.style.display = 'none';
    }

    isOpen = false;

    // Restore body scroll
    document.body.style.overflow = '';
  }

  /**
   * Handle keyboard events
   */
  function handleKeyboard(e) {
    // Open palette with Cmd/Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }

    // Only handle these keys when palette is open
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closePalette();
        break;

      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
        renderCommands();
        break;

      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        renderCommands();
        break;

      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          navigateToCommand(filteredCommands[selectedIndex]);
        }
        break;
    }
  }

  /**
   * Initialize command palette
   */
  function init() {
    // Create palette HTML
    createPaletteHTML();

    // Keyboard event listener
    document.addEventListener('keydown', handleKeyboard);

    // Input event listener for search
    const input = document.getElementById('command-palette-input');
    if (input) {
      input.addEventListener('input', function(e) {
        filterCommands(e.target.value);
      });
    }

    // Backdrop click to close
    const backdrop = document.getElementById(BACKDROP_ID);
    if (backdrop) {
      backdrop.addEventListener('click', closePalette);
    }

    // Prevent palette clicks from closing
    const palette = document.getElementById(COMMAND_PALETTE_ID);
    if (palette) {
      palette.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging
  window.commandPalette = {
    open: openPalette,
    close: closePalette
  };

})();
