# Unused Feature Files

This directory contains experimental feature files that are **not currently active** in the Civora application.

## Files

### `gamification-nexus.js`
**Status:** Inactive / Experimental  
**Purpose:** Proposed gamification layer for scholarship hunting with RPG-style quests and rewards  
**Reason for being inactive:** Feature was prototyped but not integrated into the main application  
**Action:** Keep for future reference or remove if not planning to implement

### `ai-global-ambassador.js`
**Status:** Inactive / Experimental  
**Purpose:** AI-powered global ambassador feature for enhanced user interactions  
**Reason for being inactive:** Feature was prototyped but not integrated into the main application  
**Action:** Keep for future reference or remove if not planning to implement

## Recommendation

If these features are not planned for implementation in the near future, consider:
1. Moving them to a separate `experimental/` or `archive/` directory
2. Or removing them entirely to reduce repository clutter
3. Or documenting them more thoroughly if they represent future roadmap items

## Console Logging Note

Both files contain console.log statements that would appear in production if activated. If reactivating these files, wrap console statements in development checks:

```javascript
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Debug message');
}
```
