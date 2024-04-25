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
import Image from "next/image";

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
      <Link
        href="/"
        className="hidden items-center space-x-2 md:flex">
        <Image
          src={"/y2m-logo.png"}
          alt="You2Mentor"
          width={80}
          height={80}
          className="mr-5"
        />
      </Link>
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
