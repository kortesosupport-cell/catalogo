import Link from "next/link";

import { calls, getClinicById } from "@/data";
import { formatDateTime, formatDuration } from "@/lib/format";
import {
  callOutcomeLabels,
  callOutcomeTones,
  callPriorityLabels,
  callPriorityTones,
  callRequestTypeLabels,
} from "@/lib/labels";
import { Badge, DemoNotice, PageHeader, Table } from "@/components/ui";

export const metadata = { title: "Appels" };

export default function AppelsPage() {
  const sorted = [...calls].sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  return (
    <>
      <PageHeader
        title="Journal des appels"
        subtitle="Tous les appels traités par l’agent vocal des cliniques clientes."
      />
      <DemoNotice className="mb-6" />

      <Table
        head={[
          "Date et heure",
          "Clinique",
          "Appelant",
          "Durée",
          "Type de demande",
          "Résultat",
          "Priorité",
          "Rendez-vous",
          "Transfert",
          "Suivi requis",
        ]}
      >
        {sorted.map((call) => {
          const clinic = getClinicById(call.clinicId);
          return (
            <tr key={call.id} className="align-top hover:bg-zinc-50/70">
              <td className="px-4 py-3">
                <Link
                  href={`/appels/${call.id}`}
                  className="font-medium text-brand-600 hover:text-brand-500"
                >
                  {formatDateTime(call.startedAt)}
                </Link>
              </td>
              <td className="px-4 py-3 text-zinc-600">{clinic?.name ?? "—"}</td>
              <td className="px-4 py-3">
                <p className="text-zinc-800">{call.callerName}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{call.callerPhone}</p>
              </td>
              <td className="px-4 py-3 text-zinc-600">
                {call.durationSeconds > 0 ? formatDuration(call.durationSeconds) : "—"}
              </td>
              <td className="px-4 py-3 text-zinc-600">{callRequestTypeLabels[call.requestType]}</td>
              <td className="px-4 py-3">
                <Badge tone={callOutcomeTones[call.outcome]}>{callOutcomeLabels[call.outcome]}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge tone={callPriorityTones[call.priority]}>
                  {callPriorityLabels[call.priority]}
                </Badge>
              </td>
              <td className="px-4 py-3 text-zinc-600">{call.appointmentRequested ? "Demandé" : "—"}</td>
              <td className="px-4 py-3 text-zinc-600">{call.transferred ? "Effectué" : "—"}</td>
              <td className="px-4 py-3">
                {call.followUpRequired ? <Badge tone="amber">Oui</Badge> : <span className="text-zinc-400">Non</span>}
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
