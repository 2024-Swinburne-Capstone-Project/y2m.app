import { useUser } from '@auth0/nextjs-auth0/client';
import { DevelopmentHubData } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchDevelopmentHubData = async (userId: string): Promise<DevelopmentHubData> => {
  const response = await fetch('/api/development-hub', {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

const updateDevelopmentHubData = async (
  userId: string,
  data: Partial<DevelopmentHubData>
): Promise<DevelopmentHubData> => {
  const response = await fetch('/api/development-hub', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update data');
  return response.json();
};

export const useDevelopmentHub = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userId = user?.sub ?? '';
  const queryKey = ['developmentHub', userId];
  const { data, isLoading, error } = useQuery<DevelopmentHubData, Error>({
    queryKey: ['developmentHub', userId],
    queryFn: () => fetchDevelopmentHubData(userId),
    enabled: !!userId,
  });

  const updateMutation = useMutation<DevelopmentHubData, Error, Partial<DevelopmentHubData>>({
    mutationFn: (updateData) => updateDevelopmentHubData(userId, updateData),
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.setQueryData(queryKey, newData);
    },
  });

  const saveData = async (updateData: Partial<DevelopmentHubData>) => {
    await updateMutation.mutateAsync(updateData);
  };

  return {
    data,
    isLoading,
    error,
    saveData,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
  };
};
