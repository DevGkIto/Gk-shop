import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import PromotionTime from "./_components/promotionTime";

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
        <div className="flex-1">
          <PromotionTime />
          <ClerkProvider>
            <Header />
            {children}
          </ClerkProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
