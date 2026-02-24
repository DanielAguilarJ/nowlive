import type { Metadata } from "next";
import Script from "next/script";
import { createMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = createMetadata({
  title: "Sobre Nosotros | Equipo & Proceso",
  description:
    "Conoce al equipo de CreamosTech: 50+ expertos en marketing digital, diseño y tecnología con más de 12 años de experiencia impulsando el crecimiento de marcas.",
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
