import * as React from 'react';
import { ModeToggle } from '../nav/mode-toggle';
import { MainNav } from '../nav/main-nav';
import { MobileNav } from '../nav/mobile-nav';
import UserButton from '../nav/user-button';
import { marketingNavConfig } from '@/config/nav';

export default async function ApplicationNav() {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center px-4">
          <MainNav navItems={marketingNavConfig.navItems} />
          <MobileNav navItems={marketingNavConfig.navItems} />
          <div className="ml-auto flex space-x-4">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
