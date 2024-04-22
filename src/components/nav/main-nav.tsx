"use client";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { navConfig } from "@/config/nav";

const currentPageNavLinkStyle = "underline";

export function MainNav() {
  const pathname = usePathname();

  const getNavLinkClassName = (linkPath: string) => {
    return cn(
      navigationMenuTriggerStyle(),
      pathname === linkPath ? "text-foreground" : "text-foreground/60"
    );
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navConfig.mainNav?.map(
          (item) =>
            item.href && (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  legacyBehavior
                  passHref>
                  <NavigationMenuLink
                    className={getNavLinkClassName(item.href)}>
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
