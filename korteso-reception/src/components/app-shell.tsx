"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { currentUser, notifications } from "@/data";
import { fullName } from "@/lib/format";
import { userRoleLabels } from "@/lib/labels";
import {
  IconBell,
  IconBuilding,
  IconCalendar,
  IconChart,
  IconClose,
  IconDashboard,
  IconMenu,
  IconPhone,
  IconPipeline,
  IconSearch,
  IconSettings,
  IconUsers,
} from "./icons";

const navItems = [
  { href: "/", label: "Tableau de bord", icon: IconDashboard },
  { href: "/prospects", label: "Prospects", icon: IconUsers },
  { href: "/pipeline", label: "Pipeline", icon: IconPipeline },
  { href: "/cliniques", label: "Cliniques", icon: IconBuilding },
  { href: "/appels", label: "Appels", icon: IconPhone },
  { href: "/rendez-vous", label: "Rendez-vous", icon: IconCalendar },
  { href: "/rapports", label: "Rapports", icon: IconChart },
  { href: "/parametres", label: "Paramètres", icon: IconSettings },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandMark() {
  // Emplacement texte temporaire : le logo officiel de KORTESO sera intégré
  // plus tard sans modifier cette structure.
  return (
    <Link href="/" className="flex items-baseline gap-2 px-1">
      <span className="text-lg font-bold tracking-tight text-white">KORTESO</span>
      <span className="text-sm font-medium text-brand-200">Réception</span>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Navigation principale">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-500/15 text-white"
                : "text-brand-200 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon width={18} height={18} className={active ? "text-brand-500" : ""} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center px-4">
        <BrandMark />
      </div>
      <div className="flex flex-1 flex-col px-3 py-4">
        <SidebarNav onNavigate={() => setMobileOpen(false)} />
        <p className="mt-6 px-3 text-[11px] leading-relaxed text-brand-200/60">
          Version de démonstration — aucune donnée réelle.
        </p>
      </div>
    </>
  );

  return (
    <div className="flex min-h-dvh">
      {/* Barre latérale (ordinateur) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-brand-950 lg:flex">
        {sidebarContent}
      </aside>

      {/* Barre latérale (mobile) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-brand-950 shadow-xl">
            <button
              type="button"
              aria-label="Fermer le menu"
              className="absolute right-3 top-4 rounded-md p-1.5 text-brand-200 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <IconClose />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        {/* Barre supérieure */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-zinc-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileOpen(true)}
          >
            <IconMenu />
          </button>

          <div className="relative hidden max-w-md flex-1 md:block">
            <IconSearch
              width={16}
              height={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="search"
              placeholder="Rechercher un prospect, une clinique, un appel…"
              aria-label="Recherche"
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-400 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <span className="hidden text-sm font-medium text-zinc-500 sm:block">KORTESO</span>

            <Link
              href="/parametres"
              className="relative rounded-md p-2 text-zinc-500 hover:bg-zinc-100"
              aria-label={`Notifications (${unreadCount} non lues)`}
            >
              <IconBell />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-2.5 border-l border-zinc-200 pl-3 sm:pl-4">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-800 text-xs font-semibold text-white"
              >
                {currentUser.firstName[0]}
                {currentUser.lastName[0]}
              </span>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-tight text-zinc-800">
                  {fullName(currentUser)}
                </p>
                <p className="text-xs leading-tight text-zinc-500">
                  {userRoleLabels[currentUser.role]}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:py-8">
          {children}
        </main>

        <footer className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
          KORTESO Réception — plateforme de gestion des appels et des rendez-vous. Version de
          démonstration : toutes les données affichées sont fictives.
        </footer>
      </div>
    </div>
  );
}
