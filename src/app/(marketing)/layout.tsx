import MarketingNav from '@/components/marketing/marketing-nav';
import { Footer } from '@/components/layout/footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <MarketingNav />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
