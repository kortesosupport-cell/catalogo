import { appointmentRequests, getClinicById, getUserById } from "@/data";
import {
  appointmentSourceLabels,
  appointmentStatusLabels,
  appointmentStatusTones,
} from "@/lib/labels";
import { Badge, DemoNotice, PageHeader, Table } from "@/components/ui";

export const metadata = { title: "Rendez-vous" };

export default function RendezVousPage() {
  const sorted = [...appointmentRequests].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <PageHeader
        title="Demandes de rendez-vous"
        subtitle="Les demandes recueillies par l’agent vocal ou par d’autres canaux. Une demande reste « à confirmer » tant que la clinique ne l’a pas validée."
      />
      <DemoNotice className="mb-6" />

      <Table
        head={[
          "Patient ou appelant",
          "Clinique",
          "Service demandé",
          "Date souhaitée",
          "Statut",
          "Téléphone",
          "Source",
          "Notes",
          "Suivi par",
        ]}
      >
        {sorted.map((request) => {
          const clinic = getClinicById(request.clinicId);
          const followUp = getUserById(request.followUpUserId);
          return (
            <tr key={request.id} className="align-top hover:bg-zinc-50/70">
              <td className="px-4 py-3 font-medium text-zinc-800">{request.callerName}</td>
              <td className="px-4 py-3 text-zinc-600">{clinic?.name ?? "—"}</td>
              <td className="px-4 py-3 text-zinc-600">{request.serviceRequested}</td>
              <td className="max-w-48 whitespace-normal px-4 py-3 text-zinc-600">
                {request.preferredDate}
              </td>
              <td className="px-4 py-3">
                <Badge tone={appointmentStatusTones[request.status]}>
                  {appointmentStatusLabels[request.status]}
                </Badge>
              </td>
              <td className="px-4 py-3 text-zinc-600">{request.phone}</td>
              <td className="px-4 py-3 text-zinc-600">{appointmentSourceLabels[request.source]}</td>
              <td className="max-w-64 whitespace-normal px-4 py-3 text-xs text-zinc-500">
                {request.notes}
              </td>
              <td className="px-4 py-3 text-zinc-600">
                {followUp ? `${followUp.firstName} ${followUp.lastName}` : "—"}
              </td>
            </tr>
          );
        })}
      </Table>

      <p className="mt-4 text-xs text-zinc-500">
        Rappel : l’agent vocal recueille des demandes, il ne confirme jamais un rendez-vous.
        La confirmation appartient toujours à l’équipe de la clinique.
      </p>
    </>
  );
}
