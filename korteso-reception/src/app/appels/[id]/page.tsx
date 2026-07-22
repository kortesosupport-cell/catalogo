import Link from "next/link";
import { notFound } from "next/navigation";

import { appointmentRequests, calls, getCallById, getClinicById } from "@/data";
import { formatDateTime, formatDuration } from "@/lib/format";
import {
  appointmentStatusLabels,
  appointmentStatusTones,
  callOutcomeLabels,
  callOutcomeTones,
  callPriorityLabels,
  callPriorityTones,
  callRequestTypeLabels,
} from "@/lib/labels";
import { Badge, Card, DefinitionList, DemoNotice, EmptyState, PageHeader } from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

export function generateStaticParams() {
  return calls.map((call) => ({ id: call.id }));
}

export default async function AppelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const call = getCallById(id);
  if (!call) notFound();

  const clinic = getClinicById(call.clinicId);
  const linkedRequest = call.appointmentRequestId
    ? appointmentRequests.find((r) => r.id === call.appointmentRequestId)
    : undefined;

  return (
    <>
      <Link
        href="/appels"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-500"
      >
        <IconArrowLeft width={16} height={16} />
        Retour au journal des appels
      </Link>

      <PageHeader
        title={`Appel de ${call.callerName}`}
        subtitle={`${clinic?.name ?? ""} · ${formatDateTime(call.startedAt)}`}
        action={<Badge tone={callOutcomeTones[call.outcome]}>{callOutcomeLabels[call.outcome]}</Badge>}
      />
      <DemoNotice className="mb-6" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card title="Détails de l’appel">
          <DefinitionList
            items={[
              { label: "Appelant", value: call.callerName },
              { label: "Numéro", value: call.callerPhone },
              { label: "Clinique", value: clinic?.name ?? "—" },
              {
                label: "Durée",
                value: call.durationSeconds > 0 ? formatDuration(call.durationSeconds) : "—",
              },
              { label: "Type de demande", value: callRequestTypeLabels[call.requestType] },
              {
                label: "Priorité",
                value: (
                  <Badge tone={callPriorityTones[call.priority]}>
                    {callPriorityLabels[call.priority]}
                  </Badge>
                ),
              },
              { label: "Rendez-vous demandé", value: call.appointmentRequested ? "Oui" : "Non" },
              { label: "Transfert effectué", value: call.transferred ? "Oui" : "Non" },
              {
                label: "Suivi requis",
                value: call.followUpRequired ? <Badge tone="amber">Oui</Badge> : "Non",
              },
            ]}
          />

          <div className="mt-5 border-t border-zinc-100 pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Résumé</p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">{call.summary}</p>
          </div>

          {linkedRequest && (
            <div className="mt-5 border-t border-zinc-100 pt-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Demande de rendez-vous liée
              </p>
              <div className="mt-2 flex items-start justify-between gap-4 rounded-lg bg-zinc-50 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-zinc-800">{linkedRequest.serviceRequested}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Souhait : {linkedRequest.preferredDate}
                  </p>
                </div>
                <Badge tone={appointmentStatusTones[linkedRequest.status]}>
                  {appointmentStatusLabels[linkedRequest.status]}
                </Badge>
              </div>
            </div>
          )}
        </Card>

        <Card title="Transcription (démonstration)">
          {call.transcript.length === 0 ? (
            <EmptyState>Aucune transcription pour cet appel.</EmptyState>
          ) : (
            <>
              <ol className="space-y-3">
                {call.transcript.map((turn, index) => (
                  <li
                    key={index}
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      turn.speaker === "agent"
                        ? "bg-brand-50 text-brand-900"
                        : "ml-auto bg-zinc-100 text-zinc-800"
                    }`}
                  >
                    <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide opacity-60">
                      {turn.speaker === "agent" ? "Agent KORTESO" : "Appelant"}
                    </p>
                    {turn.text}
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-400">
                Transcription fictive fournie à titre d’exemple. Aucun appel réel n’a été
                enregistré et aucune information médicale n’est traitée.
              </p>
            </>
          )}
        </Card>
      </div>
    </>
  );
}
