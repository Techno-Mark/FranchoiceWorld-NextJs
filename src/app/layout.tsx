import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import CookieConsent from "@/components/cookie/cookie";

export const metadata: Metadata = {
  title: {
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

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NXCN43GS');`, // Replace GTM-XXXXXXX with your GTM ID
          }}
        />

        {/* Google Tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-N8S5PBBZZV`} // Replace GA-TRACKING_ID with your Google Analytics ID
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N8S5PBBZZV');`, // Replace GA-TRACKING_ID with your Google Analytics ID
          }}
        />
      </head>
      <body className="mainBody">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NXCN43GS" 
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <main className="flex flex-col min-h-screen mainWrapper">
          <Header />
          {children}
          <CookieConsent />
        </main>
        <Footer />
      </body>
    </html>
  );
}
