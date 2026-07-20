import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ToastProvider } from "@/context/ToastContext";
import { WishlistProvider } from "@/context/WishlistContext";
import NavbarWishlistButton from "@/components/NavbarWishlistButton";
import WishlistDrawer from "@/components/WishlistDrawer";
import BackToTopButton from "@/components/BackToTopButton";
import { getAllProducts } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinventory | Minimalist Men's & Women's Fashion",
  description: "The premium gateway to minimalist fashion. Curated looks, essentials, and Amazon Associate catalog.",
  openGraph: {
    title: "Pinventory | Minimalist Fashion Catalog",
    description: "The premium gateway to minimalist fashion. Curated looks and essentials.",
    type: "website",
    url: "https://pinventory-5hr5.vercel.app",
    siteName: "Pinventory",
    images: [
      {
        url: "https://pinventory-5hr5.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pinventory Cover",
      },
    ],
  },
  verification: {
    other: {
      "p:domain_verify": "2b35d9cc56f50526ac82aa5aec6d6e44",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProducts = getAllProducts();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="p:domain_verify" content="2b35d9cc56f50526ac82aa5aec6d6e44" />
      </head>
      <body className="min-h-full flex flex-col font-ui text-ebony bg-site-bg">
        <ToastProvider>
          <WishlistProvider>
            <header className="px-6 py-8 md:px-12 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-ebony">
              <Link href="/" className="font-brand font-[800] text-3xl tracking-tight uppercase">
                Pinventory
              </Link>
              <nav className="flex items-center gap-6 text-sm font-ui uppercase tracking-wider">
                <Link href="/category/men" className="hover:text-amber transition-colors">Men</Link>
                <Link href="/category/women" className="hover:text-amber transition-colors">Women</Link>
                <Link href="/category/accessories" className="hover:text-amber transition-colors">Accessories</Link>
                <NavbarWishlistButton />
              </nav>
            </header>

            <main className="flex-grow">
              {children}
            </main>

            <WishlistDrawer allProducts={allProducts} />
            <BackToTopButton />

            <footer className="px-6 py-12 md:px-12 mt-24 border-t border-ebony flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm font-ui text-ebony/80">
              <div>
                &copy; {new Date().getFullYear()} Pinventory. All rights reserved.
              </div>
              <div className="max-w-md text-xs leading-relaxed text-ebony/60">
                As an Amazon Associate we earn from qualifying purchases. This site serves as a premium gateway to curated minimalist fashion essentials.
              </div>
            </footer>
          </WishlistProvider>
        </ToastProvider>
      </body>
    </html>
  );
}