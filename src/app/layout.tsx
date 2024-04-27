import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import NavMenu from '@/components/nav/nav-menu';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'You2Mentor',
  description: 'You2Mentor is a platform for connecting mentors and mentees.',
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
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto">
            <NavMenu />
            {children}
          </div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
