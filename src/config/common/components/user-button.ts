import { UserButton } from '@/types';

export const userButtonConfig: UserButton = {
  profileButton: 'My Profile',
  connectionsButton: 'Connections',
  signOutButton: 'Sign out',
  loginButton: 'Login',
  profileHref: '/profile',
  connectionsHref: '/connections',
  signOutHref: '/api/auth/logout',
  loginHref: '/profile',
  connectionsOverviewHref: '/connections-overview',
  connectionsOverviewButton: 'Connections Overview',
};
