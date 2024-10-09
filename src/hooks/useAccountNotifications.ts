import { AccountNotification } from '@/types/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from '@tanstack/react-query';

const POLLING_INTERVAL = 3600000; // Poll every 1 hour

const fetchUnreadNotifications = async (userId: string): Promise<AccountNotification[]> => {
  const response = await fetch('/api/account-notifications', {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
};

export const useAccountNotifications = () => {
  const { user } = useUser();

  const userId = user?.sub ?? '';
  const queryKey = ['account-notifications', userId];

  const { data, isLoading, error } = useQuery<AccountNotification[], Error>({
    queryKey,
    queryFn: () => fetchUnreadNotifications(userId),
    enabled: !!userId,
    refetchInterval: POLLING_INTERVAL,
  });

  return {
    notifications: data,
    isLoading,
    error,
  };
};

export default useAccountNotifications;
