"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "Comment commander une application ?",
    a: "Cliquez sur le produit souhaité, choisissez votre abonnement (mensuel ou annuel), remplissez le formulaire avec votre nom et votre contact (email ou WhatsApp), puis sélectionnez votre mode de paiement. Après vérification de votre paiement, vous recevrez votre lien d'accès.",
  },
  {
    q: "Quels sont les modes de paiement acceptés ?",
    a: "Nous acceptons le CCP (Algérie Poste), BaridiMob (RIP) et RedotPay. Les coordonnées complètes s'affichent lors de la commande et sont copiables en un clic.",
  },
  {
    q: "Combien de temps pour recevoir mon accès ?",
    a: "Après validation de votre paiement, votre lien d'accès vous est envoyé dans les 24 heures via WhatsApp ou email selon votre préférence.",
  },
  {
    q: "Puis-je essayer avant d'acheter ?",
    a: "Contactez-nous via WhatsApp ou email pour une démonstration personnalisée de l'application qui vous intéresse.",
  },
  {
    q: "Les applications fonctionnent-elles sur mobile ?",
    a: "Oui, toutes nos applications sont conçues en Mobile First et fonctionnent parfaitement sur smartphone, tablette et ordinateur.",
  },
  {
    q: "Comment devenir revendeur ?",
    a: "Cliquez sur le bouton 'Devenir partenaire' dans la section Revendeurs. Vous serez redirigé vers WhatsApp pour discuter des conditions du programme.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tout ce que vous devez savoir avant de commander.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border bg-card/50"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-3 p-5 text-left"
                >
                  <span className="font-[Space_Grotesk] text-base font-semibold text-foreground">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/80">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
