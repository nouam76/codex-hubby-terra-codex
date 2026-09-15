"use client";

import { Home, ArrowLeft } from "lucide-react";
import { useNav } from "@/lib/nav-context";
import { Button } from "@/components/ui/button";

export function NotFoundBlock() {
  const { goHome } = useNav();
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
      <div className="font-[Space_Grotesk] text-7xl font-bold gradient-text sm:text-9xl">
        404
      </div>
      <h1 className="mt-4 font-[Space_Grotesk] text-2xl font-bold">
        Page introuvable
      </h1>
      <p className="mt-2 text-muted-foreground">
        Désolé, la page que vous recherchez n'existe pas. Elle a peut-être été
        déplacée ou supprimée.
      </p>
      <Button
        onClick={goHome}
        className="mt-6 gradient-primary text-background hover:opacity-90"
      >
        <Home className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Button>
    </div>
  );
}
