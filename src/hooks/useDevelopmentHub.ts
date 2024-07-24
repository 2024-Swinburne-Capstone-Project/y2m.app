import { useUser } from '@auth0/nextjs-auth0/client';
import {
  CreateDevelopmentAreaData,
  DevelopmentArea,
  DevelopmentHubData,
  MilestoneProgress,
  MilestoneWithSteps,
} from '@/types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

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

const calculateMilestoneProgress = (milestones: MilestoneWithSteps[]): MilestoneProgress => {
  return milestones.reduce(
    (acc, milestone) => {
      acc[milestone.status as keyof MilestoneProgress]++;
      return acc;
    },
    { COMPLETED: 0, IN_PROGRESS: 0, NOT_STARTED: 0 }
  );
};

export const useCreateDevelopmentArea = () =>
  useMutation<DevelopmentArea, Error, CreateDevelopmentAreaData>({
    mutationFn: (data) =>
      fetch('/api/development-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'developmentArea', data }),
      }).then((res) => res.json()),
  });

export const useDevelopmentHub = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<DevelopmentHubData, Error>({
    queryKey: ['developmentHub', user?.sub],
    queryFn: () => fetchDevelopmentHubData(user?.sub || ''),
    enabled: !!user?.sub,
  });

  const updateMutation = useMutation<DevelopmentHubData, Error, Partial<DevelopmentHubData>>({
    mutationFn: (updateData) => updateDevelopmentHubData(user?.sub || '', updateData),
    onSuccess: (newData) => {
      queryClient.setQueryData(['developmentHub', user?.sub], newData);
    },
  });

  const milestonesWithSteps =
    data?.milestones.map((milestone) => ({
      ...milestone,
      steps: data.milestoneSteps.filter((step) => step.milestoneId === Number(milestone.id)),
    })) || [];

  const milestoneProgress = calculateMilestoneProgress(milestonesWithSteps);

  return {
    milestonesWithSteps,
    developmentAreas: data?.developmentAreas || [],
    badges: data?.badges || [],
    milestoneProgress,
    isLoading,
    error,
    updateDevelopmentHub: updateMutation.mutateAsync,
  };
};
