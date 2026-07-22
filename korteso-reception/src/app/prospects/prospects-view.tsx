"use client";

import { useMemo, useState } from "react";

import { getUserById, prospects, users } from "@/data";
import { formatDate } from "@/lib/format";
import {
  prospectStatusLabels,
  prospectStatusTones,
  sectorLabels,
} from "@/lib/labels";
import type { ProspectStatus, Sector } from "@/types";
import { Badge, EmptyState, Table } from "@/components/ui";
import { IconClose, IconPlus } from "@/components/icons";

const scoreBands = [
  { value: "80", label: "80 et plus" },
  { value: "60", label: "60 et plus" },
  { value: "40", label: "40 et plus" },
] as const;

function selectClass() {
  return "rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
}

export function ProspectsView() {
  const [sector, setSector] = useState<Sector | "">("");
  const [status, setStatus] = useState<ProspectStatus | "">("");
  const [city, setCity] = useState("");
  const [minScore, setMinScore] = useState("");
  const [owner, setOwner] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const cities = useMemo(
    () => Array.from(new Set(prospects.map((p) => p.city))).sort((a, b) => a.localeCompare(b, "fr")),
    []
  );

  const filtered = prospects.filter(
    (p) =>
      (sector === "" || p.sector === sector) &&
      (status === "" || p.status === status) &&
      (city === "" || p.city === city) &&
      (minScore === "" || p.qualityScore >= Number(minScore)) &&
      (owner === "" || p.ownerUserId === owner)
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          aria-label="Filtrer par secteur"
          className={selectClass()}
          value={sector}
          onChange={(e) => setSector(e.target.value as Sector | "")}
        >
          <option value="">Tous les secteurs</option>
          {Object.entries(sectorLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrer par statut"
          className={selectClass()}
          value={status}
          onChange={(e) => setStatus(e.target.value as ProspectStatus | "")}
        >
          <option value="">Tous les statuts</option>
          {Object.entries(prospectStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrer par ville"
          className={selectClass()}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Toutes les villes</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrer par score"
          className={selectClass()}
          value={minScore}
          onChange={(e) => setMinScore(e.target.value)}
        >
          <option value="">Tous les scores</option>
          {scoreBands.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrer par responsable"
          className={selectClass()}
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        >
          <option value="">Tous les responsables</option>
          {users
            .filter((u) => u.role !== "client_clinique")
            .map((u) => (
              <option key={u.id} value={u.id}>
                {u.firstName} {u.lastName}
              </option>
            ))}
        </select>

        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="ml-auto inline-flex items-center gap-2 rounded-lg bg-brand-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <IconPlus width={16} height={16} />
          Nouveau prospect
        </button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState>Aucun prospect ne correspond aux filtres sélectionnés.</EmptyState>
      ) : (
        <Table
          head={[
            "Entreprise",
            "Secteur",
            "Ville",
            "Décideur",
            "Coordonnées",
            "Statut",
            "Score",
            "Dernière interaction",
            "Prochaine action",
            "Responsable",
          ]}
        >
          {filtered.map((p) => {
            const ownerUser = getUserById(p.ownerUserId);
            return (
              <tr key={p.id} className="align-top hover:bg-zinc-50/70">
                <td className="px-4 py-3">
                  <p className="font-medium text-zinc-800">{p.companyName}</p>
                  <p className="mt-0.5 max-w-56 whitespace-normal text-xs text-zinc-500">{p.notes}</p>
                </td>
                <td className="px-4 py-3 text-zinc-600">{sectorLabels[p.sector]}</td>
                <td className="px-4 py-3 text-zinc-600">{p.city}</td>
                <td className="px-4 py-3 text-zinc-600">{p.decisionMaker}</td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  <p>{p.phone}</p>
                  <p className="mt-0.5">{p.email}</p>
                  <p className="mt-0.5">{p.website}</p>
                </td>
                <td className="px-4 py-3">
                  <Badge tone={prospectStatusTones[p.status]}>{prospectStatusLabels[p.status]}</Badge>
                </td>
                <td className="px-4 py-3 font-medium text-zinc-700">{p.qualityScore}</td>
                <td className="px-4 py-3 text-zinc-600">{formatDate(p.lastInteractionAt)}</td>
                <td className="max-w-52 whitespace-normal px-4 py-3 text-zinc-600">
                  {p.nextAction}
                  {p.nextActionAt && (
                    <span className="mt-0.5 block text-xs text-zinc-400">{formatDate(p.nextActionAt)}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-600">
                  {ownerUser ? `${ownerUser.firstName} ${ownerUser.lastName}` : "—"}
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      {createOpen && <CreateProspectDialog onClose={() => setCreateOpen(false)} />}
    </>
  );
}

function CreateProspectDialog({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const fieldClass =
    "w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button type="button" aria-label="Fermer" className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          aria-label="Fermer"
          className="absolute right-4 top-4 rounded-md p-1 text-zinc-400 hover:text-zinc-600"
          onClick={onClose}
        >
          <IconClose />
        </button>
        <h2 className="text-lg font-semibold text-brand-900">Nouveau prospect</h2>

        {submitted ? (
          <div className="mt-4">
            <p className="rounded-lg border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              L’enregistrement n’est pas encore disponible : la sauvegarde des données arrivera
              avec la base de données en phase 2. Ce formulaire illustre le parcours prévu.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-lg bg-brand-800 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form
            className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label className="text-sm text-zinc-600">
              Nom de l’entreprise
              <input required className={`mt-1 ${fieldClass}`} placeholder="Clinique Exemple" />
            </label>
            <label className="text-sm text-zinc-600">
              Secteur
              <select className={`mt-1 ${fieldClass}`}>
                {Object.entries(sectorLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-zinc-600">
              Ville
              <input required className={`mt-1 ${fieldClass}`} placeholder="Québec" />
            </label>
            <label className="text-sm text-zinc-600">
              Décideur
              <input className={`mt-1 ${fieldClass}`} placeholder="Prénom Nom" />
            </label>
            <label className="text-sm text-zinc-600">
              Téléphone
              <input className={`mt-1 ${fieldClass}`} placeholder="(418) 555-0100" />
            </label>
            <label className="text-sm text-zinc-600">
              Courriel
              <input type="email" className={`mt-1 ${fieldClass}`} placeholder="contact@exemple.ca" />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                Créer le prospect
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
