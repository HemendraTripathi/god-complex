/** GA4 measurement ID — set NEXT_PUBLIC_GA_MEASUREMENT_ID (starts with G-). */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;
