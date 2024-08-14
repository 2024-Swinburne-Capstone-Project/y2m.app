import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/db'; // Adjust the import path as needed

const fetchMentors = async (query: string): Promise<User[]> => {
  const response = await fetch(`/api/users?name=${encodeURIComponent(query)}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch mentors');
  return response.json();
};

export const useMentorSearch = (query: string) => {
  const queryKey = ['mentors', query];

  const { data, isLoading, error, refetch } = useQuery<User[], Error>({
    queryKey,
    queryFn: () => fetchMentors(query),
    enabled: query.length > 0, // Only run the query if there's a search term
  });

  return {
    mentors: data ?? [],
    isLoading,
    error,
    refetch,
  };
};
