'use client';

import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/common/theme-provider';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthSync } from '@/hooks/useAuthSync';

const inter = Inter({ subsets: ['latin'] });

function AuthWrapper({ children }: { children: React.ReactNode }) {
  useAuthSync();
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <AuthWrapper>
            <body className={inter.className}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </body>
          </AuthWrapper>
        </UserProvider>
      </QueryClientProvider>
    </html>
  );
}
