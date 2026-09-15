/**
 * Centralized contact links for Codex Hub.
 *
 * IMPORTANT: phone numbers are NEVER displayed in the UI — only WhatsApp
 * buttons that open a chat with a pre-filled message.
 */

const WHATSAPP_NUMBER = "33768157848"; // internal use only, never displayed

/** Default pre-filled WhatsApp message. */
export const WHATSAPP_DEFAULT_MESSAGE = "Bonjour. Comment on peut vous aider ?";

/** Pre-filled message for the reseller program. */
export const WHATSAPP_RESELLER_MESSAGE =
  "Bonjour. Comment on peut vous aider ? Je souhaite devenir revendeur partenaire Codex Hub. Mon profil : [décrivez votre activité]";

/** Standard WhatsApp link with the default greeting message. */
export const WHATSAPP_URL =
  "https://wa.me/" +
  WHATSAPP_NUMBER +
  "?text=" +
  encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE);

/** WhatsApp link for the reseller program. */
export const WHATSAPP_RESELLER_URL =
  "https://wa.me/" +
  WHATSAPP_NUMBER +
  "?text=" +
  encodeURIComponent(WHATSAPP_RESELLER_MESSAGE);

export const EMAIL = "contacte.terra.codex@gmail.com";
export const CARD_URL = "https://url-terra-codex.abacusai.app/carte-visite-terra-codex/BBmoIa3h";
