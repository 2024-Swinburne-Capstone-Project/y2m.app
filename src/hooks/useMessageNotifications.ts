import { MessageNotification } from '@/types/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

const POLLING_INTERVAL = 5000; // Poll every 5 seconds

const fetchUnreadNotifications = async (userId: string): Promise<MessageNotification[]> => {
  const response = await fetch('/api/message-notifications', {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return response.json();
};

const markNotificationRead = async (userId: string, chatId: string): Promise<void> => {
  const response = await fetch('/api/message-notifications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ chatId: chatId, read: true }),
  });
  if (!response.ok) throw new Error('Failed to mark notification read');
};

export const useMessageNotifications = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userId = user?.sub ?? '';
  const queryKey = ['message-notifications', userId];

  const { data, isLoading, error } = useQuery<MessageNotification[], Error>({
    queryKey,
    queryFn: () => fetchUnreadNotifications(userId),
    enabled: !!userId,
    refetchInterval: POLLING_INTERVAL,
  });

  const markReadMutation = useMutation<void, Error, string>({
    mutationFn: (chatId) => markNotificationRead(userId, chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const markRead = async (chatId: string) => {
    await markReadMutation.mutateAsync(chatId);
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
