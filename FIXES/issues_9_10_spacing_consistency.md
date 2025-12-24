# Issues #9-10: Spacing Consistency Fix

## Problem
Inconsistent spacing values used throughout the application instead of design tokens.

## Solution
Use the spacing scale defined in `globals.css`:

```css
/* Available spacing tokens */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

## Find & Replace Pattern

### Search for hardcoded values:
```bash
# Find all hardcoded spacing
grep -r "margin: [0-9]" app/
grep -r "padding: [0-9]" app/
grep -r "gap: [0-9]" app/
```

### Replace with tokens:
```css
/* BEFORE */
.card {
  margin-bottom: 24px;
  padding: 20px;
  gap: 12px;
}

/* AFTER */
.card {
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  gap: var(--space-3);
}
```

## Common Replacements
- `8px` → `var(--space-2)`
- `12px` → `var(--space-3)` 
- `16px` → `var(--space-4)`
- `20px` → `var(--space-4)` (round to 16px)
- `24px` → `var(--space-6)`
- `32px` → `var(--space-8)`
- `40px` → `var(--section-spacing)`
- `48px` → `var(--space-12)`
- `64px` → `var(--space-16)`

## Priority Files
1. `app/globals.css` - Fix all component spacing
2. `app/components/*.js` - Replace inline styles
3. Page-specific CSS

## Impact
✅ Consistent spacing across all components  
✅ Easier to adjust spacing globally  
✅ Better design system adherence
