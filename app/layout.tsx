import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";

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
        <Header />
        <div className="flex-1">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
