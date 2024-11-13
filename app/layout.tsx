import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import PromotionTime from "./_components/promotionTime";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Gk app",
  description: "Football Shirts E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex-1 min-h-screen">
          <ClerkProvider>
            <PromotionTime />
            <Header />
            <div className="flex h-full flex-col overflow-hidden">
              {children}
            </div>
          </ClerkProvider>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
