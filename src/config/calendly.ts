/* --------------------------------------------------------------------------
   Calendly configuration.

   When you have your real Calendly event link, you can either:
   1. Set PUBLIC_CALENDLY_URL in your .env file:
      PUBLIC_CALENDLY_URL="https://calendly.com/your-team/30min"
   2. Or replace the fallback URL below directly.
   -------------------------------------------------------------------------- */

export const calendly = {
  /**
   * The live Calendly event link.
   * Placeholder until provided by client.
   */
  url: import.meta.env.PUBLIC_CALENDLY_URL || 'https://calendly.com/pawnbrokeros-info/30min',

  /** Fallback contact email */
  salesEmail: import.meta.env.PUBLIC_SALES_EMAIL || 'info@pawnbrokeros.com',
};
