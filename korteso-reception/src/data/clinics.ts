import type { Clinic } from "@/types";

const weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"] as const;

function standardHours(open: string, close: string) {
  return [
    ...weekdays.map((day) => ({ day, open, close })),
    { day: "Samedi", open: null, close: null },
    { day: "Dimanche", open: null, close: null },
  ];
}

/** Données fictives — voir src/data/README.md */
export const clinics: Clinic[] = [
  {
    id: "cl-001",
    organizationId: "org-boreale",
    name: "Clinique Auditive Boréale — Québec",
    city: "Québec",
    province: "QC",
    address: "1240, avenue des Pins Gris, Québec (QC) G1V 0A0",
    phone: "(418) 555-0102",
    installationStatus: "actif",
    plan: "professionnel",
    calendarConnected: true,
    agentActive: true,
    monthlyCallVolume: 320,
    launchedAt: "2026-05-04T12:00:00Z",
    ownerUserId: "u-002",
    openingHours: standardHours("8 h 30", "16 h 30"),
    services: [
      "Évaluation des besoins auditifs",
      "Ajustement d’appareils auditifs",
      "Réparation et entretien d’appareils",
      "Vente de piles et d’accessoires",
      "Suivi annuel",
    ],
    transferNumbers: [
      {
        label: "Réception (ligne interne)",
        phone: "(418) 555-0103",
        when: "Demande complexe ou appelant qui insiste pour parler à un humain",
      },
      {
        label: "Direction",
        phone: "(418) 555-0104",
        when: "Plainte ou question de facturation",
      },
    ],
    contacts: [
      {
        name: "Martin Bélisle",
        roleTitle: "Directeur général",
        phone: "(418) 555-0104",
        email: "direction@auditionboreale.example",
      },
      {
        name: "Sophie Nadeau",
        roleTitle: "Coordonnatrice de la réception",
        phone: "(418) 555-0103",
        email: "reception.quebec@auditionboreale.example",
      },
    ],
    faq: [
      {
        question: "Offrez-vous des consultations sans rendez-vous ?",
        answer:
          "Non. L’agent propose de prendre les coordonnées et une plage de disponibilité, puis la clinique confirme le rendez-vous.",
      },
      {
        question: "Vendez-vous des piles pour tous les modèles ?",
        answer: "Oui, formats 10, 13, 312 et 675, en boutique seulement.",
      },
      {
        question: "Faites-vous des visites à domicile ?",
        answer: "Oui, dans un rayon de 25 km, selon la disponibilité de l’équipe.",
      },
    ],
    history: [
      {
        date: "2026-07-15T18:20:00Z",
        author: "Julie Lavoie",
        description: "Ajout d’un numéro de transfert pour la direction.",
      },
      {
        date: "2026-06-10T14:00:00Z",
        author: "Julie Lavoie",
        description: "Mise à jour des heures d’ouverture pour l’été.",
      },
      {
        date: "2026-05-04T12:00:00Z",
        author: "Alexandre Fortin",
        description: "Mise en service de l’agent (lancement officiel).",
      },
    ],
    stats: {
      callsThisMonth: 214,
      missedThisMonth: 6,
      appointmentRequestsThisMonth: 58,
      transfersThisMonth: 19,
      averageDurationSeconds: 138,
    },
    createdAt: "2026-03-12T15:00:00Z",
    updatedAt: "2026-07-15T18:20:00Z",
  },
  {
    id: "cl-002",
    organizationId: "org-boreale",
    name: "Clinique Auditive Boréale — Lévis",
    city: "Lévis",
    province: "QC",
    address: "88, rue du Traversier, Lévis (QC) G6V 0B1",
    phone: "(418) 555-0106",
    installationStatus: "en_test",
    plan: "professionnel",
    calendarConnected: true,
    agentActive: false,
    monthlyCallVolume: 180,
    launchedAt: null,
    ownerUserId: "u-002",
    openingHours: standardHours("9 h", "17 h"),
    services: [
      "Évaluation des besoins auditifs",
      "Ajustement d’appareils auditifs",
      "Vente de piles et d’accessoires",
    ],
    transferNumbers: [
      {
        label: "Réception (ligne interne)",
        phone: "(418) 555-0107",
        when: "Toute demande pendant la période de test",
      },
    ],
    contacts: [
      {
        name: "Martin Bélisle",
        roleTitle: "Directeur général",
        phone: "(418) 555-0104",
        email: "direction@auditionboreale.example",
      },
      {
        name: "Karine Ouellet",
        roleTitle: "Réceptionniste",
        phone: "(418) 555-0107",
        email: "reception.levis@auditionboreale.example",
      },
    ],
    faq: [
      {
        question: "Êtes-vous ouverts le samedi ?",
        answer: "Non, la succursale de Lévis est ouverte du lundi au vendredi seulement.",
      },
    ],
    history: [
      {
        date: "2026-07-12T13:00:00Z",
        author: "Julie Lavoie",
        description: "Début de la période de test interne (appels simulés).",
      },
      {
        date: "2026-06-28T15:30:00Z",
        author: "Julie Lavoie",
        description: "Création de la fiche et importation des services.",
      },
    ],
    stats: {
      callsThisMonth: 42,
      missedThisMonth: 3,
      appointmentRequestsThisMonth: 9,
      transfersThisMonth: 11,
      averageDurationSeconds: 121,
    },
    createdAt: "2026-06-28T15:30:00Z",
    updatedAt: "2026-07-12T13:00:00Z",
  },
  {
    id: "cl-003",
    organizationId: "org-plateau",
    name: "Centre Auditif du Plateau",
    city: "Montréal",
    province: "QC",
    address: "4520, rue des Érables Bleus, Montréal (QC) H2H 0C2",
    phone: "(514) 555-0118",
    installationStatus: "installation",
    plan: "professionnel",
    calendarConnected: false,
    agentActive: false,
    monthlyCallVolume: 260,
    launchedAt: null,
    ownerUserId: "u-001",
    openingHours: standardHours("8 h", "18 h"),
    services: [
      "Évaluation des besoins auditifs",
      "Ajustement d’appareils auditifs",
      "Protection auditive sur mesure",
      "Réparation et entretien d’appareils",
    ],
    transferNumbers: [
      {
        label: "Réception (ligne interne)",
        phone: "(514) 555-0120",
        when: "À définir pendant l’installation",
      },
    ],
    contacts: [
      {
        name: "Hélène Vaillancourt",
        roleTitle: "Propriétaire",
        phone: "(514) 555-0119",
        email: "hvaillancourt@auditifplateau.example",
      },
    ],
    faq: [],
    history: [
      {
        date: "2026-07-18T14:45:00Z",
        author: "Julie Lavoie",
        description: "Collecte des heures d’ouverture et des services.",
      },
      {
        date: "2026-07-11T15:05:00Z",
        author: "Alexandre Fortin",
        description: "Ouverture du dossier client après la signature du contrat.",
      },
    ],
    stats: {
      callsThisMonth: 0,
      missedThisMonth: 0,
      appointmentRequestsThisMonth: 0,
      transfersThisMonth: 0,
      averageDurationSeconds: 0,
    },
    createdAt: "2026-07-11T15:05:00Z",
    updatedAt: "2026-07-18T14:45:00Z",
  },
];
