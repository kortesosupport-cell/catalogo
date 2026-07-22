import { calls, clinics, getDashboardMetrics } from "@/data";
import { formatCurrencyCad } from "@/lib/format";
import { Card, DemoNotice, PageHeader, StatCard } from "@/components/ui";

export const metadata = { title: "Rapports" };

export default function RapportsPage() {
  const m = getDashboardMetrics();
  const answeredCalls = calls.filter((c) => c.outcome !== "appel_manque").length;
  const answerRate = calls.length > 0 ? Math.round((answeredCalls / calls.length) * 100) : 0;

  return (
    <>
      <PageHeader
        title="Rapports"
        subtitle="Synthèse des indicateurs commerciaux et opérationnels."
      />
      <DemoNotice className="mb-6" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Taux de réponse" value={`${answerRate} %`} hint="Appels traités vs manqués" />
        <StatCard label="Cliniques équipées" value={clinics.length} />
        <StatCard label="Demandes de rendez-vous" value={m.appointmentsRequested} />
        <StatCard
          label="Revenus mensuels récurrents"
          value={formatCurrencyCad(m.monthlyRecurringRevenue)}
        />
      </div>

      <div className="mt-6">
        <Card title="Rapports détaillés">
          <p className="text-sm leading-relaxed text-zinc-600">
            Les rapports détaillés (tendances d’appels, performance par clinique, taux de
            conversion du pipeline, exports) seront offerts lorsque la plateforme sera branchée
            sur la base de données et les fournisseurs vocaux.
          </p>
          <p className="mt-3 inline-block rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-500">
            Bientôt disponible
          </p>
        </Card>
      </div>
    </>
  );
}
