import { useQuery } from '@tanstack/react-query';
import { UserData } from '@/types/mentor-search/user-data';
import { useUser } from '@auth0/nextjs-auth0/client';

const fetchConnections = async (
  userId: string
): Promise<{ mentors: UserData[]; mentees: UserData[] }> => {
  const response = await fetch(`/api/connections`, {
    headers: {
      'X-User-Id': userId,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch connections');
  return response.json();
};

export const useConnections = () => {
  const { user } = useUser();
  const userId = user?.sub ?? '';

  const { data, isLoading, error } = useQuery<{ mentors: UserData[]; mentees: UserData[] }, Error>({
    queryKey: ['connections', userId],
    queryFn: () => fetchConnections(userId),
    enabled: !!userId,
  });

  return {
    mentors: data?.mentors ?? [],
    mentees: data?.mentees ?? [],
    isLoading,
    error,
  };
};
