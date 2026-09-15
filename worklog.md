---
Task ID: main
Agent: Super Z (main)
Task: Recréer le site Codex Hub by TerraCodex (Next.js) avec affichage multi-devises (DZD/EUR/USD) selon les taux : 1 EUR = 275 DZD, 1 USD = 245 DZD.

Work Log:
- Analyse du site original via subagent (https://codexhub-ebqoatmy.manus.space) : 9 produits SaaS, thème sombre navy + accent cyan #00bbc3, polices Inter/Space Grotesk/JetBrains Mono.
- Initialisation du projet Next.js 16 + Tailwind CSS 4 + shadcn/ui.
- Configuration du layout (fonts Google) et de globals.css (thème dark navy, gradient cyan, glow, grille hero).
- Création de `src/lib/currency.ts` : conversion DZD→EUR (÷275) et DZD→USD (÷245), formatage fr-FR.
- Création de `src/lib/products.ts` : 9 produits avec prix mensuel/annuel en DZD, icônes Lucide.
- Création de `src/lib/currency-context.tsx` : provider avec useSyncExternalStore (localStorage persistant).
- Création de `src/lib/nav-context.tsx` : routing hash-based (#/, #/produits, #/produits/:slug, #/commander/:slug, #/revendeurs, #/contact, #/cgv, #/confidentialite, #/mentions-legales).
- Composants : Navbar (avec CurrencySwitcher), Hero, Advantages, ProductCard, ProductsSection, ProductDetailPage, OrderPage (formulaire + 3 moyens de paiement CCP/BaridiMob/RedotPay + copy-to-clipboard + toasts), ResellersPage, ContactPage, LegalPage (CGV/Confidentialité/Mentions), FAQ, Footer, NotFound.
- Correction lint : remplacement des useState/useEffect par useSyncExternalStore pour currency et nav (évite `set-state-in-effect`).
- Correction bug runtime : cache du snapshot dans getSnapshot (parseHash) pour éviter la boucle infinie "getSnapshot should be cached".
- Tests Agent Browser : home, switcher DZD/EUR/USD (990 DA = 3,60 € = 4,04 $), navigation produit, tunnel de commande (form + toast), FAQ accordion, Revendeurs, Contact, CGV, catalogue (5 disponibles + 4 bientôt).

Stage Summary:
- Site complet opérationnel sur port 3000.
- Lint : 0 erreur, 0 warning.
- Multi-devises fonctionnel avec persistance localStorage.
- Toutes les routes internes (hash-based) testées et validées.
- Captures : /home/z/my-project/download/home-final.png, home-preview.png, faq-test.png.
