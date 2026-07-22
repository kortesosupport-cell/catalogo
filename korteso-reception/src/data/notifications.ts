import type { Notification } from "@/types";

/** Données fictives — voir src/data/README.md */
export const notifications: Notification[] = [
  {
    id: "notif-001",
    severity: "critique",
    title: "Suivi urgent : problème d’appareil",
    message:
      "L’appel de Gaston Lemieux (21 juillet) exige un suivi avant samedi. Le transfert a été effectué, mais la réception doit confirmer la prise en charge.",
    read: false,
    targetUserId: "u-002",
    createdAt: "2026-07-21T16:15:00Z",
    updatedAt: "2026-07-21T16:15:00Z",
  },
  {
    id: "notif-002",
    severity: "attention",
    title: "Calendrier non connecté — Centre Auditif du Plateau",
    message:
      "L’installation ne peut pas passer en période de test tant que le calendrier n’est pas connecté.",
    read: false,
    targetUserId: "u-002",
    createdAt: "2026-07-18T15:00:00Z",
    updatedAt: "2026-07-18T15:00:00Z",
  },
  {
    id: "notif-003",
    severity: "attention",
    title: "Appel manqué à la Clinique Auditive Boréale — Québec",
    message: "Un appel a été manqué le 20 juillet pendant la fenêtre de maintenance. Aucun message laissé.",
    read: false,
    targetUserId: "u-002",
    createdAt: "2026-07-20T16:05:00Z",
    updatedAt: "2026-07-20T16:05:00Z",
  },
  {
    id: "notif-004",
    severity: "info",
    title: "Démonstration confirmée — Centre de l’Ouïe Trois-Rivières",
    message: "La démonstration aura lieu le 23 juillet à 14 h (heure de l’Est).",
    read: true,
    targetUserId: "u-001",
    createdAt: "2026-07-18T19:15:00Z",
    updatedAt: "2026-07-19T12:00:00Z",
  },
];
