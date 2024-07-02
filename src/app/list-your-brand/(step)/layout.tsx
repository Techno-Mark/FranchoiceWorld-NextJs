import Footer from "@/components/footer/footer";
import StepHeader from "@/components/stepHeader/stepHeader";
import Stepper from "@/components/stepper/stepper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mainBody">
        <main className="flex flex-col min-h-screen">
          <StepHeader />
          <Stepper
            icon=""
            title="Enter Your Confidential Information"
            active={true}
          />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
