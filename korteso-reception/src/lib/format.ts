/**
 * Fonctions de formatage. Le fuseau horaire est fixé à America/Toronto pour
 * garantir un rendu identique côté serveur et côté client (pas d’écart
 * d’hydratation), quel que soit l’environnement d’exécution.
 */

const TIME_ZONE = "America/Toronto";
const LOCALE = "fr-CA";

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: "medium",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: TIME_ZONE,
  }).format(new Date(iso));
}

export function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  if (min === 0) return `${sec} s`;
  return `${min} min ${sec.toString().padStart(2, "0")} s`;
}

export function formatCurrencyCad(amount: number): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function fullName(person: { firstName: string; lastName: string }): string {
  return `${person.firstName} ${person.lastName}`;
}
