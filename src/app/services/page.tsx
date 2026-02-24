import type { Metadata } from "next";
import Script from "next/script";
import { createMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = createMetadata({
  title: "Servicios de Marketing Digital",
  description:
    "Diseño web, estrategia digital, marketing automation, creación de contenido, SEO & analytics e identidad de marca. Soluciones integrales para hacer crecer tu negocio.",
  path: "/services",
  keywords: [
    "servicios marketing digital",
    "agencia digital",
    "diseño web",
    "SEO",
    "marketing automation",
    "estrategia digital",
  ],
});

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Inicio", url: "/" },
    { name: "Servicios", url: "/services" },
  ]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesClient />
    </>
  );
}
