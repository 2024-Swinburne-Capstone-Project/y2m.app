'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '../ui/button';
import { userButtonConfig } from '@/config/common/components/user-button';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import { User, LogOut, Users, ContactRound } from 'lucide-react';

export default function UserButton() {
  const [mounted, setMounted] = React.useState(false);
  const { user, error, isLoading } = useUser();
  const { profile } = useProfile();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <Button asChild>
        <a href={userButtonConfig.loginHref}>{userButtonConfig.loginButton}</a>
      </Button>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={profile?.user?.profilePictureURL ?? user?.picture ?? ''}
            alt={profile?.user?.name ?? ''}
          />
          <AvatarFallback>{profile?.user?.name?.[0] ?? user.name?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{profile?.user?.name ?? user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={userButtonConfig.profileHref}>
            <User className="mr-2 size-4" />
            <span>{userButtonConfig.profileButton}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={userButtonConfig.connectionsHref}>
            <Users className="mr-2 size-4" />
            <span>{userButtonConfig.connectionsButton}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={userButtonConfig.connectionsOverviewHref}>
            <ContactRound className="mr-2 size-4" />
            <span>{userButtonConfig.connectionsOverviewButton}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={userButtonConfig.signOutHref}>
            <LogOut className="mr-2 size-4" />
            <span>{userButtonConfig.signOutButton}</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
