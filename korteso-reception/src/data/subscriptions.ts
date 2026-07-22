import type { Subscription } from "@/types";

/** Données fictives — voir src/data/README.md */
export const subscriptions: Subscription[] = [
  {
    id: "sub-001",
    organizationId: "org-boreale",
    clinicId: "cl-001",
    plan: "professionnel",
    monthlyPriceCad: 495,
    status: "actif",
    startedAt: "2026-05-04T12:00:00Z",
    billingStatus: "non_configuree",
    createdAt: "2026-05-04T12:00:00Z",
    updatedAt: "2026-07-01T12:00:00Z",
  },
  {
    id: "sub-002",
    organizationId: "org-boreale",
    clinicId: "cl-002",
    plan: "professionnel",
    monthlyPriceCad: 495,
    status: "essai",
    startedAt: "2026-07-12T13:00:00Z",
    billingStatus: "non_configuree",
    createdAt: "2026-07-12T13:00:00Z",
    updatedAt: "2026-07-12T13:00:00Z",
  },
  {
    id: "sub-003",
    organizationId: "org-plateau",
    clinicId: "cl-003",
    plan: "professionnel",
    monthlyPriceCad: 495,
    status: "essai",
    startedAt: "2026-07-11T15:05:00Z",
    billingStatus: "non_configuree",
    createdAt: "2026-07-11T15:05:00Z",
    updatedAt: "2026-07-11T15:05:00Z",
  },
];
