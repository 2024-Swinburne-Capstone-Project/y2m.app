import { useQuery } from '@tanstack/react-query';
import { UserData } from '@/types/mentor-search/user-data';
import { useUser } from '@auth0/nextjs-auth0/client';

const fetchMentors = async (query: string, userId: string): Promise<UserData[]> => {
  const response = await fetch(`/api/users?name=${encodeURIComponent(query)}&isMentor=true`, {
    headers: {
      'X-User-Id': userId,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch mentors');
  return response.json();
};

export const useMentorSearch = (query: string) => {
  const { user } = useUser();
  const queryKey = ['mentors', query];

  const { data, isLoading, error, refetch } = useQuery<UserData[], Error>({
    queryKey,
    queryFn: () => fetchMentors(query, user?.sub ?? ''),
    enabled: !!user?.sub && query.length > 0,
  });

  return {
    mentors: data ?? [],
    isLoading,
    error,
    refetch,
  };
};