import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavMenu from "@/components/nav/nav-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spending Tracker",
  description: "A simple spending tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NavMenu />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}