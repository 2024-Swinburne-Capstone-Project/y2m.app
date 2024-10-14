import * as React from 'react';
import { ModeToggle } from '../nav/mode-toggle';
import { MainNav } from '../nav/main-nav';
import { MobileNav } from '../nav/mobile-nav';
import UserButton from '../nav/user-button';
import SearchBar from './search-bar';
import Link from 'next/link';
import Image from 'next/image';
import NotificationsButton from '../nav/notifications-button';
import { HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default async function ApplicationNav() {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-[1400px]">
        <div className="ml-auto flex h-16 items-center px-4">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Image src={'/y2m-logo.png'} alt="You2Mentor" width={80} height={80} className="mr-5" />
          </Link>
          <MainNav />
          <MobileNav />
          <div className="ml-auto flex space-x-4">
            <SearchBar />
            <ModeToggle />
            <Button variant={'outline'} size="icon" className="relative">
              <Link
                href="https://scribehow.com/page/You2Mentor_User_Guide__Gr7fdifpTXeEe9gv48XQ9Q?referrer=documents"
                className="hidden items-center space-x-2 md:flex"
                target="_blank"
              >
                <HelpCircle size={20} />
              </Link>
            </Button>
            <NotificationsButton />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
