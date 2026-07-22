import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">Erreur 404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-brand-900">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-sm text-zinc-500">
        La page demandée n’existe pas ou l’élément recherché a été retiré des données de
        démonstration.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-800 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}
