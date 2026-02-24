import type { Metadata } from "next";
import Script from "next/script";
import { createMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import CareersClient from "./CareersClient";

export const metadata: Metadata = createMetadata({
  title: "Carreras | Trabaja con Nosotros",
  description:
    "Únete al equipo de CreamosTech. Posiciones remotas en tecnología, marketing, diseño, SEO y gestión de cuentas. Cultura flexible, proyectos retadores y crecimiento real.",
  path: "/careers",
  keywords: [
    "trabajar en CreamosTech",
    "carreras",
    "trabajo remoto",
    "marketing digital empleo",
    "vacantes agencia digital",
  ],
});

export default function CareersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Carreras", url: "/careers" },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CareersClient />
    </>
  );
}
