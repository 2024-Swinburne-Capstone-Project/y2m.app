import ApplicationNav from '@/components/application/application-nav';
import { Footer } from '@/components/layout/footer';
import { redirect } from 'next/navigation';
import { getSession } from '@auth0/nextjs-auth0';
import ChatWindow from '@/app/(application)/components/chat-window';

interface ApplicationLayoutProps {
  children: React.ReactNode;
}

export default async function ApplicationLayout({ children }: ApplicationLayoutProps) {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    return redirect('/api/auth/login');
  }
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <ApplicationNav />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWindow />
    </div>
  );
}
