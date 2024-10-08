import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { ListBrandProvider } from "@/contexts/ListBrandContext";
import CookieConsent from "@/components/cookie/cookie";

export const metadata: Metadata = {
  title: {
    // absolute:'', for child for complete ignore layout metadata
    default: "Franchoice World",
    template: "%s | Franchoice World",
  },
  description: "Grow Beyond Limits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="shortcut icon" href="/images/favicon.ico" sizes="/any" />
      </head>
      <body className="mainBody">
        {/* <ListBrandProvider> */}
        <main className="flex flex-col min-h-screen mainWrapper">
          <Header />
          {children}
          <CookieConsent />
        </main>
        <Footer />
        {/* </ListBrandProvider> */}
      </body>
    </html>
  );
}
