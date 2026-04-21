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
        <div className="min-h-screen flex-1">
          <ClerkProvider>
            <PromotionTime />
            <Header />
            <div className="flex min-h-screen flex-col">{children}</div>
          </ClerkProvider>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
