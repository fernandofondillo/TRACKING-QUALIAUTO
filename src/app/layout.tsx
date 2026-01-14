import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TRACKING QUALIAUTO | Gestión CRM Vehículos",
  description: "Sistema de gestión premium para vehículos seminuevos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} automotive-gradient min-h-screen text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
