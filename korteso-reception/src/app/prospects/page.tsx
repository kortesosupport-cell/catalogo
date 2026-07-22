import { DemoNotice, PageHeader } from "@/components/ui";
import { ProspectsView } from "./prospects-view";

export const metadata = { title: "Prospects" };

export default function ProspectsPage() {
  return (
    <>
      <PageHeader
        title="Prospects"
        subtitle="Liste des cliniques et centres auditifs ciblés par l’équipe commerciale."
      />
      <DemoNotice className="mb-6" />
      <ProspectsView />
    </>
  );
}
