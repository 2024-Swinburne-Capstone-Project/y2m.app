import * as React from 'react';
import { ModeToggle } from '../nav/mode-toggle';
import { MainNav } from '../nav/main-nav';
import { MobileNav } from '../nav/mobile-nav';
import UserButton from '../nav/user-button';
import { applicatonNavConfig } from '@/config/nav';
import SearchBar from './search-bar';
import Link from 'next/link';
import Image from 'next/image';

export default async function ApplicationNav() {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="ml-auto flex h-16 items-center space-x-4 px-4">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Image src={'/y2m-logo.png'} alt="You2Mentor" width={80} height={80} className="mr-5" />
          </Link>
          <MainNav navItems={applicatonNavConfig.navItems} />
          <MobileNav navItems={applicatonNavConfig.navItems} />
          <SearchBar />
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
