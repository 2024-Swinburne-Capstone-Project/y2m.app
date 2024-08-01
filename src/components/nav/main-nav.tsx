'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { marketingNavItems, applicationNavItems } from '@/config/common/components/nav';
import { useUser } from '@auth0/nextjs-auth0/client';

export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLUListElement>(null);

  const getNavLinkClassName = (linkPath: string) => {
    return cn(
      navigationMenuTriggerStyle(),
      pathname === linkPath ? 'text-foreground' : 'text-foreground/60'
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement | HTMLUListElement>) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.relatedTarget as Node)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {user && (
          <>
            <NavigationMenuItem>
              <button
                onBlur={handleBlur}
                onClick={toggleDropdown}
                className={getNavLinkClassName('#')}
              >
                Explore {isDropdownOpen ? '▲' : '▼'}
              </button>
              {isDropdownOpen && (
                <ul
                  ref={dropdownRef}
                  tabIndex={-1}
                  className="absolute rounded bg-white shadow-md"
                  onBlur={handleBlur}
                >
                  {marketingNavItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={getNavLinkClassName(item.href)}>
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </NavigationMenuItem>
            {applicationNavItems.map(
              (item) =>
                item.href && (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={getNavLinkClassName(item.href)}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
            )}
          </>
        )}
        {!user &&
          marketingNavItems.map(
            (item) =>
              item.href && (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={getNavLinkClassName(item.href)}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
          )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
