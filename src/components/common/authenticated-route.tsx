import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  const user = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
