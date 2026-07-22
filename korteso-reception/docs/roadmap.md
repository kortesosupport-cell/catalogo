# Feuille de route — KORTESO Réception

## Phase 1 — Fondation (en cours)

Interface administrative, CRM de prospects, pipeline de vente, gestion des
cliniques clientes, journal d'appels fictifs et demandes de rendez-vous.
Aucune dépendance externe, aucune clé API, données de démonstration locales.

## Phase 2 — Données et comptes

Supabase (base de données et authentification), gestion réelle des
organisations et des établissements, permissions par rôle (administrateur
KORTESO, employé KORTESO, client clinique), remplacement des données de
démonstration par la base de données.

## Phase 3 — Voix

Premier fournisseur vocal, numéros de téléphone, réception d'appels réels,
transcriptions et résumés générés, règles d'escalade appliquées en production.

## Phase 4 — Calendriers et notifications

Intégration Google Calendar, proposition de plages selon les disponibilités
réelles, notifications (courriel et SMS) et confirmations de rendez-vous par la
clinique.

## Phase 5 — Facturation

Stripe, gestion des forfaits (Essentiel, Professionnel, Premium), limites
d'utilisation par forfait et facturation récurrente.

## Phase 6 — Portail client et croissance

Portail libre-service pour les cliniques clientes, rapports détaillés et
exports, intégration automatisée des nouvelles cliniques (onboarding guidé).
