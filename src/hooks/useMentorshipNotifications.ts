import { MentorshipNotification } from '@/types/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

const POLLING_INTERVAL = 60000; // Poll every 1 minute

const fetchUnreadNotifications = async (userId: string): Promise<MentorshipNotification[]> => {
  const response = await fetch('/api/mentorship-notifications', {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
};

const markNotificationRead = async (userId: string, notificationId: string): Promise<void> => {
  const response = await fetch('/api/mentorship-notifications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ id: notificationId, read: true }),
  });
  if (!response.ok) throw new Error('Failed to mark notification read');
};

export const useMentorshipNotifications = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userId = user?.sub ?? '';
  const queryKey = ['mentorship-notifications', userId];

  const { data, isLoading, error } = useQuery<MentorshipNotification[], Error>({
    queryKey,
    queryFn: () => fetchUnreadNotifications(userId),
    enabled: !!userId,
    refetchInterval: POLLING_INTERVAL,
  });

  const markReadMutation = useMutation<void, Error, string>({
    mutationFn: (notificationId) => markNotificationRead(userId, notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const markRead = async (notificationId: string) => {
    await markReadMutation.mutateAsync(notificationId);
  };

  return {
    notifications: data,
    isLoading,
    error,
    markRead,
    isMarkingRead: markReadMutation.isPending,
    markReadError: markReadMutation.error,
  };
};
