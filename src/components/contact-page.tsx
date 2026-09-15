"use client";

import { MessageCircle, Mail, ExternalLink, Clock, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL, EMAIL, CARD_URL } from "@/lib/contact";

export function ContactPage() {
  return (
    <div className="relative pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-[Space_Grotesk] text-4xl font-bold sm:text-5xl">
            Contactez-<span className="gradient-text">nous</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">Parlons de votre projet</p>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Notre équipe est disponible pour répondre à vos questions, vous
            accompagner dans le choix de la solution adaptée ou discuter d'un
            partenariat.
          </p>
        </div>

        {/* 3 cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            description="Réponse rapide pour toute question sur nos produits, commandes ou partenariats."
            actionLabel="Ouvrir WhatsApp"
            actionHref={WHATSAPP_URL}
            accent
          />
          <ContactCard
            icon={Mail}
            title="Email"
            description={`Pour les demandes détaillées, devis personnalisés ou questions techniques. ${EMAIL}`}
            actionLabel="Envoyer un email"
            actionHref={`mailto:${EMAIL}`}
          />
          <ContactCard
            icon={ExternalLink}
            title="Carte de visite numérique"
            description="Retrouvez toutes nos coordonnées et liens professionnels sur notre carte de visite numérique interactive."
            actionLabel="Voir la carte de visite"
            actionHref={CARD_URL}
          />
        </div>

        {/* Présence mondiale */}
        <section className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <h2 className="font-[Space_Grotesk] text-lg font-semibold">
                Délai de réponse
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Nous répondons généralement dans les 24 heures ouvrées. WhatsApp
              est le canal le plus rapide.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-6">
            <div className="flex items-center gap-2 text-primary">
              <Globe2 className="h-5 w-5" />
              <h2 className="font-[Space_Grotesk] text-lg font-semibold">
                Présence
              </h2>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Algérie • France • International. Nos solutions SaaS sont
              accessibles depuis n'importe où dans le monde.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  accent = false,
}: {
  icon: typeof MessageCircle;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card/60 p-6">
      <div
        className={
          accent
            ? "gradient-primary glow-cyan flex h-12 w-12 items-center justify-center rounded-lg"
            : "flex h-12 w-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary"
        }
      >
        <Icon className={accent ? "h-6 w-6 text-background" : "h-6 w-6 text-primary"} />
      </div>
      <h3 className="mt-4 font-[Space_Grotesk] text-lg font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
      <Button
        asChild
        className="mt-5 w-full"
        variant={accent ? "default" : "outline"}
      >
        <a href={actionHref} target="_blank" rel="noreferrer">
          {actionLabel}
        </a>
      </Button>
    </div>
  );
}
