import * as React from 'react';
import { ModeToggle } from '../nav/mode-toggle';
import { MainNav } from '../nav/main-nav';
import { MobileNav } from '../nav/mobile-nav';
import UserButton from '../nav/user-button';
import Link from 'next/link';
import Image from 'next/image';

export default async function MarketingNav() {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center px-4">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Image src={'/y2m-logo.png'} alt="You2Mentor" width={80} height={80} className="mr-5" />
          </Link>
          <MainNav />
          <MobileNav />
          <div className="ml-auto flex space-x-4">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
