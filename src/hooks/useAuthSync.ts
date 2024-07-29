import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export const useAuthSync = () => {
  const { user, isLoading } = useUser();
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    if (isLoading || isSynced) return;

    const syncUser = async () => {
      if (user) {
        try {
          const response = await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              auth0Id: user.sub,
              email: user.email,
              name: user.name,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to sync user');
          }

          console.log('User synced successfully');
          setIsSynced(true);
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [user, isLoading, isSynced]);

  return { isSynced };
};
