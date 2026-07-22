import type { VoiceAgentConfiguration } from "@/types";

/**
 * Données fictives — voir src/data/README.md
 * Aucun fournisseur vocal n’est branché en phase 1 : ces configurations sont
 * préparées à l’avance et resteront « non configurées » jusqu’à la phase 3.
 */
export const voiceAgentConfigurations: VoiceAgentConfiguration[] = [
  {
    id: "vac-001",
    organizationId: "org-boreale",
    clinicId: "cl-001",
    language: "fr-CA",
    greeting: "Clinique Auditive Boréale, bonjour ! Comment puis-je vous aider ?",
    allowedTasks: [
      "Recueillir les coordonnées de l’appelant",
      "Prendre une demande de rendez-vous (sans la confirmer)",
      "Répondre aux questions de la FAQ",
      "Prendre un message pour la réception",
      "Transférer un appel selon les règles établies",
    ],
    restrictedTopics: [
      "Conseils médicaux ou interprétation de résultats",
      "Diagnostics ou état de santé",
      "Prix négociés ou rabais",
      "Renseignements sur d’autres patients",
    ],
    escalationRules: [
      "Urgence liée à un appareil : transfert immédiat à la réception",
      "Appelant qui demande un humain : transfert sans insister",
      "Plainte ou facturation : transfert à la direction",
    ],
    provider: null,
    providerStatus: "non_configure",
    status: "valide",
    createdAt: "2026-04-20T14:00:00Z",
    updatedAt: "2026-07-15T18:20:00Z",
  },
  {
    id: "vac-002",
    organizationId: "org-boreale",
    clinicId: "cl-002",
    language: "fr-CA",
    greeting: "Clinique Auditive Boréale à Lévis, bonjour !",
    allowedTasks: [
      "Recueillir les coordonnées de l’appelant",
      "Prendre une demande de rendez-vous (sans la confirmer)",
      "Répondre aux questions de la FAQ",
    ],
    restrictedTopics: [
      "Conseils médicaux ou interprétation de résultats",
      "Diagnostics ou état de santé",
    ],
    escalationRules: ["Toute demande complexe : transfert à la réception pendant la période de test"],
    provider: null,
    providerStatus: "non_configure",
    status: "brouillon",
    createdAt: "2026-06-28T15:35:00Z",
    updatedAt: "2026-07-12T13:00:00Z",
  },
  {
    id: "vac-003",
    organizationId: "org-plateau",
    clinicId: "cl-003",
    language: "fr-CA",
    greeting: "Centre Auditif du Plateau, bonjour !",
    allowedTasks: ["À définir pendant l’installation"],
    restrictedTopics: [
      "Conseils médicaux ou interprétation de résultats",
      "Diagnostics ou état de santé",
    ],
    escalationRules: ["À définir pendant l’installation"],
    provider: null,
    providerStatus: "non_configure",
    status: "brouillon",
    createdAt: "2026-07-11T15:10:00Z",
    updatedAt: "2026-07-18T14:45:00Z",
  },
];
