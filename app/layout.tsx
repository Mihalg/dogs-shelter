import "@/app/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Przytulisko dla Bezdomnych Psów w Kłodawie",
  description:
    "Strona internetowa Przytuliska dla Bezdomnych Psów w Kłodawie – znajdź swojego przyszłego przyjaciela, sprawdź aktualności i dowiedz się, jak możesz pomóc poprzez adopcję, wolontariat lub wsparcie schroniska.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
