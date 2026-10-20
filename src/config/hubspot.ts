/* --------------------------------------------------------------------------
   HubSpot form configuration.

   Values come from environment variables so the IDs are not hard-coded into
   the components. Astro only exposes vars prefixed with PUBLIC_ to the
   browser, which is what the HubSpot embed script needs — these three values
   are not secrets (they are visible in any HubSpot embed code).

   Set them in a .env file at the project root — see .env.example.
   -------------------------------------------------------------------------- */

export const hubspot = {
  /** HubSpot account / portal ID, e.g. "12345678". */
  portalId: import.meta.env.PUBLIC_HUBSPOT_PORTAL_ID ?? '',
  /** GUID of the "Book a Demo" form, e.g. "0f0ab1c2-...". */
  formId: import.meta.env.PUBLIC_HUBSPOT_FORM_ID ?? '',
  /** Data-hosting region of the HubSpot account: na1 | eu1 | na2 ... */
  region: import.meta.env.PUBLIC_HUBSPOT_REGION ?? 'na1',
  /**
   * Internal name of an optional HubSpot property used to record which plan
   * the visitor clicked from (Pricing CTAs). If the field is not on the form
   * the value is silently ignored.
   */
  planFieldName: import.meta.env.PUBLIC_HUBSPOT_PLAN_FIELD ?? 'plan_interest',
};

/** True once a portal ID and form ID are present. */
export const hubspotConfigured = Boolean(hubspot.portalId && hubspot.formId);

/** Fallback address shown if the HubSpot script is blocked or unconfigured. */
export const salesEmail = import.meta.env.PUBLIC_SALES_EMAIL ?? 'sales@pawnbrokeros.com';
