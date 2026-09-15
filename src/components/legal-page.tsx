"use client";

import { ArrowLeft } from "lucide-react";
import { useNav } from "@/lib/nav-context";

type LegalPage = "cgv" | "privacy" | "mentions";

const TITLES: Record<LegalPage, string> = {
  cgv: "Conditions Générales de Vente",
  privacy: "Politique de Confidentialité",
  mentions: "Mentions Légales",
};

const CONTENT: Record<LegalPage, { title: string; body: string }[]> = {
  cgv: [
    {
      title: "1. Objet",
      body: "Les présentes Conditions Générales de Vente (CGV) régissent les relations entre TerraCodex (« le Vendeur ») et le Client dans le cadre de la souscription aux abonnements SaaS proposés sur la plateforme Codex Hub. Toute commande implique l'acceptation pleine et entière des présentes conditions.",
    },
    {
      title: "2. Produits et services",
      body: "Les produits proposés sont des applications SaaS accessibles via un navigateur web, sans installation requise. Chaque application fait l'objet d'une fiche descriptive précisant ses fonctionnalités. Les caractéristiques peuvent évoluer en fonction des mises à jour et améliorations continues.",
    },
    {
      title: "3. Prix",
      body: "Les prix sont indiqués en Dinars Algériens (DA), TTC. Ils peuvent être affichés en Euros (EUR) ou Dollars (USD) à titre indicatif, selon un taux de conversion défini par le Vendeur. En cas de discordance, c'est le prix en DA affiché au moment de la commande qui fait foi. Les prix sont modifiables à tout moment.",
    },
    {
      title: "4. Processus de commande",
      body: "Le Client remplit le formulaire de commande en ligne, sélectionne son abonnement (mensuel ou annuel) et son moyen de paiement. Après effet du paiement, le Vendeur vérifie la conformité de la transaction. Le Vendeur se réserve le droit de refuser une commande en cas de paiement non reçu ou non conforme.",
    },
    {
      title: "5. Paiement",
      body: "Les paiements sont acceptés via CCP (Algérie Poste), BaridiMob (RIP) ou RedotPay. Les coordonnées de paiement sont affichées à l'étape de commande et peuvent être copiées en un clic. Le Client doit transmettre la preuve de paiement (reçu ou capture) pour validation.",
    },
    {
      title: "6. Livraison des accès",
      body: "Après validation du paiement, le lien d'accès à l'application est envoyé au Client dans un délai de 24 heures ouvrées, via WhatsApp ou email selon la préférence communiquée.",
    },
    {
      title: "7. Durée et renouvellement",
      body: "L'abonnement mensuel a une durée de 30 jours. L'abonnement annuel a une durée de 365 jours, avec 2 mois offerts. Le renouvellement n'est pas automatique : une nouvelle commande est nécessaire pour prolonger l'accès.",
    },
    {
      title: "8. Politique de remboursement",
      body: "Compte tenu de la nature numérique des produits et de l'envoi immédiat des accès, aucun remboursement n'est effectué après livraison du lien d'accès. Toutefois, en cas de problème technique imputable au Vendeur, un avoir ou une solution alternative sera proposé.",
    },
    {
      title: "9. Responsabilité",
      body: "Le Vendeur ne saurait être tenu responsable des interruptions de service dues à des opérations de maintenance, à des cas de force majeure ou à des défaillances imputables à des tiers (fournisseurs d'accès, hébergeurs). Le Vendeur s'engage à tout mettre en œuvre pour rétablir l'accès dans les meilleurs délais.",
    },
    {
      title: "10. Droit applicable",
      body: "Les présentes CGV sont soumises au droit algérien et français. En cas de litige, les parties rechercheront une solution amiable avant toute action judiciaire.",
    },
    {
      title: "11. Contact",
      body: "Pour toute question relative aux présentes CGV, le Client peut contacter le Vendeur via WhatsApp (bouton WhatsApp sur le site) ou par email (contacte.terra.codex@gmail.com).",
    },
  ],
  privacy: [
    {
      title: "1. Collecte des données",
      body: "TerraCodex collecte les données suivantes : nom et prénom (lors d'une commande), email (facultatif), numéro WhatsApp (facultatif), ainsi que des logs techniques (adresse IP, type de navigateur) à des fins de sécurité et de statistiques d'usage.",
    },
    {
      title: "2. Utilisation des données",
      body: "Les données sont utilisées pour le traitement et le suivi des commandes, la livraison des accès, la communication liée à la commande et l'amélioration des services. Les données ne sont jamais vendues ni partagées à des fins commerciales à des tiers.",
    },
    {
      title: "3. Conservation des données",
      body: "Les données sont conservées pendant la durée du contrat commercial et pour la durée nécessaire au respect des obligations légales, soit environ 3 ans après la fin de la relation commerciale.",
    },
    {
      title: "4. Vos droits",
      body: "Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition concernant vos données. Ces droits sont exerçables en écrivant à contacte.terra.codex@gmail.com.",
    },
    {
      title: "5. Cookies",
      body: "Le site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking commercial n'est déposé.",
    },
    {
      title: "6. Sécurité",
      body: "TerraCodex met en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données contre la perte, l'accès non autorisé ou la divulgation. Les données sont hébergées sur des infrastructures cloud sécurisées conformes aux standards en vigueur.",
    },
  ],
  mentions: [
    {
      title: "1. Éditeur du site",
      body: "Le site Codex Hub est édité par TerraCodex. Contact : contacte.terra.codex@gmail.com · WhatsApp (lien sur le site).",
    },
    {
      title: "2. Hébergement",
      body: "Le site est hébergé sur des infrastructures cloud sécurisées conformes aux standards en vigueur.",
    },
    {
      title: "3. Propriété intellectuelle",
      body: "L'ensemble du contenu du site (textes, images, logos, code source, charte graphique) est la propriété exclusive de TerraCodex. Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, est interdite sans autorisation écrite préalable.",
    },
    {
      title: "4. Responsabilité",
      body: "TerraCodex s'efforce de fournir des informations exactes et à jour mais ne saurait garantir l'exactitude, la complétude ou l'actualité absolue des informations diffusées sur le site.",
    },
    {
      title: "5. Contact",
      body: "Pour toute question relative aux mentions légales, vous pouvez nous contacter via WhatsApp (bouton WhatsApp sur le site) ou par email (contacte.terra.codex@gmail.com).",
    },
  ],
};

export function LegalPage({ page }: { page: LegalPage }) {
  const { goHome } = useNav();
  return (
    <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <button
        onClick={goHome}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Accueil
      </button>

      <h1 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
        {TITLES[page]}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dernière mise à jour : juin 2026
      </p>

      <div className="mt-8 space-y-6">
        {CONTENT[page].map((section) => (
          <section key={section.title}>
            <h2 className="font-[Space_Grotesk] text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
