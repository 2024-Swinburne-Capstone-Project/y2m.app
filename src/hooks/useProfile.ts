import { useUser } from '@auth0/nextjs-auth0/client';
import { UserProfile } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchProfileData = async (userId: string): Promise<UserProfile> => {
  const response = await fetch('/api/profile', {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch profile data');
  return response.json();
};

const updateProfileData = async (
  userId: string,
  data: Partial<UserProfile>
): Promise<UserProfile> => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update profile data');
  return response.json();
};

export const useProfile = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userId = user?.sub ?? '';
  const queryKey = ['profile', userId];

  const { data, isLoading, error } = useQuery<UserProfile, Error>({
    queryKey,
    queryFn: () => fetchProfileData(userId),
    enabled: !!userId,
  });

  const updateMutation = useMutation<UserProfile, Error, Partial<UserProfile>>({
    mutationFn: (updateData) => updateProfileData(userId, updateData),
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.setQueryData(queryKey, newData);
    },
  });

  const saveProfile = async (updateData: Partial<UserProfile>) => {
    await updateMutation.mutateAsync(updateData);
  };

  return {
    profile: data,
    isLoading,
    error,
    saveProfile,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
  };
};
