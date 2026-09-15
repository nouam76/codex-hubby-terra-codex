"use client";

import {
  ArrowRight,
  Handshake,
  Headset,
  GraduationCap,
  Megaphone,
  Users,
  Rocket,
} from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_RESELLER_URL } from "@/lib/contact";

const PROFILES = [
  "Agences web",
  "Freelances",
  "Consultants IT",
  "Intégrateurs",
  "Revendeurs informatique",
  "Cabinets de conseil",
];

const ADVANTAGES = [
  {
    icon: Handshake,
    title: "Commissions attractives",
    description:
      "Gagnez des commissions compétitives sur chaque vente réalisée auprès de vos clients.",
  },
  {
    icon: Headset,
    title: "Support dédié",
    description:
      "Un interlocuteur dédié pour vous accompagner dans vos démarches commerciales et techniques.",
  },
  {
    icon: GraduationCap,
    title: "Formation incluse",
    description:
      "Formation complète sur nos produits pour vous permettre de les présenter efficacement.",
  },
  {
    icon: Megaphone,
    title: "Matériel marketing",
    description:
      "Accès à tous les supports de vente, présentations et démonstrations de nos applications.",
  },
  {
    icon: Users,
    title: "Réseau partenaires",
    description:
      "Rejoignez une communauté de revendeurs et bénéficiez d'échanges et de synergies.",
  },
  {
    icon: Rocket,
    title: "Priorité nouveautés",
    description:
      "Accès en avant-première aux nouvelles applications et fonctionnalités.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Contactez-nous via WhatsApp",
    description:
      "Cliquez sur le bouton 'Devenir partenaire' pour nous envoyer un message WhatsApp avec votre profil.",
  },
  {
    num: "02",
    title: "Échange et qualification",
    description:
      "Nous discutons de votre activité, de vos clients cibles et des opportunités de collaboration.",
  },
  {
    num: "03",
    title: "Signature du partenariat",
    description:
      "Nous formalisons notre accord avec les conditions commerciales adaptées à votre profil.",
  },
  {
    num: "04",
    title: "Formation et démarrage",
    description:
      "Vous recevez votre formation, vos supports marketing et commencez à vendre nos solutions.",
  },
];

export function ResellersPage() {
  const { goContact } = useNav();
  void goContact;

  return (
    <div className="relative pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-3 border-primary/30 bg-primary/10 text-primary">
            Programme Partenaire
          </Badge>
          <h1 className="font-[Space_Grotesk] text-4xl font-bold sm:text-5xl">
            Devenez <span className="gradient-text">Revendeur TerraCodex</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
            Rejoignez notre réseau de partenaires et proposez des applications
            SaaS professionnelles à vos clients. Générez des revenus récurrents
            tout en offrant des solutions à forte valeur ajoutée.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 gradient-primary text-background hover:opacity-90"
          >
            <a href={WHATSAPP_RESELLER_URL} target="_blank" rel="noreferrer">
              Devenir partenaire
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Profils */}
        <section className="mt-16">
          <h2 className="text-center font-[Space_Grotesk] text-xl font-semibold">
            Ce programme est fait pour vous si vous êtes...
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {PROFILES.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-sm text-foreground/90"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Avantages */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="font-[Space_Grotesk] text-2xl font-bold sm:text-3xl">
              Les avantages du programme
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Tout ce dont vous avez besoin pour réussir en tant que revendeur
              TerraCodex.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANTAGES.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="rounded-xl border border-border bg-card/60 p-6"
                >
                  <div className="gradient-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                    <Icon className="h-5 w-5 text-background" />
                  </div>
                  <h3 className="font-[Space_Grotesk] text-base font-semibold">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {a.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Steps */}
        <section className="mt-16">
          <div className="text-center">
            <h2 className="font-[Space_Grotesk] text-2xl font-bold sm:text-3xl">
              Comment rejoindre le programme ?
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="relative rounded-xl border border-border bg-card/60 p-6"
              >
                <div className="font-[Space_Grotesk] text-3xl font-bold gradient-text">
                  {s.num}
                </div>
                <h3 className="mt-2 font-[Space_Grotesk] text-base font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card/80 to-primary/5 p-8 text-center sm:p-12">
          <h2 className="font-[Space_Grotesk] text-2xl font-bold sm:text-3xl">
            Prêt à rejoindre l'aventure TerraCodex ?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Contactez-nous dès maintenant via WhatsApp pour discuter de votre
            candidature au programme revendeur.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 gradient-primary text-background hover:opacity-90"
          >
            <a href={WHATSAPP_RESELLER_URL} target="_blank" rel="noreferrer">
              Devenir partenaire maintenant
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </section>
      </div>
    </div>
  );
}
