"use client";

import { MessageCircle, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL, EMAIL, CARD_URL } from "@/lib/contact";

export function ContactSection() {
  const { goContact } = useNav();
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
            Une question ? <span className="gradient-text">Contactez-nous</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Notre équipe est disponible pour vous accompagner dans votre projet
            de digitalisation.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Button
            asChild
            size="lg"
            className="gradient-primary text-background hover:opacity-90"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border bg-secondary/40 hover:bg-secondary"
          >
            <a href={`mailto:${EMAIL}`}>
              <Mail className="mr-2 h-4 w-4" />
              {EMAIL}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border bg-secondary/40 hover:bg-secondary"
          >
            <a href={CARD_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Voir notre carte de visite
            </a>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={goContact}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Plus d'options de contact
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
