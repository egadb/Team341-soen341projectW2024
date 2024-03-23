import Footer from "@/components/global/Footer";
import NavBar from "@/components/global/NavBar";
import { getUserSession } from "@/lib/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent-A-Koenigsegg",
  description: "Made by Soen 341",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
