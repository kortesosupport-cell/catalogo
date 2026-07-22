import Link from "next/link";

import { clinics, getUserById } from "@/data";
import { formatDate } from "@/lib/format";
import { clinicInstallationLabels, clinicInstallationTones, planLabels } from "@/lib/labels";
import { Badge, DemoNotice, PageHeader, Table } from "@/components/ui";

export const metadata = { title: "Cliniques" };

function YesNo({ value }: { value: boolean }) {
  return <Badge tone={value ? "green" : "slate"}>{value ? "Oui" : "Non"}</Badge>;
}

export default function CliniquesPage() {
  return (
    <>
      <PageHeader
        title="Cliniques clientes"
        subtitle="Les établissements équipés (ou en cours d’équipement) de KORTESO Réception."
      />
      <DemoNotice className="mb-6" />

      <Table
        head={[
          "Clinique",
          "Ville",
          "Installation",
          "Forfait",
          "Téléphone",
          "Calendrier connecté",
          "Agent actif",
          "Volume d’appels / mois",
          "Lancement",
          "Responsable KORTESO",
        ]}
      >
        {clinics.map((clinic) => {
          const owner = getUserById(clinic.ownerUserId);
          return (
            <tr key={clinic.id} className="hover:bg-zinc-50/70">
              <td className="px-4 py-3">
                <Link
                  href={`/cliniques/${clinic.id}`}
                  className="font-medium text-brand-600 hover:text-brand-500"
                >
                  {clinic.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-zinc-600">{clinic.city}</td>
              <td className="px-4 py-3">
                <Badge tone={clinicInstallationTones[clinic.installationStatus]}>
                  {clinicInstallationLabels[clinic.installationStatus]}
                </Badge>
              </td>
              <td className="px-4 py-3 text-zinc-600">{planLabels[clinic.plan]}</td>
              <td className="px-4 py-3 text-zinc-600">{clinic.phone}</td>
              <td className="px-4 py-3">
                <YesNo value={clinic.calendarConnected} />
              </td>
              <td className="px-4 py-3">
                <YesNo value={clinic.agentActive} />
              </td>
              <td className="px-4 py-3 text-zinc-600">≈ {clinic.monthlyCallVolume}</td>
              <td className="px-4 py-3 text-zinc-600">{formatDate(clinic.launchedAt)}</td>
              <td className="px-4 py-3 text-zinc-600">
                {owner ? `${owner.firstName} ${owner.lastName}` : "—"}
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}
