import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ClientWrapper from "./ClientLayout";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "NERDTECA PORTAL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
