import { organizations, users } from "@/data";
import { userRoleLabels } from "@/lib/labels";
import { Badge, Card, DefinitionList, DemoNotice, PageHeader } from "@/components/ui";

export const metadata = { title: "Paramètres" };

const roleDescriptions: { role: string; description: string }[] = [
  {
    role: "Administrateur KORTESO",
    description:
      "Accès complet : prospects, pipeline, cliniques, appels, rendez-vous, paramètres et facturation.",
  },
  {
    role: "Employé KORTESO",
    description:
      "Accès aux opérations : prospects assignés, installations de cliniques, appels et suivis.",
  },
  {
    role: "Client clinique",
    description:
      "Accès limité à sa propre organisation : ses établissements, ses appels et ses demandes de rendez-vous (portail prévu en phase 6).",
  },
];

const integrations: { name: string; description: string; status: "non_configuree" | "bientot" }[] = [
  {
    name: "Fournisseur vocal (téléphonie)",
    description: "Réception des appels réels et agent vocal (phase 3).",
    status: "non_configuree",
  },
  {
    name: "Google Calendar",
    description: "Synchronisation des disponibilités et confirmations (phase 4).",
    status: "bientot",
  },
  {
    name: "Facturation (Stripe)",
    description: "Forfaits, limites d’utilisation et paiements (phase 5).",
    status: "non_configuree",
  },
  {
    name: "Base de données et authentification (Supabase)",
    description: "Comptes utilisateurs, organisations et permissions (phase 2).",
    status: "bientot",
  },
];

export default function ParametresPage() {
  const korteso = organizations.find((o) => o.type === "korteso");

  return (
    <>
      <PageHeader
        title="Paramètres"
        subtitle="Configuration de l’organisation, des utilisateurs et des intégrations."
      />
      <DemoNotice className="mb-6" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card title="Organisation KORTESO">
          <DefinitionList
            items={[
              { label: "Nom", value: korteso?.name ?? "KORTESO" },
              { label: "Produit", value: "KORTESO Réception" },
              { label: "Ville", value: `${korteso?.city ?? "Québec"} (${korteso?.province ?? "QC"})` },
              { label: "Statut", value: <Badge tone="green">Actif</Badge> },
            ]}
          />
        </Card>

        <Card title="Utilisateurs">
          <ul className="divide-y divide-zinc-100">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-zinc-800">
                    {user.firstName} {user.lastName}
                    {user.title && <span className="font-normal text-zinc-500"> · {user.title}</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">{user.email}</p>
                </div>
                <Badge tone={user.role === "korteso_admin" ? "blue" : "neutral"}>
                  {userRoleLabels[user.role]}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
            L’authentification réelle et l’invitation d’utilisateurs arriveront en phase 2.
          </p>
        </Card>

        <Card title="Rôles et permissions">
          <ul className="divide-y divide-zinc-100">
            {roleDescriptions.map((entry) => (
              <li key={entry.role} className="py-3 first:pt-0 last:pb-0">
                <p className="text-sm font-medium text-zinc-800">{entry.role}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{entry.description}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Notifications">
          <ul className="space-y-3">
            {[
              "Alerte lorsqu’un appel exige un suivi humain",
              "Alerte lorsqu’un appel est manqué",
              "Résumé quotidien des demandes de rendez-vous",
              "Rappel des tâches en retard",
            ].map((label) => (
              <li key={label} className="flex items-center justify-between gap-4 text-sm text-zinc-700">
                {label}
                <Badge tone="slate">Bientôt disponible</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Intégrations" className="xl:col-span-2">
          <ul className="divide-y divide-zinc-100">
            {integrations.map((integration) => (
              <li
                key={integration.name}
                className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-800">{integration.name}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{integration.description}</p>
                </div>
                <Badge tone={integration.status === "bientot" ? "blue" : "slate"}>
                  {integration.status === "bientot" ? "Bientôt disponible" : "Non configurée"}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
            Aucune clé API n’est requise ni stockée dans cette version.
          </p>
        </Card>

        <Card title="Facturation">
          <p className="text-sm leading-relaxed text-zinc-600">
            Les forfaits (Essentiel, Professionnel, Premium) sont définis dans les données, mais
            aucune facturation réelle n’est active. L’intégration Stripe est prévue en phase 5.
          </p>
          <p className="mt-3 inline-block rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-500">
            Non configurée
          </p>
        </Card>

        <Card title="Sécurité">
          <ul className="list-inside list-disc space-y-2 text-sm leading-relaxed text-zinc-600">
            <li>Aucune donnée réelle de patient n’est stockée dans cette version.</li>
            <li>Aucune information médicale ni diagnostic n’est recueilli par l’agent.</li>
            <li>
              Les données administratives (CRM) et les futures données sensibles seront séparées,
              avec des permissions par rôle et par organisation.
            </li>
            <li>Les secrets et clés API ne seront jamais inclus dans le code source.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
