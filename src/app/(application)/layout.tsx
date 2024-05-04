import NavMenu from '@/components/nav/nav-menu';
import { Footer } from '@/components/footer';
import { notFound } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';

interface ApplicatonLayoutProps {
  children: React.ReactNode;
}

export default async function ApplicatonLayout({ children }: ApplicatonLayoutProps) {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return notFound();
  }
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
