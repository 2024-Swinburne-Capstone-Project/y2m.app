import * as React from 'react';
import { ModeToggle } from './mode-toggle';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import UserButton from './user-button';
import { navConfig } from '@/config/nav';

export default async function NavMenu() {
  return (
    <div className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center px-4">
          <MainNav navItems={navConfig.navItems} />
          <MobileNav navItems={navConfig.navItems} />
          <div className="ml-auto flex space-x-4">
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
}
