/**
 * Modèles de données de KORTESO Réception.
 *
 * Ces types représentent le contrat de données de la plateforme. En phase 1,
 * ils sont alimentés par les données de démonstration de `src/data`. En phase 2,
 * ils seront branchés sur une base de données (Supabase) sans changer les pages.
 *
 * Conventions :
 * - toute entité importante possède un identifiant, une date de création,
 *   une date de modification et un statut;
 * - les entités appartenant à une organisation portent `organizationId`,
 *   ce qui préparera les permissions par rôle et l’isolation des données;
 * - les dates sont des chaînes ISO 8601;
 * - aucune donnée médicale ou diagnostique n’est modélisée : seules des
 *   informations administratives (coordonnées, motifs généraux) circulent.
 */

export type ID = string;

/** Champs communs à toutes les entités persistées. */
export interface BaseEntity {
  id: ID;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/** Entité rattachée à une organisation propriétaire (multi-locataire). */
export interface OwnedEntity extends BaseEntity {
  organizationId: ID;
}

/* ------------------------------------------------------------------ */
/* Utilisateurs et organisations                                       */
/* ------------------------------------------------------------------ */

/** Les trois rôles prévus. L’authentification réelle arrivera en phase 2. */
export type UserRole = "korteso_admin" | "korteso_employe" | "client_clinique";

export type UserStatus = "actif" | "inactif" | "invite";

export interface User extends BaseEntity {
  organizationId: ID;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  title?: string;
}

export type OrganizationType = "korteso" | "clinique";

export type OrganizationStatus = "actif" | "prospect" | "suspendu" | "archive";

/**
 * Une organisation cliente peut posséder plusieurs établissements (cliniques).
 */
export interface Organization extends BaseEntity {
  name: string;
  type: OrganizationType;
  status: OrganizationStatus;
  city: string;
  province: string;
  clinicIds: ID[];
}

/* ------------------------------------------------------------------ */
/* CRM : prospects et pipeline                                         */
/* ------------------------------------------------------------------ */

/** Les statuts du prospect sont aussi les étapes du pipeline de vente. */
export type ProspectStatus =
  | "nouveau"
  | "a_verifier"
  | "pret_a_contacter"
  | "contacte"
  | "interesse"
  | "demonstration"
  | "proposition_envoyee"
  | "gagne"
  | "perdu";

export type Sector =
  | "clinique_auditive"
  | "centre_auditif"
  | "audioprothesiste"
  | "sante_auditive_autre";

export interface Prospect extends BaseEntity {
  companyName: string;
  sector: Sector;
  city: string;
  decisionMaker: string;
  phone: string;
  email: string;
  website: string;
  status: ProspectStatus;
  /** Score de qualité de 0 à 100. */
  qualityScore: number;
  lastInteractionAt: string | null;
  nextAction: string;
  nextActionAt: string | null;
  /** Responsable KORTESO du dossier. */
  ownerUserId: ID;
  notes: string;
}

/* ------------------------------------------------------------------ */
/* Cliniques clientes                                                  */
/* ------------------------------------------------------------------ */

export type ClinicInstallationStatus =
  | "en_preparation"
  | "installation"
  | "en_test"
  | "actif"
  | "suspendu";

export interface ClinicOpeningHours {
  day: string;
  /** `null` = fermé ce jour-là. */
  open: string | null;
  close: string | null;
}

export interface ClinicContact {
  name: string;
  roleTitle: string;
  phone: string;
  email: string;
}

export interface TransferNumber {
  label: string;
  phone: string;
  /** Condition de transfert, ex. « urgence appareil » ou « demande de facturation ». */
  when: string;
}

export interface ClinicFaqEntry {
  question: string;
  answer: string;
}

export interface ClinicHistoryEntry {
  date: string;
  author: string;
  description: string;
}

export interface ClinicCallStats {
  callsThisMonth: number;
  missedThisMonth: number;
  appointmentRequestsThisMonth: number;
  transfersThisMonth: number;
  averageDurationSeconds: number;
}

export interface Clinic extends OwnedEntity {
  name: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  installationStatus: ClinicInstallationStatus;
  plan: SubscriptionPlan;
  calendarConnected: boolean;
  agentActive: boolean;
  /** Volume d’appels mensuel approximatif. */
  monthlyCallVolume: number;
  launchedAt: string | null;
  /** Responsable KORTESO du compte. */
  ownerUserId: ID;
  openingHours: ClinicOpeningHours[];
  services: string[];
  transferNumbers: TransferNumber[];
  contacts: ClinicContact[];
  faq: ClinicFaqEntry[];
  history: ClinicHistoryEntry[];
  stats: ClinicCallStats;
}

/* ------------------------------------------------------------------ */
/* Agent vocal                                                         */
/* ------------------------------------------------------------------ */

export type VoiceProviderStatus = "non_configure" | "bientot_disponible";

/**
 * Configuration de l’agent vocal d’une clinique. Aucun fournisseur réel n’est
 * branché en phase 1 : `providerStatus` reste « non_configure ».
 */
export interface VoiceAgentConfiguration extends OwnedEntity {
  clinicId: ID;
  language: "fr-CA" | "en-CA";
  greeting: string;
  /** Ce que l’agent est autorisé à faire. */
  allowedTasks: string[];
  /** Sujets que l’agent doit refuser et rediriger vers un humain. */
  restrictedTopics: string[];
  /** Règles d’escalade vers un humain. */
  escalationRules: string[];
  provider: string | null;
  providerStatus: VoiceProviderStatus;
  status: "brouillon" | "valide";
}

/* ------------------------------------------------------------------ */
/* Appels                                                              */
/* ------------------------------------------------------------------ */

export type CallRequestType =
  | "prise_rendez_vous"
  | "information_generale"
  | "probleme_appareil"
  | "annulation"
  | "suivi_commande"
  | "autre";

export type CallOutcome =
  | "rendez_vous_demande"
  | "information_transmise"
  | "transfert_effectue"
  | "message_pris"
  | "appel_manque"
  | "abandon";

export type CallPriority = "faible" | "normale" | "elevee";

export interface TranscriptTurn {
  speaker: "agent" | "appelant";
  text: string;
}

export interface Call extends OwnedEntity {
  clinicId: ID;
  startedAt: string;
  durationSeconds: number;
  callerName: string;
  callerPhone: string;
  requestType: CallRequestType;
  outcome: CallOutcome;
  priority: CallPriority;
  summary: string;
  appointmentRequested: boolean;
  transferred: boolean;
  followUpRequired: boolean;
  appointmentRequestId: ID | null;
  /** Transcription fictive courte (démonstration seulement). */
  transcript: TranscriptTurn[];
}

/* ------------------------------------------------------------------ */
/* Demandes de rendez-vous                                             */
/* ------------------------------------------------------------------ */

/**
 * Une demande de rendez-vous n’est jamais un rendez-vous confirmé :
 * elle doit être validée par la clinique avant de passer au statut « confirme ».
 */
export type AppointmentRequestStatus =
  | "nouveau"
  | "a_confirmer"
  | "confirme"
  | "replanification_demandee"
  | "annule"
  | "termine";

export type AppointmentSource =
  | "agent_vocal"
  | "telephone"
  | "site_web"
  | "reference";

export interface AppointmentRequest extends OwnedEntity {
  clinicId: ID;
  callId: ID | null;
  callerName: string;
  phone: string;
  serviceRequested: string;
  /** Date et plage souhaitées, à confirmer par la clinique. */
  preferredDate: string;
  status: AppointmentRequestStatus;
  source: AppointmentSource;
  notes: string;
  /** Personne responsable du suivi. */
  followUpUserId: ID;
}

/* ------------------------------------------------------------------ */
/* Tâches et notifications                                             */
/* ------------------------------------------------------------------ */

export type TaskStatus = "a_faire" | "en_cours" | "terminee";

export type TaskPriority = "faible" | "normale" | "elevee";

export interface TaskLink {
  type: "prospect" | "clinique" | "appel" | "rendez_vous";
  id: ID;
  label: string;
}

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  dueAt: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeUserId: ID;
  relatedTo?: TaskLink;
}

export type NotificationSeverity = "info" | "attention" | "critique";

export interface Notification extends BaseEntity {
  severity: NotificationSeverity;
  title: string;
  message: string;
  read: boolean;
  targetUserId?: ID;
}

/* ------------------------------------------------------------------ */
/* Abonnements                                                         */
/* ------------------------------------------------------------------ */

export type SubscriptionPlan = "essentiel" | "professionnel" | "premium";

export type SubscriptionStatus = "essai" | "actif" | "suspendu" | "annule";

export interface Subscription extends OwnedEntity {
  clinicId: ID;
  plan: SubscriptionPlan;
  monthlyPriceCad: number;
  status: SubscriptionStatus;
  startedAt: string;
  /** La facturation réelle (Stripe) arrivera en phase 5. */
  billingStatus: "non_configuree";
}
