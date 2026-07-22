# KORTESO Réception

Plateforme d'agent vocal et de gestion des rendez-vous conçue par
[KORTESO](https://korteso.example) pour les cliniques auditives, centres
auditifs, audioprothésistes et entreprises de services liés à l'audition.

> **Version de démonstration (phase 1).** Toutes les données affichées sont
> fictives. Aucun fournisseur téléphonique n'est branché et aucune clé API
> n'est requise.

## Vision du produit

KORTESO Réception répondra aux appels des cliniques, recueillera les
informations de l'appelant, qualifiera la demande, proposera un rendez-vous
(sans jamais le confirmer à la place de la clinique), transférera certains
appels vers un humain et produira un résumé de chaque conversation. L'équipe
KORTESO pilote le tout depuis une interface administrative : prospection,
ventes, installation des cliniques et suivi des opérations.

L'agent ne remplace jamais un professionnel de la santé : il ne donne aucun
conseil médical, ne pose aucun diagnostic et redirige toute question sensible
vers l'équipe de la clinique.

## Fonctionnalités actuelles (phase 1)

- **Tableau de bord** : indicateurs clés, tâches prioritaires, derniers appels,
  prochaines actions commerciales et alertes.
- **Prospects** : liste complète avec filtres (secteur, statut, ville, score,
  responsable) et parcours de création (enregistrement en phase 2).
- **Pipeline** : vue par étapes, de « Nouveau » à « Gagné / Perdu », prête à
  accueillir le glisser-déposer.
- **Cliniques** : liste des établissements clients et fiche détaillée
  (heures, services, numéros de transfert, contacts, règles de l'agent vocal,
  FAQ, calendrier, historique, statistiques, interventions humaines requises).
- **Appels** : journal des appels et fiche détaillée avec transcription
  fictive courte.
- **Rendez-vous** : demandes recueillies avec leurs statuts (une demande n'est
  jamais présentée comme confirmée sans validation de la clinique).
- **Rapports** : synthèse d'indicateurs (rapports détaillés à venir).
- **Paramètres** : organisation, utilisateurs, rôles, notifications,
  intégrations (affichées « Non configurées » ou « Bientôt disponibles »),
  facturation et sécurité.

## Technologies

- [Next.js](https://nextjs.org) 16 (App Router)
- [TypeScript](https://www.typescriptlang.org) en mode strict
- [Tailwind CSS](https://tailwindcss.com) 4
- ESLint (configuration `eslint-config-next`)
- Aucune autre dépendance d'exécution : pas de base de données, pas de
  fournisseur vocal, pas de service externe.

## Structure du projet

```
korteso-reception/
├── docs/
│   └── roadmap.md          # feuille de route (phases 1 à 6)
├── src/
│   ├── app/                # pages (App Router)
│   │   ├── page.tsx        # tableau de bord
│   │   ├── prospects/
│   │   ├── pipeline/
│   │   ├── cliniques/      # liste + fiche [id]
│   │   ├── appels/         # journal + fiche [id]
│   │   ├── rendez-vous/
│   │   ├── rapports/
│   │   └── parametres/
│   ├── components/         # composants réutilisables (coquille, UI, icônes)
│   ├── data/               # données de démonstration (voir ci-dessous)
│   ├── lib/                # formatage et libellés/couleurs des statuts
│   └── types/              # modèles TypeScript du domaine
└── README.md
```

## Commandes de développement

```bash
npm install        # installer les dépendances
npm run dev        # serveur de développement (http://localhost:3000)
npm run lint       # vérification ESLint
npx tsc --noEmit   # vérification TypeScript
npm run build      # build de production
npm start          # servir le build de production
```

## Données fictives

Toutes les données vivent dans `src/data` (voir `src/data/README.md`) :
organisations, utilisateurs, prospects, cliniques, appels, demandes de
rendez-vous, tâches, notifications, abonnements et configurations d'agent
vocal. Elles sont **entièrement inventées** : personnes, cliniques, courriels
et numéros de téléphone (série réservée 555‑01XX) ne correspondent à rien de
réel. En phase 2, ce dossier sera remplacé par une couche d'accès à la base de
données exposant les mêmes fonctions, sans réécrire les pages.

L'architecture prévoit déjà trois rôles (administrateur KORTESO, employé
KORTESO, client clinique) et le rattachement de chaque donnée à une
organisation propriétaire, afin de faciliter les permissions à venir.

## Prochaines intégrations

Voir la feuille de route complète dans [`docs/roadmap.md`](docs/roadmap.md) :

1. **Phase 2** — Supabase : base de données, authentification, organisations
   et permissions.
2. **Phase 3** — Premier fournisseur vocal, numéros de téléphone et appels
   réels.
3. **Phase 4** — Google Calendar, notifications et confirmations.
4. **Phase 5** — Stripe : forfaits, limites d'utilisation et facturation.
5. **Phase 6** — Portail client, rapports et onboarding automatisé.

## Précautions concernant les données sensibles

- Aucun secret, clé API ni fichier `.env` n'est présent ni requis en phase 1.
- Aucune donnée réelle de patient, aucune information médicale et aucun
  diagnostic ne doivent être introduits dans `src/data`.
- Les données administratives (CRM, ventes) resteront séparées des futures
  données sensibles (appels réels, demandes de patients), qui seront soumises
  à des permissions par rôle et par organisation.
- L'agent vocal ne devra jamais être présenté comme un substitut à un
  professionnel de la santé.
- Éviter de journaliser des renseignements personnels inutilement lors des
  intégrations futures.
