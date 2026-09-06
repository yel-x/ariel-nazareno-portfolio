import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARIEL NAZARENO — ERP / SAP TECHNICAL SUPPORT SPECIALIST",
  description: "ERP / SAP Technical Support Specialist focused on enterprise systems, technical support, automation, data, and practical technology solutions.",
  openGraph: { title: "ARIEL NAZARENO — BUILT FROM SYSTEMS", description: "ERP / SAP Technical Support Specialist focused on enterprise systems, automation, and data.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
