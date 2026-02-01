import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Media App",
  description: "A modern social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
