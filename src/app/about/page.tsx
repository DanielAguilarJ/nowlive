import type { Metadata } from "next";
import Script from "next/script";
import { createMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = createMetadata({
  title: "Sobre Nosotros | Equipo & Proceso",
  description:
    "Conoce a Kevin Daniel Aguilar Junco, especialista SEO en Aguascalientes, Mexico, enfocado en optimizacion, simulacion numerica y ML/AI para sistemas mecanicos y energeticos.",
  path: "/about",
  keywords: [
    "sobre nosotros",
    "equipo CreamosTech",
    "agencia de marketing",
    "quiénes somos",
    "nuestro proceso",
    "nuestro equipo",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Sobre Nosotros", url: "/about" },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClient />
    </>
  );
}
