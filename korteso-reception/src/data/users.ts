import type { User } from "@/types";

/** Données fictives — voir src/data/README.md */
export const users: User[] = [
  {
    id: "u-001",
    organizationId: "org-korteso",
    firstName: "Alexandre",
    lastName: "Fortin",
    email: "alexandre.fortin@korteso.example",
    role: "korteso_admin",
    status: "actif",
    title: "Fondateur",
    createdAt: "2025-11-03T14:05:00Z",
    updatedAt: "2026-06-01T12:00:00Z",
  },
  {
    id: "u-002",
    organizationId: "org-korteso",
    firstName: "Julie",
    lastName: "Lavoie",
    email: "julie.lavoie@korteso.example",
    role: "korteso_employe",
    status: "actif",
    title: "Responsable des installations",
    createdAt: "2026-02-10T14:00:00Z",
    updatedAt: "2026-06-15T15:30:00Z",
  },
  {
    id: "u-003",
    organizationId: "org-boreale",
    firstName: "Martin",
    lastName: "Bélisle",
    email: "direction@auditionboreale.example",
    role: "client_clinique",
    status: "actif",
    title: "Directeur général",
    createdAt: "2026-03-12T15:10:00Z",
    updatedAt: "2026-07-02T13:00:00Z",
  },
];

/** Utilisateur affiché dans l’interface en attendant l’authentification (phase 2). */
export const currentUser: User = users[0];
