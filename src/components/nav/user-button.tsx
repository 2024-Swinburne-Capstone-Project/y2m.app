'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '../ui/button';

export default function UserButton() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <Button asChild>
        <a href="/api/auth/login">Login</a>
      </Button>
    );

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={user.picture ?? 'https://source.boringavatars.com/marble/120'}
            alt={user.name ?? ''}
          />
          <AvatarFallback>Fill In</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-2">
          <div>
            <span>{user.name}</span>
          </div>
          <div>
            <span>{user.email}</span>
          </div>
          <div>
            <Button asChild>
              <a href="/api/auth/logout">Sign out</a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
