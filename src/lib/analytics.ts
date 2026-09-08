'use client';

import { sendGAEvent } from '@next/third-parties/google';

/**
 * Universal event tracker for Google Analytics 4 (GA4).
 * Safely fires custom events without throwing errors in dev or test environments.
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  try {
    if (typeof window !== 'undefined') {
      sendGAEvent('event', action, params || {});
      if (process.env.NODE_ENV === 'development') {
        console.log(`[GA4 Event Logged] ${action}`, params);
      }
    }
  } catch (err) {
    console.debug('Analytics dispatch skipped:', err);
  }
}
