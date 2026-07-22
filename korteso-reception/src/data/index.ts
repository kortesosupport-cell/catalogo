/**
 * Point d’entrée des données de démonstration (phase 1).
 * En phase 2, ce module sera remplacé par une couche d’accès à la base de
 * données exposant les mêmes fonctions.
 */
import type { Call, Clinic, Prospect, User } from "@/types";

import { appointmentRequests } from "./appointments";
import { calls } from "./calls";
import { clinics } from "./clinics";
import { notifications } from "./notifications";
import { organizations } from "./organizations";
import { prospects } from "./prospects";
import { subscriptions } from "./subscriptions";
import { tasks } from "./tasks";
import { currentUser, users } from "./users";
import { voiceAgentConfigurations } from "./voice-agents";

export {
  appointmentRequests,
  calls,
  clinics,
  currentUser,
  notifications,
  organizations,
  prospects,
  subscriptions,
  tasks,
  users,
  voiceAgentConfigurations,
};

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getClinicById(id: string): Clinic | undefined {
  return clinics.find((c) => c.id === id);
}

export function getCallById(id: string): Call | undefined {
  return calls.find((c) => c.id === id);
}

export function getProspectById(id: string): Prospect | undefined {
  return prospects.find((p) => p.id === id);
}

export function getCallsByClinic(clinicId: string): Call[] {
  return calls.filter((c) => c.clinicId === clinicId);
}

export function getVoiceAgentConfigurationByClinic(clinicId: string) {
  return voiceAgentConfigurations.find((v) => v.clinicId === clinicId);
}

export function getAppointmentRequestsByClinic(clinicId: string) {
  return appointmentRequests.filter((a) => a.clinicId === clinicId);
}

/** Indicateurs agrégés affichés au tableau de bord. */
export function getDashboardMetrics() {
  const newProspects = prospects.filter((p) =>
    ["nouveau", "a_verifier", "pret_a_contacter"].includes(p.status)
  ).length;
  const followUps = tasks.filter((t) => t.status !== "terminee").length;
  const demos = prospects.filter((p) => p.status === "demonstration").length;
  const activeClinics = clinics.length;
  const callsReceived = calls.length;
  const missedCalls = calls.filter((c) => c.outcome === "appel_manque").length;
  const appointmentsRequested = appointmentRequests.length;
  const monthlyRecurringRevenue = subscriptions
    .filter((s) => s.status === "actif")
    .reduce((sum, s) => sum + s.monthlyPriceCad, 0);

  return {
    newProspects,
    followUps,
    demos,
    activeClinics,
    callsReceived,
    missedCalls,
    appointmentsRequested,
    monthlyRecurringRevenue,
  };
}
