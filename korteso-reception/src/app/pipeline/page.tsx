import { getUserById, prospects } from "@/data";
import { formatDate } from "@/lib/format";
import { pipelineStages, prospectStatusLabels, sectorLabels } from "@/lib/labels";
import { DemoNotice, PageHeader } from "@/components/ui";

export const metadata = { title: "Pipeline" };

/**
 * Vue statique du pipeline (phase 1). La structure en colonnes par étape est
 * prête à accueillir le glisser-déposer dans une itération future.
 */
export default function PipelinePage() {
  return (
    <>
      <PageHeader
        title="Pipeline de vente"
        subtitle="Progression des prospects, de la découverte jusqu’à la signature."
      />
      <DemoNotice className="mb-6" />

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4">
          {pipelineStages.map((stage) => {
            const stageProspects = prospects.filter((p) => p.status === stage);
            return (
              <section key={stage} className="w-64 shrink-0" aria-label={prospectStatusLabels[stage]}>
                <header className="mb-3 flex items-center justify-between rounded-lg bg-brand-900 px-3 py-2">
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-white">
                    {prospectStatusLabels[stage]}
                  </h2>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium text-white">
                    {stageProspects.length}
                  </span>
                </header>

                <div className="flex flex-col gap-3">
                  {stageProspects.length === 0 ? (
                    <p className="rounded-lg border border-dashed border-zinc-200 px-3 py-6 text-center text-xs text-zinc-400">
                      Aucun prospect
                    </p>
                  ) : (
                    stageProspects.map((p) => {
                      const owner = getUserById(p.ownerUserId);
                      return (
                        <article
                          key={p.id}
                          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <p className="text-sm font-semibold text-zinc-800">{p.companyName}</p>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {sectorLabels[p.sector]} · {p.city}
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-zinc-600">{p.nextAction}</p>
                          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-xs text-zinc-400">
                            <span>Score {p.qualityScore}</span>
                            <span>
                              {owner ? `${owner.firstName} ${owner.lastName[0]}.` : "—"}
                              {p.nextActionAt && ` · ${formatDate(p.nextActionAt)}`}
                            </span>
                          </div>
                        </article>
                      );
                    })
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
