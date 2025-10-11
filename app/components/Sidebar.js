'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const navItems = [
    {
      href: '/scholarships/',
      icon: '🎓',
      label: 'Scholarships',
      shortcut: 'S',
    },
    {
      href: '/citizenship/',
      icon: '🌍',
      label: 'Citizenship',
      shortcut: 'C',
    },
    {
      href: '/student-stories/',
      icon: '📖',
      label: 'Stories',
      shortcut: 'T',
    },
    {
      href: '/ielts-prep/',
      icon: '📚',
      label: 'IELTS & Prep',
      shortcut: 'I',
    },
    {
      href: '/about/',
      icon: 'ℹ️',
      label: 'About',
      shortcut: 'A',
    },
    {
      href: '/contact/',
      icon: '✉️',
      label: 'Contact',
      shortcut: 'M',
    },
  ];

  useEffect(() => {
    // Set active item based on current path
    const path = window.location.pathname;
    setActiveItem(path);

    // Check localStorage for sidebar state
    const collapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setIsCollapsed(collapsed);
  }, []);

  const toggleSidebar = useCallback(() => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
  }, [isCollapsed]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyPress = (e) => {
      // Cmd/Ctrl + B to toggle sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }

      // Navigation shortcuts (Cmd/Ctrl + Shift + Key)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
        const item = navItems.find((item) => item.shortcut.toLowerCase() === e.key.toLowerCase());
        if (item) {
          e.preventDefault();
          window.location.href = item.href;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [navItems, toggleSidebar]);

  return (
    <>
      <aside className={`linear-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={`${isCollapsed ? 'Expand' : 'Collapse'} sidebar (⌘B)`}
          >
            <span className="toggle-icon">{isCollapsed ? '→' : '←'}</span>
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <div className="sidebar-section-title">Navigation</div>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`sidebar-item ${activeItem.startsWith(item.href) ? 'active' : ''}`}
                title={`${item.label} (⌘⇧${item.shortcut})`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                <span className="sidebar-shortcut">⌘⇧{item.shortcut}</span>
              </a>
            ))}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-title">Quick Links</div>
            <a href="/pathway-builder/" className="sidebar-item sidebar-item-secondary">
              <span className="sidebar-icon">🗺️</span>
              <span className="sidebar-label">Pathway Builder</span>
            </a>
            <a href="/roadmap/" className="sidebar-item sidebar-item-secondary">
              <span className="sidebar-icon">🎯</span>
              <span className="sidebar-label">Roadmap</span>
            </a>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-item sidebar-item-secondary">
            <span className="sidebar-icon">⌨️</span>
            <span className="sidebar-label">Keyboard shortcuts</span>
          </div>
        </div>
      </aside>
    </>
  );
}
