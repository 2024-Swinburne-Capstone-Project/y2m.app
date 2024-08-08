import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/db';

const fetchMentors = async (userId: string): Promise<User[]> => {
  const response = await fetch(`/api/users/${userId}/mentors`, {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch mentors');
  return response.json();
};

export const useMyMentors = () => {
  const { user } = useUser();

  const { data, isLoading, error } = useQuery<User[], Error>({
    queryKey: ['mentors', user?.sub],
    queryFn: () => fetchMentors(user?.sub || ''),
    enabled: !!user?.sub,
  });

  return {
    mentors: data || [],
    isLoading,
    error,
  };
};
