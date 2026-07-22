import Link from "next/link";
import { notFound } from "next/navigation";

import {
  clinics,
  getAppointmentRequestsByClinic,
  getCallsByClinic,
  getClinicById,
  getUserById,
  getVoiceAgentConfigurationByClinic,
  organizations,
} from "@/data";
import { formatDate, formatDateTime, formatDuration } from "@/lib/format";
import {
  appointmentStatusLabels,
  appointmentStatusTones,
  callOutcomeLabels,
  callOutcomeTones,
  clinicInstallationLabels,
  clinicInstallationTones,
  planLabels,
} from "@/lib/labels";
import {
  Badge,
  Card,
  DefinitionList,
  DemoNotice,
  EmptyState,
  PageHeader,
  StatCard,
} from "@/components/ui";
import { IconArrowLeft } from "@/components/icons";

export function generateStaticParams() {
  return clinics.map((clinic) => ({ id: clinic.id }));
}

export default async function CliniqueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const clinic = getClinicById(id);
  if (!clinic) notFound();

  const organization = organizations.find((o) => o.id === clinic.organizationId);
  const owner = getUserById(clinic.ownerUserId);
  const agentConfig = getVoiceAgentConfigurationByClinic(clinic.id);
  const clinicCalls = getCallsByClinic(clinic.id)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .slice(0, 5);
  const humanFollowUps = getCallsByClinic(clinic.id).filter((c) => c.followUpRequired);
  const pendingRequests = getAppointmentRequestsByClinic(clinic.id).filter((r) =>
    ["nouveau", "a_confirmer", "replanification_demandee"].includes(r.status)
  );

  return (
    <>
      <Link
        href="/cliniques"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-500"
      >
        <IconArrowLeft width={16} height={16} />
        Retour aux cliniques
      </Link>

      <PageHeader
        title={clinic.name}
        subtitle={`${clinic.address} · ${organization?.name ?? ""}`}
        action={
          <Badge tone={clinicInstallationTones[clinic.installationStatus]}>
            {clinicInstallationLabels[clinic.installationStatus]}
          </Badge>
        }
      />
      <DemoNotice className="mb-6" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard label="Appels ce mois-ci" value={clinic.stats.callsThisMonth} />
        <StatCard label="Appels manqués" value={clinic.stats.missedThisMonth} />
        <StatCard label="Rendez-vous demandés" value={clinic.stats.appointmentRequestsThisMonth} />
        <StatCard label="Transferts" value={clinic.stats.transfersThisMonth} />
        <StatCard
          label="Durée moyenne"
          value={clinic.stats.averageDurationSeconds > 0 ? formatDuration(clinic.stats.averageDurationSeconds) : "—"}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card title="Informations générales">
          <DefinitionList
            items={[
              { label: "Organisation", value: organization?.name ?? "—" },
              { label: "Téléphone", value: clinic.phone },
              { label: "Ville", value: `${clinic.city} (${clinic.province})` },
              { label: "Forfait", value: planLabels[clinic.plan] },
              { label: "Date de lancement", value: formatDate(clinic.launchedAt) },
              {
                label: "Responsable KORTESO",
                value: owner ? `${owner.firstName} ${owner.lastName}` : "—",
              },
              {
                label: "Calendrier",
                value: (
                  <Badge tone={clinic.calendarConnected ? "green" : "amber"}>
                    {clinic.calendarConnected ? "Connecté" : "Non connecté"}
                  </Badge>
                ),
              },
              {
                label: "Agent vocal",
                value: (
                  <Badge tone={clinic.agentActive ? "green" : "slate"}>
                    {clinic.agentActive ? "Actif" : "Inactif"}
                  </Badge>
                ),
              },
            ]}
          />
        </Card>

        <Card title="Heures d’ouverture">
          <ul className="divide-y divide-zinc-100">
            {clinic.openingHours.map((h) => (
              <li key={h.day} className="flex items-center justify-between py-2 text-sm first:pt-0 last:pb-0">
                <span className="text-zinc-600">{h.day}</span>
                <span className={h.open ? "font-medium text-zinc-800" : "text-zinc-400"}>
                  {h.open ? `${h.open} – ${h.close}` : "Fermé"}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Services offerts">
          {clinic.services.length === 0 ? (
            <EmptyState>Aucun service documenté pour le moment.</EmptyState>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <li key={service}>
                  <Badge tone="blue">{service}</Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Numéros de transfert">
          {clinic.transferNumbers.length === 0 ? (
            <EmptyState>Aucun numéro de transfert configuré.</EmptyState>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {clinic.transferNumbers.map((t) => (
                <li key={t.label} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-zinc-800">
                    {t.label} <span className="font-normal text-zinc-500">· {t.phone}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">Quand : {t.when}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Personnes à contacter">
          <ul className="divide-y divide-zinc-100">
            {clinic.contacts.map((contact) => (
              <li key={contact.email} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-medium text-zinc-800">
                  {contact.name} <span className="font-normal text-zinc-500">· {contact.roleTitle}</span>
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {contact.phone} · {contact.email}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Règles de l’agent vocal">
          {!agentConfig ? (
            <EmptyState>Aucune configuration d’agent pour cette clinique.</EmptyState>
          ) : (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Message d’accueil
                </p>
                <p className="mt-1 rounded-lg bg-zinc-50 px-3 py-2 italic text-zinc-700">
                  « {agentConfig.greeting} »
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Tâches autorisées
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-zinc-700">
                  {agentConfig.allowedTasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Sujets interdits (redirigés vers un humain)
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-zinc-700">
                  {agentConfig.restrictedTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Règles d’escalade
                </p>
                <ul className="mt-1 list-inside list-disc space-y-1 text-zinc-700">
                  {agentConfig.escalationRules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
              <p className="border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                Fournisseur vocal :{" "}
                <Badge tone="slate">Non configuré — prévu en phase 3</Badge>
              </p>
            </div>
          )}
        </Card>

        <Card title="Questions fréquentes">
          {clinic.faq.length === 0 ? (
            <EmptyState>La FAQ sera documentée pendant l’installation.</EmptyState>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {clinic.faq.map((entry) => (
                <li key={entry.question} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-sm font-medium text-zinc-800">{entry.question}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{entry.answer}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Configuration du calendrier">
          <DefinitionList
            items={[
              {
                label: "État",
                value: (
                  <Badge tone={clinic.calendarConnected ? "green" : "amber"}>
                    {clinic.calendarConnected ? "Connecté (interne)" : "Non connecté"}
                  </Badge>
                ),
              },
              {
                label: "Fournisseur",
                value: <Badge tone="slate">Google Calendar — bientôt disponible (phase 4)</Badge>,
              },
            ]}
          />
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            En phase 1, l’état du calendrier est indicatif. La synchronisation réelle des
            disponibilités et des confirmations arrivera avec l’intégration Google Calendar.
          </p>
        </Card>

        <Card
          title="Demandes nécessitant une intervention humaine"
          action={<span className="text-xs text-zinc-400">{pendingRequests.length + humanFollowUps.length} au total</span>}
        >
          {pendingRequests.length === 0 && humanFollowUps.length === 0 ? (
            <EmptyState>Aucune intervention humaine requise pour le moment.</EmptyState>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {pendingRequests.map((request) => (
                <li key={request.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-800">
                      {request.callerName} — {request.serviceRequested}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{request.notes}</p>
                  </div>
                  <Badge tone={appointmentStatusTones[request.status]}>
                    {appointmentStatusLabels[request.status]}
                  </Badge>
                </li>
              ))}
              {humanFollowUps.map((call) => (
                <li key={call.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-800">
                      Suivi d’appel — {call.callerName}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">{call.summary}</p>
                  </div>
                  <Link
                    href={`/appels/${call.id}`}
                    className="shrink-0 text-xs font-medium text-brand-600 hover:text-brand-500"
                  >
                    Voir l’appel
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Derniers appels">
          {clinicCalls.length === 0 ? (
            <EmptyState>Aucun appel enregistré pour cette clinique.</EmptyState>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {clinicCalls.map((call) => (
                <li key={call.id} className="py-3 first:pt-0 last:pb-0">
                  <Link href={`/appels/${call.id}`} className="group flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-800 group-hover:text-brand-600">
                        {call.callerName}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">{formatDateTime(call.startedAt)}</p>
                    </div>
                    <Badge tone={callOutcomeTones[call.outcome]}>{callOutcomeLabels[call.outcome]}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Historique des modifications">
          <ol className="divide-y divide-zinc-100">
            {clinic.history.map((entry) => (
              <li key={entry.date} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm text-zinc-800">{entry.description}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {formatDateTime(entry.date)} · {entry.author}
                </p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
