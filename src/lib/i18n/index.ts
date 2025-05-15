// filepath: src/lib/i18n/index.ts
// Simple i18n system, default to French
import fr from './fr';

const translations = {
  fr
};

// Current locale (only 'fr' for now)
const locale = 'fr';

/**
 * Translate a key, or return the key if not found
 */
export function t(key: keyof typeof fr): string {
  const dict = translations[locale] || {};
  return dict[key] || key;
}
