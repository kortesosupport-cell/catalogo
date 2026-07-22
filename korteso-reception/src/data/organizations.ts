import type { Organization } from "@/types";

/** Données fictives — voir src/data/README.md */
export const organizations: Organization[] = [
  {
    id: "org-korteso",
    name: "KORTESO",
    type: "korteso",
    status: "actif",
    city: "Québec",
    province: "QC",
    clinicIds: [],
    createdAt: "2025-11-03T14:00:00Z",
    updatedAt: "2026-07-10T13:30:00Z",
  },
  {
    id: "org-boreale",
    name: "Groupe Audition Boréale inc.",
    type: "clinique",
    status: "actif",
    city: "Québec",
    province: "QC",
    // Une organisation peut posséder plusieurs établissements.
    clinicIds: ["cl-001", "cl-002"],
    createdAt: "2026-03-12T15:00:00Z",
    updatedAt: "2026-07-15T18:20:00Z",
  },
  {
    id: "org-plateau",
    name: "Centre Auditif du Plateau inc.",
    type: "clinique",
    status: "actif",
    city: "Montréal",
    province: "QC",
    clinicIds: ["cl-003"],
    createdAt: "2026-05-28T16:00:00Z",
    updatedAt: "2026-07-18T14:45:00Z",
  },
];
