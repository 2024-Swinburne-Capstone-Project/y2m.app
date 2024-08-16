import ApplicatonNav from '@/components/application/application-nav';
import { Footer } from '@/components/layout/footer';
import { redirect } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';
import Chat from './components/chat';

interface ApplicatonLayoutProps {
  children: React.ReactNode;
}

export default async function ApplicatonLayout({ children }: ApplicatonLayoutProps) {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect('/api/auth/login');
  }
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <ApplicatonNav />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
      <Chat />
    </div>
  );
}
