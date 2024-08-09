'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '../ui/button';
import { userButtonConfig } from '@/config/common/components/user-button';
import { useProfile } from '@/hooks/useProfile';

export default function UserButton() {
  const { user, error, isLoading } = useUser();
  const { profile } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <Button asChild>
        <a href={userButtonConfig.href}>{userButtonConfig.loginButton}</a>
      </Button>
    );

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={profile?.user?.profilePictureURL ?? user?.picture ?? ''}
            alt={profile?.user?.name ?? ''}
          />
          <AvatarFallback>Fill In</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col items-center space-y-2">
          <div>
            <span>{user.email}</span>
          </div>
          <div className="flex gap-2.5">
            <Button asChild>
              <a href="/profile">{userButtonConfig.profileButton}</a>
            </Button>
            <Button asChild>
              <a href="/api/auth/logout">{userButtonConfig.signOutButton}</a>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
