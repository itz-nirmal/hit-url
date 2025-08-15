import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIT URL - Keep Your URLs Alive",
  description: "Automated cron job service that hits URLs at regular intervals to keep your websites alive.",
  icons: {
    icon: "/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
