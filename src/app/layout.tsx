import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ariel Nazareno — ERP / SAP Technical Support Specialist",
  description: "ERP / SAP Technical Support Specialist focused on enterprise systems, automation, master data, technical support, and practical technology solutions.",
  openGraph: { title: "Ariel Nazareno — ERP / SAP Technical Support Specialist", description: "Enterprise systems, automation, master data, and practical technology solutions.", type: "website", images: [{ url: "/opengraph-image" }] },
  twitter: { card: "summary_large_image", title: "Ariel Nazareno — ERP / SAP Technical Support Specialist", description: "Enterprise systems, automation, master data, and practical technology solutions.", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personJsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Ariel Nazareno", jobTitle: "ERP / SAP Technical Support Specialist", email: "nazarenoariel02@gmail.com", sameAs: ["https://www.linkedin.com/in/ariel-nazareno/", "https://github.com/yel-x"] };
  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} /></body></html>;
}
