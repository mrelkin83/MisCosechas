import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "MisCosechas.com - Marketplace Agropecuario de Colombia",
  description:
    "Plataforma B2B/B2C especializada en productos agropecuarios colombianos. Conectamos productores con compradores de manera segura y eficiente.",
  generator: "MisCosechas.com",
  keywords: ["agricultura", "colombia", "marketplace", "agropecuario", "productores", "cosechas"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${montserrat.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
