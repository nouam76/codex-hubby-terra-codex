"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  CreditCard,
  Wallet,
  Send,
  Eye,
} from "lucide-react";
import { getProductBySlug } from "@/lib/products";
import { useNav } from "@/lib/nav-context";
import { useCurrency } from "@/lib/currency-context";
import { formatPrice } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { NotFoundBlock } from "@/components/not-found";

type BillingCycle = "monthly" | "annual";
type PaymentMethod = "ccp" | "baridimob" | "redotpay";

const PAYMENT_METHODS: {
  code: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    code: "ccp",
    label: "CCP",
    description: "Algérie Poste",
    icon: CreditCard,
  },
  {
    code: "baridimob",
    label: "BM",
    description: "BaridiMob",
    icon: Wallet,
  },
  {
    code: "redotpay",
    label: "RP",
    description: "RedotPay",
    icon: Send,
  },
];

const PAYMENT_DETAILS: Record<
  PaymentMethod,
  { title: string; lines: { label: string; value: string; copy?: boolean }[]; note: string }
> = {
  ccp: {
    title: "CCP — Algérie Poste",
    lines: [
      { label: "Titulaire", value: "M. GUEHRIA NOUAM" },
      { label: "Numéro CCP", value: "42385470", copy: true },
      { label: "Clé", value: "49", copy: true },
    ],
    note: "Effectuez un virement postal au compte CCP ci-dessus, puis envoyez le reçu.",
  },
  baridimob: {
    title: "BaridiMob — RIP",
    lines: [
      { label: "Titulaire", value: "M. GUEHRIA NOUAM" },
      { label: "RIP", value: "00799999004238547029", copy: true },
    ],
    note: "Effectuez un virement via BaridiMob au RIP ci-dessus, puis envoyez le reçu.",
  },
  redotpay: {
    title: "RedotPay",
    lines: [{ label: "UID RedotPay", value: "1935479627", copy: true }],
    note: "Envoyez le paiement à l'UID RedotPay ci-dessus, puis envoyez la capture d'écran.",
  },
};

export function OrderPage({ slug }: { slug: string }) {
  const product = getProductBySlug(slug);
  const { goProduct, goProducts } = useNav();
  const { currency } = useCurrency();
  const { toast } = useToast();

  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [payment, setPayment] = useState<PaymentMethod>("ccp");
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (!product) {
    return <NotFoundBlock />;
  }

  const priceDzd = cycle === "monthly" ? product.monthlyDzd : product.annualDzd;
  const details = PAYMENT_DETAILS[payment];

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      toast({ title: "Copié !", description: `${value} copié dans le presse-papiers.` });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({ title: "Erreur", description: "Impossible de copier.", variant: "destructive" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast({ title: "Nom requis", description: "Veuillez saisir votre nom complet.", variant: "destructive" });
      return;
    }
    if (!form.email.trim() && !form.whatsapp.trim()) {
      toast({
        title: "Contact requis",
        description: "Fournissez au moins un email ou un numéro WhatsApp.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Commande enregistrée !",
        description: "Nous vous contacterons après vérification.",
      });
      goProduct(product.slug);
    }, 900);
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <button
        onClick={() => goProduct(product.slug)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {product.name}
      </button>

      <h1 className="font-[Space_Grotesk] text-3xl font-bold sm:text-4xl">
        Commander <span className="gradient-text">{product.name}</span>
      </h1>
      <p className="mt-3 text-muted-foreground">
        Remplissez le formulaire ci-dessous pour finaliser votre commande.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-5">
        {/* LEFT: Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Vos informations */}
          <div className="rounded-xl border border-border bg-card/60 p-5">
            <h2 className="font-[Space_Grotesk] text-lg font-semibold">
              Vos informations
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Votre nom et prénom"
                  className="mt-1.5"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email (pour recevoir le lien)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp (ou email)</Label>
                  <Input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    placeholder="+213 6XX XXX XXX"
                    className="mt-1.5"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                * Fournissez au moins un email ou un numéro WhatsApp pour recevoir
                votre lien d'accès.
              </p>
              <div>
                <Label htmlFor="note">Note (facultatif)</Label>
                <Textarea
                  id="note"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Informations complémentaires..."
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Abonnement */}
          <div className="rounded-xl border border-border bg-card/60 p-5">
            <h2 className="font-[Space_Grotesk] text-lg font-semibold">
              Choisir l'abonnement
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setCycle("monthly")}
                className={cn(
                  "rounded-lg border-2 p-4 text-left transition-colors",
                  cycle === "monthly"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30 hover:border-primary/40"
                )}
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Mensuel
                </div>
                <div className="mt-1 font-[Space_Grotesk] text-xl font-bold">
                  {formatPrice(product.monthlyDzd, currency)}
                </div>
                <div className="text-xs text-muted-foreground">par mois</div>
              </button>
              <button
                type="button"
                onClick={() => setCycle("annual")}
                className={cn(
                  "relative rounded-lg border-2 p-4 text-left transition-colors",
                  cycle === "annual"
                    ? "border-primary bg-primary/10"
                    : "border-border bg-secondary/30 hover:border-primary/40"
                )}
              >
                <span className="absolute -top-2.5 left-3 rounded-full gradient-primary px-2 py-0.5 text-[10px] font-bold text-background">
                  2 mois offerts
                </span>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  Annuel
                </div>
                <div className="mt-1 font-[Space_Grotesk] text-xl font-bold">
                  {formatPrice(product.annualDzd, currency)}
                </div>
                <div className="text-xs text-muted-foreground">par an</div>
              </button>
            </div>
          </div>

          {/* Paiement */}
          <div className="rounded-xl border border-border bg-card/60 p-5">
            <h2 className="font-[Space_Grotesk] text-lg font-semibold">
              Moyen de paiement
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.code}
                    type="button"
                    onClick={() => setPayment(m.code)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-lg border-2 p-3 transition-colors",
                      payment === m.code
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/30 hover:border-primary/40"
                    )}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold">{m.label}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {m.description}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Payment details */}
            <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{details.title}</h3>
                <Button type="button" variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <Eye className="mr-1 h-3 w-3" />
                  Voir en grand
                </Button>
              </div>
              <div className="mt-3 space-y-2">
                {details.lines.map((line) => (
                  <div
                    key={line.label}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">{line.label}</span>
                    <span className="flex items-center gap-2 font-mono text-foreground">
                      {line.value}
                      {line.copy && (
                        <button
                          type="button"
                          onClick={() => handleCopy(line.value)}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          aria-label="Copier"
                        >
                          {copied === line.value ? (
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{details.note}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm">
            <h2 className="font-[Space_Grotesk] text-lg font-semibold">
              Total à payer
            </h2>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-baseline gap-1">
                <span className="font-[Space_Grotesk] text-3xl font-bold gradient-text">
                  {formatPrice(priceDzd, currency)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                TTC · paiement unique · renouvellement non automatique
              </p>
            </div>
            <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Produit</span>
                <span className="text-right font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Formule</span>
                <span className="font-medium">
                  {cycle === "monthly" ? "Mensuel" : "Annuel (-2 mois)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paiement</span>
                <span className="font-medium">
                  {PAYMENT_METHODS.find((m) => m.code === payment)?.label}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full gradient-primary text-background hover:opacity-90"
            >
              {submitting ? "Traitement..." : "Confirmer la commande"}
            </Button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
              En confirmant, vous acceptez nos CGV et notre politique de
              confidentialité.
            </p>

            <button
              type="button"
              onClick={() => goProducts()}
              className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              ← Retour au catalogue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
