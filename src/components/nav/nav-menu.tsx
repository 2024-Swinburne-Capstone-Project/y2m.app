import * as React from "react";
import { ModeToggle } from "./mode-toggle";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import UserButton from "./user-button";
import Image from "next/image";

export default async function NavMenu() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav />
        <MobileNav />
        <div className="ml-auto flex space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
