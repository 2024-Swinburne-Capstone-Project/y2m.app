import {
  CreateMentorshipRequestData,
  MentorshipRequest,
} from '@/types/mentorship-request/mentorship-request';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchMentorshipRequests = async (userId: string): Promise<MentorshipRequest[]> => {
  const response = await fetch('/api/mentorship-requests', {
    headers: { 'X-User-Id': userId },
  });
  if (!response.ok) throw new Error('Failed to fetch mentorship connections');
  return response.json();
};

const createMentorshipRequest = async (
  userId: string,
  data: CreateMentorshipRequestData
): Promise<MentorshipRequest> => {
  const response = await fetch('/api/mentorship-requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create mentorship request');
  return response.json();
};

const updateMentorshipRequest = async (
  userId: string,
  requestId: string,
  action: 'accept' | 'reject'
): Promise<void> => {
  const response = await fetch('/api/mentorship-requests', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Id': userId,
    },
    body: JSON.stringify({ id: requestId, action }),
  });
  if (!response.ok) throw new Error('Failed to update mentorship request');
};

export const useMentorshipRequests = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userId = user?.sub ?? '';
  const queryKey = ['mentorshipRequests', userId];

  const { data, isLoading, error } = useQuery<MentorshipRequest[], Error>({
    queryKey,
    queryFn: () => fetchMentorshipRequests(userId),
    enabled: !!userId,
  });

  const createMutation = useMutation<MentorshipRequest, Error, CreateMentorshipRequestData>({
    mutationFn: (requestData) => createMentorshipRequest(userId, requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateMutation = useMutation<
    void,
    Error,
    { requestId: string; action: 'accept' | 'reject' }
  >({
    mutationFn: ({ requestId, action }) => updateMentorshipRequest(userId, requestId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const createRequest = async (requestData: CreateMentorshipRequestData) => {
    await createMutation.mutateAsync(requestData);
  };

  const acceptRequest = async (requestId: string) => {
    await updateMutation.mutateAsync({ requestId, action: 'accept' });
  };

  const rejectRequest = async (requestId: string) => {
    await updateMutation.mutateAsync({ requestId, action: 'reject' });
  };

  return {
    requests: data,
    isLoading,
    error,
    createRequest,
    acceptRequest,
    rejectRequest,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
  };
};
