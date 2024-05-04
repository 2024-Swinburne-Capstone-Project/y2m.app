import NavMenu from '@/components/nav/nav-menu';
import { Footer } from '@/components/footer';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <NavMenu />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
