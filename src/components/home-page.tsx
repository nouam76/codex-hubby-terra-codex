"use client";

import { Hero } from "@/components/hero";
import { Advantages } from "@/components/advantages";
import { ProductsSection } from "@/components/products-section";
import { ResellersPreview } from "@/components/resellers-preview";
import { Faq } from "@/components/faq";
import { ContactSection } from "@/components/contact-section";

export function HomePage() {
  return (
    <>
      <Hero />
      <Advantages />
      <ProductsSection limit={6} />
      <ResellersPreview />
      <Faq />
      <ContactSection />
    </>
  );
}
