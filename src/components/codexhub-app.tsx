"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HomePage } from "@/components/home-page";
import { ProductsSection } from "@/components/products-section";
import { ProductDetailPage } from "@/components/product-detail-page";
import { OrderPage } from "@/components/order-page";
import { ResellersPage } from "@/components/resellers-page";
import { ContactPage } from "@/components/contact-page";
import { LegalPage } from "@/components/legal-page";
import { NotFoundBlock } from "@/components/not-found";
import { useNav } from "@/lib/nav-context";

export function CodexHubApp() {
  const { route } = useNav();

  let content: React.ReactNode;
  switch (route.name) {
    case "home":
      content = <HomePage />;
      break;
    case "products":
      content = (
        <div className="pt-24">
          <ProductsSection showAll />
        </div>
      );
      break;
    case "product":
      content = <ProductDetailPage slug={route.slug} />;
      break;
    case "order":
      content = <OrderPage slug={route.slug} />;
      break;
    case "resellers":
      content = <ResellersPage />;
      break;
    case "contact":
      content = <ContactPage />;
      break;
    case "legal":
      content = <LegalPage page={route.page} />;
      break;
    default:
      content = <NotFoundBlock />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}
