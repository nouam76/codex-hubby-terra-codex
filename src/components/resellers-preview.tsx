"use client";

import { ArrowRight, Handshake, Headset, GraduationCap, Megaphone } from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_RESELLER_URL } from "@/lib/contact";

const ADVANTAGES = [
  { icon: Handshake, label: "Commissions attractives" },
  { icon: Headset, label: "Support dédié" },
  { icon: GraduationCap, label: "Formation incluse" },
  { icon: Megaphone, label: "Matériel marketing" },
];

export function ResellersPreview() {
  const { goResellers } = useNav();
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card/80 to-primary/5 p-8 sm:p-12">
          <div className="text-center">
            <Badge className="mb-3 border-primary/30 bg-primary/10 text-primary">
              Programme Partenaire
            </Badge>
            <h2 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
              Devenez <span className="gradient-text">Revendeur TerraCodex</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Rejoignez notre réseau de partenaires et proposez des applications
              SaaS professionnelles à vos clients. Générez des revenus récurrents
              tout en offrant des solutions à forte valeur ajoutée.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ADVANTAGES.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/60 p-4 text-center"
                >
                  <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-lg">
                    <Icon className="h-4 w-4 text-background" />
                  </div>
                  <span className="text-xs font-medium text-foreground/90">
                    {a.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gradient-primary w-full text-background hover:opacity-90 sm:w-auto"
            >
              <a href={WHATSAPP_RESELLER_URL} target="_blank" rel="noreferrer">
                Devenir partenaire
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              onClick={goResellers}
              size="lg"
              variant="outline"
              className="w-full border-border bg-secondary/40 hover:bg-secondary sm:w-auto"
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
