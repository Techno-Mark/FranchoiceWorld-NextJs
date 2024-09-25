import CookieConsent from "@/components/cookie/cookie";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import MainPopup from "@/components/pop-up/pop-up";
import type { Metadata } from "next";
import "./globals.css";

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

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            adroll_adv_id = "IBJE2MI5PBBDTD4KJ6ULLS";
            adroll_pix_id = "5STVHOG2TRENJIZ7HYTFAE";
            adroll_version = "2.0";
            (function(w, d, e, o, a) {
                w.__adroll_loaded = true;
                w.adroll = w.adroll || [];
                w.adroll.f = ['setProperties', 'identify', 'track', 'identify_email'];
                var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id + "/roundtrip.js";
                for (a = 0; a < w.adroll.f.length; a++) {
                    w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                        return function() {
                            w.adroll.push([n, arguments])
                        }
                    })(w.adroll.f[a])
                }
                e = d.createElement('script');
                o = d.getElementsByTagName('script')[0];
                e.async = 1;
                e.src = roundtripUrl;
                o.parentNode.insertBefore(e, o);
            })(window, document);
            adroll.track("pageView");
          `,
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
