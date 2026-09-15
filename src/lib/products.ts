/**
 * Product catalog for Codex Hub by TerraCodex.
 *
 * Prices are stored in DZD (Algerian Dinars) and converted at render time
 * using the rates defined in `./currency.ts`.
 *
 * Model: monthly or annual subscription. Annual = monthly × 10 (2 months free).
 */

import {
  CreditCard,
  UtensilsCrossed,
  Wrench,
  Anchor,
  Brain,
  Users,
  FileText,
  Settings,
  Globe,
  type LucideIcon,
} from "lucide-react";

export type ProductStatus = "available" | "soon";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: ProductStatus;
  icon: LucideIcon;
  /** Monthly price in DZD. 0 means "Sur devis" (on quote). */
  monthlyDzd: number;
  /** Annual price in DZD. */
  annualDzd: number;
  /** Accent gradient classes for the icon badge. */
  accent: string;
  /**
   * Optional minimum display floor (in target currency) for EUR / USD.
   * Useful when the DZD price converts below a desired psychological floor.
   * 0 / undefined = no floor (use raw conversion).
   */
  floorEur?: number;
  floorUsd?: number;
}

export const PRODUCTS: Product[] = [
  {
    slug: "carte-visite-numerique",
    name: "Cartes de Visite Numériques",
    tagline: "Créez vos cartes de visite interactives avec QR Code",
    description:
      "Créez des cartes de visite numériques professionnelles et interactives. Partagez vos coordonnées, liens et profils en un scan. Idéal pour les professionnels, freelances et entreprises qui veulent moderniser leur image de marque.",
    features: [
      "Carte de visite interactive",
      "QR Code personnalisé",
      "Carte fidélité numérique",
      "Flyers digitaux",
      "Liens cliquables",
      "Profil professionnel",
      "Mise à jour en temps réel",
      "Statistiques de scan",
    ],
    status: "available",
    icon: CreditCard,
    monthlyDzd: 3990,
    annualDzd: 39990,
    accent: "from-cyan-500 to-blue-500",
  },
  {
    slug: "restaurant-qr",
    name: "Restaurant QR",
    tagline: "Menu numérique et gestion des commandes par QR Code",
    description:
      "Solution complète pour la restauration : menu numérique accessible par QR Code, gestion des commandes en temps réel, interface cuisine et administration. Multi-utilisateurs et multi-établissements pour les chaînes de restaurants.",
    features: [
      "Menu numérique QR Code",
      "QR Code par table",
      "Gestion des commandes",
      "Interface cuisine",
      "Interface serveurs",
      "Dashboard administration",
      "Connexion Google",
      "Multi-établissements",
    ],
    status: "available",
    icon: UtensilsCrossed,
    monthlyDzd: 2887,
    annualDzd: 28870,
    accent: "from-orange-500 to-amber-500",
  },
  {
    slug: "jetdiag-pro",
    name: "JetDiag-Pro",
    tagline: "Logiciel de gestion d'atelier Jet-Ski professionnel",
    description:
      "Logiciel complet de gestion d'atelier pour les professionnels du Jet-Ski. Gérez vos clients, véhicules, interventions, facturations et maintenances depuis une interface unifiée et moderne.",
    features: [
      "Gestion clients",
      "Gestion véhicules",
      "Suivi interventions",
      "Historique complet",
      "Facturation intégrée",
      "Planification maintenance",
      "Connexion Google",
      "Multi-utilisateurs",
    ],
    status: "available",
    icon: Wrench,
    monthlyDzd: 2887,
    annualDzd: 28870,
    accent: "from-purple-500 to-pink-500",
  },
  {
    slug: "nautica",
    name: "Nautica",
    tagline: "Application de gestion nautique avancée",
    description:
      "Solution de gestion dédiée aux professionnels du secteur nautique. Gestion de flotte, réservations, entretien et suivi client dans une plateforme moderne pensée pour les ports, loueurs et concessionnaires.",
    features: [
      "Gestion de flotte",
      "Système de réservation",
      "Suivi entretien",
      "Gestion clients",
      "Rapports avancés",
      "Interface mobile",
      "Notifications automatiques",
      "Tableau de bord analytique",
    ],
    status: "available",
    icon: Anchor,
    monthlyDzd: 3990,
    annualDzd: 39900,
    accent: "from-blue-500 to-cyan-500",
  },
  {
    slug: "outils-ia",
    name: "Outils IA",
    tagline: "Suite d'outils d'intelligence artificielle pour votre métier",
    description:
      "Accédez à une suite d'outils IA spécialement conçus pour automatiser et optimiser vos processus métier. Génération de contenu, analyse de données, chatbots et bien plus encore.",
    features: [
      "Génération de contenu IA",
      "Analyse de données",
      "Chatbot personnalisé",
      "Automatisation des tâches",
      "Traitement du langage naturel",
      "Intégration API",
      "Tableaux de bord IA",
      "Support multilingue",
    ],
    status: "available",
    icon: Brain,
    monthlyDzd: 1990,
    annualDzd: 19900,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    slug: "crm",
    name: "CRM",
    tagline: "Gestion de la relation client intelligente",
    description:
      "CRM moderne et intuitif pour gérer vos prospects, clients et opportunités commerciales. Suivez vos ventes, automatisez vos relances et analysez vos performances en un coup d'œil.",
    features: [
      "Gestion prospects et clients",
      "Pipeline commercial",
      "Automatisation des relances",
      "Historique interactions",
      "Rapports et analytics",
      "Intégration email",
      "Application mobile",
      "Import/Export données",
    ],
    status: "available",
    icon: Users,
    monthlyDzd: 2490,
    annualDzd: 24900,
    accent: "from-rose-500 to-red-500",
  },
  {
    slug: "facturation",
    name: "Facturation",
    tagline: "Logiciel de facturation et comptabilité simplifié",
    description:
      "Gérez vos devis, factures et paiements en toute simplicité. Suivi automatisé des règlements, relances intelligentes et rapports financiers clairs pour piloter votre activité sereinement.",
    features: [
      "Devis et factures",
      "Avoirs et remboursements",
      "Suivi des paiements",
      "Relances automatiques",
      "TVA et taxes",
      "Export comptable",
      "Modèles personnalisables",
      "Tableau de bord financier",
    ],
    status: "available",
    icon: FileText,
    monthlyDzd: 1490,
    annualDzd: 14900,
    accent: "from-amber-500 to-yellow-500",
  },
  {
    slug: "creation-site-web",
    name: "Création de Site Web",
    tagline: "Sites web modernes et performants",
    description:
      "Sites vitrines, e-commerce et plateformes sur mesure. Design responsive, SEO optimisé et performances au rendez-vous pour une présence en ligne professionnelle et durable.",
    features: [
      "Design responsive",
      "SEO optimisé",
      "Performance optimale",
      "Support technique",
      "Hébergement inclus",
      "Nom de domaine inclus",
    ],
    status: "available",
    icon: Globe,
    monthlyDzd: 4990,
    annualDzd: 49900,
    // Floor for EUR/USD display (avoid sub-400€/420$ after conversion)
    floorEur: 400,
    floorUsd: 420,
    accent: "from-indigo-500 to-violet-500",
  },
  {
    slug: "applications-sur-mesure",
    name: "Applications Métier Sur Mesure",
    tagline: "Développement d'applications personnalisées pour votre activité",
    description:
      "Besoin d'une application spécifique à votre métier ? Notre équipe conçoit des solutions sur mesure, de l'analyse des besoins jusqu'au déploiement et la maintenance. Construisez l'outil qui correspond exactement à vos processus.",
    features: [
      "Analyse des besoins",
      "Architecture sur mesure",
      "Développement agile",
      "Tests et validation",
      "Déploiement assisté",
      "Maintenance évolutive",
      "Support dédié",
      "Documentation complète",
    ],
    status: "available",
    icon: Settings,
    monthlyDzd: 0,
    annualDzd: 0,
    accent: "from-slate-500 to-gray-600",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const AVAILABLE_PRODUCTS = PRODUCTS.filter((p) => p.status === "available");
export const SOON_PRODUCTS = PRODUCTS.filter((p) => p.status === "soon");
