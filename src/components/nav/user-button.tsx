import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getSession } from "@auth0/nextjs-auth0";

export default async function UserButton() {
  const session = await getSession();
  if (!session?.user) return <a href="/api/auth/login">Login</a>;
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={
              session.user.image ??
              "https://source.boringavatars.com/marble/120"
            }
            alt={session.user.name ?? ""}
          />
          <AvatarFallback>Fill In</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-2">
          <div>
            <span>{session.user.name}</span>
          </div>
          <div>
            <span>{session.user.email}</span>
          </div>
          <div>
            <a href="/api/auth/login">SignOut</a>;
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
