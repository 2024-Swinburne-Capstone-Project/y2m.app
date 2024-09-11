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
  NavigationMenuContent,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { marketingNavItems, applicationNavItems } from '@/config/common/components/nav';
import { useUser } from '@auth0/nextjs-auth0/client';

export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const getNavLinkClassName = (linkPath: string) => {
    return cn(
      navigationMenuTriggerStyle(),
      pathname === linkPath ? 'text-foreground' : 'text-foreground/60'
    );
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {user && (
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-foreground/60">
                Quick Links
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-background">
                <ul className="grid w-[200px] grid-cols-1 p-4">
                  {marketingNavItems.map((item) => (
                    <>
                      <ListItem
                        key={item.href}
                        title={item.title}
                        href={item.href}
                        className={getNavLinkClassName(item.href)}
                      ></ListItem>
                      {item.childMenuItems &&
                        item.childMenuItems.map((child) => (
                          <ListItem
                            key={child.href}
                            title={child.title}
                            href={child.href}
                            className={getNavLinkClassName(child.href) + ' ml-4'}
                          ></ListItem>
                        ))}
                    </>
                  ))}
                </ul>
              </NavigationMenuContent>
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
                  {item.childMenuItems ? (
                    <>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuTrigger
                          className={`text-foreground/60 ${getNavLinkClassName(item.href)}`}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                      </Link>
                      <NavigationMenuContent className="bg-background">
                        <ul>
                          {item.childMenuItems.map((child) => (
                            <ListItem
                              key={child.href}
                              title={child.title}
                              href={child.href}
                              className={getNavLinkClassName(child.href)}
                            ></ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className={getNavLinkClassName(item.href)}>
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              )
          )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
