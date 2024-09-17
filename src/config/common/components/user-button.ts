import { UserButton } from '@/types';

export const userButtonConfig: UserButton = {
  loginButton: 'Login',
  loginHref: '/profile',
  signOutButton: 'Sign out',
  signOutHref: '/api/auth/logout',
  profileButton: 'My Profile',
  profileHref: '/profile',
  connectionsButton: 'Requests', // previously called 'Connections'
  connectionsHref: '/connections',
  connectionsOverviewButton: 'Connections Overview',
  connectionsOverviewHref: '/connections-overview',
};
