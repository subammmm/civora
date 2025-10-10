# Typography System Specification

## Overview
This document defines the complete typography system for Civora, inspired by Linear.app's precision-focused design system. Every element is carefully calibrated for optimal readability, hierarchy, and aesthetic consistency.

## Font Stack
```css
font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

## Base Typography Settings
```css
html, body {
  font-size: 18px; /* Base size */
  line-height: 1.7; /* Base line height */
  font-weight: 400; /* Regular weight */
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

## Typography Scale

### H1 - Hero Headlines
- **Size**: clamp(88px, 8vw, 96px) 
- **Weight**: 600 (Semi-bold)
- **Line Height**: 1.08 (tight for impact)
- **Color**: var(--text-hi)
- **Margin Bottom**: 1rem
- **Usage**: Main page headers, hero sections

### H2 - Section Headers
- **Size**: clamp(40px, 4vw, 48px)
- **Weight**: 600 (Semi-bold)
- **Line Height**: 1.15
- **Color**: var(--text-hi)
- **Margin Bottom**: 0.75rem
- **Usage**: Major section divisions

### H3 - Subsection Headers
- **Size**: clamp(28px, 3vw, 32px)
- **Weight**: 500 (Medium)
- **Line Height**: 1.2
- **Color**: var(--text-hi)
- **Margin Bottom**: 0.5rem
- **Usage**: Content subsections, card titles

### H4 - Minor Headers
- **Size**: clamp(20px, 2.5vw, 24px)
- **Weight**: 500 (Medium)
- **Line Height**: 1.3
- **Color**: var(--text-hi)
- **Margin Bottom**: 0.5rem
- **Usage**: Feature titles, form sections

### H5 - Small Headers
- **Size**: clamp(16px, 2vw, 18px)
- **Weight**: 500 (Medium)  
- **Line Height**: 1.4
- **Color**: var(--text)
- **Margin Bottom**: 0.5rem
- **Usage**: List headers, metadata sections

### H6 - Micro Headers
- **Size**: clamp(14px, 1.5vw, 16px)
- **Weight**: 600 (Semi-bold)
- **Line Height**: 1.4
- **Color**: var(--text)
- **Margin Bottom**: 0.25rem
- **Usage**: Labels, captions, small section headers

### Body Text
- **Size**: 18px (fixed)
- **Weight**: 400 (Regular)
- **Line Height**: 1.7
- **Color**: var(--text)
- **Usage**: Main content, paragraphs

### Small Text / Subtext
- **Size**: clamp(14px, 1.5vw, 16px)
- **Weight**: 400 (Regular)
- **Line Height**: 1.6
- **Color**: var(--text-muted)
- **Usage**: Captions, metadata, disclaimers

### Micro Text
- **Size**: clamp(12px, 1.2vw, 14px)
- **Weight**: 400 (Regular)
- **Line Height**: 1.5
- **Color**: var(--text-muted)
- **Usage**: Footnotes, tiny labels

## Typography Utility Classes

### Font Weights
- `.font-light` - 300
- `.font-regular` - 400 
- `.font-medium` - 500
- `.font-semibold` - 600
- `.font-bold` - 700

### Font Sizes
- `.text-xs` - 12px
- `.text-sm` - 14px
- `.text-base` - 18px
- `.text-lg` - 20px
- `.text-xl` - 24px
- `.text-2xl` - 32px
- `.text-3xl` - 48px
- `.text-4xl` - 96px

### Line Heights
- `.leading-tight` - 1.08
- `.leading-snug` - 1.15
- `.leading-normal` - 1.7
- `.leading-relaxed` - 1.8

### Text Colors
- `.text-hi` - High contrast text (var(--text-hi))
- `.text-normal` - Normal text (var(--text))
- `.text-muted` - Muted text (var(--text-muted))
- `.text-brand` - Brand color (var(--brand))

### Text Alignment
- `.text-left` - Left aligned
- `.text-center` - Center aligned
- `.text-right` - Right aligned

### Text Transforms
- `.uppercase` - UPPERCASE
- `.lowercase` - lowercase
- `.capitalize` - Capitalize First Letters

## Responsive Breakpoints
- **Mobile**: 480px and below
- **Tablet**: 768px and below  
- **Desktop**: Above 768px
- **Large Desktop**: Above 1200px

## Special Typography Elements

### Links
- **Color**: Inherit from parent
- **Hover**: var(--brand) with smooth transition
- **Underline**: None by default
- **Hover Underline**: Optional based on context

### Code/Monospace
- **Font Family**: 'Fira Code', 'SF Mono', Monaco, 'Cascadia Code', monospace
- **Background**: var(--surface) with padding
- **Border Radius**: 4px
- **Font Size**: 0.9em relative to parent

### Emphasis
- **Strong/Bold**: font-weight: 600
- **Italic**: font-style: italic
- **Mark/Highlight**: background: rgba(255, 255, 0, 0.2)

## Spacing and Rhythm
- **Base Unit**: 8px
- **Vertical Rhythm**: Based on 8px grid
- **Paragraph Spacing**: 1rem bottom margin
- **Header Spacing**: Proportional to font size

## Implementation Requirements

1. All typography must use CSS custom properties for colors
2. Font sizes must use clamp() for responsive scaling
3. Line heights must be unitless for proper inheritance
4. All elements must maintain 8px grid alignment
5. Typography must pass WCAG 2.1 AA contrast requirements
6. Font loading must be optimized with preconnect hints

## Quality Checklist
- [ ] All headings (h1-h6) properly styled
- [ ] Body text readable at all screen sizes
- [ ] Proper contrast ratios maintained
- [ ] Responsive scaling works smoothly
- [ ] Typography hierarchy is clear
- [ ] Utility classes available for all variants
- [ ] Performance optimized (font loading)
- [ ] Accessibility compliant