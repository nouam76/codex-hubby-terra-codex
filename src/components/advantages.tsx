"use client";

import { Zap, Shield, Globe, Sparkles } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Zap,
    title: "Déploiement rapide",
    description: "Vos accès livrés sous 24h après validation du paiement.",
  },
  {
    icon: Shield,
    title: "Sécurité avancée",
    description: "Authentification Google OAuth, données isolées par client.",
  },
  {
    icon: Globe,
    title: "100% Cloud",
    description: "Accessible partout, aucune installation requise.",
  },
  {
    icon: Sparkles,
    title: "IA intégrée",
    description: "Outils d'intelligence artificielle pour automatiser vos tâches.",
  },
];

export function Advantages() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
            Pourquoi choisir <span className="gradient-text">Codex Hub</span> ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Des solutions pensées pour les professionnels qui veulent aller vite
            et bien.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((adv) => (
            <div
              key={adv.title}
              className="group rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card"
            >
              <div className="gradient-primary mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                <adv.icon className="h-5 w-5 text-background" />
              </div>
              <h3 className="font-[Space_Grotesk] text-lg font-semibold text-foreground">
                {adv.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
