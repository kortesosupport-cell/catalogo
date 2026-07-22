import Link from "next/link";

import {
  calls,
  getClinicById,
  getDashboardMetrics,
  getUserById,
  notifications,
  prospects,
  tasks,
} from "@/data";
import { formatCurrencyCad, formatDate, formatDateTime } from "@/lib/format";
import {
  callOutcomeLabels,
  callOutcomeTones,
  notificationSeverityTones,
  prospectStatusLabels,
  taskPriorityLabels,
  taskPriorityTones,
} from "@/lib/labels";
import { Badge, Card, DemoNotice, EmptyState, PageHeader, StatCard } from "@/components/ui";

export const metadata = { title: "Tableau de bord" };

export default function DashboardPage() {
  const m = getDashboardMetrics();

  const priorityTasks = tasks
    .filter((t) => t.status !== "terminee")
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt))
    .slice(0, 5);

  const recentCalls = [...calls]
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .slice(0, 5);

  const nextCommercialActions = prospects
    .filter((p) => p.nextActionAt !== null)
    .sort((a, b) => (a.nextActionAt ?? "").localeCompare(b.nextActionAt ?? ""))
    .slice(0, 4);

  const alerts = notifications.filter((n) => n.severity !== "info" && !n.read);

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d’ensemble des activités commerciales et des opérations des cliniques clientes."
      />
      <DemoNotice className="mb-6" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Nouveaux prospects" value={m.newProspects} hint="À qualifier ou à contacter" />
        <StatCard label="Suivis à faire" value={m.followUps} hint="Tâches ouvertes" />
        <StatCard label="Démonstrations prévues" value={m.demos} hint="Cette semaine" />
        <StatCard label="Cliniques clientes" value={m.activeClinics} hint="Tous statuts confondus" />
        <StatCard label="Appels reçus" value={m.callsReceived} hint="7 derniers jours" />
        <StatCard label="Appels manqués" value={m.missedCalls} hint="7 derniers jours" />
        <StatCard label="Rendez-vous demandés" value={m.appointmentsRequested} hint="Demandes en cours et passées" />
        <StatCard
          label="Revenus mensuels récurrents"
          value={formatCurrencyCad(m.monthlyRecurringRevenue)}
          hint="Abonnements actifs"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card
          title="Tâches prioritaires"
          action={
            <span className="text-xs text-zinc-400">{priorityTasks.length} ouvertes</span>
          }
        >
          {priorityTasks.length === 0 ? (
            <EmptyState>Aucune tâche ouverte.</EmptyState>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {priorityTasks.map((task) => {
                const assignee = getUserById(task.assigneeUserId);
                return (
                  <li key={task.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-zinc-800">{task.title}</p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        Échéance : {formatDateTime(task.dueAt)}
                        {assignee && ` · ${assignee.firstName} ${assignee.lastName}`}
                        {task.relatedTo && ` · ${task.relatedTo.label}`}
                      </p>
                    </div>
                    <Badge tone={taskPriorityTones[task.priority]}>
                      {taskPriorityLabels[task.priority]}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card
          title="Alertes"
          action={<span className="text-xs text-zinc-400">{alerts.length} actives</span>}
        >
          {alerts.length === 0 ? (
            <EmptyState>Aucune alerte active.</EmptyState>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {alerts.map((alert) => (
                <li key={alert.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <Badge tone={notificationSeverityTones[alert.severity]}>
                    {alert.severity === "critique" ? "Critique" : "Attention"}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{alert.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{alert.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Derniers appels"
          action={
            <Link href="/appels" className="text-xs font-medium text-brand-600 hover:text-brand-500">
              Voir tout
            </Link>
          }
        >
          <ul className="divide-y divide-zinc-100">
            {recentCalls.map((call) => {
              const clinic = getClinicById(call.clinicId);
              return (
                <li key={call.id} className="py-3 first:pt-0 last:pb-0">
                  <Link href={`/appels/${call.id}`} className="group flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-800 group-hover:text-brand-600">
                        {call.callerName}
                        <span className="font-normal text-zinc-400"> · {clinic?.name}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">{formatDateTime(call.startedAt)}</p>
                    </div>
                    <Badge tone={callOutcomeTones[call.outcome]}>
                      {callOutcomeLabels[call.outcome]}
                    </Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card
          title="Prochaines actions commerciales"
          action={
            <Link href="/prospects" className="text-xs font-medium text-brand-600 hover:text-brand-500">
              Voir les prospects
            </Link>
          }
        >
          <ul className="divide-y divide-zinc-100">
            {nextCommercialActions.map((prospect) => (
              <li key={prospect.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-800">{prospect.companyName}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {prospect.nextAction} · {formatDate(prospect.nextActionAt)}
                  </p>
                </div>
                <Badge>{prospectStatusLabels[prospect.status]}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
