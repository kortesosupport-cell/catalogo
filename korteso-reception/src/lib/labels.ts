import type {
  AppointmentRequestStatus,
  AppointmentSource,
  CallOutcome,
  CallPriority,
  CallRequestType,
  ClinicInstallationStatus,
  NotificationSeverity,
  ProspectStatus,
  Sector,
  SubscriptionPlan,
  TaskPriority,
  UserRole,
} from "@/types";

/** Teintes visuelles disponibles pour le composant Badge. */
export type BadgeTone =
  | "neutral"
  | "blue"
  | "green"
  | "amber"
  | "red"
  | "violet"
  | "slate";

export const prospectStatusLabels: Record<ProspectStatus, string> = {
  nouveau: "Nouveau",
  a_verifier: "À vérifier",
  pret_a_contacter: "Prêt à contacter",
  contacte: "Contacté",
  interesse: "Intéressé",
  demonstration: "Démonstration",
  proposition_envoyee: "Proposition envoyée",
  gagne: "Gagné",
  perdu: "Perdu",
};

export const prospectStatusTones: Record<ProspectStatus, BadgeTone> = {
  nouveau: "blue",
  a_verifier: "slate",
  pret_a_contacter: "violet",
  contacte: "neutral",
  interesse: "amber",
  demonstration: "violet",
  proposition_envoyee: "blue",
  gagne: "green",
  perdu: "red",
};

/** Ordre officiel des étapes du pipeline de vente. */
export const pipelineStages: ProspectStatus[] = [
  "nouveau",
  "a_verifier",
  "pret_a_contacter",
  "contacte",
  "interesse",
  "demonstration",
  "proposition_envoyee",
  "gagne",
  "perdu",
];

export const sectorLabels: Record<Sector, string> = {
  clinique_auditive: "Clinique auditive",
  centre_auditif: "Centre auditif",
  audioprothesiste: "Audioprothésiste",
  sante_auditive_autre: "Santé auditive — autre",
};

export const clinicInstallationLabels: Record<ClinicInstallationStatus, string> = {
  en_preparation: "En préparation",
  installation: "Installation",
  en_test: "En test",
  actif: "Actif",
  suspendu: "Suspendu",
};

export const clinicInstallationTones: Record<ClinicInstallationStatus, BadgeTone> = {
  en_preparation: "slate",
  installation: "amber",
  en_test: "violet",
  actif: "green",
  suspendu: "red",
};

export const planLabels: Record<SubscriptionPlan, string> = {
  essentiel: "Essentiel",
  professionnel: "Professionnel",
  premium: "Premium",
};

export const callRequestTypeLabels: Record<CallRequestType, string> = {
  prise_rendez_vous: "Prise de rendez-vous",
  information_generale: "Information générale",
  probleme_appareil: "Problème d’appareil",
  annulation: "Annulation",
  suivi_commande: "Suivi de commande",
  autre: "Autre",
};

export const callOutcomeLabels: Record<CallOutcome, string> = {
  rendez_vous_demande: "Rendez-vous demandé",
  information_transmise: "Information transmise",
  transfert_effectue: "Transfert effectué",
  message_pris: "Message pris",
  appel_manque: "Appel manqué",
  abandon: "Abandon",
};

export const callOutcomeTones: Record<CallOutcome, BadgeTone> = {
  rendez_vous_demande: "green",
  information_transmise: "blue",
  transfert_effectue: "violet",
  message_pris: "slate",
  appel_manque: "red",
  abandon: "amber",
};

export const callPriorityLabels: Record<CallPriority, string> = {
  faible: "Faible",
  normale: "Normale",
  elevee: "Élevée",
};

export const callPriorityTones: Record<CallPriority, BadgeTone> = {
  faible: "neutral",
  normale: "blue",
  elevee: "red",
};

export const appointmentStatusLabels: Record<AppointmentRequestStatus, string> = {
  nouveau: "Nouveau",
  a_confirmer: "À confirmer",
  confirme: "Confirmé",
  replanification_demandee: "Replanification demandée",
  annule: "Annulé",
  termine: "Terminé",
};

export const appointmentStatusTones: Record<AppointmentRequestStatus, BadgeTone> = {
  nouveau: "blue",
  a_confirmer: "amber",
  confirme: "green",
  replanification_demandee: "violet",
  annule: "red",
  termine: "slate",
};

export const appointmentSourceLabels: Record<AppointmentSource, string> = {
  agent_vocal: "Agent vocal",
  telephone: "Téléphone",
  site_web: "Site web",
  reference: "Référence",
};

export const taskPriorityLabels: Record<TaskPriority, string> = {
  faible: "Faible",
  normale: "Normale",
  elevee: "Élevée",
};

export const taskPriorityTones: Record<TaskPriority, BadgeTone> = {
  faible: "neutral",
  normale: "blue",
  elevee: "red",
};

export const notificationSeverityTones: Record<NotificationSeverity, BadgeTone> = {
  info: "blue",
  attention: "amber",
  critique: "red",
};

export const userRoleLabels: Record<UserRole, string> = {
  korteso_admin: "Administrateur KORTESO",
  korteso_employe: "Employé KORTESO",
  client_clinique: "Client clinique",
};
