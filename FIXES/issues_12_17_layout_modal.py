"""
Issues #12-13, #15-17: Layout & Modal Improvements
"""

# Issue #12-13: Layout Improvements
"""
1. Max-width on text containers
2. Consistent grid gaps
3. Better mobile padding
"""

# Add to globals.css:
LAYOUT_CSS = """
/* Issue #12-13 FIXED: Layout improvements */
.content-container {
  max-width: 65ch; /* Optimal reading width */
  margin: 0 auto;
}

.prose {
  max-width: 65ch;
  line-height: 1.75;
}

.grid-gap-sm { gap: var(--space-2); }
.grid-gap-md { gap: var(--space-4); }
.grid-gap-lg { gap: var(--space-6); }

@media (max-width: 768px) {
  .container {
    padding-left: var(--container-padding-mobile);
    padding-right: var(--container-padding-mobile);
  }
  
  .section {
    padding: var(--space-8) 0;
  }
}
"""

# Issue #15: Z-Index Management
Z_INDEX_CSS = """
/* Issue #15 FIXED: Z-index scale */
:root {
  --z-base: 1;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}

.dropdown { z-index: var(--z-dropdown); }
.modal-backdrop { z-index: var(--z-modal-backdrop); }
.modal { z-index: var(--z-modal); }
.tooltip { z-index: var(--z-tooltip); }
"""

# Issue #16-17: Mobile Nav Focus Trap & Scroll Lock
MOBILE_NAV_JS = """
'use client';
import { useEffect, useRef } from 'react';

function MobileNav({ isOpen, onClose }) {
  const navRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);
  
  // Issue #17 FIXED: Scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);
  
  // Issue #16 FIXED: Focus trap
  useEffect(() => {
    if (!isOpen) return;
    
    const focusableElements = navRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled])'
    );
    
    if (focusableElements && focusableElements.length > 0) {
      firstFocusableRef.current = focusableElements[0];
      lastFocusableRef.current = focusableElements[focusableElements.length - 1];
      firstFocusableRef.current?.focus();
    }
    
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="modal-backdrop" 
        onClick={onClose}
        style={{ zIndex: 'var(--z-modal-backdrop)' }}
      />
      <nav 
        ref={navRef}
        className="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ zIndex: 'var(--z-modal)' }}
      >
        <button
          onClick={onClose}
          aria-label="Close navigation"
          className="close-button"
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>
        {/* Nav items */}
      </nav>
    </>
  );
}

export default MobileNav;
"""

# Write implementation
def apply_fixes():
    print("Issue #12-13: Add layout CSS to globals.css")
    print("Issue #15: Add z-index scale to globals.css")
    print("Issue #16-17: Update MobileNav component with focus trap and scroll lock")
    
if __name__ == "__main__":
    apply_fixes()
